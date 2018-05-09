<template>
  <nav class="weather_list">
    <li v-for="weatherInfo in weatherInfo" @click="flipWeather">

    </li>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      infoQuery: {
        pageIndex: 1,
        currentTime: new Date(new Date().toLocaleDateString()).getTime()
      }
    }
  },
  created () {
    axios.post('/weather/weatherquery', this.infoQuery)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {

      })

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.weather_list{
  width: 100%;
  height: 100%;
  list-style: none;
}
</style>
