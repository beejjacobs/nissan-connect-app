<template>
  <v-card>
    <v-card-title>
      <div class="headline">Day Summary for {{summary.targetDate | calendar}}</div>
    </v-card-title>
    <v-card-text>
      <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
      <table class="subheading" v-else>
        <tr>
          <td>Average Economy:</td>
          <td>{{summary.averageEconomy}} miles/kWh ({{summary.averageEconomy | economyWhPerMile}} W/mile)</td>
          <td>Level: {{summary.averageEconomyLevel}}/5</td>
        </tr>
        <tr>
          <td>Energy Usage:</td>
          <td>{{summary.accelerationEnergy}} Wh</td>
          <td>Level: {{summary.accelerationEnergyLevel}}/5</td>
        </tr>
        <tr>
          <td>Regen:</td>
          <td>{{summary.regen}} Wh</td>
          <td>Level: {{summary.regenLevel}}/5</td>
        </tr>
        <tr>
          <td>Accessory Usage:</td>
          <td>{{summary.accessoryUsage}} Wh</td>
          <td>Level: {{summary.accessoryUsageLevel}}/5</td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'drive-analysis',
    data() {
      return {
        summary: {
          targetDate: '',
          hasData: false,
          averageEconomy: 0,
          averageEconomyLevel: 1,
          accelerationEnergy: 0,
          accelerationEnergyLevel: 1,
          regen: 0,
          regenLevel: 1,
          accessoryUsage: 0,
          accessoryUsageLevel: 1
        },
        loading: false
      }
    },
    mounted () {
      this.loading = true;
      this.$api.driveAnalysisToday()
          .then(da => this.summary = da.day)
          .catch(error => console.error('driveAnalysisToday', error))
          .finally(() => this.loading = false);
    }
  }
</script>

<style scoped>
  table td {
    padding: 5px;
  }
</style>
