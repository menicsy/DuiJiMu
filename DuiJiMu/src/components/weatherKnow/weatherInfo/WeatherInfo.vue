<template>
  <div class="weather_info">
      <nav class="today_weather">
      </nav>
      <header class="weather_list">
          <weatherList></weatherList>
      </header>
      <footer class="create_weather">
        <button class="create_btn" @click="createWeather">创建我的天气</button>
      </footer>
      <shakeInfo></shakeInfo>
  </div>
</template>

<script>
import weatherList from '../weatherList/WeatherList.vue'
import shakeInfo from '../shakeInfo/ShakeInfo.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    weatherList,
    shakeInfo
  },
  methods: {
    createWeather () {
      this.$router.push('/weathercreate')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .weather_info{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #035e8d;
  }
  .weather_info .weather_list{
    position: absolute;
    width: 100%;
    height: 70%;
  }
  .weather_info .create_weather{
    position: absolute;
    width: 100%;
    height: 24%;
  }
  .weather_info .create_btn{
    width:60px;
    height: 30px;
    position: absolute;
    top:50%;
    left:50%;
    margin-top:15px;
    margin-left: 30px;
    text-align: center;
    line-height: 15px;
  }
</style>
