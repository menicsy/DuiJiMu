import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/errorPage/ErrorPage'
import IndexWeather from '@/components/weatherKnow/indexWeather/IndexWeather'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/weather',
      component: IndexWeather
    },
    {
      path: '/errorpage',
      component: ErrorPage
    },
    {
      path: '*',
      redirect: '/errorpage'
    }
  ]
})
