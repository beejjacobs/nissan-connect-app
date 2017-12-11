<template>
  <v-card>
    <v-card-title>
      <div class="headline">Distance & Economy <span v-if="!hideDate">for {{selectedDate}}</span></div>
      <v-spacer></v-spacer>
      <year-picker v-if="picker" @selected="loadData"></year-picker>
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
        this.$api.distanceEconomyYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
            })
            .catch(error => console.error('distanceEconomyYear', error));
      }
    }
  }
</script>
