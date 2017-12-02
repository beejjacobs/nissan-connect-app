<template>
  <v-menu
      lazy
      transition="scale-transition"
      full-width
      min-width="100px"
  >
    <v-btn dark color="primary" fab right slot="activator">
      <v-icon dark>today</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile v-for="year in availableYears" :key="year" @click="updated(year)">
        <v-list-tile-title>{{year}}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'YearPicker',
    props: {
      first: {
        type: Number,
        default: 2011
      }
    },
    computed: {
      availableYears() {
        let a = [];
        for (let i = moment().year(); i >= this.first; i--) {
          a.push(i);
        }
        return a;
      }
    },
    methods: {
      updated(value) {
        this.$emit('selected', value);
      }
    }
  }
</script>
