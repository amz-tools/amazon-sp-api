module.exports = {
  vendorShipments:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'SubmitShipmentConfirmations'
  	],
    ...require('./versions/vendor_shipments/vendorShipments_v1')
  }
};