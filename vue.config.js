
const { defineConfig } = require('@vue/cli-service')
const { resolve, join } = require('path')
const fs=require('fs');
const isProduction = process.env.NODE_ENV === 'production'

function getEntries(path) {
    let files = fs.readdirSync(resolve(path));
    const entries = files.reduce((ret, item) => {
        const itemPath = join(path, item)
        const isDir = fs.statSync(itemPath).isDirectory();
        if (isDir) {
            ret[item] = resolve(join(itemPath, 'index.js'))
        } else {
            const [name] = item.split('.')
            ret[name] = resolve(`${itemPath}`)
        }
        return ret
    }, {})
    return entries
}

// console.log(getEntries('packages/components'))
// console.log(isProduction)
// console.log(path.resolve(__dirname, 'packages/components/FForm/index.js'))

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    if (isProduction) {// 生产环境配置（多组件单独打包，多入口配置）
      const entriesArr = Object.entries(getEntries('packages/components'))
      entriesArr.forEach(([key, path])=> {
        config.entry(key).add(path)
      })
      config.output.filename('[name].js').libraryTarget("commonjs2")
      // 删除原先打包一些不用的功能
      config.optimization.delete('splitChunks') //删除splitChunks，因为每个组件是独立打包，不需要抽离每个组件的公共js出来
      config.plugins.delete('copy') //不要复制public文件夹内容到lib文件夹中
      config.plugins.delete('html') //只打包组件，不生成html页面
      config.plugins.delete('preload') //删除preload以及prefetch，因为不生成html页面，所以这两个也没用
      config.plugins.delete('prefetch')
      config.entryPoints.delete('app') //删除自动加上的入口App
    } else { //开发环境
      config.entry('app').clear().add('./examples/main.js') // 修改入口文件地址
    }
  },
   // 开发服务,build后的生产模式还需nginx代理
  devServer: {
    open: false, // 运行后自动打开浏览器
    port: '3000', // 挂载端口
    proxy: {
      // 生产环境
      // '/': {
      //   target: 'http://10.238.112.133:8080/',
      //   ws: false
      // }
      '/': {
        target: 'http://127.0.0.1:3000',
        ws: false
      }
    }
  }
  
})
