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
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-for="(child, i) in item.children"
                :key="i"
                :to="child.link"
                @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
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
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
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
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'History',
          model: true,
          link: '/history',
          children: [
            { icon: 'list', text: 'Summary', link: '/history' },
            { icon: 'settings', text: 'Test', link: '/test' }
          ]
        }
      ]
    }),
    computed: {
      title: function () {
        return this.$route.meta.title;
      }
    },
    mounted() {
      this.$router.afterEach((to, from) => {
        this.drawer = false;
      });
    }
  }
</script>
