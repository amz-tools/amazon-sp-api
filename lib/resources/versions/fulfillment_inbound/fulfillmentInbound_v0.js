const utils = require('../../../utils');

module.exports = {
  'v0':{
    getInboundGuidance:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/inbound/v0/itemsGuidance',
        restore_rate:0.5
      });
    },
    createInboundShipmentPlan:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/fba/inbound/v0/plans',
        restore_rate:0.5
      });
    },
    updateInboundShipment:(req_params) => {
      utils.checkParams(req_params, {
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
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/inbound/v0/shipments',
        restore_rate:0.5
      });
    },
    getShipmentItemsByShipmentId:(req_params) => {
      utils.checkParams(req_params, {
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
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/inbound/v0/shipmentItems',
        restore_rate:0.5
      });
    }
  }
};