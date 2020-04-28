// https://cli.vuejs.org/zh/config/#publicpath
module.exports = {
  // 代理
  devServer: {
    proxy: {
      '/baseApis': {
        target: 'http://xxx:8083/',
        pathRewrite: {
          '^/baseApis': 'baseApis'
        },
        changeOrigin: true
      }
    },
    // 浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    }
  },
  // 全局引入css
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        prependData: `
        @import "@/assets/style/common.scss";
        @import "@/assets/style/default.scss"; 
          `
      }
    }
  }
}
