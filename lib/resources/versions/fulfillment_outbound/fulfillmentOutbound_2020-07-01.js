const utils = require('../../../utils');

module.exports = {
  '2020-07-01':{
    getFulfillmentPreview:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/fba/outbound/2020-07-01/fulfillmentOrders/preview',
        restore_rate:0.5
      });
    },
    listAllFulfillmentOrders:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/2020-07-01/fulfillmentOrders',
        restore_rate:0.5
      });
    },
    createFulfillmentOrder:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/fba/outbound/2020-07-01/fulfillmentOrders',
        restore_rate:0.5
      });
    },
    getPackageTrackingDetails:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/2020-07-01/tracking',
        restore_rate:0.5
      });
    },
    listReturnReasonCodes:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/2020-07-01/returnReasonCodes',
        restore_rate:0.5
      });
    },
    createFulfillmentReturn:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          sellerFulfillmentOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/fba/outbound/2020-07-01/fulfillmentOrders/' + req_params.path.sellerFulfillmentOrderId + '/return',
        restore_rate:0.5
      });
    },
    getFulfillmentOrder:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          sellerFulfillmentOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/2020-07-01/fulfillmentOrders/' + req_params.path.sellerFulfillmentOrderId,
        restore_rate:0.5
      });
    },
    updateFulfillmentOrder:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          sellerFulfillmentOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/2020-07-01/fulfillmentOrders/' + req_params.path.sellerFulfillmentOrderId,
        restore_rate:0.5
      });
    },
    cancelFulfillmentOrder:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          sellerFulfillmentOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/fba/outbound/2020-07-01/fulfillmentOrders/' + req_params.path.sellerFulfillmentOrderId + '/cancel',
        restore_rate:0.5
      });
    },
    getFeatures:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/2020-07-01/features',
        restore_rate:0.5
      });
    },
    getFeatureInventory:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          featureName:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/2020-07-01/features/inventory/' + req_params.path.featureName,
        restore_rate:0.5
      });
    },
    getFeatureSKU:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          featureName:{
            type:'string'
          },
          sellerSku:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/2020-07-01/features/inventory/' + req_params.path.featureName + '/' + req_params.path.sellerSku,
        restore_rate:0.5
      });
    }
  }
};