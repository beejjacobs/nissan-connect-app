import VueResource from 'vue-resource';
import {AcOn, AcOff, AcSchedule, BatteryStatusResponse, TripSummaryMonth, BatteryStatusLast, Calendar, DrivingRecord, DrivingRecordMonth, DrivingRecordYear, DriveAnalysis, DriveAnalysisWeekSummary, VehicleInfo} from '@beejjacobs/nissan-connect';

export default {
  install: (Vue, options) => {
    Vue.use(VueResource);
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
      battery: {
        status: async function() {
          let res = await get('/battery/status');
          return new BatteryStatusResponse(res);
        },
        lastStatus: async function() {
          let res = await get('/battery/status/last');
          return new BatteryStatusLast(res);
        },
        charge: async function() {
          return await get('/battery/charge');
        }
      },
      ac: {
        on: async function() {
          let res = await get('/ac/on');
          return new AcOn(res);
        },
        off: async function() {
          let res = await get('/ac/off');
          return new AcOff(res);
        },
        schedule: async function() {
          let res = await get('/ac/schedule');
          return new AcSchedule(res);
        },
        setSchedule: async function(schedule) {
          let res = await get('/ac/schedule/', schedule);
          return new AcSchedule(res);
        },
        cancelSchedule: async function() {
          return await get('/ac/charge');
        }
      },
      drive: {
        analysis: {
          today: async function() {
            let res = await get('/drive/analysis/today');
            return new DriveAnalysis(res);
          },
          week: async function(date) {
            let res = await get('/drive/analysis/week/', date);
            return new DriveAnalysisWeekSummary(res);
          }
        },
        record: {
          today: async function() {
            let res = await get('/drive/record/today');
            return new DrivingRecord(res);
          },
          day: async function(day) {
            let res = await get('/drive/record/', day);
            return new DrivingRecord(res);
          },
          availableDays: async function(month) {
            let res = await get('/drive/record/days/', month);
            return new Calendar(res);
          },
          month: async function(month) {
            let res = await get('/drive/record/month/', month);
            return new DrivingRecordMonth(res);
          },
          year: async function(year) {
            let res = await get('/drive/record/year/', year);
            return new DrivingRecordYear(res);
          },
          note: async function(date, note) {
            //todo: post
          }
        },
        trip: {
          /**
           * @param month
           * @return {Promise.<GraphDataPoints>}
           */
          month: async function(month) {
            return await getBody('/drive/trip/month/', month);
          },
          monthSummary: async function(month) {
            let res = await get('/drive/trip/month/summary/', month);
            return new TripSummaryMonth(res);
          },
          /**
           * @param year
           * @return {Promise.<GraphDataPoints>}
           */
          year: async function(year) {
            return await getBody('/drive/trip/year/', year);
          }
        },
        distanceEconomy: {
          /**
           * @param month
           * @return {Promise.<DistanceEconomyDataPoints>}
           */
          month: async function(month) {
            return await getBody('/drive/distance/economy/month/', month);
          },
          /**
           * @param year
           * @return {Promise.<DistanceEconomyDataPoints>}
           */
          year: async function(year) {
            return await getBody('/drive/distance/economy/year/', year);
          }
        },
        distanceTime: {
          /**
           * @param month
           * @return {Promise.<DistanceTimeDataPoints>}
           */
          month: async function(month) {
            return await getBody('/drive/distance/time/month/', month);
          },
          /**
           * @param year
           * @return {Promise.<DistanceTimeDataPoints>}
           */
          year: async function(year) {
            return await getBody('/drive/distance/time/year/', year);
          }
        },
        energyUsage: {
          /**
           * @param month
           * @return {Promise.<GraphDataPoints>}
           */
          month: async function(month) {
            return await getBody('/drive/energy/month/', month);
          },
          /**
           * @param year
           * @return {Promise.<GraphDataPoints>}
           */
          year: async function(year) {
            return await getBody('/drive/energy/year/', year);
          }
        }
      },
      vehicleInfo: async function() {
        let res = await get('/vehicle/info');
        return new VehicleInfo(res.body.info);
      }
    };
  }
}
