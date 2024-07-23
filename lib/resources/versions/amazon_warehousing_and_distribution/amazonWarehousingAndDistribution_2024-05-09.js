const utils = require("../../../utils");

module.exports = {
  "2024-05-09": {
    getInboundShipment: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/awd/2024-05-09/inboundShipments/" + req_params.path.shipmentId,
        restore_rate: 0.5
      });
    },
    listInboundShipments: (req_params) => {
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/awd/2024-05-09/inboundShipments",
        restore_rate: 1
      });
    },
    listInventory: (req_params) => {
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/awd/2024-05-09/inventory",
        restore_rate: 1
      });
    }
  }
};
