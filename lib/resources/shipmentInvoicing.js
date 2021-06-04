module.exports = {
	// shipmentInvoicing endpoint is available only for the Brazil marketplace!
  shipmentInvoicing:{
    __versions:[
    	'v0'
    ],
    __operations:[
	    'getShipmentDetails',
	    'submitInvoice',
	    'getInvoiceStatus'
    ],
    ...require('./versions/shipment_invoicing/shipmentInvoicing_v0')
  }
};