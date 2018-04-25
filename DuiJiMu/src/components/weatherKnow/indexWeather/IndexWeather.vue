<template>
  <div class="index_weather_bg">
    <div class="index_weather_logo"></div>
    <h1 class="index_weather_msg">加载中21%</h1>
    <div class="index_weather_loading">
      <div class="index_weather_bar">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
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

<style scoped>
.index_weather_bg{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #035e8d;
}
.index_weather_bg .index_weather_logo{
  width:187px;
  height:218px;
  background: url("source/bg.png") no-repeat;
  background-size: contain;
  position: absolute;
  top:30%;
  left:50%;
  margin-top:-109px;
  margin-left:-96px;
}
.index_weather_bg .index_weather_loading{
  position: fixed;
  top: 58%;
  left: 50%;
  margin: -6px 0 0 -48px;
  width: 96px;
  height: 12px;
  overflow: hidden;
}
.index_weather_bg .index_weather_loading .index_weather_bar{
  width:176px;
  /* 分成5步的动画来移动进度条 */
  animation: index_weather_load 1s steps(5,end) both infinite;
}
.index_weather_bg .index_weather_loading .index_weather_bar i {
  width: 12px;height: 6px;float: left;margin: 4px;background:#F0F8FF;
}
.index_weather_bg .index_weather_loading .index_weather_bar i:nth-child(6){
  transform: scale(1.5);background:#9AFF9A;
}
@keyframes index_weather_load{
  0%{transform: translate(-80px);}
  80%,100%{transform: translate(0px);}
}
@-webkit-keyframes index_weather_load {
  0%{transform: translate(-80px);}
  80%,100%{transform: translate(0px);}
}
@-o-keyframes index_weather_load {
  0%{transform: translate(-80px);}
  80%,100%{transform: translate(0px);}
}
@-moz-keyframes index_weather_load {
  0%{transform: translate(-80px);}
  80%,100%{transform: translate(0px);}
}
.index_weather_bg .index_weather_msg{
  width:96px;
  height:40px;
  background: #035e8d;
  position: absolute;
  top:76%;
  left:50%;
  margin-top:-20px;
  margin-left:-48px;
  font-size: 16px;
  color:#F0FFFF;
  text-align: center;
  line-height: 40px;
  font-family: 微软雅黑;
}
</style>
