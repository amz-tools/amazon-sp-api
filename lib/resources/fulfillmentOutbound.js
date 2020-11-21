const utils = require('../utils');

module.exports = {
  getFulfillmentPreview:(req_params) => {
  	utils.checkParams(req_params, {
      body:{
        address:{
          type:'object'
        },
        items:{
          type:'array'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/fba/outbound/2020-07-01/fulfillmentOrders/preview',
      restore_rate:0.5
    });
  },
  listAllFulfillmentOrders:(req_params) => {
    utils.checkParams(req_params, {});
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/outbound/2020-07-01/fulfillmentOrders',
      restore_rate:0.5
    });
  },
  createFulfillmentOrder:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        sellerFulfillmentOrderId:{
          type:'string'
        },
        displayableOrderId:{
          type:'string'
        },
        displayableOrderDate:{
          type:'string'
        },
        displayableOrderComment:{
          type:'string'
        },
        shippingSpeedCategory:{
          type:'enum',
          enum:['Standard', 'Expedited', 'Priority', 'ScheduledDelivery']
        },
        destinationAddress:{
          type:'object'
        },
        items:{
          type:'array'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/fba/outbound/2020-07-01/fulfillmentOrders',
      restore_rate:0.5
    });
  },
  getPackageTrackingDetails:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        packageNumber:{
          type:'integer'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/outbound/2020-07-01/tracking',
      restore_rate:0.5
    });
  },
  listReturnReasonCodes:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        sellerSku:{
          type:'string'
        },
        language:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/outbound/2020-07-01/returnReasonCodes',
      restore_rate:0.5
    });
  },
  createFulfillmentReturn:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        items:{
          type:'array'
        }
      },
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
    utils.checkParams(req_params, {
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
    utils.checkParams(req_params, {
      body:{},
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
    utils.checkParams(req_params, {
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
    utils.checkParams(req_params, {
      query:{
        marketplaceId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/outbound/2020-07-01/features',
      restore_rate:0.5
    });
  },
  getFeatureInventory:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        marketplaceId:{
          type:'string'
        }
      },
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
    utils.checkParams(req_params, {
      query:{
        marketplaceId:{
          type:'string'
        }
      },
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
};