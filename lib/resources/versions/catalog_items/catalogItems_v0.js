const utils = require('../../../utils');

module.exports = {
  'v0':{
    listCatalogCategories:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/catalog/v0/categories',
        restore_rate:1
      });
    }
  }
};