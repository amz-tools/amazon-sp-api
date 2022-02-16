const utils = require('../../../utils');

module.exports = {
  'v1':{
    getSolicitationActionsForOrder:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			amazonOrderId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/solicitations/v1/orders/' + req_params.path.amazonOrderId,
        restore_rate:1
      });
    },
    createProductReviewAndSellerFeedbackSolicitation:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
    	});
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/solicitations/v1/orders/' + req_params.path.amazonOrderId + '/solicitations/productReviewAndSellerFeedback',
        restore_rate:60
      });
    }
  }
};