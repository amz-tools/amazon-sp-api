module.exports = {
  getMarketplaceParticipations:(req_params) => {
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/sellers/v1/marketplaceParticipations',
      restore_rate:60
    });
  }
};