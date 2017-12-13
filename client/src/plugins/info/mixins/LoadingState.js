export default {
  data: () => ({
    loading: false
  }),
  watch: {
    loading(value) {
      this.$emit('loading', value);
    }
  }
}
