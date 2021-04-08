const utils = require('../../../utils');

module.exports = {
  'v0':{
    getEligibleShipmentServicesOld:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/mfn/v0/eligibleServices',
        restore_rate:1
      });
    },
    getEligibleShipmentServices:(req_params) => {
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
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/mfn/v0/shipments',
        restore_rate:1
      });
    },
    getAdditionalSellerInputsOld:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/mfn/v0/sellerInputs',
        restore_rate:1
      });
    },
    getAdditionalSellerInputs:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/mfn/v0/additionalSellerInputs',
        restore_rate:1
      });
    }
  }
};