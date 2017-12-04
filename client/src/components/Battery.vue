<template>
  <v-container>
    <battery-level :height="batteryHeight"
                   :width="batteryWidth"
                   stroke-width="4"
                   stroke-color="#808080"
                   fill-color="#009688"
                   :charging="isCharging"
                   :level="status.chargeState"></battery-level>
    <div style="float: right;">
      <h4>Range: {{ status.range | mToMiles }} miles</h4>
      <h4>with ac: {{ status.rangeWithAc | mToMiles }} miles</h4>
      <h4>Charge level: {{status.chargeState | chargePercentage}}%</h4>
      <h4 v-if="isCharging">Charging</h4>
      <v-btn v-if="!isCharging && pluggedIn" @click="startCharge">Start Charging</v-btn>
      <h4 v-if="pluggedIn">Plugged In</h4>
      <h4 v-else="">Unplugged</h4>
      <h5 v-if="isCharging">Time Left:</h5>
      <table v-if="isCharging">
        <tr v-if="status.timeToFull">
          <td>Standard</td>
          <td>{{status.timeToFull | timeToCharge}}</td>
        </tr>
        <tr v-if="status.timeToFull3kW">
          <td>3kW</td>
          <td>{{status.timeToFull3kW | timeToCharge}}</td>
        </tr>
        <tr v-if="status.timeToFull6kW">
          <td>6kW</td>
          <td>{{status.timeToFull6kW | timeToCharge}}</td>
        </tr>
      </table>
    </div>
    <div v-if="updateTime">Last updated: {{updateTime | calendar}}</div>
    <div v-else-if="status.updateTime">Last updated: {{status.updateTime | calendar}}</div>
    <v-btn
        color="pink"
        dark
        small
        bottom
        right
        fab
        fixed
        @click="refresh()"
    >
      <v-icon>refresh</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'Battery',
    data () {
      return {
        status: {
          range: 0,
          rangeWithAc: 0,
          chargeLevel: '',
          chargeMode: '',
          pluginState: 'NOT_CONNECTED',
          isCharging: 'false',
          chargeStatus: '',
          capacity: '',
          chargeState: 0,
          timeToFull: moment.duration(0),
          timeToFull3kW: moment.duration(0),
          timeToFull6kW: moment.duration(0)
        },
        batteryWidth: 150,
        batteryHeight: 300,
        updateTime: ''
      }
    },
    computed: {
      pluggedIn() {
        return this.status.pluginState !== 'NOT_CONNECTED';
      },
      isCharging() {
        return this.status.isCharging === 'YES';
      }
    },
    filters: {
      timeToCharge(value) {
        if (value === null) {
          return null;
        }
        let duration = moment.duration(value);
        let minutes = duration.minutes();
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        return duration.hours() + ':' + minutes;
      },
      mToMiles(value) {
        return (value * 0.000621371).toFixed(2);
      },
      calendar(value) {
        return moment(value).calendar();
      },
      chargePercentage(value) {
        return (value / 0.12).toFixed(0);
      }
    },
    mounted() {
      this.$api.batteryLastStatus()
          .then(bs => this.status = bs);
    },
    methods: {
      startCharge() {
        this.$api.batteryCharge()
            .then(() => this.charging = true);
      },
      refresh() {
        this.$api.batteryStatus()
            .then(bs => {
              this.updateTime = bs.updateTime;
              this.status = bs.batteryStatus;
            });
      }
    }
  }
</script>

<style scoped>
</style>
