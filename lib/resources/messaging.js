module.exports = {
  messaging: {
    __versions: ["v1"],
    __operations: [
      "getMessagingActionsForOrder",
      "confirmCustomizationDetails",
      "createConfirmDeliveryDetails",
      "createLegalDisclosure",
      "createNegativeFeedbackRemoval",
      "createConfirmOrderDetails",
      "createConfirmServiceDetails",
      "CreateAmazonMotors",
      "CreateWarranty",
      "GetAttributes",
      "createDigitalAccessKey",
      "createUnexpectedProblem",
      "sendInvoice"
    ],
    ...require("./versions/messaging/messaging_v1")
  }
};
