import PickerProp from './PickerProp';
import DateProp from './DateProp';
import LoadingState from './LoadingState';
import HideableDateProp from './HideableDateProp';

export default {
  mixins: [
    PickerProp,
    DateProp,
    LoadingState,
    HideableDateProp
  ],
  watch: {
    date(newDate) {
      if (!this.picker && newDate) {
        this.loadData(newDate);
      }
    }
  },
  methods: {
    loadData(date) {
      console.error('loadData not implemented');
    }
  }
}
