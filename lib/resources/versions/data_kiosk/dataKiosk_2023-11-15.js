const utils = require("../../../utils");

module.exports = {
  "2023-11-15": {
    getQueries: (req_params) => {
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/dataKiosk/2023-11-15/queries",
        restore_rate: 45
      });
    },
    createQuery: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/dataKiosk/2023-11-15/queries",
        restore_rate: 60
      });
    },
    getQuery: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          queryId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/dataKiosk/2023-11-15/queries/" + req_params.path.queryId,
        restore_rate: 0.5
      });
    },
    cancelQuery: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          queryId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "DELETE",
        api_path: "/dataKiosk/2023-11-15/queries/" + req_params.path.queryId,
        restore_rate: 45
      });
    },
    getDocument: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          documentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/dataKiosk/2023-11-15/queries/" + req_params.path.documentId,
        restore_rate: 60
      });
    }
  }
};
