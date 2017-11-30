<template>
  <v-card>
    <v-card-title>
      <div class="headline">Year Summary for {{day.year}}</div>
      <v-spacer></v-spacer>
      <v-menu
          lazy
          transition="scale-transition"
          full-width
          min-width="100px"
      >
        <v-btn dark color="teal" fab right slot="activator">
          <v-icon dark>today</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="year in availableYears" :key="year" @click="loadData(year)">
            <v-list-tile-title>{{year}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
    name: 'DriveRecordYear',
    data() {
      return {
        selectDate: null,
        availableYears: [],
        day: {
          year: '2017',
          travelDistance: 2.9,
          averageEconomy: 3.9,
          energyUsage: 0.7,
          travelTime: 0.1,
          co2Saving: 1
        }
      }
    },
    mounted() {
      for (let i = moment().year(); i >= 2011; i--) {
        this.availableYears.push(i);
      }
    },
    methods: {
      loadData: function (year) {
        console.log('load data', year);
        if (!year) {
          return;
        }
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
