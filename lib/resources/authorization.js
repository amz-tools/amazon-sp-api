const utils = require('../utils');

module.exports = {
  getAuthorizationCode:(req_params) => {
  	utils.checkParams(req_params, {
  		query:{
        sellingPartnerId:{
          type:'string'
        },
        developerId:{
          type:'string'
        },
        mwsAuthToken:{
          type:'string'
        }
      }
	  });
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/authorization/v1/authorizationCode',
      restore_rate:1
    });
  }
};