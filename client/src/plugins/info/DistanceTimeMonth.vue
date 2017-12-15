<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Time <span v-if="!hideDate">for {{selectedDate | monthYear}}</span></div>
      <v-spacer></v-spacer>
      <month-picker v-if="picker" @selected="loadData" :loading="loading"></month-picker>
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
  import HasMonthPicker from './mixins/HasMonthPicker';
  export default {
    name: 'distance-time-month',
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
        this.$api.distanceTimeMonth(month)
            .then(gdp => {
              this.selectedDate = month;
              this.data = gdp;
            })
            .catch(error => console.error('distanceTimeMonth', error))
            .finally(() => this.loading = false);
      }
    }
  }
</script>
