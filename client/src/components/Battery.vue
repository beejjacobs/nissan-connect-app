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
      <div class="battery-info">
        <v-list subheader>
          <v-subheader>Range</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon class="accent white--text">keyboard_tab</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="headline">{{ status.range | mToMiles }} miles</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon class="accent white--text">toys</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="headline">{{ status.rangeWithAc | mToMiles }} miles</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Charge</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon class="accent white--text">battery_unknown</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="headline">{{status.chargeState | chargePercentage}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon class="white--text" :class="{accent: pluggedIn, secondary: !pluggedIn}">power</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content class="headline">
              <v-list-tile-title>{{pluggedIn ? 'Plugged In' : 'Unplugged'}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon class="accent white--text" :class="{accent: isCharging, secondary: !isCharging}">{{isCharging ? 'flash_on' : 'flash_off'}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content v-if="!isCharging && pluggedIn" >
              <v-btn color="primary" @click="startCharge">Start Charging</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list v-if="anyTimeLeft">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon class="accent white--text">schedule</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="headline">Time to Charge</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar v-if="status.hasTimeToFull">
            <v-list-tile-avatar>
              2.3kW
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="headline time">{{status.timeToFull | timeToCharge}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar v-if="status.hasTimeToFull3kW">
            <v-list-tile-avatar>
              3.3kW
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="headline time">{{status.timeToFull3kW | timeToCharge}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar v-if="status.hasTimeToFull6kW">
            <v-list-tile-avatar>
              6.6kW
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="headline time">{{status.timeToFull6kW | timeToCharge}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-card-text>
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
      },
      anyTimeLeft() {
        return this.status.hasTimeToFull || this.status.hasTimeToFull3kW || this.status.hasTimeToFull6kW;
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
        return duration.hours() + ' hours ' + minutes + ' minutes';
      },
      mToMiles(value) {
        return (value * 0.000621371).toFixed(0);
      },
      calendar(value) {
        return moment(value).calendar();
      },
      chargePercentage(value) {
        if (!value) {
          return '';
        }
        return ((value - 1) / 0.12).toFixed(0) + '-' + (value / 0.12).toFixed(0) + '%';
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
  .list__tile__title {
    height: auto;
    line-height: initial;
  }

  .battery {
    text-align: center;
  }

  @media (min-width: 580px) {
    .grid {
      display: grid;
      height: 100%;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "bat inf"
        "bat inf"
        "bat inf";
    }
    .battery {
      grid-area: bat;
    }

    .battery-info {
      grid-area: inf;
    }
  }
</style>
