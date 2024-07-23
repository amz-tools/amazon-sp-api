module.exports = {
  easyShip: {
    __versions: ["2022-03-23"],
    __operations: [
      "listHandoverSlots",
      "getScheduledPackage",
      "createScheduledPackage",
      "updateScheduledPackages",
      "createScheduledPackageBulk"
    ],
    ...require("./versions/easy_ship/easyShip_2022-03-23")
  }
};
