<template>
  <v-card>
    <v-card-text class="grid headline">
      <div class="status">
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon class="white--text" :class="{accent: acOn, secondary: !acOn}">toys</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="headline">AC is {{ acOn ? 'on' : 'off' }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-btn
                v-if="acOn"
                dark
                color="accent"
                @click="turnAcOff()"
                class="ml-0"
                :loading="loading.off"
              >
                Turn AC Off
              </v-btn>
              <v-btn
                v-else
                color="primary"
                @click="turnAcOn()"
                class="ml-0"
                :loading="loading.on"
              >
                Turn AC On
              </v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Schedule</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-progress-circular
                  indeterminate
                  color="accent"
                  v-if="loading.schedule"
              ></v-progress-circular>
              <v-icon v-else class="accent white--text">schedule</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="!loading.schedule" class="headline">{{ schedule ? 'Set for' : 'Not set' }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar v-if="schedule">
            <v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="headline">{{ schedule | timeDate }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar v-if="schedule">
            <v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-btn
                  class="ml-0"
                  v-if="schedule"
                  color="secondary"
                  @click="cancel()"
                  :loading="loading.cancel"
              >Cancel Schedule</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
      <div class="schedule">
        {{schedule ? 'Update' : 'Set'}} AC Schedule:
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
        <v-btn
            color="primary"
            @click="set()"
            :loading="loading.set"
        >Set</v-btn>
      </div>
    </v-card-text>
  </v-card>
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
        },
        loading: {
          on: false,
          off: false,
          set: false,
          cancel: false,
          schedule: true
        }
      }
    },
    methods: {
      cancel() {
        this.loading.cancel = true;
        this.$api.acCancelSchedule()
          .then(() => {
            this.schedule = null;
            this.loading.cancel = false;
          });
      },
      set() {
        this.loading.set = true;
        let dateTime = this.timer.date + ' ' + this.timer.time;
        this.$api.acSetSchedule(dateTime)
          .then(ac => {
            this.schedule = ac.isSet ? ac.executeTime : null;
            this.loading.set = false;
          });
      },
      turnAcOn() {
        this.loading.on = true;
        this.$api.acOn()
            .then(() => {
              this.acOn = true;
              this.loading.on = false;
            });
      },
      turnAcOff() {
        this.loading.off = true;
        this.$api.acOff()
            .then(() => {
              this.acOn = false;
              this.loading.off = false;
            });
      }
    },
    watch: {
      schedule() {
        if (this.schedule != null) {
          let schedule = moment(this.schedule);
          this.timer.date = schedule.format('YYYY-MM-DD');
          this.timer.time = schedule.format('HH:mm');
        }
      }
    },
    mounted() {
      this.$api.acSchedule()
        .then(ac => {
          this.schedule = ac.isSet ? ac.executeTime : null;
          this.loading.schedule = false;
        });
    },
    filters: {
      timeDate: function (value) {
        return moment(value).format('HH:mm DD-MM-YYYY');
      }
    }
  }
</script>

<style scoped>
  @media (min-width: 580px) {
    .grid {
      display: grid;
      height: 100%;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: "sta sch";
    }

    .status {
      grid-area: sta;
    }

    .schedule {
      grid-area: sch;
    }
  }
</style>
