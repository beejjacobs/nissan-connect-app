<template>
  <v-card>
    <v-card-title>
      <div class="headline">Trips <span v-if="!hideDate">for {{selectedDate | monthYear}}</span></div>
      <v-spacer></v-spacer>
      <month-picker v-if="picker" @selected="loadData" :loading="loading"></month-picker>
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
    name: 'trip-month',
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
        data: [],
        loading: false
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
        this.loading = true;
        this.$api.tripMonth(month)
            .then(gdp => {
              this.selectedDate = month;
              this.data = gdp;
              this.loading = false;
            })
            .catch(error => {
              console.error('tripMonth', error);
              this.loading = false;
            });
      }
    }
  }
</script>
