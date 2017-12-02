<template>
  <v-card>
    <v-card-title>
      <div class="headline">Month Summary for {{day.date | monthYear}}</div>
      <v-spacer></v-spacer>
      <month-picker @selected="loadData"></month-picker>
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
  export default {
    name: 'drive-record-month',
    data() {
      return {
        day: {
          date: '',
          travelDistance: 0,
          averageEconomy: 0,
          energyUsage: 0,
          travelTime: 0,
          co2Saving: 0
        }
      }
    },
    methods: {
      loadData(month) {
        console.log('load data', month);
        this.$api.driveRecordMonth(month)
            .then(dr => {
              this.day = dr;
            });
      }
    }
  }
</script>

<style scoped>
  table td {
    padding: 5px;
  }
</style>
