module.exports = {
  vendorDirectFulfillmentTransactions:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'getTransactionStatus'
  	],
    ...require('./versions/vendor_direct_fulfillment_transactions/vendorDirectFulfillmentTransactions_v1')
  }
};