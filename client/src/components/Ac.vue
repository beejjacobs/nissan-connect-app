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
      Schedule is set for <span>{{ schedule | timeDate }}</span>
      <v-btn @click="cancel()">Cancel</v-btn>
    </v-flex>
    <v-flex md12>
      <span v-if="schedule">Update</span><span v-else>Set</span> AC Schedule:
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
          <v-card-actions slot-scope="{ save, cancel }">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
            <v-btn flat color="primary" @click="save">OK</v-btn>
          </v-card-actions>
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
          <v-card-actions slot-scope="{ save, cancel }">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
            <v-btn flat color="primary" @click="save">OK</v-btn>
          </v-card-actions>
        </v-time-picker>
      </v-menu>
      <v-btn primary @click="set()">Set</v-btn>
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
        schedule: null,
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
    methods: {
      cancel() {
        this.$api.acCancelSchedule()
            .then(() => this.schedule = null);
      },
      set() {
        let dateTime = this.timer.date + ' ' + this.timer.time;
        this.$api.acSetSchedule(dateTime)
            .then(ac => {
              this.schedule = ac.isSet ? ac.executeTime : null;
            });
      }
    },
    mounted() {
      this.$api.acSchedule()
          .then(ac => {
            this.schedule = ac.isSet ? ac.executeTime : null;
          });
    },
    filters: {
      timeDate: function (value) {
        return moment(value).format('HH:mm DD-MM-YYYY');
      }
    }
  }
</script>
