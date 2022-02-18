const utils = require('../../../utils');

module.exports = {
  'v0':{
    getShipmentDetails:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          shipmentId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/brazil/v0/shipments/' + req_params.path.shipmentId,
        restore_rate:0.89
      });
    },
    submitInvoice:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          shipmentId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/fba/outbound/brazil/v0/shipments/' + req_params.path.shipmentId + '/invoice',
        restore_rate:0.89
      });
    },
    getInvoiceStatus:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          shipmentId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/outbound/brazil/v0/shipments/' + req_params.path.shipmentId + '/invoice/status',
        restore_rate:0.89
      });
    }
  }
};