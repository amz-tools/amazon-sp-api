module.exports = {
  // getInventorySummaries seems to be available in "NA" region only --> comparable to ListInventorySupply in MWS API
  getInventorySummaries:(req_params) => {
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/fba/inventory/v1/summaries',
      restore_rate:0.012
    });
  }
};