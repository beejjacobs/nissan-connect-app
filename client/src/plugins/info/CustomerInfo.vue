<template>
  <v-card>
    <v-card-title>
      <div class="headline">Customer Info</div>
    </v-card-title>
    <v-card-text>
      <table class="subheading">
        <tr>
          <td>ID:</td>
          <td>{{ info.userId }}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{{ info.email}}</td>
        </tr>
        <tr>
          <td>Language:</td>
          <td>{{ info.language }}</td>
        </tr>
        <tr>
          <td>Timezone:</td>
          <td>{{ info.timezone }}</td>
        </tr>
        <tr>
          <td>Region:</td>
          <td>{{ info.region }}</td>
        </tr>
        <tr>
          <td>Country:</td>
          <td>{{ info.country}}</td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'customer-info',
    data() {
      return {
        info: {}
      }
    },
    mounted () {
      this.$api.customerInfo()
          .then(ci => this.info = ci)
          .catch(error => console.error('customerInfo', error));
    }
  }
</script>

<style scoped>
  table td {
    padding: 5px;
  }
</style>
