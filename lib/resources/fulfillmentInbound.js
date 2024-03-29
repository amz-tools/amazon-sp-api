module.exports = {
  fulfillmentInbound: {
    __versions: ["v0"],
    __operations: [
      "createInboundShipmentPlan",
      "updateInboundShipment",
      "createInboundShipment",
      "getPreorderInfo",
      "confirmPreorder",
      "getPrepInstructions",
      "getTransportDetails",
      "putTransportDetails",
      "voidTransport",
      "estimateTransport",
      "confirmTransport",
      "getLabels",
      "getBillOfLading",
      "getShipments",
      "getShipmentItemsByShipmentId",
      "getShipmentItems"
    ],
    ...require("./versions/fulfillment_inbound/fulfillmentInbound_v0")
  }
};
