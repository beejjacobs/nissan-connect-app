<template>
  <v-app>
    <v-navigation-drawer
        fixed
        app
        clipped
        v-model="drawer"
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
              row
              v-if="item.heading"
              align-center
              :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile
                v-for="(child, i) in item.children"
                :key="i"
                :to="child.link"
                exact
                @click=""
            >
              <v-list-tile-action>
                <v-icon v-if="child.icon">{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="" :to="item.link" exact>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
        app
        fixed
        dark
        clipped-left
        color="primary"
    >
      <v-toolbar-title class="white--text">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">
        {{ nickname }}
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data: () => ({
      drawer: false,
      items: [
        { icon: 'info', text: 'Info', link: '/info' },
        { icon: 'ev_station', text: 'Battery', link: '/' },
        { icon: 'toys', text: 'AC', link: '/ac' },
        {
          icon: 'today',
          text: 'By Date',
          model: false,
          children: [
            { text: 'Everything', link: '/all/day' },
            { text: 'Drive Analysis', link: '/drive-analysis' },
            { text: 'Drive Analysis Week', link: '/drive-analysis/week' },
            { text: 'Drive Record', link: '/drive-record/day' }
          ]
        },
        {
          icon: 'date_range',
          text: 'By Month',
          model: false,
          children: [
            { text: 'Everything', link: '/all/month' },
            { text: 'Distance & Economy', link: '/distance-economy/month' },
            { text: 'Distance & Time', link: '/distance-time/month' },
            { text: 'Drive Record', link: '/drive-record/month' },
            { text: 'Energy Usage', link: '/energy-usage/month' },
            { text: 'Trip Summary', link: '/trip/month/summary' },
            { text: 'Trips', link: '/trip/month' }
          ]
        },
        {
          icon: 'event',
          text: 'By Year',
          model: false,
          children: [
            { text: 'Everything', link: '/all/year' },
            { text: 'Distance & Economy', link: '/distance-economy/year' },
            { text: 'Distance & Time', link: '/distance-time/year' },
            { text: 'Drive Record', link: '/drive-record/year' },
            { text: 'Energy Usage', link: '/energy-usage/year' },
            { text: 'Trips', link: '/trip/year' }
          ]
        }
      ]
    }),
    computed: {
      title: function () {
        return this.$route.meta.title;
      },
      nickname() {
        return this.$store.state.vehicleInfo.nickname;
      }
    },
    mounted() {
      this.$router.afterEach(() => this.drawer = false);
      this.$api.vehicleInfo()
          .then(vi => this.$store.commit('set', vi))
          .catch(error => console.error('vehicleInfo' ,error));
    }
  }
</script>
