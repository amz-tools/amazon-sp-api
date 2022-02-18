const utils = require('../../../utils');

module.exports = {
  'v1':{
    submitInventoryUpdate:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          warehouseId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/vendor/directFulfillment/inventory/v1/warehouses/' + req_params.path.warehouseId + '/items',
        restore_rate:0.1
      });
    }
  }
};