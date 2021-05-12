module.exports = {
  'v1':{
    SubmitShipmentConfirmations:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/vendor/shipping/v1/shipmentConfirmations',
        restore_rate:0.1
      });
    }
  }
};