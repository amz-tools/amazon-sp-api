module.exports = {
  amazonWarehousingAndDistribution: {
    __versions: ["2024-05-09"],
    __operations: [
      "getInboundShipment",
      "listInboundShipments",
      "listInventory"
    ],
    ...require("./versions/amazon_warehousing_and_distribution/amazonWarehousingAndDistribution_2024-05-09")
  }
};
