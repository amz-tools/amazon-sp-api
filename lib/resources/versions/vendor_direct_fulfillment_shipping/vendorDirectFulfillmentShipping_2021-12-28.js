const utils = require('../../../utils');

module.exports = {
  '2021-12-28':{
    getShippingLabels:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/shipping/2021-12-28/shippingLabels',
        restore_rate:0.1
      });
    },
    submitShippingLabelRequest:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/vendor/directFulfillment/shipping/2021-12-28/shippingLabels',
        restore_rate:0.1
      });
    },
    getShippingLabel:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          purchaseOrderNumber:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/shipping/2021-12-28/shippingLabels/' + req_params.path.purchaseOrderNumber,
        restore_rate:0.1
      });
    }
  }
};