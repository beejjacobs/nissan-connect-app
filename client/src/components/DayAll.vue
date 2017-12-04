<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <date-picker @selected="loadData"></date-picker>
      <v-flex xs12>
        <drive-record-day
          :picker="false"
          :date="date"
        ></drive-record-day>
      </v-flex>
      <v-flex xs12>
        <drive-analysis-week
          :picker="false"
          :date="date"
        ></drive-analysis-week>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import DatePicker from "../plugins/info/common/DatePicker";

  export default {
    components: {DatePicker},
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
