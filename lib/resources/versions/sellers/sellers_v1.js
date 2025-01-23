module.exports = {
  v1: {
    getMarketplaceParticipations: (req_params) => {
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/sellers/v1/marketplaceParticipations',
        restore_rate: 60
      });
    },
    getAccount: (req_params) => {
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/sellers/v1/account',
        restore_rate: 60,
        sandbox_only: true
      });
    }
  }
};
