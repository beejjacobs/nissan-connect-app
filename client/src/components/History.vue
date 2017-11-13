<template>
  <v-container>
    <v-card>
      <v-card-title>
        Day Summary for {{formattedDate}}
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
        <v-list>
          <v-list-tile>Distance: {{day.distance}} miles</v-list-tile>
          <v-list-tile>Average Economy: {{day.economy}} miles/kWh ({{economyWattsPerMile}} W/mile)</v-list-tile>
          <v-list-tile>Energy Usage: {{day.energy}} kWh</v-list-tile>
          <v-list-tile>Travel Time: {{day.travel}} hours</v-list-tile>
          <v-list-tile>CO2 Reduction: {{day.co2}} kg</v-list-tile>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'History',
    data() {
      return {
        selectDate: null,
        availableDays: ['2017-11-11', '2017-11-12'],
        day: {
          date: '2017-11-12',
          distance: 2.9,
          economy: 3.9,
          energy: 0.7,
          travel: 0.1,
          co2: 1
        }
      }
    },
    methods: {
      loadData: function () {
        console.log('load data');
      }
    },
    computed: {
      economyWattsPerMile() {
        return Math.round(1000 / this.day.economy);
      },
      formattedDate() {
        return moment(this.day.date).calendar(null, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'DD/MM/YYYY'
        });
      }
    }
  }
</script>

<style scoped>
</style>
