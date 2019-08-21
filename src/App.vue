<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/navBar/Navbar'
import Index from './components/index/Index'

export default {
  name: 'App',
  components: {
    Navbar, Index
  }
}
</script>

<style scoped>
  .navbar nav {
    padding: 0 20px;
  }
</style>
