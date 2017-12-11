<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Time <span v-if="!hideDate">for {{selectedDate}}</span></div>
      <v-spacer></v-spacer>
      <year-picker v-if="picker" @selected="loadData"></year-picker>
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
    props: {
      picker: {
        type: Boolean,
        default: true
      },
      year: {
        type: Number
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
      year(newYear) {
        if (!this.picker && newYear) {
          this.loadData(newYear);
        }
      }
    },
    methods: {
      loadData(year) {
        this.$api.distanceTimeYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
            })
            .catch(error => console.error('distanceTimeYear', error));

      }
    }
  }
</script>
