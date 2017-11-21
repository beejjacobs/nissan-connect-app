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
    if (store.hasOwnProperty(key) && !Utils.isThisWeek(date)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let drivingAnalysisWeek = await this.nissanConnect.getDrivingAnalysisWeek(date);
    store[key] = drivingAnalysisWeek;
    await this.save();
    return drivingAnalysisWeek;
  }

  /**
   * @param {string|moment.Moment} date
   * @return {Promise.<DrivingRecord>}
   */
  async getDriveRecords(date) {
    let key = moment(date).format('YYYY-MM-DD');
    let store = this.store.drivingRecord;
    if (store.hasOwnProperty(key) && !Utils.isToday(date)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let driveRecords = await this.nissanConnect.getDriveRecords(date);
    store[key] = driveRecords;
    await this.save();
    return driveRecords;
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<Calendar>}
   */
  async getDriveRecordDays(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.drivingRecordCalendar;
    if (store.hasOwnProperty(key) && !Utils.isThisMonth(month)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let calendar = await this.nissanConnect.getDriveRecordDays(month);
    store[key] = calendar;
    await this.save();
    return calendar;
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<DrivingRecordMonth>}
   */
  async getDriveRecordsMonth(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.drivingRecordMonth;
    if (store.hasOwnProperty(key) && !Utils.isThisMonth(month)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let driveRecords = await this.nissanConnect.getDriveRecordsMonth(month);
    store[key] = driveRecords;
    await this.save();
    return driveRecords;
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<DrivingRecordYear>}
   */
  async getDriveRecordsYear(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.drivingRecordYear;
    if (store.hasOwnProperty(key) && !Utils.isThisYear(year)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let driveRecords = await this.nissanConnect.getDriveRecordsYear(year + '-01');
    store[key] = driveRecords;
    await this.save();
    return driveRecords;
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<GraphDataPoints>}
   */
  async getMonthlyTrips(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.monthlyTrips;
    if (store.hasOwnProperty(key) && !Utils.isThisMonth(month)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let trips = await this.nissanConnect.getMonthlyTrips(month);
    store[key] = trips;
    await this.save();
    return trips;
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<DistanceEconomyDataPoints>}
   */
  async getMonthlyDistanceEconomy(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.monthlyDistanceEconomy;
    if (store.hasOwnProperty(key) && Utils.isThisMonth(month)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let de = await this.nissanConnect.getMonthlyDistanceEconomy(month);
    store[key] = de;
    await this.save();
    return de;
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<DistanceTimeDataPoints>}
   */
  async getMonthlyDistanceTime(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.monthlyDistanceTime;
    if (store.hasOwnProperty(key) && !Utils.isThisMonth(month)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let dt = await this.nissanConnect.getMonthlyDistanceTime(month);
    store[key] = dt;
    await this.save();
    return dt;
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<GraphDataPoints>}
   */
  async getMonthlyEnergyUsage(month) {
    let key = moment(month).format('YYYY-MM');
    if (this.store.monthlyEnergyUsage.hasOwnProperty(key) && !Utils.isThisMonth(month)) {
      this.logger.log(`found ${key} in the store`);
      return this.store.monthlyEnergyUsage[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let dt = await this.nissanConnect.getMonthlyEnergyUsage(month);
    this.store.monthlyEnergyUsage[key] = dt;
    await this.save();
    return dt;
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<GraphDataPoints>}
   */
  async getYearlyTrips(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.yearlyTrips;
    if (store.hasOwnProperty(key) && !Utils.isThisYear(year)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let data = await this.nissanConnect.getYearlyTrips(year + '-01');
    store[key] = data;
    await this.save();
    return data;
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<DistanceEconomyDataPoints>}
   */
  async getYearlyDistanceEconomy(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.yearlyDistanceEconomy;
    if (store.hasOwnProperty(key) && !Utils.isThisYear(year)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let data = await this.nissanConnect.getYearlyDistanceEconomy(year + '-01');
    store[key] = data;
    await this.save();
    return data;
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<DistanceTimeDataPoints>}
   */
  async getYearlyDistanceTime(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.yearlyDistanceTime;
    if (store.hasOwnProperty(key) && !Utils.isThisYear(year)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let data = await this.nissanConnect.getYearlyDistanceTime(year + '-01');
    store[key] = data;
    await this.save();
    return data;
  }

  /**
   * @param {string|moment.Moment} year
   * @return {Promise.<GraphDataPoints>}
   */
  async getYearlyEnergyUsage(year) {
    let key = moment().year(year).format('YYYY');
    let store = this.store.yearlyEnergyUsage;
    if (store.hasOwnProperty(key) && !Utils.isThisYear(year)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let data = await this.nissanConnect.getYearlyEnergyUsage(year + '-01');
    store[key] = data;
    await this.save();
    return data;
  }

  /**
   * @param {string|moment.Moment} month
   * @return {Promise.<TripSummaryMonth>}
   */
  async getMonthTripSummary(month) {
    let key = moment(month).format('YYYY-MM');
    let store = this.store.monthTripSummary;
    if (store.hasOwnProperty(key) && !Utils.isThisMonth(month)) {
      this.logger.log(`found ${key} in the store`);
      return store[key];
    }
    this.logger.log(`can't find ${key} in store, fetching and saving`);
    let data = await this.nissanConnect.getMonthTripSummary(month);
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
    let file = fs.readFileSync(this.filePath, 'utf8');
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
