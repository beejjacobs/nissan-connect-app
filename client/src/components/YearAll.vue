<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <year-picker @selected="loadData" :loading="loading"></year-picker>
      <span class="display-3">{{year}}</span>
      <v-flex xs12>
        <drive-record-year
          :picker="false"
          :year="year"
          hide-date
          @loading="loadingChange(0, $event)"
        ></drive-record-year>
      </v-flex>
      <v-flex xs12>
        <distance-economy-year
          :picker="false"
          :year="year"
          hide-date
          @loading="loadingChange(1, $event)"
        ></distance-economy-year>
      </v-flex>
      <v-flex xs12>
        <distance-time-year
          :picker="false"
          :year="year"
          hide-date
          @loading="loadingChange(2, $event)"
        ></distance-time-year>
      </v-flex>
      <v-flex xs12>
        <energy-usage-year
          :picker="false"
          :year="year"
          hide-date
          @loading="loadingChange(3, $event)"
        ></energy-usage-year>
      </v-flex>
      <v-flex xs12>
        <trip-year
          :picker="false"
          :year="year"
          hide-date
          @loading="loadingChange(4, $event)"
        ></trip-year>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LoadingStateMulti from '../plugins/info/mixins/LoadingStateMulti'
  export default {
    name: 'YearAll',
    mixins: [LoadingStateMulti],
    data: () => ({
      year: null
    }),
    methods: {
      loadData(year) {
        this.year = year;
      }
    }
  }
</script>
