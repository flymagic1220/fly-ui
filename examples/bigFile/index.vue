<template>
  <div>
    <el-upload class="uploadFile" ref="upload" :action="action" :http-request="uploadFile" :auto-upload="false" :fileList="list" v-bind="$attrs">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

      <slot></slot>
    </el-upload>
    <!-- 每个分片自己的上传进度 -->
    <div v-if="showProgress">
      <el-progress v-for="(item, index) in progressList" :key="index" :percentage="item"> </el-progress>
      <el-progress :percentage="totalPercentage"> </el-progress>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import axiosInstance from '../api/fileRequest'
export default {
  name: 'BigFile',
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    action: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      showProgress: false,
      maxFileSize: 1024 * 1024 * 1024 * 1, // 限制上传文件的大小：1G
      chunkSize: 1024 * 1024 * 3, //每个切片文件的大小：3M
      progressList: {}, // 存储各个分片的百分比
      totalPercentage: 0,
      cancelTokens: [], //存放 所有请求的取消token，
      option: {} //为了暂停后再重新执行上传方法
    }
  },
  watch: {
    fileList: {
      handler() {
        this.list = this.fileList
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    //暂停
    stopUpload() {
      this.cancelTokens.forEach((cancelToken) => cancelToken.cancel('用户主动暂停了上传请求'))
    },
    //重新上传
    reUpload() {
      this.uploadFile(this.option)
    },
    async uploadFile(option) {
      this.option = option
      const { file } = option
      // 根据文件内容对文件进行唯一标识（为了实现秒传的功能）
      const newFileName = await this.getnewFileName(file)
      console.log('newFileName---', newFileName)
      //判断是否上传过
      const { needUpload, uploadedChunkList } = await axiosInstance.get(`/verify/${newFileName}`)
      if (!needUpload) {
        this.$message.success('文件已存在，秒传成功')
      }
      // 对文件进行切片
      const chunks = this.createFileChunks(file, newFileName)
      console.log('chunks----', chunks)
      const newCancelTokens = []
      // 实现并行上传
      const requests = chunks.map(({ chunk, chunkFileName }) => {
        // 给每个请求都创建一个cancelToken
        const cancelToken = axios.CancelToken.source()
        newCancelTokens.push(cancelToken)
        // 由于暂停或其他原因导致上传中断，往服务器发送的数据可能就不是完整的分片了
        // 判断当前分片是否已经存在过
        const existingChunk = uploadedChunkList.find((uploadedChunk) => {
          return uploadedChunk.chunkFileName == chunkFileName
        })
        if (existingChunk) {
          //获取已上传分片的大小
          const uploadedSize = existingChunk.size
          // 从完整的chunk中进行截取，过滤掉已经上传过的大小，得到剩下需要继续上传的内容
          const remainingChunk = chunk.slice(uploadedSize)
          //如果剩下的数据为0，说明完全上传完毕
          if (remainingChunk.size === 0) {
            return new Promise.resolve()
          } else {
            // 上传剩余的文件内容
            // 假设共100字节，已传60字节，剩余40字节。则继续传递剩下的40字节，写入文件的起始索引60字节处
            return this.createRequest(newFileName, remainingChunk, chunkFileName, cancelToken, 0, uploadedSize, chunk.size)
          }
        } else {
          // 当前分片没有上传过，则从0开始上传整个完整的分片
          return this.createRequest(newFileName, chunk, chunkFileName, cancelToken, 0, chunk.size)
        }
      })
      this.cancelTokens = newCancelTokens

      console.log('requests----', requests)
      try {
        this.showProgress = true
        //并行上传每个分片（）
        const res = await Promise.all(requests)
        console.log(res)
        //判断所有的请求是否都成功
        const allSuccess = res.every((el) => el && el.success)
        console.log('allSuccess---', allSuccess)
        // 如果上传暂停则不能进行合并请求
        if (allSuccess) {
          // 等所有分片上传完成之后，再发送一个合并文件的请求
          await axiosInstance.get(`/merge/${newFileName}`)
          console.log('文件上传完成')
        }
      } catch (error) {
        console.log(error)
        console.log(axios.isCancel(error))
        // 用户主动点击了暂停按钮，中断了请求
        if (axios.isCancel(error)) {
          this.$message.warning('上传暂停')
          console.log('上传暂停')
        } else {
          this.$message.error('上传出错')
          console.log('上传出错')
        }
      }
    },
    createRequest(newFileName, chunk, chunkFileName, cancelToken, start, totalSize) {
      this.progressList = { ...this.progressList, [chunkFileName]: 0 }
      const url = `/upload/${newFileName}`
      return axiosInstance.post(url, chunk, {
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        params: {
          chunkFileName,
          start // 把写入的起始位置也要传给后端
        },
        // axios自带上传进度发生变化的函数
        onUploadProgress: (progressEvent) => {
          // 用已经上传的字节数除以总字节数得到完成的百分比，是一个0-1的小数
          const percentComplated = Math.round(((progressEvent.loaded + start) / totalSize) * 100)
          this.progressList[chunkFileName] = percentComplated
          this.getTotalPercent()
        },
        // 作用：用户可以主动暂停上传请求
        cancelToken: cancelToken.token
      })
    },
    getTotalPercent() {
      //计算总的百分比（这是一个粗略的计算）
      let total = 0
      for (let key in this.progressList) {
        total = total + this.progressList[key]
      }
      this.totalPercentage = total / Object.keys(this.progressList).length
      if (this.totalPercentage == 100) this.showProgress = false
    },
    createFileChunks(file, filename) {
      const chunks = []
      const counts = Math.ceil(file.size / this.chunkSize) // 一共要切成多少片
      for (let i = 0; i < counts; i++) {
        const chunk = file.slice(i * this.chunkSize, (i + 1) * this.chunkSize)
        chunks.push({
          chunk,
          chunkFileName: `${filename}-${i}`
        })
      }
      return chunks
    },
    async getnewFileName(file) {
      // 计算文件的hash
      const arrayBuffer = await file.arrayBuffer()
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer) // 此方法浏览器自带
      // 把arrayBuffer转成16进制字符串
      const fileHash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
      //获取文件的扩展名
      const fileExtension = file.name.split('.').pop()
      return `${fileHash}.${fileExtension}`
    },
    // 如果不需要秒传得到话，可以通过getFileKey方法，给文件设置一个唯一标识
    getFileKey(file) {
      // 上传的文件自带一个uid，每个文件都不一样
      file.key = `${file.uid}_${Math.floor(Math.random() * 10000)}.${file.name.split('.').pop()}`
    }
  }
}
</script>
