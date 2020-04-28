# vue-admin-template-element
>基于Element的后台管理模板 

#### 安装vue-cli 脚手架
```
npm uninstall vue-cli -g
yarn global remove vue-cli # 卸载旧版本

cnpm install -g @vue/cli 
yarn global add @vue/cli # 安装最新版本
```

#### vue create 搭建新项目
```
vue create vue-admin-template-element
```

1.选择模板(Please pick a preset)  
default (babel, eslint): 默认配置，只有Babel和eslint，其他的都要自己另外再配置  
Manually select features: 手动配置  (推荐)

2.选择配置
Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing

3.是否使用路由的 histroy 模式（Yes）
4.选择一个css预处理器（Sass/SCSS (with dart-sass)）
5.选择一个eslint配置（ESLint + Standard config）
6.选择什么时候进行eslint代码规则检查（Lint on save）
7.将babel、postcss、eslint这些配置文件放哪（In dedicated config files）
8.是否保存这份预设配置（Yes）
9.预设配置命名 (vue-admin-template-element)

#### vue.config.js 配置
根目录添加vue.config.js

##### 代理devServer
```
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
}
```

#### 全局样式
在assets文件下增加style文件夹
```
common.scss  公共的样式
default.scss     变量
```
vue.config.js配置文件中，加上以下代码
```
module.exports = {
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
```

#### 打包配置
根目录增加开发环境(.end.dev)、测试环境(.env.test)、生产环境(.env.prod)
```
# .end.dev
NODE_ENV = 'development'
VUE_APP_CURRENTMODE = 'dev'
VUE_APP_BASEURL = '本地开发api地址'

# .end.test
NODE_ENV = 'test'
VUE_APP_CURRENTMODE = 'test'
VUE_APP_BASEURL = '测试环境api地址'

# .end.prod
NODE_ENV = 'production'
VUE_APP_CURRENTMODE = 'prod'
VUE_APP_BASEURL = '正式环境api地址'
```

package.json配置：
```
"scripts": {
  "serve": "vue-cli-service serve",
  "build:test": "vue-cli-service build --mode test",
  "build:prod": "vue-cli-service build --mode production",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint"
},
```
vue-cli-service serve 默认使用开发环境变量  
vue-cli-service serve --mode test  添加参数指定测试环境变量  
vue-cli-service build 默认使用生产环境变量  

注意
```
// vue.config.js
console.log(process.env.NODE_ENV); // development（在终端输出）
```

#### Element-ui
安装
```
yarn add element-ui -S
```

main.js 完整引入
```
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, { size: 'small', zIndex: 3000 });
```

#### 请求封装axios
```
yarn add axios -D
```
目录
```
api
  axios.js
  index.js
```
挂载到全局main.js
```
import api from '@/api'

Vue.prototype.api = api
```

#### router 路由
目录
```
router
 default.js # 默认路由
 index.js # 主入口
 routes.js # 业务路由
```

#### 整体布局
components/layout
```
Layout.vue # 布局主入口
HeaderTop.vue # 顶部欢迎信息
MenuBar.vue # 左边菜单
```
APP.vue
```
<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<style lang="scss">
.container {
  overflow: hidden;
}
</style>

```

#### 页面缓存 keep-alive
Layout.vue
```
<keep-alive :include="includeAlives">
  <router-view />
</keep-alive>


data () {
  return {
    includeAlives: [],
    sideBarWidth: 180
  }
},
watch: {
  $route: {
    handler (cur) {
      this.aliveHandle()
    },
    immediate: true
  }
},


aliveHandle () {
  if (this.$route.meta.keepAlive) {
    for (const matchRoute of this.$route.matched) {
      const componentName = matchRoute.components.default.name
      if (matchRoute.meta.keepAlive) {
        // 缓存
        if (this.includeAlives.indexOf(componentName) === -1) {
          this.includeAlives.push(componentName)
        }
      } else {
        // 清除缓存
        const index = this.includeAlives.indexOf(componentName)
        if (index > -1) {
          this.includeAlives.splice(index, 1)
        }
      }
    }
  }
}

```
还需在路由配置一下
router.js
```
meta: {
  keepAlive: true // 需要缓存
},
```





