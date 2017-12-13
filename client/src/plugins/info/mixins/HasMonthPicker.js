import PickerProp from './PickerProp';
import MonthProp from './MonthProp';
import LoadingState from './LoadingState';
import HideableDateProp from './HideableDateProp';

export default {
  mixins: [
    PickerProp,
    MonthProp,
    LoadingState,
    HideableDateProp
  ],
  watch: {
    month(newMonth) {
      if (!this.picker && newMonth) {
        this.loadData(newMonth);
      }
    }
  },
  methods: {
    loadData(month) {
      console.error('loadData not implemented');
    }
  }
}
