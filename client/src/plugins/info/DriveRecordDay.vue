<template>
  <v-card>
    <v-card-title>
      <div class="headline">Day Summary for {{day.date | calendar}}</div>
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
            :allowed-dates="availableDays"
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
          <td>{{day.averageEconomy}} miles/kWh ({{day.averageEconomy | economyWattsPerMile}} W/mile)</td>
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
    name: 'DriveRecordDay',
    data() {
      return {
        selectDate: null,
        availableDays: ['2017-11-11', '2017-11-12'],
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
    mounted: function () {
      this.$api.driveRecordAvailableDays('2017-10')
          .then(ad => {
            this.availableDays = ad.availableDates.map(date => moment(date).format('YYYY-MM-DD'));
          });
    },
    methods: {
      loadData: function () {
        console.log('load data', this.selectDate);
        this.$api.driveRecordDay(this.selectDate)
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
