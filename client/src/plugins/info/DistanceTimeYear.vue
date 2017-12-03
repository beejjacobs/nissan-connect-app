<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Time for {{selectedDate}}</div>
      <v-spacer></v-spacer>
      <year-picker @selected="loadData"></year-picker>
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
    name: 'distance-time-year',
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    methods: {
      loadData(year) {
        this.$api.distanceTimeYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
            });
      }
    }
  }
</script>
