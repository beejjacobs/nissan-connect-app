<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <v-flex xs12>
        <trip-year></trip-year>
      </v-flex>
      <v-flex xs12>
        <trip-month></trip-month>
      </v-flex>
      <v-flex xs12>
        <energy-usage-month></energy-usage-month>
      </v-flex>
      <v-flex xs12>
        <energy-usage-year></energy-usage-year>
      </v-flex>
      <v-flex xs12>
        <distance-economy-month></distance-economy-month>
      </v-flex>
      <v-flex xs12>
        <distance-economy-year></distance-economy-year>
      </v-flex>
      <v-flex xs12>
        <distance-time-month></distance-time-month>
      </v-flex>
      <v-flex xs12>
        <distance-time-year></distance-time-year>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Test'
  }
</script>
