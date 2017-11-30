<template>
  <v-card>
    <v-card-title>
      <div class="headline">Month Summary for {{day.date | monthYear}}</div>
      <v-spacer></v-spacer>
      <v-menu
          lazy
          :close-on-content-click="false"
          transition="scale-transition"
          full-width
          max-width="290px"
          min-width="290px"
      >
        <v-btn dark color="teal" fab right slot="activator">
          <v-icon dark>today</v-icon>
        </v-btn>
        <v-date-picker
            v-model="selectDate"
            firstDayOfWeek="1"
            type="month"
            no-title
            scrollable
            actions>
          <v-card-actions slot-scope="{ save, cancel }">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
            <v-btn flat color="primary" @click="save(); loadData();">OK</v-btn>
          </v-card-actions>
        </v-date-picker>
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
  export default {
    name: 'DriveRecordMonth',
    data() {
      return {
        selectDate: null,
        day: {
          date: '2017-11-12',
          travelDistance: 2.9,
          averageEconomy: 3.9,
          energyUsage: 0.7,
          travelTime: 0.1,
          co2Saving: 1
        }
      }
    },
    methods: {
      loadData: function () {
        console.log('load data', this.selectDate);
        this.$api.driveRecordMonth(this.selectDate)
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
