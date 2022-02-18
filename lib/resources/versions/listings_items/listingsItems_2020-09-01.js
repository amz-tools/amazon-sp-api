const utils = require('../../../utils');

module.exports = {
  '2020-09-01':{
    putListingsItem:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          sellerId:{
            type:'string'
          },
          sku:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/listings/2020-09-01/items/' + req_params.path.sellerId + '/' + req_params.path.sku,
        restore_rate:0.2
      });
    },
    deleteListingsItem:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          sellerId:{
            type:'string'
          },
          sku:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'DELETE',
        api_path:'/listings/2020-09-01/items/' + req_params.path.sellerId + '/' + req_params.path.sku,
        restore_rate:0.2
      });
    },
    patchListingsItem:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          sellerId:{
            type:'string'
          },
          sku:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'PATCH',
        api_path:'/listings/2020-09-01/items/' + req_params.path.sellerId + '/' + req_params.path.sku,
        restore_rate:0.2
      });
    }
  }
};