<template>
  <v-card>
    <v-card-title>
      <div class="headline">Energy Usage for {{selectedDate | monthYear}}</div>
      <v-spacer></v-spacer>
      <<month-picker @selected="loadData"></month-picker>
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
    name: 'energy-usage-month',
    data() {
      return {
        selectedDate: null,
        data: []
      }
    },
    methods: {
      loadData(month) {
        this.$api.energyUsageMonth(month)
            .then(gdp => {
              this.selectedDate = month;
              this.data = gdp;
            });
      }
    }
  }
</script>
