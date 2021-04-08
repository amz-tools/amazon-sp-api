module.exports = {
   merchantFulfillment:{
    __versions:[
      'v0'
    ],
    __operations:[
      'getEligibleShipmentServicesOld',
      'getEligibleShipmentServices',
      'getShipment',
      'cancelShipment',
      'cancelShipmentOld',
      'createShipment',
      'getAdditionalSellerInputsOld',
      'getAdditionalSellerInputs'
    ],
    ...require('./versions/merchant_fulfillment/merchantFulfillment_v0')
  }
};