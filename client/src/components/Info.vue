<template>
  <v-layout row wrap>
    <vehicle-info
      :fetch="false"
      :data="vehicleInfo"
    ></vehicle-info>
    <customer-info></customer-info>
  </v-layout>
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
