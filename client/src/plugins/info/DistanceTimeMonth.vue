<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Time <span v-if="!hideDate">for {{selectedDate | monthYear}}</span></div>
      <v-spacer></v-spacer>
      <month-picker v-if="picker" @selected="loadData"></month-picker>
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
    props: {
      picker: {
        type: Boolean,
        default: true
      },
      month: {
        type: String
      },
      hideDate: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    watch: {
      month(newMonth) {
        if (!this.picker && newMonth) {
          this.loadData(newMonth);
        }
      }
    },
    methods: {
      loadData(month) {
        this.$api.distanceTimeMonth(month)
            .then(gdp => {
              this.selectedDate = month;
              this.data = gdp;
            })
            .catch(error => console.error('distanceTimeMonth', error));
      }
    }
  }
</script>
