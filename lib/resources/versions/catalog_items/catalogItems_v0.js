const utils = require('../../../utils');

module.exports = {
  'v0':{
    listCatalogItems:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/catalog/v0/items',
        restore_rate:0.167
      });
    },
    getCatalogItem:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    	  path:{
          asin:{
            type:'string'
          }
        }
  	  });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/catalog/v0/items/' + req_params.path.asin,
        restore_rate:0.5
      });
    },
    listCatalogCategories:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/catalog/v0/categories',
        restore_rate:1
      });
    }
  }
};