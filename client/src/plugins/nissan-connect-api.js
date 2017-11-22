import VueResource from 'vue-resource';
import {
  AcOff,
  AcOn,
  AcSchedule,
  BatteryStatusLast,
  BatteryStatusResponse,
  Calendar,
  DriveAnalysis,
  DriveAnalysisWeekSummary,
  DrivingRecord,
  DrivingRecordMonth,
  DrivingRecordYear,
  TripSummaryMonth,
  VehicleInfo
} from '@beejjacobs/nissan-connect';

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
        async status() {
          let res = await get('/battery/status');
          return new BatteryStatusResponse(res);
        },
        async lastStatus() {
          let res = await get('/battery/status/last');
          return new BatteryStatusLast(res);
        },
        async charge() {
          return await get('/battery/charge');
        }
      },
      ac: {
        async on() {
          let res = await get('/ac/on');
          return new AcOn(res);
        },
        async off() {
          let res = await get('/ac/off');
          return new AcOff(res);
        },
        async schedule() {
          let res = await get('/ac/schedule');
          return new AcSchedule(res);
        },
        async setSchedule(schedule) {
          let res = await get('/ac/schedule/', schedule);
          return new AcSchedule(res);
        },
        async cancelSchedule() {
          return await get('/ac/charge');
        }
      },
      drive: {
        analysis: {
          async today() {
            let res = await get('/drive/analysis/today');
            return new DriveAnalysis(res);
          },
          async week(date) {
            let res = await get('/drive/analysis/week/', date);
            return new DriveAnalysisWeekSummary(res);
          }
        },
        record: {
          async today() {
            let res = await get('/drive/record/today');
            return new DrivingRecord(res);
          },
          async day(day) {
            let res = await get('/drive/record/', day);
            return new DrivingRecord(res);
          },
          async availableDays(month) {
            let res = await get('/drive/record/days/', month);
            return new Calendar(res);
          },
          async month(month) {
            let res = await get('/drive/record/month/', month);
            return new DrivingRecordMonth(res);
          },
          async year(year) {
            let res = await get('/drive/record/year/', year);
            return new DrivingRecordYear(res);
          },
          async note(date, note) {
            //todo: post
          }
        },
        trip: {
          /**
           * @param month
           * @return {Promise.<GraphDataPoints>}
           */
          async month(month) {
            return await getBody('/drive/trip/month/', month);
          },
          async monthSummary(month) {
            let res = await get('/drive/trip/month/summary/', month);
            return new TripSummaryMonth(res);
          },
          /**
           * @param year
           * @return {Promise.<GraphDataPoints>}
           */
          async year(year) {
            return await getBody('/drive/trip/year/', year);
          }
        },
        distanceEconomy: {
          /**
           * @param month
           * @return {Promise.<DistanceEconomyDataPoints>}
           */
          async month(month) {
            return await getBody('/drive/distance/economy/month/', month);
          },
          /**
           * @param year
           * @return {Promise.<DistanceEconomyDataPoints>}
           */
          async year(year) {
            return await getBody('/drive/distance/economy/year/', year);
          }
        },
        distanceTime: {
          /**
           * @param month
           * @return {Promise.<DistanceTimeDataPoints>}
           */
          async month(month) {
            return await getBody('/drive/distance/time/month/', month);
          },
          /**
           * @param year
           * @return {Promise.<DistanceTimeDataPoints>}
           */
          async year(year) {
            return await getBody('/drive/distance/time/year/', year);
          }
        },
        energyUsage: {
          /**
           * @param month
           * @return {Promise.<GraphDataPoints>}
           */
          async month(month) {
            return await getBody('/drive/energy/month/', month);
          },
          /**
           * @param year
           * @return {Promise.<GraphDataPoints>}
           */
          async year(year) {
            return await getBody('/drive/energy/year/', year);
          }
        }
      },
      async vehicleInfo() {
        let res = await get('/vehicle/info');
        return new VehicleInfo(res.body.info);
      }
    };
  }
}
