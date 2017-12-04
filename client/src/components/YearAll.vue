<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <year-picker @selected="loadData"></year-picker>
      <v-flex xs12>
        <drive-record-year
          :picker="false"
          :year="year"
        ></drive-record-year>
      </v-flex>
      <v-flex xs12>
        <distance-economy-year
          :picker="false"
          :year="year"
        ></distance-economy-year>
      </v-flex>
      <v-flex xs12>
        <distance-time-year
          :picker="false"
          :year="year"
        ></distance-time-year>
      </v-flex>
      <v-flex xs12>
        <energy-usage-year
          :picker="false"
          :year="year"
        ></energy-usage-year>
      </v-flex>
      <v-flex xs12>
        <trip-year
          :picker="false"
          :year="year"
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
