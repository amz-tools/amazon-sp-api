const utils = require('../../../utils');

module.exports = {
  '2020-09-01':{
    searchDefinitionsProductTypes:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/definitions/2020-09-01/productTypes',
        restore_rate:0.2
      });
    },
    getDefinitionsProductType:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          productType:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/definitions/2020-09-01/productTypes/' + req_params.path.productType,
        restore_rate:0.2
      });
    }
  }
};