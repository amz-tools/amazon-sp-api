module.exports = {
  '2021-08-01':{
    getListingsRestrictions:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/listings/2021-08-01/restrictions',
        restore_rate:0.2
      });
    }
  }
};