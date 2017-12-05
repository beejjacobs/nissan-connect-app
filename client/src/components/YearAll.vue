<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <year-picker @selected="loadData"></year-picker>
      <span class="display-3">{{year}}</span>
      <v-flex xs12>
        <drive-record-year
          :picker="false"
          :year="year"
          hide-date
        ></drive-record-year>
      </v-flex>
      <v-flex xs12>
        <distance-economy-year
          :picker="false"
          :year="year"
          hide-date
        ></distance-economy-year>
      </v-flex>
      <v-flex xs12>
        <distance-time-year
          :picker="false"
          :year="year"
          hide-date
        ></distance-time-year>
      </v-flex>
      <v-flex xs12>
        <energy-usage-year
          :picker="false"
          :year="year"
          hide-date
        ></energy-usage-year>
      </v-flex>
      <v-flex xs12>
        <trip-year
          :picker="false"
          :year="year"
          hide-date
        ></trip-year>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'YearAll',
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
