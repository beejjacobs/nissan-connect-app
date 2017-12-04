<template>
  <v-card>
    <v-card-title>
      <div class="headline">Day Summary for {{day.date | calendar}}</div>
      <v-spacer></v-spacer>
      <date-picker v-if="picker" @selected="loadData" :days="availableDays"></date-picker>
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
    name: 'drive-record-day',
    props: {
      startDate: {
        type: String,
        default: '2017-09'
      },
      picker: {
        type: Boolean,
        default: true
      },
      date: {
        type: String
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
    watch: {
      date(newDate) {
        if (!this.picker && newDate) {
          this.loadData(newDate);
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
      loadData(date) {
        console.log('load data', date);
        this.$api.driveRecordDay(date)
            .then(dr => {
              this.selectedDate = date;
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
