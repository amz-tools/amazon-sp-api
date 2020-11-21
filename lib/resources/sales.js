const utils = require('../utils');

module.exports = {
  getOrderMetrics:(req_params) => {
  	utils.checkParams(req_params, {
  		query:{
  			marketplaceIds:{
  				type:'array'
  			},
  			interval:{
  				type:'string'
  			},
        granularity:{
          type:'enum',
          enum:['Hour', 'Day', 'Week', 'Month', 'Year', 'Total']
        }
  		}
  	});
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/sales/v1/orderMetrics',
      restore_rate:2
    });
  }
};