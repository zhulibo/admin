const path = require('path')

module.exports = {
  outputDir: process.env.outputDir,
  productionSourceMap: false,
  publicPath: './',
  devServer:{
    proxy: {
      '/api': {
        // target: 'https://app.mxjclub.com',
        target: 'http://192.168.0.146:8080',
        changeOrigin: true,
        ws: true,
        secure: false, // 默认情况下，不接受运行在HTTPS上且使用了无效证书的后端服务器。
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    output: {
      chunkFilename: 'js/[name].[chunkhash:8].js' // 不在output.entry中的文件，异步加载模块的文件名。
    },
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('img', path.join(__dirname,'src/assets/img'))
      .set('css', path.join(__dirname,'src/assets/css'))
      .set('components', path.join(__dirname,'src/components'))
      .set('views', path.join(__dirname,'src/views'))
  },
  css: {
    sourceMap: process.env.NODE_ENV == 'development' ? true : false,
    loaderOptions: {
      stylus: {
        import: '~@/assets/css/variables.styl'
      }
    }
  },
}