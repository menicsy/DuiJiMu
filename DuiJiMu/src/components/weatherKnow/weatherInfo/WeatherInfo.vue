<template>
  <div class="weather_info">
      <nav class="today_weather" v-if="isLoading">
        <div>{{weatherInfo.today.date_y}}</div>
        <div>{{weatherInfo.today.week}}</div>
        <div>{{todayWeather}}</div>
        <div>{{todayTemp}}</div>
        <div>{{todayWind}}</div>
        <div>{{currentTemp}}</div>
        <div>{{currentWind}}</div>
      </nav>
      <header class="weather_list_area" v-if="isListLoading">
          <!--weatherList></weatherList-->
          <div v-for="(weatherData, index ) in weatherDatas" class="weather_data" @click="flipWeather(index)">
            <div class="front_side boy  flip" :class="{'in': flipArray[index].isFrontIn, 'out': flipArray[index].isFrontOut}" v-if="weatherData.gender === 'boy'"></div>
            <div class="front_side girl  flip" :class="{'in': flipArray[index].isFrontIn, 'out': flipArray[index].isFrontOut}" v-else-if="weatherData.gender === 'girl'"></div>
            <div class="front_side man  flip" :class="{'in': flipArray[index].isFrontIn, 'out': flipArray[index].isFrontOut}" v-else-if="weatherData.gender === 'man'"></div>
            <div class="front_side woman  flip" :class="{'in': flipArray[index].isFrontIn, 'out': flipArray[index].isFrontOut}" v-else></div>
            <li class="back_side flip" :class="{'in': flipArray[index].isBackIn, 'out': flipArray[index].isBackOut}">
              <p>{{myarea(weatherData.area)}}</p>
              <p>{{mygender(weatherData.gender)}}</p>
              <p>{{myheight(weatherData.height)}}</p>
              <p>{{myweight(weatherData.weight)}}</p>
              <p>{{mycloths(weatherData.cloths)}}</p>
              <p>{{mytime(weatherData.createtime)}}</p>
            </li>
          </div>
          <i class="left_btn" @click="upPage"></i>
          <i class="right_btn" @click="downPage"></i>
      </header>
      <footer class="create_weather">
        <button class="create_btn" @click="createWeather">创建我的天气</button>
      </footer>
  </div>
</template>

<script>
import axios from 'axios'
//import weatherList from '../weatherList/WeatherList.vue'
export default {
  data () {
    return {
      isLoading: false,
      weatherInfo: null,
      isListLoading: false,
      weatherDatas: null,
      infoQuery: {
        params: {
          pageIndex: 1,
          currentTime: new Date(new Date().toLocaleDateString()).getTime()
        }
      },
      flipArray: []
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
    //weatherList
  },
  methods: {
    createWeather () {
      this.$router.push('/duijimu/weather/weathercreate')
    },
    upPage () {
      var _this = this
      this.getWeather().then(function (response) {
        _this.weatherDatas = response.data
        if (_this.weatherDatas.length > 0) {
          _this.isListLoading = true
          for (let i = 0; i < _this.weatherDatas.length; i++) {
            _this.flipArray.push({isFrontIn: false, isFrontOut: false, isBackIn: false, isBackOut: true})
          }
        }
      }).catch(function (error) {
      })
    },
    downPage () {
      var _this = this
      this.getWeather().then(function (response) {
        _this.weatherDatas = response.data
        if (_this.weatherDatas.length > 0) {
          _this.isListLoading = true
          for (let i = 0; i < _this.weatherDatas.length; i++) {
            _this.flipArray.push({isFrontIn: false, isFrontOut: false, isBackIn: false, isBackOut: true})
          }
        }
      }).catch(function (error) {
      })
    },
    flipWeather (index) {
      var situation = false
      for (let i = 0; i < this.flipArray.length; i++) {
        var property = this.flipArray[i]
        if (i === index) {
          if (property.isFrontOut) {
            this.flipArray[i].isBackOut = true
            this.flipArray[i].isBackIn = false
            situation = true
          }
          if (property.isBackOut) {
            this.flipArray[i].isFrontOut = true
            this.flipArray[i].isFrontIn = false
          }
          break
        }
      }
      setTimeout(() => {
        if (situation) {
          this.flipArray[index].isFrontOut = false
          this.flipArray[index].isFrontIn = true
        } else {
          this.flipArray[index].isBackOut = false
          this.flipArray[index].isBackIn = true
        }
      }, 225)
    },
    myarea (val) {
      var returnVal = '我在'
      switch (val) {
        case 'dc':
          returnVal += '东城区'
          break
        case 'xc':
          returnVal += '西城区'
          break
        case 'cy':
          returnVal += '朝阳区'
          break
        case 'ft':
          returnVal += '丰台区'
          break
        case 'sjs':
          returnVal += '石景山区'
          break
        case 'hd':
          returnVal += '海淀区'
          break
      }
      return returnVal
    },
    mygender (val) {
      var returnVal = '我是一个'
      switch (val) {
        case 'boy':
          returnVal += '年龄在16岁到36岁之间的男孩'
          break
        case 'girl':
          returnVal += '年龄在16岁到36岁之间的女孩'
          break
        case 'man':
          returnVal += '年龄在36岁到56岁之间的男士'
          break
        case 'women':
          returnVal += '年龄在36岁到56岁之间的女士'
          break
      }
      return returnVal
    },
    myheight (val) {
      var returnVal = '我的身高是' + val + 'CM'
      return returnVal
    },
    myweight (val) {
      var returnVal = '我的体重是' + val + 'KG'
      return returnVal
    },
    mycloths (val) {
      var clothArray = val.split(',')
      var returnVal = '我现在穿了'
      for (let i = 0; i < clothArray.length; i++) {
        var clothVal = clothArray[i]
        switch (clothVal) {
          case 'shortSleeve':
            returnVal += '短袖'
            break
          case 'longSleeve':
            returnVal += '长袖'
            break
          case 'shorts':
            returnVal += '短裤'
            break
          case 'trousers':
            returnVal += '长裤'
            break
          case 'skirt':
            returnVal += '裙子'
            break
          case 'Sweater':
            returnVal += '毛衣'
            break
          case 'downJacket':
            returnVal += '羽绒服'
            break
          case 'hat':
            returnVal += '帽子'
            break
        }
        if (i !== (clothArray.length - 1)) {
          returnVal += '、'
        }
      }
      return returnVal
    },
    mytime (val) {
      var date = new Date(val)
      var returnVal = '发布于' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + '时' + date.getMinutes() + '分'
      return returnVal
    },
    getWeather () {
      return axios.get('/duijimu/weather/weatherQuery', this.infoQuery)
    },
    getPublicWeather () {
      return axios.get('/api/weather/getPublicWeather')
    }
  },
  created () {
    var _this = this
    axios.all([this.getPublicWeather(), this.getWeather()]).then(axios.spread(function (publicweather, weather) {
      _this.weatherInfo = publicweather.data.result
      _this.isLoading = true
      _this.weatherDatas = weather.data
      if (_this.weatherDatas.length > 0) {
        _this.isListLoading = true
        for (let i = 0; i < _this.weatherDatas.length; i++) {
          _this.flipArray.push({isFrontIn: false, isFrontOut: false, isBackIn: false, isBackOut: true})
        }
      }
    }))
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
  .weather_info .weather_list_area{
    width: 78%;
    position: absolute;
    top: 180px;
    left:50%;
    margin-left: -39%;
    height: 300px;
    display: flex;
    flex-wrap:wrap ;
  }
  .weather_list_area .left_btn{
    width:26px;
    height: 24%;
    position:absolute;
    top:50%;
    margin-top:-25%;
    left:-26px;
    background: #BCD2EE;
    border-top-left-radius:20px;
    border-bottom-left-radius:20px;
  }
  .weather_list_area .right_btn{
    width:26px;
    height: 24%;
    position:absolute;
    top:50%;
    margin-top:-25%;
    right:-26px;
    background: #BCD2EE;
    border-top-right-radius:20px;
    border-bottom-right-radius:20px;
  }
  .weather_list_area .weather_data{
    width: 47.2%;
    height: 142px;
    border: 4px dashed #fff;
    position: relative;
    -webkit-perspective: 1000px;
    perspective: 1000px;
  }
  .weather_list_area .in {
    -webkit-animation-timing-function: ease-out;
    -webkit-animation-duration: 350ms;
    animation-timing-function: ease-out;
    animation-duration: 350ms;
  }
  .weather_list_area .out {
    -webkit-animation-timing-function: ease-in;
    -webkit-animation-duration: 225ms;
    animation-timing-function: ease-in;
    animation-duration: 225ms;
  }
  .weather_list_area .flip {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translateX(0);
    backface-visibility: hidden;
    transform: translateX(0);
  }
  .weather_list_area .flip.out {
    -webkit-transform: rotateY(-90deg) scale(.9);
    -webkit-animation-name: flipouttoleft;
    -webkit-animation-duration: 175ms;
    transform: rotateY(-90deg) scale(.9);
    animation-name: flipouttoleft;
    animation-duration: 175ms;
  }
  .weather_list_area .flip.in {
    -webkit-animation-name: flipintoright;
    -webkit-animation-duration: 225ms;
    animation-name: flipintoright;
    animation-duration: 225ms;
  }
  @-webkit-keyframes flipouttoleft {
    from { -webkit-transform: rotateY(0); }
    to { -webkit-transform: rotateY(-90deg) scale(.9); }
  }
  @keyframes flipouttoleft {
    from { transform: rotateY(0); }
    to { transform: rotateY(-90deg) scale(.9); }
  }
  @-webkit-keyframes flipintoright {
    from { -webkit-transform: rotateY(90deg) scale(.9); }
    to { -webkit-transform: rotateY(0); }
  }
  @keyframes flipintoright {
    from { transform: rotateY(90deg) scale(.9); }
    to { transform: rotateY(0); }
  }
  .weather_list_area .front_side{
     width: 100%;
     height: 100%;
     position: absolute;
   }
  .weather_list_area .back_side{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #8F8F8F;
  }
  .weather_list_area .back_side p{
    width: 100%;
    line-height: 14px;
    background: #8F8F8F;
    color:#fff;
    font-size: 12px;
    word-wrap:break-word ;
  }
  .weather_list_area .boy{
    background: url('source/boy.png') no-repeat center center;
    background-size: contain;
    background-color:#7ce9e6;
  }
  .weather_list_area .girl{
    background: url('source/girl.png') no-repeat center center;
    background-size: contain;
    background-color:#eaabfc;
  }
  .weather_list_area .man{
    background: url('source/man.png') no-repeat center center;
    background-size: contain;
    background-color:#b1f564;
  }
  .weather_list_area .woman{
    background: url('source/woman.png') no-repeat center center;
    background-size: contain;
    background-color:#d4cabe;
  }
  .weather_info .create_weather{
    position: absolute;
    width: 100%;
    bottom:46px;
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
