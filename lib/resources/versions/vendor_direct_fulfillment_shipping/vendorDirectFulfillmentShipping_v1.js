const utils = require('../../../utils');

module.exports = {
  'v1':{
    getShippingLabels:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/shipping/v1/shippingLabels',
        restore_rate:0.1
      });
    },
    submitShippingLabelRequest:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/vendor/directFulfillment/shipping/v1/shippingLabels',
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
        api_path:'/vendor/directFulfillment/shipping/v1/shippingLabels/' + req_params.path.purchaseOrderNumber,
        restore_rate:0.1
      });
    },
    submitShipmentConfirmations:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/vendor/directFulfillment/shipping/v1/shipmentConfirmations',
        restore_rate:0.1
      });
    },
    submitShipmentStatusUpdates:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/vendor/directFulfillment/shipping/v1/shipmentStatusUpdates',
        restore_rate:0.1
      });
    },
    getCustomerInvoices:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/shipping/v1/customerInvoices',
        restore_rate:0.1
      });
    },
    getCustomerInvoice:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          purchaseOrderNumber:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/shipping/v1/customerInvoices/' + req_params.path.purchaseOrderNumber,
        restore_rate:0.1
      });
    },
    getPackingSlips:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/shipping/v1/packingSlips',
        restore_rate:0.1
      });
    },
    getPackingSlip:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          purchaseOrderNumber:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/vendor/directFulfillment/shipping/v1/packingSlips/' + req_params.path.purchaseOrderNumber,
        restore_rate:0.1
      });
    }
  }
};