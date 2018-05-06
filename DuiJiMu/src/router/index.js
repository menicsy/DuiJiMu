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
      path: '/weatherindex',
      component: WeatherIndex
    },
    {
      path: '/weatherinfo',
      component: WeatherInfo
    },
    {
      path: '/weathercreate',
      component: WeatherCreate
    }
  ]
})
