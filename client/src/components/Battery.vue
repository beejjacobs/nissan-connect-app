<template>
  <v-container>
    <battery-level :height="batteryHeight"
                   :width="batteryWidth"
                   stroke-width="4"
                   stroke-color="#808080"
                   fill-color="#009688"
                   :charging="charging"
                   :level="battery.level"></battery-level>
    <div style="float: right;">
      <h4>Range: {{ battery.range.withoutAc }} miles</h4>
      <h4>with ac: {{ battery.range.withAc }} miles</h4>
      <h4>Charge level: {{battery.level}}/12</h4>
      <h4 v-if="charging">Charging</h4>
      <h4 v-if="pluggedIn">Plugged In</h4>
      <h4 v-else="">Unplugged</h4>
      <h5>Time Left:</h5>
      <table>
        <tr v-if="timeToCharge.standard">
          <td>Standard</td>
          <td>{{timeToCharge.standard}}</td>
        </tr>
        <tr v-if="timeToCharge.kw3">
          <td>3kW</td>
          <td>{{timeToCharge.kw3}}</td>
        </tr>
        <tr v-if="timeToCharge.kw6">
          <td>6kW</td>
          <td>{{timeToCharge.kw6}}</td>
        </tr>
      </table>
    </div>
    <div>Last updated: {{updatedTime}}</div>
    <v-slider v-model="battery.level" thumb-label step="1" min="0" max="12"></v-slider>
    <v-checkbox v-model="charging" light></v-checkbox>
    <v-checkbox v-model="pluggedIn" light></v-checkbox>
    <v-btn
        color="pink"
        dark
        small
        bottom
        right
        fab
        fixed
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
        battery: {
          level: 0,
          updated: '2017-11-10 13:30',
          range: {
            withAc: 65,
            withoutAc: 70
          }
        },
        timeToFull: {
          standard: {hours: 9},
          kw3: {hours: 7, minutes: 30},
          kw6: null
        },
        charging: true,
        pluggedIn: true,
        batteryWidth: 150,
        batteryHeight: 300
      }
    },
    computed: {
      updatedTime: function () {
        return moment(this.battery.updated).calendar();
      },
      timeToCharge: function () {
        function format(time) {
          console.log(time);
          if (time === null) {
            return null;
          }
          let duration = moment.duration(time);
          let minutes = duration.minutes();
          if (minutes < 10) {
            minutes = '0' + minutes;
          }
          return duration.hours() + ':' + minutes;
        }
        return {
          standard: format(this.timeToFull.standard),
          kw3: format(this.timeToFull.kw3),
          kw6: format(this.timeToFull.kw6)
        };
      }
    }
  }
</script>

<style scoped>
</style>
