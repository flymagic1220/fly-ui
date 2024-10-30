# 1 处理并发请求

前端经常处理各种异步逻辑，有的是串行的

```javascript
await promise1
await promise2
```

有的是并行的

```javascript
await Promise.all([promise1, promise2])
```

```javascript
await Promise.race([promise1, promise2])
```

并行的异步逻辑有时还要做并发控制。

原因：对于 http1.1 虽然浏览器限制了并发数，但是并不会过滤不必要的请求，只是分批次发送。大量的请求处于超长等待状态，这极容易造成浏览器卡顿甚至崩溃的情况。对于 http2.0 多路复用提高了并发数量但是也不能无限制的并行多个请求，仍然需要做并发控制

## 1.1 p-limit 插件

p-limit 是处理并发控制的常用插件

> [手写 p-limit，40 行代码实现并发控制\_神光的编程秘籍的技术博客\_51CTO 博客](https://blog.51cto.com/u_15506823/6240489)

```javascript
// 安装
npm install p-limit
```

```javascript
<script>
import PLimit from 'p-limit'
export default {
  data() {
    return {}
  },
  mounted() {
    this.limitSend()
  },
  methods: {
    fetchData1(i) {
      return new Promise((resolve) => {
        fetch('http://127.0.0.1:3000').then(() => {
          resolve(i)
        })
      })
    },
    async limitSend() {
      // 限制五条并发
      const pLimit = PLimit(5)
      const execList = []

      for (let i = 0; i < 20; i++) {
        execList.push(pLimit(this.fetchData1, i))
      }
      const res = await Promise.all(execList)
      console.log(res)
    }
  }
}
</script>
```

```javascript
// 启动一个简单的服务器 server.js
const http = require('http')
const count = 0
const server = http.createServer((req, res) => {
  // 简单cors
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  })
  // 0~1s 随机时间
  setTimeout(() => {
    res.end('helloword')
  }, Math.random() * 1000)
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
```

```javascript
//启动服务器，执行server.js
node server.js
```

## 1.2 手写并发控制

参考 p-limit 的实现思路，只是把 run 方法和 next 方法进行了合并

```javascript
const pLimit = (max) => {
  //max:异步任务的并发上限
  const taskQueue = [] //正在排队的任务
  let count = 0 //正在进行的任务数
  const generator = (caller, ...args) => {
    // 添加并发任务的函数
    return new Promise((resolve, reject) => {
      // 创建正在处理的任务
      const task = createTask(caller, resolve, reject, ...args)
      // 判断正在执行的任务数是否达到上限
      if (count >= max) {
        taskQueue.push(task) // 将任务放入队列
      } else {
        task() // 立即执行当前任务
      }
    })
  }
  const createTask = (caller, resolve, reject, ...args) => {
    return async () => {
      count++ // 正在执行的任务树增加
      caller(...args)
        .then((res) => {
          //执行任务
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          // 任务执行结束后，正在执行的任务数减少
          count--
          if (taskQueue.length > 0) {
            // 同时判断任务队列中是否还有未完成的任务，如果有则执行
            taskQueue.shift()()
          }
        })
    }
  }
  return generator
}
```

```javascript
// 调用 （先执行server.js 启动服务器）
const limit = pLimit(2)
function asyncFun(i) {
  return new Promise(async (resolve) => {
    const res = await fetch('http://127.0.0.1:3000')
    resolve(res, i)
  })
}

;(async function () {
  const execList = []
  for (let i = 0; i < 40; i++) {
    execList.push(limit(() => asyncFun(i)))
  }
  await Promise.all(execList)
  const result = await Promise.all(execList)
  console.log(result)
})()
```
