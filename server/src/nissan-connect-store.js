const fs = require('fs');
const moment = require('moment');
const Utils = require('./utils');
const Logger = require('./logger');
const promisify = require('util').promisify;
const writeFile = promisify(fs.writeFile);

/**
 * Mirror some {@link NissanConnect} methods with a wrapper to save responses
 * to a basic store, and recall data from the store instead of calling the API.
 */
class NissanConnectStore {
  /**
   * @param {string} username
   * @param {NissanConnect} nissanConnect
   */
  constructor(username, nissanConnect) {
    this.username = username;
    this.nissanConnect = nissanConnect;
    this.logger = new Logger(this.constructor.name);
    /**
     * @type {Store}
     */
    this.store = NissanConnectStore.newStore();
    this.load();
  }

  /**
   * @param {string|moment.Moment} date
   * @return {Promise.<DriveAnalysisWeekSummary>}
   */
  async getDrivingAnalysisWeek(date) {
    let key = Utils.startOfWeek(date).format('YYYY-MM-DD');
    let store = this.store.drivingAnalysisWeek;
    if (this.useFromStore(store, Utils.isThisWeek(date), 'drivingAnalysisWeek', key)) {
      return store[key];
    }
    let drivingAnalysisWeek = await this.nissanConnect.getDrivingAnalysisWeek(date);
    return this.saveData(store, key, drivingAnalysisWeek);
  }

  /**
   * @param {string|moment.Moment} date
   * @return {Promise.<DrivingRecord>}
   */
  async getDriveRecords(date) {
    let key = moment(date).format('YYYY-MM-DD');
    let store = this.store.drivingRecord;
    if (this.useFromStore(store, Utils.isToday(date), 'drivingRecord', key)) {
      return store[key];
    }
    let driveRecords = await this.nissanConnect.getDriveRecords(date);
    return this.saveData(store, key, driveRecords);
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<Calendar>}
   */
  async getDriveRecordDays(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.drivingRecordCalendar;
    if (this.useFromStore(store, Utils.isThisMonth(month), 'drivingRecordCalendar', key)) {
      return store[key];
    }
    let calendar = await this.nissanConnect.getDriveRecordDays(month);
    return this.saveData(store, key, calendar);
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<DrivingRecordMonth>}
   */
  async getDriveRecordsMonth(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.drivingRecordMonth;
    if (this.useFromStore(store, Utils.isThisMonth(month), 'drivingRecordMonth', key)) {
      return store[key];
    }
    let driveRecords = await this.nissanConnect.getDriveRecordsMonth(month);
    return this.saveData(store, key, driveRecords);
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<DrivingRecordYear>}
   */
  async getDriveRecordsYear(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.drivingRecordYear;
    if (this.useFromStore(store, Utils.isThisYear(year), 'drivingRecordYear', key)) {
      return store[key];
    }
    let driveRecords = await this.nissanConnect.getDriveRecordsYear(year + '-01');
    return this.saveData(store, key, driveRecords);
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<GraphDataPoints>}
   */
  async getMonthlyTrips(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.monthlyTrips;
    if (this.useFromStore(store, Utils.isThisMonth(month), 'monthlyTrips', key)) {
      return store[key];
    }
    let trips = await this.nissanConnect.getMonthlyTrips(month);
    return this.saveData(store, key, trips);
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<DistanceEconomyDataPoints>}
   */
  async getMonthlyDistanceEconomy(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.monthlyDistanceEconomy;
    if (this.useFromStore(store, Utils.isThisMonth(month), 'monthlyDistanceEconomy', key)) {
      return store[key];
    }
    let de = await this.nissanConnect.getMonthlyDistanceEconomy(month);
    return this.saveData(store, key, de);
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<DistanceTimeDataPoints>}
   */
  async getMonthlyDistanceTime(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.monthlyDistanceTime;
    if (this.useFromStore(store, Utils.isThisMonth(month), 'monthlyDistanceTime', key)) {
      return store[key];
    }
    let dt = await this.nissanConnect.getMonthlyDistanceTime(month);
    return this.saveData(store, key, dt);
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<GraphDataPoints>}
   */
  async getMonthlyEnergyUsage(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.monthlyEnergyUsage;
    if (this.useFromStore(store, Utils.isThisMonth(month), 'monthlyEnergyUsage', key)) {
      return store[key];
    }
    let dt = await this.nissanConnect.getMonthlyEnergyUsage(month);
    return this.saveData(store, key, dt);
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<GraphDataPoints>}
   */
  async getYearlyTrips(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.yearlyTrips;
    if (this.useFromStore(store, Utils.isThisYear(year), 'yearlyTrips', key)) {
      return store[key];
    }
    let data = await this.nissanConnect.getYearlyTrips(year + '-01');
    return this.saveData(store, key, data);
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<DistanceEconomyDataPoints>}
   */
  async getYearlyDistanceEconomy(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.yearlyDistanceEconomy;
    if (this.useFromStore(store, Utils.isThisYear(year), 'yearlyDistanceEconomy', key)) {
      return store[key];
    }
    let data = await this.nissanConnect.getYearlyDistanceEconomy(year + '-01');
    return this.saveData(store, key, data);
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<DistanceTimeDataPoints>}
   */
  async getYearlyDistanceTime(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.yearlyDistanceTime;
    if (this.useFromStore(store, Utils.isThisYear(year), 'yearlyDistanceTime', key)) {
      return store[key];
    }
    let data = await this.nissanConnect.getYearlyDistanceTime(year + '-01');
    return this.saveData(store, key, data);
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<GraphDataPoints>}
   */
  async getYearlyEnergyUsage(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.yearlyEnergyUsage;
    if (this.useFromStore(store, Utils.isThisYear(year), 'yearlyEnergyUsage', key)) {
      return store[key];
    }
    let data = await this.nissanConnect.getYearlyEnergyUsage(year + '-01');
    return this.saveData(store, key, data);
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<TripSummaryMonth>}
   */
  async getMonthTripSummary(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.monthTripSummary;
    if (this.useFromStore(store, Utils.isThisMonth(month), 'monthTripSummary', key)) {
      return store[key];
    }
    let data = await this.nissanConnect.getMonthTripSummary(month);
    return this.saveData(store, key, data);
  }

  /**
   * @param {object} store
   * @param {boolean} dateCheck
   * @param {string} method
   * @param {string} key
   * @return {boolean}
   */
  useFromStore(store, dateCheck, method, key) {
    let inStore = store.hasOwnProperty(key);
    if (inStore && !dateCheck) {
      this.logger.log(`${method} found ${key}`);
      return true;
    } else if(!inStore && !dateCheck) {
      this.logger.log(`${method} can't find ${key}`);
    } else {
      this.logger.log(`${method} date match, fetching latest for ${key}`);
    }
    return false;
  }

  /**
   * @param {object} store
   * @param {string} key
   * @param {*} data
   * @return {Promise.<*>}
   */
  async saveData(store, key, data) {
    store[key] = data;
    await this.save();
    return data;
  }

  get filename() {
    return NissanConnectStore.basename + '-' + this.username + '.json';
  }

  get filePath() {
    return NissanConnectStore.path + '/' + this.filename;
  }

  async save() {
    this.sortStore();
    return writeFile(this.filePath, JSON.stringify(this.store, null, 2));
  }

  sortStore() {
    function sortObject(o) {
      return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
    }
    this.store = sortObject(this.store);
    for (let key in this.store) {
      this.store[key] = sortObject(this.store[key]);
    }
  }

  load() {
    this.logger.log(`loading ${this.filePath}`);
    let file;
    try {
      fs.readFileSync(this.filePath, 'utf8')
    } catch (e) {
      this.logger.log('error loading file', e);
    }
    if (file) {
      this.store = JSON.parse(file);
    }
    NissanConnectStore.checkStoreStructure(this.store);
  }

  static checkStoreStructure(store) {
    let names = [
      'drivingAnalysisWeek',
      'drivingRecord',
      'drivingRecordCalendar',
      'drivingRecordMonth',
      'drivingRecordYear',
      'monthlyTrips',
      'monthlyDistanceEconomy',
      'monthlyDistanceTime',
      'monthlyEnergyUsage',
      'yearlyTrips',
      'yearlyDistanceEconomy',
      'yearlyDistanceTime',
      'yearlyEnergyUsage',
      'monthTripSummary'
    ];
    names.forEach(name => {
      if (!store.hasOwnProperty(name)) {
        store[name] = {};
      }
    });
    return store;
  }

  /**
   * @typedef {object} Store
   * @property {object} drivingAnalysisWeek
   * @property {object} drivingRecord
   * @property {object} drivingRecordCalendar
   * @property {object} drivingRecordMonth
   * @property {object} drivingRecordYear
   * @property {object} monthlyTrips
   * @property {object} monthlyDistanceEconomy
   * @property {object} monthlyDistanceTime
   * @property {object} monthlyEnergyUsage
   * @property {object} yearlyTrips
   * @property {object} yearlyDistanceEconomy
   * @property {object} yearlyDistanceTime
   * @property {object} yearlyEnergyUsage
   * @property {object} monthTripSummary
   */

  /**
   * @return {Store}
   */
  static newStore() {
    return NissanConnectStore.checkStoreStructure({});
  }

}

NissanConnectStore.basename = 'nissan-connect-store';
NissanConnectStore.path = './store';

module.exports = NissanConnectStore;
