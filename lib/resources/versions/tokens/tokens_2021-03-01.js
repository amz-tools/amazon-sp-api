module.exports = {
  '2021-03-01':{
    createRestrictedDataToken:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/tokens/2021-03-01/restrictedDataToken',
        restore_rate:1
      });
    }
  }
};