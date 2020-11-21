const utils = require('../utils');

module.exports = {
  getPricing:(req_params) => {
  	utils.checkParams(req_params, {
      query:{
        MarketplaceId:{
          type:'string'
        },
        ItemType:{
          type:'enum',
          enum:['Asin', 'Sku']
        },
        Asins:{
          type:'array',
          cond:{
            equals:{
              ItemType:'Asin'
            }
          }
        },
        Skus:{
          type:'array',
          cond:{
            equals:{
              ItemType:'Sku'
            }
          }
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/products/pricing/v0/price',
      restore_rate:1
    });
  },
  getCompetitivePricing:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        MarketplaceId:{
          type:'string'
        },
        ItemType:{
          type:'enum',
          enum:['Asin', 'Sku']
        },
        Asins:{
          type:'array',
          cond:{
            equals:{
              ItemType:'Asin'
            }
          }
        },
        Skus:{
          type:'array',
          cond:{
            equals:{
              ItemType:'Sku'
            }
          }
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/products/pricing/v0/competitivePrice',
      restore_rate:1
    });
  },
  getListingOffers:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        MarketplaceId:{
          type:'string'
        },
        ItemCondition:{
          type:'enum',
          enum:['New', 'Used', 'Collectible', 'Refurbished', 'Club']
        }
      },
      path:{
        SellerSKU:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/products/pricing/v0/listings/' + req_params.path.SellerSKU + '/offers',
      restore_rate:1
    });
  },
  getItemOffers:(req_params) => {
    utils.checkParams(req_params, {
      query:{
        MarketplaceId:{
          type:'string'
        },
        ItemCondition:{
          type:'enum',
          enum:['New', 'Used', 'Collectible', 'Refurbished', 'Club']
        }
      },
      path:{
        Asin:{
          type:'string'
        }
      }
    });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/products/pricing/v0/items/' + req_params.path.Asin + '/offers',
      restore_rate:1
    });
  }
};