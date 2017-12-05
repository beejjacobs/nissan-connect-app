import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    vehicleInfo: {}
  },
  mutations: {
    set (state, vehicleInfo) {
      state.vehicleInfo = vehicleInfo;
    }
  }
});
