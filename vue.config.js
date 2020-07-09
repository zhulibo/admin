const path = require('path')
// const webpack = require('webpack')

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
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('img', path.join(__dirname,'src/assets/img'))
      .set('css', path.join(__dirname,'src/assets/css'))
      .set('components', path.join(__dirname,'src/components'))
      .set('views', path.join(__dirname,'src/views'))
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      stylus: {
        import: '~@/assets/css/variables.styl'
      }
    }
  },
}