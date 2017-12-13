<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Economy <span v-if="!hideDate">for {{selectedDate | monthYear}}</span></div>
      <v-spacer></v-spacer>
      <month-picker v-if="picker" @selected="loadData" :loading="loading"></month-picker>
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
  import HasMonthPicker from './mixins/HasMonthPicker';
  export default {
    name: 'distance-economy-month',
    mixins: [HasMonthPicker],
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    methods: {
      loadData(month) {
        this.loading = true;
        this.$api.distanceEconomyMonth(month)
            .then(gdp => {
              this.selectedDate = month;
              this.data = gdp;
              this.loading = false;
            })
            .catch(error => {
              console.error('distanceEconomyMonth', error);
              this.loading = false;
            });
      }
    }
  }
</script>
