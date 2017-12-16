<template>
  <v-container
      fluid
      grid-list-lg
  >
    <v-layout row wrap>
      <v-flex xs12>
        <vehicle-info
            :fetch="false"
            :data="vehicleInfo"
        ></vehicle-info>
      </v-flex>
      <v-flex xs12>
        <customer-info></customer-info>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Info',
    computed: {
      vehicleInfo() {
        return this.$store.state.vehicleInfo;
      }
    }
  }
</script>
