const utils = require('../utils');

module.exports = {
  getInboundGuidance:(req_params) => {
  	utils.checkParams(req_params, {
      query:{
        MarketplaceId:{
          type:'string'
        },
        SellerSKUList:{
          type:'array',
          cond:{
            nexists:'ASINList'
          }
        },
        ASINList:{
          type:'array',
          cond:{
            nexists:'ASINList'
          }
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v0/itemsGuidance',
      restore_rate:0.5
    });
  },
  createInboundShipmentPlan:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        ShipFromAddress:{
          type:'object'
        },
        LabelPrepPreference:{
          type:'enum',
          enum:['SELLER_LABEL', 'AMAZON_LABEL_ONLY', 'AMAZON_LABEL_PREFERRED']
        },
        InboundShipmentPlanRequestItems:{
          type:'array'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/fba/inbound/v0/plans',
      restore_rate:0.5
    });
  },
  updateInboundShipment:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        InboundShipmentHeader:{
          type:'object'
        },
        InboundShipmenItems:{
          type:'array'
        },
        MarketplaceId:{
          type:'string'
        }
      },
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'PUT',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId,
      restore_rate:0.5
    });
  },
  createInboundShipment:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        InboundShipmentHeader:{
          type:'object'
        },
        InboundShipmenItems:{
          type:'array'
        },
        MarketplaceId:{
          type:'string'
        }
      },
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId,
      restore_rate:0.5
    });
  },
  getPreorderInfo:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        MarketplaceId:{
          type:'string'
        }
      },
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/preorder',
      restore_rate:0.5
    });
  },
  confirmPreorder:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        MarketplaceId:{
          type:'string'
        },
        NeedByDate:{
          type:'string'
        }
      },
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'PUT',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/preorder/confirm',
      restore_rate:0.5
    });
  },
  getPrepInstructions:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        ShipToCountryCode:{
          type:'string'
        },
        SellerSKUList:{
          type:'array',
          cond:{
            nexists:'ASINList'
          }
        },
        ASINList:{
          type:'array',
          cond:{
            nexists:'SellerSKUList'
          }
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v0/prepInstructions',
      restore_rate:0.5
    });
  },
  getTransportDetails:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/transport',
      restore_rate:0.5
    });
  },
  putTransportDetails:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        IsPartnered:{
          type:'boolean'
        },
        ShipmentType:{
          type:'enum',
          enum:['SP', 'LTL']
        },
        TransportDetails:{
          type:'object'
        }
      },
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'PUT',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/transport',
      restore_rate:0.5
    });
  },
  voidTransport:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/transport/void',
      restore_rate:0.5
    });
  },
  estimateTransport:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/transport/estimate',
      restore_rate:0.5
    });
  },
  confirmTransport:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/transport/confirm',
      restore_rate:0.5
    });
  },
  getLabels:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        PageType:{
          type:'enum',
          enum:['PackageLabel_Letter_2', 'PackageLabel_Letter_4', 'PackageLabel_Letter_6', 'PackageLabel_Letter_6_CarrierLeft',
            'PackageLabel_A4_2', 'PackageLabel_A4_4', 'PackageLabel_Plain_Paper', 'PackageLabel_Plain_Paper_CarrierBottom',
            'PackageLabel_Thermal', 'PackageLabel_Thermal_Unified', 'PackageLabel_Thermal_NonPCP', 'PackageLabel_Thermal_No_Carrier_Rotation']
        },
        LabelType:{
          type:'enum',
          enum:['DEFAULT', 'UNIQUE', 'PALLET']
        }
      },
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/labels',
      restore_rate:0.5
    });
  },
  getBillOfLading:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/billOfLading',
      restore_rate:0.5
    });
  },
  getShipments:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        QueryType:{
          type:'enum',
          enum:['SHIPMENT', 'DATE_RANGE', 'NEXT_TOKEN']
        },
        ShipmentStatusList:{
          type:'enumarray',
          enum:['WORKING', 'SHIPPED', 'RECEIVING', 'CANCELLED', 'DELETED', 'CLOSED', 'ERROR', 'IN_TRANSIT', 'DELIVERED', 'CHECKED_IN'],
          cond:{
            equals:{
              QueryType:'SHIPMENT'
            },
            nexists:'ShipmentIdList'
          }
        },
        ShipmentIdList:{
          type:'array',
          cond:{
            equals:{
              QueryType:'SHIPMENT'
            },
            nexists:'ShipmentStatusList'
          }
        },
        LastUpdatedAfter:{
          type:'string',
          cond:{
            equals:{
              QueryType:'DATE_RANGE'
            }
          }
        },
        LastUpdatedBefore:{
          type:'string',
          cond:{
            equals:{
              QueryType:'DATE_RANGE'
            }
          }
        },
        NextToken:{
          type:'string',
          cond:{
            equals:{
              QueryType:'NEXT_TOKEN'
            }
          }
        },
        MarketplaceId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v0/shipments',
      restore_rate:0.5
    });
  },
  getShipmentItemsByShipmentId:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        MarketplaceId:{
          type:'string'
        }
      },
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v0/shipments/' + req_params.path.shipmentId + '/items',
      restore_rate:0.5
    });
  },
  getShipmentItems:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        QueryType:{
          type:'enum',
          enum:['SHIPMENT', 'DATE_RANGE', 'NEXT_TOKEN']
        },
        LastUpdatedAfter:{
          type:'string',
          cond:{
            equals:{
              QueryType:'DATE_RANGE'
            }
          }
        },
        LastUpdatedBefore:{
          type:'string',
          cond:{
            equals:{
              QueryType:'DATE_RANGE'
            }
          }
        },
        NextToken:{
          type:'string',
          cond:{
            equals:{
              QueryType:'NEXT_TOKEN'
            }
          }
        },
        MarketplaceId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v0/shipmentItems',
      restore_rate:0.5
    });
  }
};