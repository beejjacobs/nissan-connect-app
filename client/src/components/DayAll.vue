<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <date-picker @selected="loadData" :loading="loading"></date-picker>
      <span class="display-3">{{date | calendar}}</span>
      <v-flex xs12>
        <drive-record-day
          :picker="false"
          :date="date"
          hide-date
          @loading="loadingChange(0, $event)"
        ></drive-record-day>
      </v-flex>
      <v-flex xs12>
        <drive-analysis-week
          :picker="false"
          :date="date"
          hide-date
          @loading="loadingChange(1, $event)"
        ></drive-analysis-week>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LoadingStateMulti from '../plugins/info/mixins/LoadingStateMulti'
  export default {
    name: 'DayAll',
    mixins: [LoadingStateMulti],
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
