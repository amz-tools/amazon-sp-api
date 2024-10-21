const utils = require("../../../utils");

// No restore rates given in docs, so we just assume one request per second
module.exports = {
  "2020-07-01": {
    getSupplySources: (req_params) => {
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/supplySources/2020-07-01/supplySources",
        restore_rate: 1
      });
    },
    createSupplySource: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/supplySources/2020-07-01/supplySources",
        restore_rate: 1
      });
    },
    getSupplySource: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          supplySourceId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/supplySources/2020-07-01/supplySources/" +
          req_params.path.supplySourceId,
        restore_rate: 1
      });
    },
    updateSupplySource: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          supplySourceId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "PUT",
        api_path:
          "/supplySources/2020-07-01/supplySources/" +
          req_params.path.supplySourceId,
        restore_rate: 1
      });
    },
    archiveSupplySource: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          supplySourceId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "DELETE",
        api_path:
          "/supplySources/2020-07-01/supplySources/" +
          req_params.path.supplySourceId,
        restore_rate: 1
      });
    }
  }
};
