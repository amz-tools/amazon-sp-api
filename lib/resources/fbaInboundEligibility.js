const utils = require('../utils');

module.exports = {
  getItemEligibilityPreview:(req_params) => {
  	utils.checkParams(req_params, {
  		query:{
        asin:{
          type:'string'
        },
        program:{
          type:'enum',
          enum:['INBOUND', 'COMMINGLING']
        },
        marketplaceIds:{
          type:'array',
          cond:{
            equals:{
              program:'INBOUND'
            }
          }
        }
      }
	  });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inbound/v1/eligibility/itemPreview',
      restore_rate:1
    });
  }
};