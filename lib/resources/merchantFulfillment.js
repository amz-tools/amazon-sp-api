const utils = require('../utils');

let address = {
  required:true,
  value:{
    Name:{
      required:true
    },
    AddressLine1:{
      required:true
    },
    Email:{
      required:true
    },
    City:{
      required:true
    },
    PostalCode:{
      required:true
    },
    CountryCode:{
      required:true
    },
    Phone:{
      required:true
    }
  }
};
let shipment_request_details = {
  required:true,
  value:{
    AmazonOrderId:{
      required:true
    },
    ItemList:{
      required:true,
      value:[{
        OrderItemId:{
          required:true
        },
        Quantity:{
          required:true
        },
        ShipFromAddress:address,
        PackageDimensions:{
          required:true,
          value:{
            PredefinedPackageDimensions:{
              required:true,
              nexists:['Length','Width','Height','Unit']
            },
            Length:{
              required:true,
              nexists:'PredefinedPackageDimensions'
            },
            Width:{
              required:true,
              nexists:'PredefinedPackageDimensions'
            },
            Height:{
              required:true,
              nexists:'PredefinedPackageDimensions'
            },
            Unit:{
              required:true,
              nexists:'PredefinedPackageDimensions'
            }
          }
        },
        Weight:{
          required:true,
          value:{
            Value:{
              required:true
            },
            Unit:{
              required:true
            }
          }
        }
      }]
    },
    ShippingServiceOptions:{
      required:true,
      value:{
        DeliveryExperience:{
          required:true
        },
        CarrierWillPickUp:{
          required:true
        }
      }
    }
  }
};

module.exports = {
  getEligibleShipmentServicesOld:(req_params) => {
  	utils.checkParams(req_params, {
      body:{
        ShipmentRequestDetails:{
          type:'object'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/mfn/v0/eligibleServices',
      restore_rate:1
    });
  },
  getEligibleShipmentServices:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        ShipmentRequestDetails:{
          type:'object'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/mfn/v0/eligibleShippingServices',
      restore_rate:1
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
      api_path:'/mfn/v0/shipments/' + req_params.path.shipmentId,
      restore_rate:1
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
      method:'DELETE',
      api_path:'/mfn/v0/shipments/' + req_params.path.shipmentId,
      restore_rate:1
    });
  },
  cancelShipmentOld:(req_params) => {
    utils.checkParams(req_params, {
      path:{
        shipmentId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'PUT',
      api_path:'/mfn/v0/shipments/' + req_params.path.shipmentId + '/cancel',
      restore_rate:1
    });
  },
  createShipment:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        ShipmentRequestDetails:{
          type:'object'
        },
        ShippingServiceId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/mfn/v0/shipments',
      restore_rate:1
    });
  },
  getAdditionalSellerInputsOld:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        ShippingServiceId:{
          type:'string'
        },
        ShipFromAddress:{
          type:'object'
        },
        OrderId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/mfn/v0/sellerInputs',
      restore_rate:1
    });
  },
  getAdditionalSellerInputs:(req_params) => {
    utils.checkParams(req_params, {
      body:{
        ShippingServiceId:{
          type:'string'
        },
        ShipFromAddress:{
          type:'object'
        },
        OrderId:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/mfn/v0/additionalSellerInputs',
      restore_rate:1
    });
  }
};