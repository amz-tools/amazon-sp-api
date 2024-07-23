module.exports = {
  "2023-11-30": {
    rotateApplicationClientSecret: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/applications/2023-11-30/clientSecret",
        restore_rate: 60
      });
    }
  }
};
