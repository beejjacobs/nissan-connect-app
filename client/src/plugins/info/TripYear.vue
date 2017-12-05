<template>
  <v-card>
    <v-card-title>
      <div class="headline">Trips <span v-if="!hideDate">for {{selectedDate}}</span></div>
      <v-spacer></v-spacer>
      <year-picker v-if="picker" @selected="loadData"></year-picker>
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
        this.$api.tripYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
            });
      }
    }
  }
</script>
