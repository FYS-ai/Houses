module.exports = {
  // publicPath:'../../',
  // publicPath:process.env.NODE_ENV==='production'?'/production-sub-path/':'/',
  lintOnSave:false,
  //配置src别名
  configureWebpack:{
    resolve:{
      alias:{
        // 这里需要用单引号
        'assets':'@/assets',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  },
  //配置icon图标
  pwa: {
    iconPaths: {
        favicon32: './logo.png',
        favicon16: './logo.png',
        appleTouchIcon: './logo.png',
        maskIcon: './logo.png',
        msTileImage: './logo.png'
    }
  },
  devServer: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}