module.exports = {
  vendorTransactionStatus:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'getTransaction'
  	],
    ...require('./versions/vendor_transaction_status/vendorTransactionStatus_v1')
  }
};