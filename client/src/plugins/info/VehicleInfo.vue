<template>
  <v-card>
    <v-card-title>
      <div class="headline">Vehicle Info</div>
    </v-card-title>
    <v-card-text>
      <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
      <table class="subheading" v-else>
        <tr>
          <td>Nickname:</td>
          <td>{{ vehicleInfo.nickname }}</td>
        </tr>
        <tr>
          <td>VIN:</td>
          <td>{{ vehicleInfo.vin }}</td>
        </tr>
        <tr>
          <td>charger20066:</td>
          <td>{{ vehicleInfo.charger20066 }}</td>
        </tr>
        <tr>
          <td>Telematics Enabled:</td>
          <td>{{ vehicleInfo.telematicsEnabled }}</td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'vehicle-info',
    props: {
      fetch: {
        type: Boolean,
        default: true
      },
      data: {
        type: Object
      }
    },
    data() {
      return {
        info: {
          vin: '',
          nickname: '',
          charger20066: false,
          telematicsEnabled: false
        },
        loading: false
      }
    },
    computed: {
      vehicleInfo() {
        if (this.fetch) {
          return this.info;
        } else {
          return this.data;
        }
      }
    },
    mounted () {
      if (this.fetch) {
        this.loading = true;
        this.$api.vehicleInfo()
            .then(vi => this.info = vi)
            .catch(error => console.error('vehicleInfo', error))
            .finally(() => this.loading = false);
      }
    }
  }
</script>

<style scoped>
  table td {
    padding: 5px;
  }
</style>
