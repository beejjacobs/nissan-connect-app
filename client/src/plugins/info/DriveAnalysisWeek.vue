<template>
  <v-card>
    <v-card-title>
      <div class="headline">Week Summary <span v-if="!hideDate">for {{startDate | calendar}}</span></div>
      <v-spacer></v-spacer>
      <date-picker v-if="picker" @selected="loadData"></date-picker>
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
    name: 'drive-analysis-week',
    props: {
      picker: {
        type: Boolean,
        default: true
      },
      date: {
        type: String
      },
      hideDate: {
        type: Boolean,
        default: false
      }
    },
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
    watch: {
      date(newDate) {
        if (!this.picker && newDate) {
          this.loadData(newDate);
        }
      }
    },
    methods: {
      loadData(date) {
        this.$api.driveAnalysisWeek(date)
            .then(daw => {
              this.selectedDate = date;
              this.startDate = daw.startDate;
              this.summaries = daw.days;
            })
            .catch(error => console.error('driveAnalysisWeek', error));
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
