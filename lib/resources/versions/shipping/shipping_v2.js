const utils = require("../../../utils");

module.exports = {
  v2: {
    getRates: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/shipping/v2/shipments/rates",
        restore_rate: 0.2
      });
    },
    purchaseShipment: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/shipping/v2/shipments",
        restore_rate: 0.2
      });
    },
    oneClickShipment: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/shipping/v2/oneClickShipment",
        restore_rate: 0.2
      });
    },
    getTracking: (req_params) => {
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/shipping/v2/tracking",
        restore_rate: 0.2
      });
    },
    getShipmentDocuments: (req_params) => {
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
          "/shipping/v2/shipments/" + req_params.path.shipmentId + "/documents",
        restore_rate: 0.2
      });
    },
    cancelShipment: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "PUT",
        api_path:
          "/shipping/v2/shipments/" + req_params.path.shipmentId + "/cancel",
        restore_rate: 0.2
      });
    },
    getAccessPoints: (req_params) => {
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/shipping/v2/accessPoints",
        restore_rate: 0.2
      });
    },
    submitNdrFeedback: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/shipping/v2/ndrFeedback",
        restore_rate: 0.2
      });
    },
    getAdditionalInputs: (req_params) => {
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/shipping/v2/shipments/additionalInputs/schema",
        restore_rate: 0.2
      });
    },
    directPurchaseShipment: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/shipping/v2/shipments/directPurchase",
        restore_rate: 0.2
      });
    }
  }
};
