<template>
  <el-container class="shub-container">
    <el-aside width="auto">
      <NavigationMenu/>
    </el-aside>
    <el-container>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue'
export default {
  name: 'app',
  components: {
    NavigationMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.shub-container {
  height: 100vh;
}
</style>
