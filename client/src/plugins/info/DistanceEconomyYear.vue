<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Economy for {{selectedDate}}</div>
      <v-spacer></v-spacer>
      <year-picker @selected="loadData"></year-picker>
    </v-card-title>
    <v-card-text>
      <div ref="chart"></div>
    </v-card-text>
  </v-card>
</template>

<script>
  import Chart from 'frappe-charts/dist/frappe-charts.min.esm';
  import moment from 'moment';
  export default {
    name: 'DistanceEconomyYear',
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    methods: {
      loadData(year) {
        this.$api.distanceEconomyYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
              this.showChart();
            });
      },
      showChart() {
        let data = {
          labels: this.data.distance.map(point => moment().month(point.date - 1).format('MMM')),
          datasets: [
            {
              title: "Economy",
              values: this.data.economy.map(point => point.value)
            },
            {
              title: "Distance",
              values: this.data.distance.map(point => (point.value * 0.621371).toFixed(2))
            }
          ]
        };
        let chart = new Chart({
          parent: this.$refs.chart,
          data: data,
          type: 'bar',
          height: 250,
          colors: ['#7cd6fd', 'violet', 'blue'],
          format_tooltip_x: d => d,
          format_tooltip_y: d => d
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
