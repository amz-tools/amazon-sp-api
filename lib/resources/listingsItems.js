module.exports = {
 	listingsItems:{
    __versions:[
    	'2020-09-01'
  	],
    __operations:[
    	'putListingsItem',
    	'deleteListingsItem',
    	'patchListingsItem'
  	],
    ...require('./versions/listings_items/listingsItems_2020-09-01')
  }
};