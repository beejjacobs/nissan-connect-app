import CustomerInfo from './CustomerInfo.vue';
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

import DatePicker from './common/DatePicker.vue';
import MonthPicker from './common/MonthPicker.vue';
import YearPicker from './common/YearPicker.vue';
import BarGraph from './common/BarGraph.vue';
import BatteryLevel from './common/BatteryLevel.vue';

import moment from 'moment';

export default {
  install: Vue => {
    const components = [
      BarGraph,
      BatteryLevel,
      CustomerInfo,
      DatePicker,
      DistanceEconomyMonth,
      DistanceEconomyYear,
      DistanceTimeMonth,
      DistanceTimeYear,
      DriveAnalysis,
      DriveAnalysisWeek,
      DriveRecordDay,
      DriveRecordMonth,
      DriveRecordYear,
      EnergyUsageMonth,
      EnergyUsageYear,
      MonthPicker,
      TripMonth,
      TripMonthSummary,
      TripYear,
      VehicleInfo,
      YearPicker
    ];
    components.forEach(component => {
      Vue.component(component.name, component);
    });

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
    Vue.filter('whTokWh', function (value) {
      value = isNaN(value) ? 0 : value;
      return value / 1000;
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
    Vue.filter('oneDp', function (value) {
      if (!value) {
        return value;
      }
      return value.toFixed(1);
    });
    Vue.filter('twoDp', function (value) {
      if (!value) {
        return value;
      }
      return value.toFixed(2);
    });
  }
}
