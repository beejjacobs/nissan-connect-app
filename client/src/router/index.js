import Vue from 'vue'
import Router from 'vue-router'
import Ac from '@/components/Ac'
import Battery from '@/components/Battery'
import History from '@/components/History'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Battery',
      component: Battery,
      meta: {title: 'Battery'}
    },
    {
      path: '/ac',
      name: 'Ac',
      component: Ac,
      meta: {title: 'AC'}
    },
    {
      path: '/history',
      name: 'History',
      component: History,
      meta: {title: 'History'}
    }
  ]
})
