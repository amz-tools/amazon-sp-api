module.exports = {
  vendorDirectFulfillmentPayments:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'submitInvoice'
  	],
    ...require('./versions/vendor_direct_fulfillment_payments/vendorDirectFulfillmentPayments_v1')
  }
};