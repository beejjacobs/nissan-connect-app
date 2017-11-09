<template>
  <v-container>
    <battery-level height="300" width="150"
                   stroke-width="4"
                   stroke-color="#808080"
                   fill-color="#1976d2"
                   :charging="charging"
                   :level="battery.level"></battery-level>
    <v-slider v-model="battery.level" thumb-label step="1" min="0" max="12"></v-slider>
    <h2>{{ percentage }}%</h2>
    <h2>{{battery.level}}/12</h2>
    <v-checkbox v-model="charging" light></v-checkbox>
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
          level: 0
        },
        charging: true
      }
    },
    computed: {
      percentage: function () {
        return parseInt(this.battery.level / 12 * 100);
      }
    }
  }
</script>

<style scoped>
</style>
