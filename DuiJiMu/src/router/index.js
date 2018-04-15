import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/errorPage/ErrorPage'
import IndexWeather from '@/components/weatherKnow/indexWeather/IndexWeather'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/weather',
      name: 'IndexWeather',
      component: IndexWeather
    },
    {
      path: '*',
      name: 'ErrorPage',
      component: ErrorPage
    }
  ]
})
