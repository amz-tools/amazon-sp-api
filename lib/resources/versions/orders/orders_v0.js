const utils = require('../../../utils');

module.exports = {
  'v0':{
    getOrders:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders',
        restore_rate:1
      });
    },
    getOrder:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId,
        restore_rate:1
      });
    },
    getOrderBuyerInfo:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId + '/buyerInfo',
        restore_rate:1
      });
    },
    getOrderAddress:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId + '/address',
        restore_rate:1
      });
    },
    getOrderItems:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId + '/orderItems',
        restore_rate:1
      });
    },
    getOrderItemsBuyerInfo:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          orderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/orders/v0/orders/' + req_params.path.orderId + '/orderItems/buyerInfo',
        restore_rate:1
      });
    }
  }
};