const utils = require('../utils');

let notificationTypeEnum = ['ANY_OFFER_CHANGED', 'FEED_PROCESSING_FINISHED', 'FBA_OUTBOUND_SHIPMENT_STATUS', 'FEE_PROMOTION',
  'FULFILLMENT_ORDER_STATUS', 'REPORT_PROCESSING_FINISHED', 'BRANDED_ITEM_CONTENT_CHANGE', 'ITEM_PRODUCT_TYPE_CHANGE',
  'MFN_ORDER_STATUS_CHANGE', 'B2B_ANY_OFFER_CHANGED'];

module.exports = {
  getSubscription:(req_params) => {
  	utils.checkParams(req_params, {
      path:{
        notificationType:{
          type:'enum',
          enum:notificationTypeEnum
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/notifications/v1/subscriptions/' + req_params.path.notificationType,
      restore_rate:1
    });
  },
  createSubscription:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        notificationType:{
          type:'enum',
          enum:notificationTypeEnum
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/notifications/v1/subscriptions/' + req_params.path.notificationType,
      restore_rate:1
    });
  },
  getSubscriptionById:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        subscriptionId:{
          type:'string'
        },
        notificationType:{
          type:'enum',
          enum:notificationTypeEnum
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/notifications/v1/subscriptions/' + req_params.path.notificationType + '/' + req_params.path.subscriptionId,
      restore_rate:1
    });
  },
  deleteSubscriptionById:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        subscriptionId:{
          type:'string'
        },
        notificationType:{
          type:'enum',
          enum:notificationTypeEnum
        }
      }
    });
    return Object.assign(req_params, {
      method:'DELETE',
      api_path:'/notifications/v1/subscriptions/' + req_params.path.notificationType + '/' + req_params.path.subscriptionId,
      restore_rate:1
    });
  },
  getDestinations:(req_params) => {
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/notifications/v1/destinations',
      restore_rate:1
    });
  },
  createDestination:(req_params) => {
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/notifications/v1/destinations',
      restore_rate:1
    });
  },
  getDestination:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        destinationId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/notifications/v1/destinations/' + req_params.path.destinationId,
      restore_rate:1
    });
  },
  deleteDestination:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        destinationId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'DELETE',
      api_path:'/notifications/v1/destinations/' + req_params.path.destinationId,
      restore_rate:1
    });
  }
};