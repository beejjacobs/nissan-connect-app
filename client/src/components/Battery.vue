<template>
  <v-container>
    <battery-level height="300" width="150" stroke-width="4" :level="battery.level"></battery-level>
    <v-slider v-model="battery.level" thumb-label step="1" min="0" max="12"></v-slider>
    <v-btn
        color="pink"
        dark
        small
        bottom
        right
        fab
        fixed
    >
      <v-icon>refresh</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  export default {
    name: 'Battery',
    data () {
      return {
        battery: {
          level: 9
        }
      }
    }
  }
</script>

<style scoped>
</style>
