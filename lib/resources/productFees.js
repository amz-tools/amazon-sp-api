const utils = require('../utils');

module.exports = {
  getMyFeesEstimateForSKU:(req_params) => {
  	utils.checkParams(req_params, {
      body:{
        MarketplaceId:{
          type:'string'
        },
        PriceToEstimateFees:{
          type:'object'
        },
        Identifier:{
          type:'string'
        }
      },
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
    utils.checkParams(req_params, {
      body:{
        MarketplaceId:{
          type:'string'
        },
        PriceToEstimateFees:{
          type:'object'
        },
        Identifier:{
          type:'string'
        }
      },
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
};