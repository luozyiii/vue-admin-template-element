<template>
  <div class="about">
    <h1 class="g-color">This is an about page</h1>
    <el-button @click="testApi">默认按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    async testApi () {
      await this.api.login()
    }
  }
}
</script>
