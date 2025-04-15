module.exports = {
  v1: {
    SubmitShipmentConfirmations: (req_params) => {
      return Object.assign(req_params, {
        method: 'POST',
        api_path: '/vendor/shipping/v1/shipmentConfirmations',
        restore_rate: 0.1
      });
    },
    GetShipmentDetails: (req_params) => {
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/vendor/shipping/v1/shipments',
        restore_rate: 0.1
      });
    },
    SubmitShipments: (req_params) => {
      return Object.assign(req_params, {
        method: 'POST',
        api_path: '/vendor/shipping/v1/shipments',
        restore_rate: 0.1
      });
    },
    GetShipmentLabels: (req_params) => {
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/vendor/shipping/v1/transportLabels',
        restore_rate: 0.1
      });
    }
  }
};
