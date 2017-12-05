<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-btn
          color="accent"
          dark
          fab
          right
          @click="refresh()"
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="grid headline">
      <div class="battery">
        <battery-capacity
            :height="266"
            :width="20"
            stroke-width="2"
            stroke-color="#DDDDDD"
            fill-color="#246899"
            :level="status.capacity"
        ></battery-capacity>
        <battery-level
            :height="batteryHeight"
            :width="batteryWidth"
            stroke-width="4"
            stroke-color="#4c4c4c"
            fill-color="#246899"
            :charging="isCharging"
            :level="status.chargeState"
        ></battery-level>
        <div class="body-1">Updated: {{updateTime ? updateTime : status.updateTime | calendar}}</div>
      </div>
      <div class="info-block range">
        <v-btn color="accent" dark icon><v-icon>keyboard_tab</v-icon></v-btn>
        {{ status.range | mToMiles }} miles
      </div>
      <div class="info-block range-ac">
        <v-btn color="accent" dark icon><v-icon>toys</v-icon></v-btn>
        {{ status.rangeWithAc | mToMiles }} miles
      </div>
      <div class="info-block charge">
        <v-btn color="accent" dark icon><v-icon>battery_unknown</v-icon></v-btn>
        {{status.chargeState | chargePercentage}}%
      </div>
      <div class="info-block charging">
        <v-btn :color="isCharging ? 'accent' : 'secondary'" dark icon><v-icon>{{isCharging ? 'flash_on' : 'flash_off'}}</v-icon></v-btn>
      </div>
      <div class="info-block plugged-in">
        <v-btn :color="pluggedIn ? 'accent' : 'secondary'" dark icon><v-icon>power</v-icon></v-btn>
        {{pluggedIn ? 'Plugged In' : 'Unplugged'}}
      </div>
      <div class="time-left">
        <v-btn color="accent" dark icon><v-icon>schedule</v-icon></v-btn>
        <table>
          <tr v-if="status.hasTimeToFull">
            <td>2.3kW</td>
            <td>{{status.timeToFull | timeToCharge}}</td>
          </tr>
          <tr v-if="status.hasTimeToFull3kW">
            <td>3.3kW</td>
            <td>{{status.timeToFull3kW | timeToCharge}}</td>
          </tr>
          <tr v-if="status.hasTimeToFull6kW">
            <td>6.6kW</td>
            <td>{{status.timeToFull6kW | timeToCharge}}</td>
          </tr>
        </table>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" v-if="!isCharging && pluggedIn" @click="startCharge">Start Charging</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import moment from 'moment';
  import BatteryCapacity from '../plugins/info/common/BatteryCapacity';

  export default {
    components: {BatteryCapacity},
    name: 'Battery',
    data() {
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
        return this.status.pluginState === 'QC_CONNECTED' ||
            this.status.pluginState === 'CONNECTED';
      },
      isCharging() {
        return this.status.chargeStatus === 'NORMAL_CHARGING' ||
            this.status.chargeStatus === 'RAPIDLY_CHARGING';
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
  table td {
    padding: 5px;
  }
  table td:last-child {
    text-align: right;
  }
  .grid {
    display: grid;
    height: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
        "bat rag ac"
        "bat cha chg"
        "bat plg tim";
  }
  .battery {
    grid-area: bat;
  }

  .info-block {

  }

  .range {
    grid-area: rag;
  }
  .range-ac {
    grid-area: ac;
  }
  .charge {
    grid-area: cha;
  }
  .charging {
    grid-area: chg;
  }
  .plugged-in {
    grid-area: plg;
  }
  .time-left {
    grid-area: tim;
  }
</style>
