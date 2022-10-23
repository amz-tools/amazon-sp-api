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
        restore_rate:1
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
        restore_rate:1
      });
    },
    getMyFeesEstimates:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/products/fees/v0/feesEstimate',
        // No restore rate given in docs --> looking at other batch operations (i.e. in productPricing endpoint) we can assume
        // it will be the same restore rate per ASIN/SKU as for getMyFeesEstimateForSKU/ASIN, so it should be one request every 2 seconds
        restore_rate:2
      });
    }
  }
};