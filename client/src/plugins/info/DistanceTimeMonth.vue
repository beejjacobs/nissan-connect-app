<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Time for {{selectedDate | monthYear}}</div>
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
      <div ref="chart"></div>
    </v-card-text>
  </v-card>
</template>

<script>
  import Chart from 'frappe-charts/dist/frappe-charts.min.esm';
  import moment from 'moment';
  export default {
    name: 'DistanceTimeMonth',
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    filters: {
      oneDp(value) {
        return value.toFixed(1);
      }
    },
    methods: {
      loadData() {
        this.$api.distanceTimeMonth(this.selectedDate)
            .then(gdp => {
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
