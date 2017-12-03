<template>
  <div ref="chart"></div>
</template>

<script>
  import Chart from 'frappe-charts/dist/frappe-charts.min.esm';
  import moment from 'moment';
  export default {
    name: 'bar-graph',
    props: {
      data: Array,
      title: String,
      data2: Array,
      title2: String,
      ordinal: Boolean
    },
    watch: {
      data() {
        this.createGraph();
      },
      title() {
        this.createGraph();
      },
      data2() {
        this.createGraph();
      },
      title2() {
        this.createGraph();
      }
    },
    methods: {
      createGraph() {
        let data = {
          labels: this.data.map(point => point.date),
          datasets: [
            {
              title: this.title,
              values: this.data.map(point => point.value)
            }
          ]
        };
        if (this.data2 && this.title2) {
          data.datasets.push({
            title: this.title2,
            values: this.data2.map(point => point.value)
          });
        }
        let tooltip = d => d;
        if (this.ordinal) {
          //to ensure this is a valid date use October as it has 31 days
          tooltip = d => moment().month(9).date(d).format('Do');
        }
        new Chart({
          parent: this.$refs.chart,
          data: data,
          type: 'bar',
          height: 250,
          colors: ['#7cd6fd', 'violet', 'blue'],
          format_tooltip_x: tooltip,
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
