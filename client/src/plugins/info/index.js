import DriveRecordDay from './DriveRecordDay.vue';
import DriveRecordMonth from './DriveRecordMonth.vue';

export default {
  install: Vue => {
    Vue.component('drive-record-day', DriveRecordDay);
    Vue.component('drive-record-month', DriveRecordMonth);
  }
}
