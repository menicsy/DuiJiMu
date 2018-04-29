import Vue from 'vue'
import Router from 'vue-router'
import IndexWeather from '@/components/weatherKnow/indexWeather/IndexWeather'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/indexweather',
      component: IndexWeather
    }
  ]
})
