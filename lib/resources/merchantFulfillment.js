module.exports = {
  merchantFulfillment: {
    __versions: ["v0"],
    __operations: [
      "getEligibleShipmentServices",
      "getShipment",
      "cancelShipment",
      "createShipment",
      "getAdditionalSellerInputs"
    ],
    ...require("./versions/merchant_fulfillment/merchantFulfillment_v0")
  }
};
