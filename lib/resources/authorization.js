module.exports = {
  getAuthorizationCode:(req_params) => {
    return Object.assign(req_params, {
      method:'GET',
      api_path:'/authorization/v1/authorizationCode',
      restore_rate:1
    });
  }
};