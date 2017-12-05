<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <month-picker @selected="loadData"></month-picker>
      <span class="display-3">{{month | monthYear}}</span>
      <v-flex xs12>
        <drive-record-month
          :picker="false"
          :month="month"
          hide-date
        ></drive-record-month>
      </v-flex>
      <v-flex xs12>
        <distance-economy-month
          :picker="false"
          :month="month"
          hide-date
        ></distance-economy-month>
      </v-flex>
      <v-flex xs12>
        <distance-time-month
          :picker="false"
          :month="month"
          hide-date
        ></distance-time-month>
      </v-flex>
      <v-flex xs12>
        <energy-usage-month
          :picker="false"
          :month="month"
          hide-date
        ></energy-usage-month>
      </v-flex>
      <v-flex xs12>
        <trip-month
          :picker="false"
          :month="month"
          hide-date
        ></trip-month>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'MonthAll',
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
