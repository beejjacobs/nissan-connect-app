import LoadingState from './LoadingState';

export default {
  mixins: [
    LoadingState
  ],
  data: () => ({
    state: new Array(10).fill(false)
  }),
  methods: {
    loadingChange(id, value) {
      this.state[id] = value;
      this.loading = this.state.some(val => val === true);
    }
  }
}
