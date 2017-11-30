<template>
  <v-card>
    <v-card-title>
      <div class="headline">Week Summary for  {{startDate | calendar}}</div>
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
            v-model="selectedDate"
            firstDayOfWeek="1"
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
        <thead>
          <tr>
            <td>Date</td>
            <td>Economy</td>
            <td>Energy</td>
            <td>Regen</td>
            <td>Accessory</td>
          </tr>
        </thead>
        <tr v-for="summary in summaries">
          <td>{{summary.targetDate}}</td>
          <td>{{summary.averageEconomy}} miles/kWh ({{summary.averageEconomy | economyWhPerMile}} Wh/mile)</td>
          <td>{{summary.accelerationEnergy | oneDp}} Wh</td>
          <td>{{summary.regen | oneDp}} Wh</td>
          <td>{{summary.accessoryUsage | oneDp}} Wh</td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'DriveAnalysisWeek',
    data() {
      return {
        selectedDate: null,
        startDate: '',
        summaries: [{
          targetDate: '',
          hasData: false,
          averageEconomy: 0,
          averageEconomyLevel: 1,
          accelerationEnergy: 0,
          accelerationEnergyLevel: 1,
          regen: 0,
          regenLevel: 1,
          accessoryUsage: 0,
          accessoryUsageLevel: 1
        }]
      }
    },
    filters: {
      oneDp(value) {
        return value.toFixed(1);
      }
    },
    mounted() {
      this.load();
    },
    methods: {
      loadData() {
        this.$api.driveAnalysisWeek(this.selectedDate)
            .then(daw => {
              this.startDate = daw.startDate;
              this.summaries = daw.days;
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
