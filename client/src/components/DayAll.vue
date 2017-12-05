<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <date-picker @selected="loadData"></date-picker>
      <span class="display-3">{{date | calendar}}</span>
      <v-flex xs12>
        <drive-record-day
          :picker="false"
          :date="date"
          hide-date
        ></drive-record-day>
      </v-flex>
      <v-flex xs12>
        <drive-analysis-week
          :picker="false"
          :date="date"
          hide-date
        ></drive-analysis-week>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'DayAll',
    data: () => ({
      date: null
    }),
    methods: {
      loadData(date) {
        this.date = date;
      }
    }
  }
</script>
