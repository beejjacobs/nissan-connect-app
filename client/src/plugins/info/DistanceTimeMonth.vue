<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Time for {{selectedDate | monthYear}}</div>
      <v-spacer></v-spacer>
      <month-picker @selected="loadData"></month-picker>
    </v-card-title>
    <v-card-text>
      <bar-graph
          :data="data.cumulativeDistance"
          title="Cumulative Distance"
          :data2="data.time"
          title2="Time"
          :ordinal="true"
      ></bar-graph>
    </v-card-text>
  </v-card>
</template>

<script>
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
            });
      }
    }
  }
</script>
