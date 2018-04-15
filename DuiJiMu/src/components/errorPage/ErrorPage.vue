<template>
  <div class="error_contain">
    <h1 class="error_logo">
      <div class="error_msg">页面飞走啦</div>
    </h1>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error_contain{
  width: 100%;
  height: 100%;
  background: url("/source/error.png") repeat-x;

}
.error_contain .error_logo{

}
.error_contain .error_logo .error_msg{

}
</style>
