module.exports = {
  vendorDirectFulfillmentOrders:{
    __versions:[
    	'v1',
      '2021-12-28'
  	],
    __operations:[
    	'getOrders',
    	'getOrder',
    	'submitAcknowledgement'
  	],
    ...require('./versions/vendor_direct_fulfillment_orders/vendorDirectFulfillmentOrders_v1'),
    ...require('./versions/vendor_direct_fulfillment_orders/vendorDirectFulfillmentOrders_2021-12-28')
  }
};