<template>
  <v-app>
    <v-toolbar app color="primary">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat :to="{path:'/info'}" exact>
        <v-icon left>info</v-icon>
        <span>Info</span>
      </v-btn>
      <v-btn flat :to="{path:'/'}" exact>
        <v-icon left>ev_station</v-icon>
        <span>Battery</span>
      </v-btn>
      <v-btn flat :to="{path:'/ac'}">
        <v-icon left>toys</v-icon>
        <span>AC</span>
      </v-btn>
      <v-btn flat :to="{path:'/history'}">
        <v-icon left>directions_car</v-icon>
        <span>History</span>
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
