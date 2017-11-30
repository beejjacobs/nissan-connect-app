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
    props: {
      startDate: {
        type: String,
        default: '2017-09'
      }
    },
    data() {
      return {
        selectDate: null,
        availableDays: null,
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
    mounted () {
      let start = moment(this.startDate);
      let months = moment().diff(start, 'months');
      let startMonth = start.month();
      for (let i = startMonth; i <= startMonth + months; i++) {
        this.$api.driveRecordAvailableDays(moment(start).month(i).format('YYYY-MM'))
            .then(ad => {
              if (this.availableDays === null) {
                this.availableDays = [];
              }
              ad.availableDates.forEach(date => this.availableDays.push(date.format('YYYY-MM-DD')));
            });
      }
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
