<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Economy for {{selectedDate}}</div>
      <v-spacer></v-spacer>
      <year-picker @selected="loadData"></year-picker>
    </v-card-title>
    <v-card-text>
      <bar-graph
          :data="data.distance"
          title="Distance"
          :data2="data.economy"
          title2="Economy"
          :ordinal="true"
      ></bar-graph>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'distance-economy-year',
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
