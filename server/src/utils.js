const moment = require('moment');
/**
 *
 */
class Utils {
  /**
   * @param {string|moment.Moment} date
   * @return {moment.Moment}
   */
  static startOfWeek(date) {
    let mDate = moment(date);
    if (mDate.day() !== 0) {
      mDate.day(0); //last Sunday
    }
    return mDate;
  }

  /**
   * @param {string|moment.Moment} date
   * @return {boolean}
   */
  static isToday(date) {
    return moment().isSame(moment(date), 'day');
  }

  /**
   * @param {string|moment.Moment} date
   * @return {boolean}
   */
  static isThisWeek(date) {
    return moment().isSame(moment(date), 'week');
  }

  /**
   * @param {string|moment.Moment} date
   * @return {boolean}
   */
  static isThisMonth(date) {
    return moment().isSame(moment(date), 'month');
  }

  /**
   * @param {string|moment.Moment} date
   * @return {boolean}
   */
  static isThisYear(date) {
    return moment().isSame(moment(date), 'year');
  }
}

module.exports = Utils;
