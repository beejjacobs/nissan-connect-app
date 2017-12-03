<template>
  <v-card>
    <v-card-title>
      <div class="headline">Trips for {{selectedDate}}</div>
      <v-spacer></v-spacer>
      <year-picker @selected="loadData"></year-picker>
    </v-card-title>
    <v-card-text>
      <bar-graph
          :data="data"
          title="Trips"
          :ordinal="true"
      ></bar-graph>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'trip-year',
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    methods: {
      loadData(year) {
        this.$api.tripYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
            });
      }
    }
  }
</script>
