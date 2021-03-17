<template>
  <div id="app">
    <h1 class="store">Chef Siqi's</h1>
    <router-view></router-view> 
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
      return{
    }
  }
}
</script>

<style scoped>
.store{
  text-align: center;
  background-color:lightslategray;
  border: 2px solid grey;
  height: 60px;
}
</style>