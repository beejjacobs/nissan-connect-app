import PickerProp from './PickerProp';
import YearProp from './YearProp';
import LoadingState from './LoadingState';
import HideableDateProp from './HideableDateProp';

export default {
  mixins: [
    PickerProp,
    YearProp,
    LoadingState,
    HideableDateProp
  ],
  watch: {
    year(newYear) {
      if (!this.picker && newYear) {
        this.loadData(newYear);
      }
    }
  },
  methods: {
    loadData(year) {
      console.error('loadData not implemented');
    }
  }
}
