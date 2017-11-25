<template>
  <v-card>
    <v-card-title>
      Month Summary for {{day.date | monthYear}}
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
        <v-list-tile>Average Economy: {{day.averageEconomy}} miles/kWh ({{day.averageEconomy | economyWattsPerMile}} W/mile)</v-list-tile>
        <v-list-tile>Energy Usage: {{day.energyUsage | energyUsage}}</v-list-tile>
        <v-list-tile>Travel Time: {{day.travelTime | travelTime}}</v-list-tile>
        <v-list-tile>CO2 Reduction: {{day.co2Saving}} kg</v-list-tile>
      </v-list>
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
