module.exports = {
 	listingsItems:{
    __versions:[
    	'2020-09-01',
    	'2021-08-01'
  	],
    __operations:[
    	'getListingsItem',
    	'putListingsItem',
    	'deleteListingsItem',
    	'patchListingsItem'
  	],
    ...require('./versions/listings_items/listingsItems_2020-09-01'),
    ...require('./versions/listings_items/listingsItems_2021-08-01')
  }
};