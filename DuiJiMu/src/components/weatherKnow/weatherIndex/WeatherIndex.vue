<template>
  <div class="weather_index">
    <h1 class="weather_index_logo"></h1>
    <nav class="weather_index_loading">
      <ul class="weather_index_bar">
        <li v-for="loadblock in loadblocks"></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loadblocks: new Array(11)
    }
  },
  mounted () {
    this.loadTimer = setTimeout(() => {
      this.$router.push('/duijimu/weather/weatherinfo')
    }, 2000)
  },
  beforeDestroy () {
    if (this.loadTimer) {
      clearTimeout(this.loadTimer)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .weather_index{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #035e8d;
  }
  .weather_index .weather_index_logo{
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
  .weather_index .weather_index_loading{
    position: fixed;
    top: 60%;
    left: 50%;
    margin: -6px 0 0 -48px;
    width: 96px;
    height: 12px;
    overflow: hidden;
  }
  .weather_index .weather_index_bar{
    width:176px;
    list-style:none;
    /* 分成5步的动画来移动进度条 */
    animation: weather_index_load 1s steps(5,end) both infinite;
  }
  .weather_index .weather_index_bar li {
    width: 12px;height: 6px;float: left;margin: 4px;background:#fff;
  }
  .weather_index .weather_index_bar li:nth-child(6){
    transform: scale(1.5);background:#9AFF9A;
  }
  @keyframes weather_index_load{
    0%{transform: translate(-80px);}
    80%,100%{transform: translate(0px);}
  }
  @-webkit-keyframes weather_index_load {
    0%{transform: translate(-80px);}
    80%,100%{transform: translate(0px);}
  }
  @-o-keyframes weather_index_load {
    0%{transform: translate(-80px);}
    80%,100%{transform: translate(0px);}
  }
  @-moz-keyframes weather_index_load {
    0%{transform: translate(-80px);}
    80%,100%{transform: translate(0px);}
  }
</style>
