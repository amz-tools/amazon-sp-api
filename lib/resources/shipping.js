const utils = require('../utils');

let address = {
  name:{
    required:true
  },
  addressLine1:{
    required:true
  },
  stateOrRegion:{
    required:true
  },
  city:{
    required:true
  },
  countryCode:{
    required:true
  },
  postalCode:{
    required:true
  }
};

let container = {
  containerType:{
    required:true
  },
  containerReferenceId:{
    required:true
  },
  value:{
    required:true,
    value:{
      value:{
        required:true
      },
      unit:{
        required:true
      }
    }
  },
  dimensions:{
    required:true,
    value:{
      length:{
        required:true
      },
      width:{
        required:true
      },
      height:{
        required:true
      },
      unit:{
        required:true
      }
    }
  },
  items:{
    required:true,
    value:[{
      quantity:{
        required:true
      },
      unitPrice:{
        required:true,
        value:{
          value:{
            required:true
          },
          unit:{
            required:true
          }
        }
      },
      unitWeight:{
        required:true,
        value:{
          value:{
            required:true
          },
          unit:{
            required:true
          }
        }
      },
      title:{
        required:true
      }
    }]
  }
};

module.exports = {
  createShipment:(req_params) => {
  	utils.checkParams(req_params, {
  		body:{
  			clientReferenceId:{
  				type:'string'
  			},
        shipTo:{
          type:'object'
        },
        shipFrom:{
          type:'object'
        },
        containers:{
          type:'array'
        }
  		}
  	});
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/shipping/v1/shipments',
      restore_rate:0.2
    });
  },
  getShipment:(req_params) => {
    utils.checkParams(req_params, {
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
    utils.checkParams(req_params, {
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
    utils.checkParams(req_params, {
      body:{
        rateId:{
          type:'string'
        },
        labelSpecification:{
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
      method:'POST',
      api_path:'/shipping/v1/shipments/' + req_params.path.shipmentId + '/purchaseLabels',
      restore_rate:0.2
    });
  },
  retrieveShippingLabel:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        labelSpecification:{
          type:'object'
        }
      },
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
    utils.checkParams(req_params, {
      body:{
        clientReferenceId:{
          type:'string'
        },
        shipTo:{
          type:'object'
        },
        shipFrom:{
          type:'object'
        },
        containers:{
          type:'array'
        },
        serviceType:{
          type:'enum',
          enum:['Amazon Shipping Ground', 'Amazon Shipping Standard', 'Amazon Shipping Premium']
        },
        labelSpecification:{
          type:'object'
        }
      },
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
      api_path:'/shipping/v1/purchaseShipment',
      restore_rate:0.2
    });
  },
  getRates:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        shipTo:{
          type:'object'
        },
        shipFrom:{
          type:'object'
        },
        serviceTypes:{
          type:'enumarray',
          enum:['Amazon Shipping Ground', 'Amazon Shipping Standard', 'Amazon Shipping Premium']
        },
        containerSpecifications:{
          type:'array'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/shipping/v1/rates',
      restore_rate:0.2
    });
  },
  getAccount:(req_params) => {
    utils.checkParams(req_params, {});
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/shipping/v1/account',
      restore_rate:0.2
    });
  },
  getTrackingInformation:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        trackingId:{
          type:'array'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/shipping/v1/tracking/' + req_params.path.trackingId,
      restore_rate:1
    });
  }
};