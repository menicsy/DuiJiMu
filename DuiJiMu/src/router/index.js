import Vue from 'vue'
import Router from 'vue-router'
import WeatherIndex from '@/components/weatherKnow/weatherIndex/WeatherIndex'
import WeatherInfo from '@/components/weatherKnow/weatherInfo/WeatherInfo'
import WeatherCreate from '@/components/weatherKnow/weatherCreate/WeatherCreate'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/duijimu/weather/weatherindex',
      component: WeatherIndex
    },
    {
      path: '/duijimu/weather/weatherinfo',
      component: WeatherInfo
    },
    {
      path: '/duijimu/weather/weathercreate',
      component: WeatherCreate
    }
  ]
})
