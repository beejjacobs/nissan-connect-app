<template>
  <v-card>
    <v-card-title>
      Month Summary for {{formattedDate}}
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
      <v-list>
        <v-list-tile>Distance: {{day.travelDistance | travelDistance}} miles</v-list-tile>
        <v-list-tile>Average Economy: {{day.averageEconomy}} miles/kWh ({{economyWattsPerMile}} W/mile)</v-list-tile>
        <v-list-tile>Energy Usage: {{day.energyUsage | energyUsage}}</v-list-tile>
        <v-list-tile>Travel Time: {{day.travelTime | travelTime}}</v-list-tile>
        <v-list-tile>CO2 Reduction: {{day.co2Saving}} kg</v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
  import moment from 'moment';

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
    },
    computed: {
      economyWattsPerMile() {
        let number = Math.round(1000 / this.day.averageEconomy);
        return isFinite(number) ? number : 0;
      },
      formattedDate() {
        return moment(this.day.date).format('MMMM YYYY');
      }
    },
    filters: {
      travelDistance: function (value) {
        return (value * 0.000621371).toFixed(2);
      },
      energyUsage: function (value) {
        value = isNaN(value) ? 0 : value;
        if (value < 0.5) {
          return (value * 1000).toFixed(2) + ' Wh';
        }
        return value.toFixed(2) + ' kWh';
      },
      travelTime: function (value) {
        value = isNaN(value) ? 0 : value;
        let duration = moment.duration({hours: value});
        if (value < 1) {
          return duration.asMinutes().toFixed(2) + ' minutes';
        }
        return duration.asHours().toFixed(2) + ' hours';
      }
    }
  }
</script>
