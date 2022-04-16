module.exports = {
  vendorDirectFulfillmentTransactions:{
    __versions:[
    	'v1',
    	'2021-12-28'
  	],
    __operations:[
    	'getTransactionStatus'
  	],
    ...require('./versions/vendor_direct_fulfillment_transactions/vendorDirectFulfillmentTransactions_v1'),
    ...require('./versions/vendor_direct_fulfillment_transactions/vendorDirectFulfillmentTransactions_2021-12-28')
  }
};