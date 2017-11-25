import DriveRecordDay from './DriveRecordDay.vue';
import DriveRecordMonth from './DriveRecordMonth.vue';

import moment from 'moment';

export default {
  install: Vue => {
    Vue.component('drive-record-day', DriveRecordDay);
    Vue.component('drive-record-month', DriveRecordMonth);
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
    Vue.filter('economyWattsPerMile', function(value) {
      let number = Math.round(1000 / value);
      return isFinite(number) ? number : 0;
    });
    Vue.filter('monthYear', function (value) {
      return moment(value).format('MMMM YYYY');
    });
    Vue.filter('ddMMYYYY', function (value) {
      return moment(value).format('DD/MM/YYYY');
    });
    Vue.filter('YYYY-MM-DD', function (value) {
      return moment(value).format('YYYY-MM-DD');
    });
    Vue.filter('calendar', function (value) {
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
