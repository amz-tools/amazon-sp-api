const utils = require('../utils');

module.exports = {
  listCatalogItems:(req_params) => {
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/catalog/v0/items',
      restore_rate:1
    });
  },
  getCatalogItem:(req_params) => {
  	utils.checkParams(req_params, {
  	  path:{
        asin:{
          type:'string'
        }
      }
	  });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/catalog/v0/items/' + req_params.path.asin,
      restore_rate:1
    });
  },
  listCatalogCategories:(req_params) => {
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/catalog/v0/categories',
      restore_rate:1
    });
  }
};