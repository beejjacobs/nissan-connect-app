<template>
  <v-card>
    <v-card-title>
      <div class="headline">Year Summary for {{day.year}}</div>
      <v-spacer></v-spacer>
     <year-picker v-if="picker" @selected="loadData"></year-picker>
    </v-card-title>
    <v-card-text>
      <table class="subheading">
        <tr>
          <td>Distance:</td>
          <td>{{day.travelDistance | travelDistance}} miles</td>
        </tr>
        <tr>
          <td>Average Economy:</td>
          <td>{{day.averageEconomy}} miles/kWh ({{day.averageEconomy | economyWhPerMile}} Wh/mile)</td>
        </tr>
        <tr>
          <td>Energy Usage:</td>
          <td>{{day.energyUsage | energyUsage}}</td>
        </tr>
        <tr>
          <td>Travel Time:</td>
          <td>{{day.travelTime | travelTime}}</td>
        </tr>
        <tr>
          <td>CO2 Reduction:</td>
          <td>{{day.co2Saving}} kg</td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'drive-record-year',
    props: {
      picker: {
        type: Boolean,
        default: true
      },
      year: {
        type: String
      }
    },
    data() {
      return {
        day: {
          year: '',
          travelDistance: 0,
          averageEconomy: 0,
          energyUsage: 0,
          travelTime: 0,
          co2Saving: 0
        }
      }
    },
    watch: {
      year(newYear) {
        if (!this.picker && newYear) {
          this.loadData(newYear);
        }
      }
    },
    methods: {
      loadData: function (year) {
        console.log('load data', year);
        this.$api.driveRecordYear(year)
            .then(dr => this.day = dr);
      }
    }
  }
</script>

<style scoped>
  table td {
    padding: 5px;
  }
</style>
