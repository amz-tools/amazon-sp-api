const utils = require('../../../utils');

module.exports = {
  '2024-05-09': {
    createInbound: (req_params) => {
      return Object.assign(req_params, {
        method: 'POST',
        api_path: '/awd/2024-05-09/inboundOrders',
        restore_rate: 1
      });
    },
    getInbound: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          orderId: {
            type: 'string'
          }
        }
      });
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/awd/2024-05-09/inboundOrders/' + req_params.path.orderId,
        restore_rate: 0.5
      });
    },
    updateInbound: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          orderId: {
            type: 'string'
          }
        }
      });
      return Object.assign(req_params, {
        method: 'PUT',
        api_path: '/awd/2024-05-09/inboundOrders/' + req_params.path.orderId,
        restore_rate: 1
      });
    },
    cancelInbound: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          orderId: {
            type: 'string'
          }
        }
      });
      return Object.assign(req_params, {
        method: 'POST',
        api_path: '/awd/2024-05-09/inboundOrders/' + req_params.path.orderId + '/cancellation',
        restore_rate: 1
      });
    },
    confirmInbound: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          orderId: {
            type: 'string'
          }
        }
      });
      return Object.assign(req_params, {
        method: 'POST',
        api_path: '/awd/2024-05-09/inboundOrders/' + req_params.path.orderId + '/confirmation',
        restore_rate: 1
      });
    },
    getInboundShipment: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          shipmentId: {
            type: 'string'
          }
        }
      });
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/awd/2024-05-09/inboundShipments/' + req_params.path.shipmentId,
        restore_rate: 0.5
      });
    },
    getInboundShipmentLabels: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          shipmentId: {
            type: 'string'
          }
        }
      });
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/awd/2024-05-09/inboundShipments/' + req_params.path.shipmentId + '/labels',
        restore_rate: 1
      });
    },
    updateInboundShipmentTransportDetails: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          shipmentId: {
            type: 'string'
          }
        }
      });
      return Object.assign(req_params, {
        method: 'PUT',
        api_path: '/awd/2024-05-09/inboundShipments/' + req_params.path.shipmentId + '/transport',
        restore_rate: 1
      });
    },
    checkInboundEligibility: (req_params) => {
      return Object.assign(req_params, {
        method: 'POST',
        api_path: '/awd/2024-05-09/inboundEligibility',
        restore_rate: 1
      });
    },
    listInboundShipments: (req_params) => {
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/awd/2024-05-09/inboundShipments',
        restore_rate: 1
      });
    },
    listInventory: (req_params) => {
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/awd/2024-05-09/inventory',
        restore_rate: 1
      });
    }
  }
};
