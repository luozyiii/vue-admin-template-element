<template>
  <div class="aside">
    <div class="logo">
      vue-admin
    </div>
    <div class="side-menu">
      <el-menu
        :default-active="onRoute"
        :collapse="collapse"
        :default-openeds="defaultOpeneds"
        @select="selectMenu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="item in menuList">
          <el-submenu
            v-if="item.children && item.children.length  > 0"
            :key="item.path"
            :index="item.path"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
              <template v-for="sub in item.children">
                <el-submenu
                  v-if="sub.children && sub.children.length > 0"
                  :key="sub.path"
                  :index="sub.path"
                >
                  <span slot="title">{{sub.title}}</span>
                  <el-menu-item
                      v-for="third in sub.children"
                      :key="third.path"
                      :index="third.path"
                  >{{third.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="sub.path" :index="sub.path">
                  <i :class="sub.icon"></i>
                  {{sub.title}}
                </el-menu-item>
              </template>
              </el-submenu>
              <el-menu-item v-else :key="item.path" :index="item.path">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
          </template>
      </el-menu>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MenuBar',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCollapse: false,
      defaultOpeneds: [],
      menuList: [
        {
          title: '首页',
          path: 'Home',
          icon: 'el-icon-house',
          children: []
        },
        {
          title: '测试',
          path: '',
          icon: 'el-icon-s-grid',
          children: [
            {
              title: 'Test',
              icon: 'el-icon-folder-checked',
              path: 'Test'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoute () {
      return this.$route.name
    }
  },
  methods: {
    selectMenu (path, indexPath) {
      if (path === this.$route.name) return
      this.$router.push({
        name: path
      })
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right-color: #545c64;
}
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
</style>
