<template>
  <div class="weather_info">
      <nav class="today_weather">
        <div>{{weatherInfo.today.date_y}}</div>
        <div>{{weatherInfo.today.week}}</div>
        <div>{{todayWeather}}</div>
        <div>{{todayTemp}}</div>
        <div>{{todayWind}}</div>
        <div>{{currentTemp}}</div>
        <div>{{currentWind}}</div>
      </nav>
      <header class="weather_list">
          <weatherList></weatherList>
      </header>
      <footer class="create_weather">
        <button class="create_btn" @click="createWeather">创建我的天气</button>
      </footer>
  </div>
</template>

<script>
import axios from 'axios'
import weatherList from '../weatherList/WeatherList.vue'
export default {
  data () {
    return {
      weatherInfo: null
    }
  },
  computed: {
    todayWeather: function () {
      return '今日天气:' + this.weatherInfo.today.weather
    },
    todayTemp: function () {
      return '今日温度:' + this.weatherInfo.today.temperature
    },
    todayWind: function () {
      return '今日风力:' + this.weatherInfo.today.wind
    },
    currentTemp: function () {
      return '当前温度:' + this.weatherInfo.sk.temp
    },
    currentWind: function () {
      return '当前风力:' + this.weatherInfo.sk.wind_direction + this.weatherInfo.sk.wind_strength
    }
  },
  components: {
    weatherList
  },
  methods: {
    createWeather () {
      this.$router.push('/duijimu/weather/weathercreate')
    }
  },
  created () {
    var _this = this
    axios.get('/api/getWeather')
      .then(function (response) {
        console.log(response.data.result)
        _this.weatherInfo = response.data.result
        console.log(_this.weatherInfo)
      })
      .catch(function (error) {
      })
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @mixin prefix($property, $value){
    -webkit-#{$property}:$value;
    -moz-#{$property}:$value;
    -o-#{$property}:$value;
    #{$property}:$value;
  }
  @mixin shadow($value){
    @include prefix(box-shadow,$value)
  }
  .weather_info{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #035e8d;
  }
  .weather_info .today_weather{
    width: 80%;
    position: absolute;
    top: 0;
    left:50%;
    padding-top:20px;
    margin-left: -40%;
  }
  .weather_info .today_weather div{
    width: 100%;
    height:20px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    font-size: 16px;
  }
  .weather_info .weather_list{
    width: 90%;
    position: absolute;
    top: 180px;
    left:50%;
    margin-left: -45%;
  }
  .weather_info .create_weather{
    position: absolute;
    width: 100%;
    bottom:60px;
  }
  .weather_info .create_btn{
    width:160px;
    height: 40px;
    position: absolute;
    top:50%;
    left:50%;
    margin-top:-20px;
    margin-left:-80px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    border-radius: 10px;
    border:1px solid #96CDCD;
    color:#fff;
    background:#8EE5EE;
    @include shadow(1px 1px 1px #96CDCD);
  }
</style>
