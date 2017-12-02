import DriveRecordDay from './DriveRecordDay.vue';
import DriveRecordMonth from './DriveRecordMonth.vue';
import DriveRecordYear from './DriveRecordYear.vue';
import VehicleInfo from './VehicleInfo.vue';
import DriveAnalysis from './DriveAnalysis.vue';
import DriveAnalysisWeek from './DriveAnalysisWeek.vue';
import TripMonth from './TripMonth.vue';
import TripYear from './TripYear.vue';
import EnergyUsageMonth from './EnergyUsageMonth.vue';
import EnergyUsageYear from './EnergyUsageYear.vue';
import DistanceEconomyMonth from './DistanceEconomyMonth.vue';
import DistanceEconomyYear from './DistanceEconomyYear.vue';
import DistanceTimeMonth from './DistanceTimeMonth.vue';
import DistanceTimeYear from './DistanceTimeYear.vue';
import TripMonthSummary from './TripMonthSummary.vue';

import moment from 'moment';

export default {
  install: Vue => {
    Vue.component('drive-record-day', DriveRecordDay);
    Vue.component('drive-record-month', DriveRecordMonth);
    Vue.component('drive-record-year', DriveRecordYear);
    Vue.component('vehicle-info', VehicleInfo);
    Vue.component('drive-analysis', DriveAnalysis);
    Vue.component('drive-analysis-week', DriveAnalysisWeek);
    Vue.component('trip-month', TripMonth);
    Vue.component('trip-year', TripYear);
    Vue.component('energy-usage-month', EnergyUsageMonth);
    Vue.component('energy-usage-year', EnergyUsageYear);
    Vue.component('distance-economy-month', DistanceEconomyMonth);
    Vue.component('distance-economy-year', DistanceEconomyYear);
    Vue.component('distance-time-month', DistanceTimeMonth);
    Vue.component('distance-time-year', DistanceTimeYear);
    Vue.component('trip-month-summary', TripMonthSummary);

    Vue.filter('travelDistance', function (value) {
      return (value * 0.000621371).toFixed(2);
    });
    Vue.filter('energyUsage', function (value) {
      value = isNaN(value) ? 0 : value;
      if (value < 0.5) {
        return (value * 1000).toFixed(2) + ' Wh';
      }
      return value.toFixed(2) + ' kWh';
    });
    Vue.filter('travelTime', function (value) {
      value = isNaN(value) ? 0 : value;
      let duration = moment.duration({hours: value});
      if (value < 1) {
        return duration.asMinutes().toFixed(0) + ' minutes';
      }
      return duration.asHours().toFixed(0) + ' hours ' + duration.minutes() + ' minutes';
    });
    Vue.filter('economyWhPerMile', function(value) {
      let number = Math.round(1000 / value);
      return isFinite(number) ? number : 0;
    });
    Vue.filter('monthYear', function (value) {
      let date = moment(value);
      if (!date.isValid()) {
        return '';
      }
      return date.format('MMMM YYYY');
    });
    Vue.filter('ddMMYYYY', function (value) {
      let date = moment(value);
      if (!date.isValid()) {
        return '';
      }
      return moment(value).format('DD/MM/YYYY');
    });
    Vue.filter('YYYY-MM-DD', function (value) {
      let date = moment(value);
      if (!date.isValid()) {
        return '';
      }
      return moment(value).format('YYYY-MM-DD');
    });
    Vue.filter('calendar', function (value) {
      let date = moment(value);
      if (!date.isValid()) {
        return '';
      }
      return moment(value).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
      });
    });
  }
}
