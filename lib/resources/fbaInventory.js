const utils = require('../utils');

module.exports = {
  // getInventorySummaries seems to be available in "NA" region only --> comparable to ListInventorySupply in MWS API
  getInventorySummaries:(req_params) => {
  	utils.checkParams(req_params, {
  		query:{
        granularityType:{
          type:'enum',
          enum:['Marketplace']
        },
        granularityId:{
          type:'string'
        },
        marketplaceIds:{
          type:'array'
        }
      }
	  });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inventory/v1/summaries',
      restore_rate:0.012
    });
  }
};