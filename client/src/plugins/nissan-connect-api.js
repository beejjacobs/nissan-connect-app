import VueResource from 'vue-resource';
import Info from './info/index';
import {
  AcOff,
  AcOn,
  AcRecord,
  AcSchedule,
  BatteryStatusLast,
  BatteryStatusResponse,
  Calendar,
  DriveAnalysis,
  DriveAnalysisWeekSummary,
  DrivingRecordDay,
  DrivingRecordMonth,
  DrivingRecordYear,
  TripSummaryMonth,
  VehicleInfo,
  CustomerInfo
} from '@beejjacobs/nissan-connect';

export default {
  install: (Vue, options) => {
    Vue.use(VueResource);
    Vue.use(Info);
    let hostPort = options.hostPort;

    function url(route, param) {
      let base = 'http://' + hostPort + route;
      if (param) {
        base += param;
      }
      return base;
    }

    async function get(route, param) {
      let res = await Vue.http.get(url(route, param));
      return res.body.info;
    }

    async function getBody(route, param) {
      let res = await Vue.http.get(url(route, param));
      return res.body;
    }

    Vue.prototype.$api = {
      /**
       * @return {Promise.<BatteryStatusResponse>}
       */
      async batteryStatus() {
        let res = await get('/battery/status');
        return new BatteryStatusResponse(res);
      },
      /**
       * @return {Promise.<BatteryStatusLast>}
       */
      async batteryLastStatus() {
        let res = await get('/battery/status/last');
        return new BatteryStatusLast(res);
      },
      /**
       * @return {Promise.<*>}
       */
      async batteryCharge() {
        return await get('/battery/charge');
      },
      /**
       * @return {Promise.<AcOn>}
       */
      async acOn() {
        let res = await get('/ac/on');
        return new AcOn(res);
      },
      /**
       * @return {Promise.<AcOff>}
       */
      async acOff() {
        let res = await get('/ac/off');
        return new AcOff(res);
      },
      /**
       * @return {Promise.<AcSchedule>}
       */
      async acSchedule() {
        let res = await get('/ac/schedule');
        return new AcSchedule(res);
      },
      /**
       * @param schedule
       * @return {Promise.<AcSchedule>}
       */
      async acSetSchedule(schedule) {
        let res = await get('/ac/schedule/', schedule);
        return new AcSchedule(res);
      },
      /**
       * @return {Promise.<*>}
       */
      async acCancelSchedule() {
        return await get('/ac/schedule/cancel');
      },
      /**
       * @return {Promise.<AcRecord>}
       */
      async acRecord() {
        let res = await get('/ac/record');
        return new AcRecord(res);
      },
      /**
       * @return {Promise.<DriveAnalysis>}
       */
      async driveAnalysisToday() {
        let res = await get('/drive/analysis/today');
        return new DriveAnalysis(res);
      },
      /**
       * @param date
       * @return {Promise.<DriveAnalysisWeekSummary>}
       */
      async driveAnalysisWeek(date) {
        let res = await get('/drive/analysis/week/', date);
        return new DriveAnalysisWeekSummary(res);
      },
      /**
       * @return {Promise.<DrivingRecordDay>}
       */
      async driveRecordToday() {
        let res = await get('/drive/record/today');
        return new DrivingRecordDay(res);
      },
      /**
       * @param day
       * @return {Promise.<DrivingRecordDay>}
       */
      async driveRecordDay(day) {
        let res = await get('/drive/record/', day);
        return new DrivingRecordDay(res);
      },
      /**
       * @param month
       * @return {Promise.<Calendar>}
       */
      async driveRecordAvailableDays(month) {
        let res = await get('/drive/record/days/', month);
        return new Calendar(res);
      },
      /**
       * @param month
       * @return {Promise.<DrivingRecordMonth>}
       */
      async driveRecordMonth(month) {
        let res = await get('/drive/record/month/', month);
        return new DrivingRecordMonth(res);
      },
      /**
       * @param year
       * @return {Promise.<DrivingRecordYear>}
       */
      async driveRecordYear(year) {
        let res = await get('/drive/record/year/', year);
        return new DrivingRecordYear(res);
      },
      /**
       * @param date
       * @param note
       * @return {Promise.<*>}
       */
      async driveRecordNote(date, note) {
        //todo: post
      },
      /**
       * @param month
       * @return {Promise.<GraphDataPoints>}
       */
      async tripMonth(month) {
        return await getBody('/drive/trip/month/', month);
      },
      /**
       * @param month
       * @return {Promise.<TripSummaryMonth>}
       */
      async tripMonthSummary(month) {
        let res = await get('/drive/trip/summary/', month);
        return new TripSummaryMonth(res);
      },
      /**
       * @param year
       * @return {Promise.<GraphDataPoints>}
       */
      async tripYear(year) {
        return await getBody('/drive/trip/year/', year);
      },
      /**
       * @param month
       * @return {Promise.<DistanceEconomyDataPoints>}
       */
      async distanceEconomyMonth(month) {
        return await getBody('/drive/distance/economy/month/', month);
      },
      /**
       * @param year
       * @return {Promise.<DistanceEconomyDataPoints>}
       */
      async distanceEconomyYear(year) {
        return await getBody('/drive/distance/economy/year/', year);
      },
      /**
       * @param month
       * @return {Promise.<DistanceTimeDataPoints>}
       */
      async distanceTimeMonth(month) {
        return await getBody('/drive/distance/time/month/', month);
      },
      /**
       * @param year
       * @return {Promise.<DistanceTimeDataPoints>}
       */
      async distanceTimeYear(year) {
        return await getBody('/drive/distance/time/year/', year);
      },
      /**
       * @param month
       * @return {Promise.<GraphDataPoints>}
       */
      async energyUsageMonth(month) {
        return await getBody('/drive/energy/month/', month);
      },
      /**
       * @param year
       * @return {Promise.<GraphDataPoints>}
       */
      async energyUsageYear(year) {
        return await getBody('/drive/energy/year/', year);
      },
      /**
       * @return {Promise.<VehicleInfo>}
       */
      async vehicleInfo() {
        let res = await get('/vehicle/info');
        return new VehicleInfo({vehicleInfo: res});
      },
      /**
       * @return {Promise.<CustomerInfo>}
       */
      async customerInfo() {
        let res = await get('/customer-info');
        return new CustomerInfo(res);
      }
    };
  }
}
