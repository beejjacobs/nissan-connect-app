import VueResource from 'vue-resource';
import {DriveAnalysis, DriveAnalysisWeekSummary, VehicleInfo} from '@beejjacobs/nissan-connect';

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

    function get(route, param) {
      return Vue.http.get(url(route, param));
    }

    Vue.prototype.$api = {
      battery: {
        status: async function() {
          return get('/battery/status');
        },
        lastStatus: async function() {
          return get('/battery/status/last');

        },
        charge: async function() {
          return get('/battery/charge');
        }
      },
      ac: {
        on: async function() {
          let res = await get('/ac/on');
          return res;
        },
        off: async function() {
          let res = await get('/ac/off');
          return res;
        },
        schedule: async function() {
          let res = await get('/ac/schedule');
          return res;
        },
        setSchedule: async function(schedule) {
          let res = await get('/ac/schedule/', schedule);
          return res;
        },
        cancelSchedule: async function() {
          let res = await get('/ac/charge');
          return res;
        }
      },
      drive: {
        analysis: {
          today: async function() {
            let res = await get('/drive/analysis/today');
            return res;
          },
          week: async function(date) {
            let res = await get('/drive/analysis/week/', date);
            return new DriveAnalysisWeekSummary(res.body.info);
          }
        },
        record: {
          today: async function() {
            let res = await get('/drive/record/today');
            return res;
          },
          day: async function(day) {
            let res = await get('/drive/record/', day);
            return res;
          },
          availableDays: async function(month) {
            let res = await get('/drive/record/days/', month);
            return res;
          },
          month: async function(month) {
            let res = await get('/drive/record/month/', month);
            return res;
          },
          year: async function(year) {
            let res = await get('/drive/record/year/', year);
            return res;
          },
          note: async function(date, note) {
            //todo: post
          }
        },
        trip: {
          month: async function(month) {
            let res = await get('/drive/trip/month/', month);
            return res;
          },
          monthSummary: async function(month) {
            let res = await get('/drive/trip/month/summary/', month);
            return res;
          },
          year: async function(year) {
            let res = await get('/drive/trip/year/', year);
            return res;
          }
        },
        distanceEconomy: {
          month: async function(month) {
            let res = await get('/drive/distance/economy/month/', month);
            return res;
          },
          year: async function(year) {
            let res = await get('/drive/distance/economy/year/', year);
            return res;
          }
        },
        distanceTime: {
          month: async function(month) {
            let res = await get('/drive/distance/time/month/', month);
            return res;
          },
          year: async function(year) {
            let res = await get('/drive/distance/time/year/', year);
            return res;
          }
        },
        energyUsage: {
          month: async function(month) {
            let res = await get('/drive/energy/month/', month);
            return res;
          },
          year: async function(year) {
            let res = await get('/drive/energy/year/', year);
            return res;
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
