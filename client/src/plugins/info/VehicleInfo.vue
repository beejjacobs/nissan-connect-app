<template>
  <v-card>
    <v-card-title>
      <div class="headline">Vehicle Info</div>
    </v-card-title>
    <v-card-text>
      <table class="subheading">
        <tr>
          <td>Nickname:</td>
          <td>{{ info.nickname }}</td>
        </tr>
        <tr>
          <td>VIN:</td>
          <td>{{ info.vin }}</td>
        </tr>
        <tr>
          <td>charger20066:</td>
          <td>{{ info.charger20066 }}</td>
        </tr>
        <tr>
          <td>Telematics Enabled:</td>
          <td>{{ info.telematicsEnabled }}</td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'vehicle-info',
    data() {
      return {
        info: {
          vin: '',
          nickname: '',
          charger20066: false,
          telematicsEnabled: false
        }
      }
    },
    mounted () {
      this.$api.vehicleInfo()
          .then(vi => this.info = vi);
    }
  }
</script>

<style scoped>
  table td {
    padding: 5px;
  }
</style>
