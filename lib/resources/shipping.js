module.exports = {
  shipping: {
    __versions: ["v1", "v2"],
    __operations: [
      "createShipment",
      "getShipment",
      "cancelShipment",
      "purchaseLabels",
      "retrieveShippingLabel",
      "purchaseShipment",
      "oneClickShipment",
      "getRates",
      "getAccount",
      "getTrackingInformation",
      "getTracking",
      "getShipmentDocuments",
      "getAccessPoints",
      "submitNdrFeedback",
      "getAdditionalInputs",
      "directPurchaseShipment"
    ],
    ...require("./versions/shipping/shipping_v1"),
    ...require("./versions/shipping/shipping_v2")
  }
};
