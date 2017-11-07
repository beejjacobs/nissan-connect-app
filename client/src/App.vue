<template>
  <v-app>
    <v-toolbar app color="primary">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat :to="{path:'/'}" exact>
        <span>Battery</span>
        <v-icon>ev_station</v-icon>
      </v-btn>
      <v-btn flat :to="{path:'/ac'}">
        <span>AC</span>
        <v-icon>toys</v-icon>
      </v-btn>
      <v-btn flat :to="{path:'/history'}">
        <span>History</span>
        <v-icon>directions_car</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      title: function () {
        return this.$route.meta.title;
      }
    }
  }
</script>

<style>
  html {
    overflow-y: auto;
  }
</style>
