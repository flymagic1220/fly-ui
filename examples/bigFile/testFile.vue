<template>
  <div>
    <!-- 分片上传功能 -->
    <big-file ref="bigFile" :fileList="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </big-file>
    <el-button slot="trigger" size="small" type="warning" @click="stopUpload">暂停</el-button>
    <el-button slot="trigger" size="small" type="warning" @click="reUpload">重新上传</el-button>
  </div>
</template>
<script>
import BigFile from './index'
export default {
  components: {
    BigFile
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    submitUpload() {
      this.$refs.bigFile.submitUpload()
    },
    stopUpload() {
      this.$refs.bigFile.stopUpload()
    },
    reUpload() {
      this.$refs.bigFile.reUpload()
    }
  }
}
</script>
