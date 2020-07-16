const path = require('path')

module.exports = {
  outputDir: process.env.outputDir,
  productionSourceMap: false,
  publicPath: './',
  devServer:{
    proxy: {
      '/api': {
        target: 'https://back.goku.vip/',
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  configureWebpack: {
    output: {
      filename: 'js/[name].[chunkhash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js'
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