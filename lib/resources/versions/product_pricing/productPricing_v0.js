const utils = require('../../../utils');

module.exports = {
  'v0':{
    getPricing:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/products/pricing/v0/price',
        restore_rate:0.1
      });
    },
    getCompetitivePricing:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/products/pricing/v0/competitivePrice',
        restore_rate:0.1
      });
    },
    getListingOffers:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          SellerSKU:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/products/pricing/v0/listings/' + req_params.path.SellerSKU + '/offers',
        restore_rate:0.2
      });
    },
    getItemOffers:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          Asin:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/products/pricing/v0/items/' + req_params.path.Asin + '/offers',
        restore_rate:0.2
      });
    }
  }
};