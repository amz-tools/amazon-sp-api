const utils = require('../utils');

module.exports = {
  getMarketplaceParticipations:(req_params) => {
  	utils.checkParams(req_params, {});
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/sellers/v1/marketplaceParticipations',
      restore_rate:60
    });
  }
};