<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Economy for {{selectedDate | monthYear}}</div>
      <v-spacer></v-spacer>
      <month-picker @selected="loadData"></month-picker>
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
    name: 'distance-economy-month',
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    methods: {
      loadData(month) {
        this.$api.distanceEconomyMonth(month)
            .then(gdp => {
              this.selectedDate = month;
              this.data = gdp;
            });
      }
    }
  }
</script>
