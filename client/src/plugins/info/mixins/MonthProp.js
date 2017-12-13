export default {
  props: {
    month: {
      type: String
    }
  },
  watch: {
    month(newMonth) {
      if (!this.picker && newMonth) {
        this.loadData(newMonth);
      }
    }
  }
}
