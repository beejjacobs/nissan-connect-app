<template>
  <v-card>
    <v-card-title>
      <div class="headline">Energy Usage for {{selectedDate}}</div>
      <v-spacer></v-spacer>
      <year-picker @selected="loadData"></year-picker>
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
    data() {
      return {
        selectedDate: null,
        data: [],
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
