<template>
  <el-container>
    <el-aside :style="{width:sideBarWidth+'px'}">
      <menu-bar></menu-bar>
    </el-aside>
    <el-container>
      <el-header :height="'51px'" class="main-nav-top">
        <header-top></header-top>
      </el-header>
      <el-main>
        <keep-alive :include="includeAlives">
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuBar from './MenuBar'
import HeaderTop from './HeaderTop'
export default {
  name: 'Layout',
  components: {
    MenuBar,
    HeaderTop
  },
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
  methods: {
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
  }
}
</script>

<style lang='scss' scoped>
.el-aside {
  height: 100vh;
  overflow: hidden;
  background-color: #545c64;
  box-sizing: border-box;
}
.el-header {
  border-bottom: 1px solid #eee;
}
.el-main {
  height: calc(100vh - 51px);
}

</style>
