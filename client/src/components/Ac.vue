<template>
  <v-layout row wrap>
    <v-flex v-if="acOn">
      <span>
      <v-icon x-large>toys</v-icon>
        AC is on
      </span>
    </v-flex>
    <v-flex v-else="">
      <span>
      <v-icon x-large>toys</v-icon>
        AC is off
      </span>
    </v-flex>
    <v-flex v-if="schedule">
      Schedule is set for <span>{{ scheduleTime }}</span>
    </v-flex>
    <v-flex md12>
      Set AC Schedule:
      <v-menu
          lazy
          :close-on-content-click="false"
          v-model="menu.date"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
      >
        <v-text-field
            slot="activator"
            label="Select a date"
            v-model="timer.date"
            prepend-icon="event"
            readonly
        ></v-text-field>
        <v-date-picker v-model="timer.date" firstDayOfWeek="1" no-title scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>
      <v-menu
          lazy
          :close-on-content-click="false"
          v-model="menu.time"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
      >
        <v-text-field
            slot="activator"
            label="Select a time"
            v-model="timer.time"
            prepend-icon="timer"
            readonly
        ></v-text-field>
        <v-time-picker v-model="timer.time" format="24hr" scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-time-picker>
      </v-menu>
      <v-btn primary>Set</v-btn>
    </v-flex>
    <v-flex md12>
    </v-flex>
  </v-layout>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'Ac',
    data() {
      return {
        acOn: false,
        schedule: '2017-07-01 09:30',
        timer: {
          date: null,
          time: null
        },
        menu: {
          date: false,
          time: false
        }
      }
    },
    computed: {
      scheduleTime: function () {
        return moment(this.schedule).format('HH:mm DD-MM-YYYY');
      }
    }
  }
</script>

<style scoped>
</style>
