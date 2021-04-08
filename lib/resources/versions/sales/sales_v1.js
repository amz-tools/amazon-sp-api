module.exports = {
	'v1':{
	  getOrderMetrics:(req_params) => {
	    return Object.assign(req_params, {
	      method:'GET',
	      api_path:'/sales/v1/orderMetrics',
	      restore_rate:2
	    });
	  }
	}
};