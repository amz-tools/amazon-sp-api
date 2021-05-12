module.exports = {
  vendorDirectFulfillmentOrders:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'getOrders',
    	'getOrder',
    	'submitAcknowledgement'
  	],
    ...require('./versions/vendor_direct_fulfillment_orders/vendorDirectFulfillmentOrders_v1')
  }
};