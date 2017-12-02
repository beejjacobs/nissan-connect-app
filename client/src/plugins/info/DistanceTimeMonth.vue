<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Time for {{selectedDate | monthYear}}</div>
      <v-spacer></v-spacer>
      <month-picker @selected="loadData"></month-picker>
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
    name: 'distance-time-month',
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    methods: {
      loadData(month) {
        this.$api.distanceTimeMonth(month)
            .then(gdp => {
              this.selectedDate = month;
              this.data = gdp;
              this.showChart();
            });
      },
      showChart() {
        let data = {
          labels: this.data.cumulativeDistance.map(point => point.date),
          datasets: [
            {
              title: "Time",
              values: this.data.time.map(point => point.value)
            },
            {
              title: "Cumulative Distance",
              values: this.data.cumulativeDistance.map(point => (point.value * 0.621371).toFixed(2))
            }
          ]
        };
        let chart = new Chart({
          parent: this.$refs.chart,
          data: data,
          type: 'bar',
          height: 250,
          colors: ['#7cd6fd', 'violet', 'blue'],
          format_tooltip_x: d => moment(this.selectedDate).date(d).format('Do'),
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
