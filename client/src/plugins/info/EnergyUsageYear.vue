<template>
  <v-card>
    <v-card-title>
      <div class="headline">Energy Usage <span v-if="!hideDate">for {{selectedDate}}</span></div>
      <v-spacer></v-spacer>
      <year-picker v-if="picker" @selected="loadData" :loading="loading"></year-picker>
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
  import HasYearPicker from './mixins/HasYearPicker';
  export default {
    name: 'energy-usage-year',
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
        this.$api.energyUsageYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
            })
            .catch(error => console.error('energyUsageYear', error))
            .finally(() => this.loading = false);
      }
    }
  }
</script>
