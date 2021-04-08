module.exports = {
 	fbaInventory:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'getInventorySummaries'
  	],
    ...require('./versions/fba_inventory/fbaInventory_v1')
  }
};