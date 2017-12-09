<template>
  <v-progress-circular
      :indeterminate="indeterminate"
      v-model="percentage"
      :rotate="-90"
  ></v-progress-circular>
</template>

<script>
  export default {
    name: 'timed-loader',
    props: {
      time: {
        type: Number,
        default: 30
      },
      loading: {
        type: Boolean,
        default: false
      },
      steps: {
        type: Number,
        default: 10
      }
    },
    data: () => ({
      indeterminate: false,
      percentage: 0
    }),
    watch: {
      loading(value) {
        this.run(value);
      }
    },
    mounted() {
      this.run(this.loading);
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    methods: {
      run(loading) {
        if (!loading) {
          this.indeterminate = false;
          this.percentage = 0;
          clearTimeout(this.interval);
          return;
        }
        if (this.time === 0) {
          this.indeterminate = true;
          return;
        }
        let ms = (this.time / this.steps) * 1000;
        this.interval = setInterval(() => {
          this.percentage += (100.0 / this.steps);
          console.log(this.percentage);
          if (this.percentage >= 100) {
            if (this.loading) {
              this.indeterminate = true;
            }
            clearTimeout(this.interval);
          }
        }, ms);
      }
    }
  }
</script>

<style scoped>

</style>
