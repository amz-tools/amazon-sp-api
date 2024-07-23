module.exports = {
  fulfillmentOutbound: {
    __versions: ["2020-07-01"],
    __operations: [
      "getFulfillmentPreview",
      "deliveryOffers",
      "listAllFulfillmentOrders",
      "createFulfillmentOrder",
      "getPackageTrackingDetails",
      "listReturnReasonCodes",
      "createFulfillmentReturn",
      "getFulfillmentOrder",
      "updateFulfillmentOrder",
      "cancelFulfillmentOrder",
      "submitFulfillmentOrderStatusUpdate",
      "getFeatures",
      "getFeatureInventory",
      "getFeatureSKU"
    ],
    ...require("./versions/fulfillment_outbound/fulfillmentOutbound_2020-07-01")
  }
};
