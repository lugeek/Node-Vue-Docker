<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      {{message}}
    </div>
  </div>
</template>

<script>
import {getMessage} from './Api'

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      message: 'hello world'
    }
  },
  mounted() {
    getMessage().then(response => {
      this.message = response;
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
