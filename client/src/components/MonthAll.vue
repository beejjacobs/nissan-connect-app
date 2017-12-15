<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <month-picker @selected="loadData" :loading="loading"></month-picker>
      <span class="display-3">{{month | monthYear}}</span>
      <v-flex xs12>
        <drive-record-month
          :picker="false"
          :month="month"
          hide-date
          @loading="loadingChange(0, $event)"
        ></drive-record-month>
      </v-flex>
      <v-flex xs12>
        <distance-economy-month
          :picker="false"
          :month="month"
          hide-date
          @loading="loadingChange(1, $event)"
        ></distance-economy-month>
      </v-flex>
      <v-flex xs12>
        <distance-time-month
          :picker="false"
          :month="month"
          hide-date
          @loading="loadingChange(2, $event)"
        ></distance-time-month>
      </v-flex>
      <v-flex xs12>
        <energy-usage-month
          :picker="false"
          :month="month"
          hide-date
          @loading="loadingChange(3, $event)"
        ></energy-usage-month>
      </v-flex>
      <v-flex xs12>
        <trip-month
          :picker="false"
          :month="month"
          hide-date
          @loading="loadingChange(4, $event)"
        ></trip-month>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LoadingStateMulti from '../plugins/info/mixins/LoadingStateMulti'
  export default {
    name: 'MonthAll',
    mixins: [LoadingStateMulti],
    data: () => ({
      month: null
    }),
    methods: {
      loadData(month) {
        this.month = month;
      }
    }
  }
</script>
