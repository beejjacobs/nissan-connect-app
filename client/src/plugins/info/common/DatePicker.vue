<template>
  <v-menu
      lazy
      :close-on-content-click="false"
      transition="scale-transition"
      full-width
      max-width="290px"
      min-width="290px"
  >
    <v-btn dark color="primary" fab right slot="activator">
      <v-icon dark>today</v-icon>
    </v-btn>
    <v-date-picker
        v-model="date"
        firstDayOfWeek="1"
        :allowed-dates="days"
        no-title
        scrollable
        actions>
      <v-card-actions slot-scope="{ save, cancel }">
        <v-spacer></v-spacer>
        <v-btn flat color="error" @click="cancel">Cancel</v-btn>
        <v-btn flat color="primary" @click="save(); updated();">OK</v-btn>
      </v-card-actions>
    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name: 'DatePicker',
    props: {
      days: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        date: null
      };
    },
    methods: {
      updated() {
        this.$emit('selected', this.date);
      }
    }
  }
</script>
