<template>
  <div>
    <h1 class="g-color">This is an test page</h1>
    <el-input v-model="name"></el-input>
    <br/><br/>
    <el-button @click="testApi">默认按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    async testApi () {
      await this.api.login()
    }
  }
}
</script>
