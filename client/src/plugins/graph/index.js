import BatteryLevel from './BatteryLevel.vue';

export default {
  install: Vue => {
    Vue.component('battery-level', BatteryLevel);
  }
}
