module.exports = {
  appIntegrations: {
    __versions: ['2024-04-01'],
    __operations: ['createNotification', 'deleteNotifications', 'recordActionFeedback'],
    ...require('./versions/app_integrations/appIntegrations_2024-04-01')
  }
};
