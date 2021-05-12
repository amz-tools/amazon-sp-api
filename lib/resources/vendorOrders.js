module.exports = {
  vendorOrders:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'getPurchaseOrders',
			'getPurchaseOrder',
			'submitAcknowledgement',
			'getPurchaseOrdersStatus'
  	],
    ...require('./versions/vendor_orders/vendorOrders_v1')
  }
};