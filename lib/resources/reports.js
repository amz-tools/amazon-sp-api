module.exports = {
  reports: {
    __versions: ['2021-06-30'],
    __operations: [
      'getReports',
      'createReport',
      'getReport',
      'cancelReport',
      'getReportSchedules',
      'createReportSchedule',
      'getReportSchedule',
      'cancelReportSchedule',
      'getReportDocument'
    ],
    ...require('./versions/reports/reports_2021-06-30')
  }
};
