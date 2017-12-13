<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Economy <span v-if="!hideDate">for {{selectedDate}}</span></div>
      <v-spacer></v-spacer>
      <year-picker v-if="picker" @selected="loadData" :loading="loading"></year-picker>
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
  import HasYearPicker from './mixins/HasYearPicker';
  export default {
    name: 'distance-economy-year',
    mixins: [HasYearPicker],
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    methods: {
      loadData(year) {
        this.loading = true;
        this.$api.distanceEconomyYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
              this.loading = false;
            })
            .catch(error => {
              console.error('distanceEconomyYear', error);
              this.loading = false;
            });
      }
    }
  }
</script>
