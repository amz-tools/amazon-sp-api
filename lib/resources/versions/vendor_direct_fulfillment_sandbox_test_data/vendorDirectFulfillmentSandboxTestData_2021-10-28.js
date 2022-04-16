const utils = require('../../../utils');

module.exports = {
  '2021-10-28':{
    generateOrderScenarios:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          transactionId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/vendor/directFulfillment/sandbox/2021-10-28/orders'
      });
    },
    getOrderScenarios:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          transactionId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/sandbox/2021-10-28/transactions/' + req_params.path.transactionId
      });
    }
  }
};