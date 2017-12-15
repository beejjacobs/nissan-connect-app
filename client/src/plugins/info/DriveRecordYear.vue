<template>
  <v-card>
    <v-card-title>
      <div class="headline">Year Summary <span v-if="!hideDate">for {{day.year}}</span></div>
      <v-spacer></v-spacer>
     <year-picker v-if="picker" @selected="loadData" :loading="loading"></year-picker>
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
  import HasYearPicker from './mixins/HasYearPicker';
  export default {
    name: 'drive-record-year',
    mixins: [HasYearPicker],
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
    methods: {
      loadData: function (year) {
        this.loading = true;
        console.log('load data', year);
        this.$api.driveRecordYear(year)
            .then(dr => this.day = dr)
            .catch(error => console.error('driveRecordYear', error))
            .finally(() => this.loading = false);
      }
    }
  }
</script>

<style scoped>
  table td {
    padding: 5px;
  }
</style>
