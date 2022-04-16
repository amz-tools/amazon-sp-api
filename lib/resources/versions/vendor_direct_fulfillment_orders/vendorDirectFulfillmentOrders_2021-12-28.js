const utils = require('../../../utils');

module.exports = {
  '2021-12-28':{
    getOrders:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/orders/2021-12-28/purchaseOrders',
        restore_rate:0.1
      });
    },
    getOrder:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          purchaseOrderNumber:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/orders/2021-12-28/purchaseOrders/' + req_params.path.purchaseOrderNumber,
        restore_rate:0.1
      });
    },
    submitAcknowledgement:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/vendor/directFulfillment/orders/2021-12-28/acknowledgements',
        restore_rate:0.1
      });
    }
  }
};