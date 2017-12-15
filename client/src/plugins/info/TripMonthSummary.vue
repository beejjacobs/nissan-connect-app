<template>
  <v-card>
    <v-card-title>
      <div class="headline">Trip Summary <span v-if="!hideDate">for {{selectedDate | monthYear}}</span></div>
      <v-spacer></v-spacer>
      <month-picker v-if="picker" @selected="loadData" :loading="loading"></month-picker>
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
          <td>{{summary.total.averageEconomy | twoDp}} miles/kWh<br>
            ({{summary.total.averageEconomy | economyWhPerMile}} Wh/mile)<br>
            ({{cost | twoDp}} p/mile)</td>
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
          <td>{{summary.total.energyUsage | energyUsage}}<br>
            £{{summary.total.energyUsage * 0.15 | twoDp}}
          </td>
        </tr>
        <tr>
          <td>CO2 Reduction:</td>
          <td>{{summary.total.co2Saving}} kg</td>
        </tr>
        <tr v-if="longest">
          <td>Longest Trip:</td>
          <td>
            {{longest.dateTime | ddMMYYYY}}<br>
            {{longest.travelDistance | travelDistance}} miles<br>
            {{longest.averageEconomy}} miles/kWh<br>
            ({{longest.averageEconomy | economyWhPerMile}} Wh/mile)<br>
            {{longest.energyUsage | whTokWh | energyUsage}}
          </td>
        </tr>
        <tr v-if="economic">
          <td>Most Economic Trip:</td>
          <td>
            {{economic.dateTime | ddMMYYYY}}<br>
            {{economic.travelDistance | travelDistance}} miles<br>
            {{economic.averageEconomy}} miles/kWh<br>
            ({{economic.averageEconomy | economyWhPerMile}} Wh/mile)<br>
            {{economic.energyUsage | whTokWh | energyUsage}}
          </td>
        </tr>
        <tr v-if="mostTrips">
          <td>Most Trips:</td>
          <td>
            {{mostTrips.date | ddMMYYYY}} {{mostTrips.trips.length}} trips
          </td>
        </tr>
      </table>
      <table class="subheading">
        <thead>
        <tr>
          <td>Start</td>
          <td>Number</td>
          <td>Distance</td>
          <td>Economy</td>
          <td>Energy</td>
          <td>Regen</td>
          <td>Net Energy</td>
        </tr>
        </thead>
        <template v-for="day in summary.days">
          <tr>
            <td colspan="7" class="date subheading">{{day.date | ddMMYYYY}}</td>
          </tr>
          <tr v-for="trip in day.trips">
            <td>{{trip.dateTime | time}}</td>
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
  import HasMonthPicker from './mixins/HasMonthPicker';
  export default {
    name: 'trip-month-summary',
    mixins: [HasMonthPicker],
    data() {
      return {
        selectedDate: null,
        summary: {
          total: {}
        },
        longest: null,
        economic: null,
        mostTrips: null,
        cost: 0
      }
    },
    filters: {
      time(value) {
        return moment(value).format("HH:mm");
      }
    },
    methods: {
      loadData(month) {
        this.loading = true;
        this.$api.tripMonthSummary(month)
            .then(tsm => {
              this.selectedDate = month;
              this.summary = tsm;
            })
            .catch(error => console.error('tripMonthSummary', error))
            .finally(() => this.loading = false);
      }
    },
    watch: {
      summary() {
        this.cost = 15 / this.summary.total.averageEconomy;
        if (!this.summary.days) {
          this.longest = null;
          this.economic = null;
          this.mostTrips = null;
          return;
        }
        let distMap = new Map();
        let ecoMap = new Map();
        let tripsMap = new Map();
        this.summary.days.forEach(day => {
          tripsMap.set(day.trips.length, day);
          day.trips.forEach(trip => {
            if (trip.travelDistance > 100) {
              ecoMap.set(trip.averageEconomy, trip);
            }
            distMap.set(trip.travelDistance, trip);
          });
        });
        let distMax = Math.max(...Array.from(distMap.keys()));
        this.longest = distMap.get(distMax);
        let ecoMax = Math.max(...Array.from(ecoMap.keys()));
        this.economic = ecoMap.get(ecoMax);
        let tripsMax = Math.max(...Array.from(tripsMap.keys()));
        this.mostTrips = tripsMap.get(tripsMax);
      }
    }
  }
</script>

<style scoped>
  table {
    border-collapse: collapse;
  }
  table thead td {
    text-align: left;
    font-weight: bold;
  }
  table td {
    padding: 5px;
    text-align: right;
  }

  table td:first-child {
    text-align: left;
  }

  .date {
    border-top: lightgrey 1px solid;
  }
</style>
