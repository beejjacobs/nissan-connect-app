import Vue from 'vue'
import Router from 'vue-router'
import Ac from '../components/Ac'
import Battery from '../components/Battery'
import History from '../components/History'
import Info from '../components/Info'
import Test from '../components/Test'

import DistanceEconomyMonth from '../plugins/info/DistanceEconomyMonth'
import DistanceEconomyYear from '../plugins/info/DistanceEconomyYear'
import DistanceTimeMonth from '../plugins/info/DistanceTimeMonth'
import DistanceTimeYear from '../plugins/info/DistanceTimeYear'
import DriveAnalysis from '../plugins/info/DriveAnalysis'
import DriveAnalysisWeek from '../plugins/info/DriveAnalysisWeek'
import DriveRecordDay from '../plugins/info/DriveRecordDay'
import DriveRecordMonth from '../plugins/info/DriveRecordMonth'
import DriveRecordYear from '../plugins/info/DriveRecordYear'
import EnergyUsageMonth from '../plugins/info/EnergyUsageMonth'
import EnergyUsageYear from '../plugins/info/EnergyUsageYear'
import TripMonth from '../plugins/info/TripMonth'
import TripMonthSummary from '../plugins/info/TripMonthSummary'
import TripYear from '../plugins/info/TripYear'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/battery'
    },
    {
      path: '/battery',
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
    },
    {
      path: '/distance-economy/month',
      name: 'DistanceEconomyMonth',
      component: DistanceEconomyMonth,
      meta: {title: 'Distance & Economy'}
    },
    {
      path: '/distance-economy/year',
      name: 'DistanceEconomyYear',
      component: DistanceEconomyYear,
      meta: {title: 'Distance & Economy'}
    },
    {
      path: '/distance-time/month',
      name: 'DistanceTimeMonth',
      component: DistanceTimeMonth,
      meta: {title: 'Distance & Time'}
    },
    {
      path: '/distance-time/year',
      name: 'DistanceTimeYear',
      component: DistanceTimeYear,
      meta: {title: 'Distance & Time'}
    },
    {
      path: '/drive-analysis',
      name: 'DriveAnalysis',
      component: DriveAnalysis,
      meta: {title: 'Drive Analysis'}
    },
    {
      path: '/drive-analysis/week',
      name: 'DriveAnalysisWeek',
      component: DriveAnalysisWeek,
      meta: {title: 'Drive Analysis'}
    },
    {
      path: '/drive-record/day',
      name: 'DriveRecordDay',
      component: DriveRecordDay,
      meta: {title: 'Drive Record'}
    },
    {
      path: '/drive-record/month',
      name: 'DriveRecordMonth',
      component: DriveRecordMonth,
      meta: {title: 'Drive Record'}
    },
    {
      path: '/drive-record/year',
      name: 'DriveRecordYear',
      component: DriveRecordYear,
      meta: {title: 'Drive Record'}
    },
    {
      path: '/energy-usage/month',
      name: 'EnergyUsageMonth',
      component: EnergyUsageMonth,
      meta: {title: 'Energy Usage'}
    },
    {
      path: '/energy-usage/year',
      name: 'EnergyUsageYear',
      component: EnergyUsageYear,
      meta: {title: 'Energy Usage'}
    },
    {
      path: '/trip/month',
      name: 'TripMonth',
      component: TripMonth,
      meta: {title: 'Trips'}
    },
    {
      path: '/trip/month/summary',
      name: 'TripMonthSummary',
      component: TripMonthSummary,
      meta: {title: 'Summary'}
    },
    {
      path: '/trip/year',
      name: 'TripYear',
      component: TripYear,
      meta: {title: 'Trips'}
    }
  ]
})
