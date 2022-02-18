const utils = require('../../../utils');

module.exports = {
  'v0':{
    getOrders:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders',
        restore_rate:180
      });
    },
    getOrder:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId,
        restore_rate:180
      });
    },
    getOrderBuyerInfo:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId + '/buyerInfo',
        restore_rate:180
      });
    },
    getOrderAddress:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId + '/address',
        restore_rate:180
      });
    },
    getOrderItems:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId + '/orderItems',
        restore_rate:180
      });
    },
    getOrderItemsBuyerInfo:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId + '/orderItems/buyerInfo',
        restore_rate:180
      });
    },
    updateShipmentStatus:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/orders/v0/orders/' + req_params.path.orderId + '/shipment',
        restore_rate:180 // TODO: No restore_rate in official docs yet, assuming same rate as other operations of orders endpoint
      });
    }
  }
};