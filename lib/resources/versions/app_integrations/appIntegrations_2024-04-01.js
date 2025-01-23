const utils = require('../../../utils');

module.exports = {
  '2024-04-01': {
    createNotification: (req_params) => {
      return Object.assign(req_params, {
        method: 'POST',
        api_path: '/appIntegrations/2024-04-01/notifications',
        restore_rate: 1
      });
    },
    deleteNotifications: (req_params) => {
      return Object.assign(req_params, {
        method: 'POST',
        api_path: '/appIntegrations/2024-04-01/notifications/deletion',
        restore_rate: 1
      });
    },
    recordActionFeedback: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          notificationId: {
            type: 'string'
          }
        }
      });
      return Object.assign(req_params, {
        method: 'POST',
        api_path: '/appIntegrations/2024-04-01/notifications/' + req_params.path.notificationId + '/feedback',
        restore_rate: 1
      });
    }
  }
};
