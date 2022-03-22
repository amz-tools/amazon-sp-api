const utils = require('../../../utils');

let notificationTypeEnum = [
  'ACCOUNT_STATUS_CHANGED',
  'ANY_OFFER_CHANGED',
  'B2B_ANY_OFFER_CHANGED', 
  'FBA_OUTBOUND_SHIPMENT_STATUS',
  'FEE_PROMOTION',
  'FEED_PROCESSING_FINISHED',
  'FULFILLMENT_ORDER_STATUS',
  'MFN_ORDER_STATUS_CHANGE',
  'ORDER_STATUS_CHANGE',
  'REPORT_PROCESSING_FINISHED',
  'BRANDED_ITEM_CONTENT_CHANGE',
  'ITEM_PRODUCT_TYPE_CHANGE',
  'LISTINGS_ITEM_STATUS_CHANGE',
  'LISTINGS_ITEM_ISSUES_CHANGE',
  'PRODUCT_TYPE_DEFINITIONS_CHANGE'
];

module.exports = {
  'v1':{
    getSubscription:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
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
      req_params = utils.checkAndEncodeParams(req_params, {
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
      req_params = utils.checkAndEncodeParams(req_params, {
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
        restore_rate:1,
        is_grantless:true,
        scope:'sellingpartnerapi::notifications'
      });
    },
    deleteSubscriptionById:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
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
        restore_rate:1,
        is_grantless:true,
        scope:'sellingpartnerapi::notifications'
      });
    },
    getDestinations:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/notifications/v1/destinations',
        restore_rate:1,
        is_grantless:true,
        scope:'sellingpartnerapi::notifications'
      });
    },
    createDestination:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/notifications/v1/destinations',
        restore_rate:1,
        is_grantless:true,
        scope:'sellingpartnerapi::notifications'
      });
    },
    getDestination:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          destinationId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/notifications/v1/destinations/' + req_params.path.destinationId,
        restore_rate:1,
        is_grantless:true,
        scope:'sellingpartnerapi::notifications'
      });
    },
    deleteDestination:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          destinationId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'DELETE',
        api_path:'/notifications/v1/destinations/' + req_params.path.destinationId,
        restore_rate:1,
        is_grantless:true,
        scope:'sellingpartnerapi::notifications'
      });
    }
  }
};