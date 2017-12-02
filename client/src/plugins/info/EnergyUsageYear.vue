<template>
  <v-card>
    <v-card-title>
      <div class="headline">Energy Usage for {{selectedDate}}</div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-menu
          lazy
          transition="scale-transition"
          full-width
          min-width="100px"
      >
        <v-btn dark color="teal" fab right slot="activator">
          <v-icon dark>today</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="year in availableYears" :key="year" @click="loadData(year)">
            <v-list-tile-title>{{year}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
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
    name: 'EnergyUsageYear',
    data() {
      return {
        selectedDate: null,
        data: [],
        availableYears: []
      }
    },
    mounted() {
      for (let i = moment().year(); i >= 2011; i--) {
        this.availableYears.push(i);
      }
    },
    methods: {
      loadData(year) {
        this.selectedDate = year;
        this.$api.energyUsageYear(year)
            .then(gdp => {
              this.data = gdp;
              this.showChart();
            });
      },
      showChart() {
        let data = {
          labels: this.data.map(point => moment().month(point.date - 1).format('MMM')),
          datasets: [
            {
              title: "Energy Usage",
              values: this.data.map(point => point.value)
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
