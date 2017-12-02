<template>
  <v-card>
    <v-card-title>
      <div class="headline">Trip Summary for {{selectedDate | monthYear}}</div>
      <v-spacer></v-spacer>
      <month-picker @selected="loadData"></month-picker>
    </v-card-title>
    <v-card-text>
      <table class="subheading">
        <tr>
          <td>Number of Trips:</td>
          <td>{{summary.total.numberOfTrips}}</td>
        </tr>
        <tr>
          <td>Distance:</td>
          <td>{{summary.total.travelDistance | travelDistance}} miles</td>
        </tr>
        <tr>
          <td>Average Economy:</td>
          <td>{{summary.total.averageEconomy | twoDp}} miles/kWh ({{summary.total.averageEconomy | economyWhPerMile}} Wh/mile)</td>
        </tr>
        <tr>
          <td>Energy Usage:</td>
          <td>{{summary.total.accelerationEnergy | energyUsage}}</td>
        </tr>
        <tr>
          <td>Regen:</td>
          <td>{{summary.total.regen | energyUsage}}</td>
        </tr>
        <tr>
          <td>Net Usage:</td>
          <td>{{summary.total.energyUsage | energyUsage}}</td>
        </tr>
        <tr>
          <td>CO2 Reduction:</td>
          <td>{{summary.total.co2Saving}} kg</td>
        </tr>
      </table>
      <table class="subheading">
        <thead>
        <tr>
          <td>Date</td>
          <td>Number</td>
          <td>Distance</td>
          <td>Economy</td>
          <td>Energy</td>
          <td>Regen</td>
          <td>Net Energy</td>
        </tr>
        </thead>
        <template v-for="day in summary.days">
          <tr v-for="trip in day.trips">
            <td>{{ trip.number === 1 ? day.date : ''  | ddMMYYYY}}</td>
            <td>{{trip.number}}</td>
            <td>{{trip.travelDistance | travelDistance}}</td>
            <td>{{trip.averageEconomy}} miles/kWh ({{trip.averageEconomy | economyWhPerMile}} Wh/mile)</td>
            <td>{{trip.accelerationEnergy | oneDp}} Wh</td>
            <td>{{trip.regen | oneDp}} Wh</td>
            <td>{{trip.energyUsage | oneDp}} Wh</td>
          </tr>
        </template>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'TripMonthSummary',
    data() {
      return {
        selectedDate: null,
        summary: {
          total: {}
        }
      }
    },
    methods: {
      loadData(month) {
        this.$api.tripMonthSummary(month)
            .then(tsm => {
              this.selectedDate = month;
              this.summary = tsm
            });
      }
    }
  }
</script>

<style scoped>
  table thead td {
    text-align: left;
    font-weight: bold;
  }
  table td {
    padding: 5px;
    text-align: right;
  }
</style>
