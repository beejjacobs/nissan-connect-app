<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <v-flex xs12>
        <drive-analysis></drive-analysis>
      </v-flex>
      <v-flex xs12>
        <drive-analysis-week></drive-analysis-week>
      </v-flex>
      <v-flex xs12>
        <drive-record-day></drive-record-day>
      </v-flex>
      <v-flex xs12>
        <drive-record-month></drive-record-month>
      </v-flex>
      <v-flex xs12>
        <drive-record-year></drive-record-year>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'History'
  }
</script>
