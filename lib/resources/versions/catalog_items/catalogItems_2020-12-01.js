const utils = require('../../../utils');

module.exports = {
  '2020-12-01':{
    searchCatalogItems:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/catalog/2020-12-01/items',
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
        api_path:'/catalog/2020-12-01/items/' + req_params.path.asin,
        restore_rate:0.2
      });
    }
  }
};