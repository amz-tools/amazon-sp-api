module.exports = {
	'v1':{
	  getAuthorizationCode:(req_params) => {
	    return Object.assign(req_params, {
	      method:'GET',
	      api_path:'/authorization/v1/authorizationCode',
	      restore_rate:1,
	      is_grantless:true,
	      scope:'sellingpartnerapi::migration'
	    });
	  }
	}
};