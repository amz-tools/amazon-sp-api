module.exports = {
  vendorInvoices:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'submitInvoices'
  	],
    ...require('./versions/vendor_invoices/vendorInvoices_v1')
  }
};