module.exports = {
  "2022-03-23": {
    listHandoverSlots: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/easyShip/2022-03-23/timeSlot",
        restore_rate: 1
      });
    },
    getScheduledPackage: (req_params) => {
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/easyShip/2022-03-23/package",
        restore_rate: 1
      });
    },
    createScheduledPackage: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/easyShip/2022-03-23/package",
        restore_rate: 1
      });
    },
    updateScheduledPackages: (req_params) => {
      return Object.assign(req_params, {
        method: "PATCH",
        api_path: "/easyShip/2022-03-23/package",
        restore_rate: 1
      });
    },
    createScheduledPackageBulk: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/easyShip/2022-03-23/packages/bulk",
        restore_rate: 1
      });
    }
  }
};
