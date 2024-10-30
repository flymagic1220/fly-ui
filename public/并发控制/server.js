const http = require('http')
const count=0
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
    console.log('Server is running on port 3000');
})
