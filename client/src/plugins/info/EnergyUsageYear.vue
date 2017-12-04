<template>
  <v-card>
    <v-card-title>
      <div class="headline">Energy Usage for {{selectedDate}}</div>
      <v-spacer></v-spacer>
      <year-picker v-if="picker" @selected="loadData"></year-picker>
    </v-card-title>
    <v-card-text>
      <bar-graph
          :data="data"
          title="Energy Usage"
          :ordinal="true"
      ></bar-graph>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'energy-usage-year',
    props: {
      picker: {
        type: Boolean,
        default: true
      },
      year: {
        type: String
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
        this.$api.energyUsageYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
            });
      }
    }
  }
</script>
