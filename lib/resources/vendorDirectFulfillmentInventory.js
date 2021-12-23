module.exports = {
  vendorDirectFulfillmentInventory:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'submitInventoryUpdate'
  	],
    ...require('./versions/vendor_direct_fulfillment_inventory/vendorDirectFulfillmentInventory_v1')
  }
};