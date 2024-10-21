module.exports = {
  supplySources: {
    __versions: ["2020-07-01"],
    __operations: [
      "getSupplySources",
      "createSupplySource",
      "getSupplySource",
      "updateSupplySource",
      "archiveSupplySource"
    ],
    ...require("./versions/supply_sources/supplySources_2020-07-01")
  }
};
