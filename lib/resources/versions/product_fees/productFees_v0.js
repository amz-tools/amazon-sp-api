const utils = require('../../../utils');

module.exports = {
  'v0':{
    getMyFeesEstimateForSKU:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          SellerSKU:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/products/fees/v0/listings/' + req_params.path.SellerSKU + '/feesEstimate',
        restore_rate:0.1
      });
    },
    getMyFeesEstimateForASIN:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          Asin:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/products/fees/v0/items/' + req_params.path.Asin + '/feesEstimate',
        restore_rate:0.1
      });
    }
  }
};