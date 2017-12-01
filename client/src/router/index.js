import Vue from 'vue'
import Router from 'vue-router'
import Ac from '@/components/Ac'
import Battery from '@/components/Battery'
import History from '@/components/History'
import Info from '@/components/Info'
import Test from '@/components/Test'

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
    },
    {
      path: '/info',
      name: 'Info',
      component: Info,
      meta: {title: 'Info'}
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {title: 'Test'}
    }
  ]
})
