module.exports = {
  catalogItems:{
    __versions:[
    	'v0',
    	'2020-12-01',
      '2022-04-01'
  	],
    __operations:[
    	'getCatalogItem',
    	'listCatalogCategories',
      'searchCatalogItems'
  	],
    ...require('./versions/catalog_items/catalogItems_v0'),
    ...require('./versions/catalog_items/catalogItems_2020-12-01'),
    ...require('./versions/catalog_items/catalogItems_2022-04-01')
  }
};