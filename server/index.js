const express = require('express');
const NissanConnect = require('@beejjacobs/nissan-connect').NissanConnect;
const NissanConnectStore = require('./src/nissan-connect-store');
const config = require('./config-real.json');
const app = express();

let password = Buffer.from(config.password, 'base64').toString('ascii');
const nissanConnect = new NissanConnect(config.username, password);
const store = new NissanConnectStore(config.username, nissanConnect);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

function success(res, data) {
  res.status(200);
  res.send(data);
}

function failure(res, error) {
  console.log(error);
  res.status(500);
  res.send(error);
}

app.get('/drive/analysis', function (req, res) {
  nissanConnect.getDrivingAnalysisToday()
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});

app.get('/drive/analysis/week/:date', function (req, res) {
  store.getDrivingAnalysisWeek(req.params.date)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});

app.get('/drive/record/:day', function (req, res) {
  store.getDriveRecords(req.params.day)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});

app.get('/drive/record/days/:month', function (req, res) {
  store.getDriveRecordDays(req.params.month)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});

app.get('/drive/record/month/:month', function (req, res) {
  store.getDriveRecordsMonth(req.params.month)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});

app.get('/drive/record/year/:year', function (req, res) {
  store.getDriveRecordsYear(req.params.year)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});

app.get('/drive/trip/month/:month', function (req, res) {
  store.getMonthlyTrips(req.params.month)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});
app.get('/drive/trip/summary/:month', function (req, res) {
  store.getMonthTripSummary(req.params.month)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});
app.get('/drive/distance/economy/month/:month', function (req, res) {
  store.getMonthlyDistanceEconomy(req.params.month)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});
app.get('/drive/distance/time/month/:month', function (req, res) {
  store.getMonthlyDistanceTime(req.params.month)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});
app.get('/drive/energy/month/:month', function (req, res) {
  store.getMonthlyEnergyUsage(req.params.month)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});

app.get('/drive/trip/year/:year', function (req, res) {
  store.getYearlyTrips(req.params.year)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});
app.get('/drive/distance/economy/year/:year', function (req, res) {
  store.getYearlyDistanceEconomy(req.params.year)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});
app.get('/drive/distance/time/year/:year', function (req, res) {
  store.getYearlyDistanceTime(req.params.year)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});
app.get('/drive/energy/year/:year', function (req, res) {
  store.getYearlyEnergyUsage(req.params.year)
      .then(data => success(res, data))
      .catch(error => failure(res, error));
});

app.listen(config.port, function () {
  console.log(`listening on port ${config.port}`);
});
