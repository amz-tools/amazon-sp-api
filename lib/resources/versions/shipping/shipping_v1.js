const utils = require('../../../utils');

module.exports = {
  'v1':{
    createShipment:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/shipping/v1/shipments',
        restore_rate:0.2
      });
    },
    getShipment:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          shipmentId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/shipping/v1/shipments/' + req_params.path.shipmentId,
        restore_rate:0.2
      });
    },
    cancelShipment:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          shipmentId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/shipping/v1/shipments/' + req_params.path.shipmentId + '/cancel',
        restore_rate:0.2
      });
    },
    purchaseLabels:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          shipmentId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/shipping/v1/shipments/' + req_params.path.shipmentId + '/purchaseLabels',
        restore_rate:0.2
      });
    },
    retrieveShippingLabel:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          shipmentId:{
            type:'string'
          },
          trackingId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/shipping/v1/shipments/' + req_params.path.shipmentId + '/containers/' + req_params.path.trackingId + '/label',
        restore_rate:0.2
      });
    },
    purchaseShipment:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/shipping/v1/purchaseShipment',
        restore_rate:0.2
      });
    },
    getRates:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/shipping/v1/rates',
        restore_rate:0.2
      });
    },
    getAccount:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/shipping/v1/account',
        restore_rate:0.2
      });
    },
    getTrackingInformation:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          trackingId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/shipping/v1/tracking/' + req_params.path.trackingId,
        restore_rate:1
      });
    }
  }
};