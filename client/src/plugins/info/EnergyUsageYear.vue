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
  export default {
    name: 'energy-usage-year',
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
        data: [],
        loading: false
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
        this.loading = true;
        this.$api.energyUsageYear(year)
            .then(gdp => {
              this.selectedDate = year;
              this.data = gdp;
              this.loading = false;
            })
            .catch(error => {
              console.error('energyUsageYear', error);
              this.loading = false;
            });
      }
    }
  }
</script>
