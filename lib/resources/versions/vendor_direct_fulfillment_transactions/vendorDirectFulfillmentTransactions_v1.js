const utils = require('../../../utils');

module.exports = {
  'v1':{
    getTransactionStatus:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          transactionId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/transactions/v1/transactions/' + req_params.path.transactionId,
        restore_rate:0.1
      });
    }
  }
};