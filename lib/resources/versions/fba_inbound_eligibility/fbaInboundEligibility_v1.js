module.exports = {
	'v1':{
	  getItemEligibilityPreview:(req_params) => {
	    return Object.assign(req_params, {
	      method:'GET',
	      api_path:'/fba/inbound/v1/eligibility/itemPreview',
	      restore_rate:1
	    });
	  }
	}
};