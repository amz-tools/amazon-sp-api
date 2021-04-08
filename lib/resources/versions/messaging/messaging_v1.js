const utils = require('../../../utils');

module.exports = {
  'v1':{
    getMessagingActionsForOrder:(req_params) => {
    	utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId,
        restore_rate:1
      });
    },
    confirmCustomizationDetails:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/confirmCustomizationDetails',
        restore_rate:1
      });
    },
    createConfirmDeliveryDetails:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/confirmDeliveryDetails',
        restore_rate:1
      });
    },
    createLegalDisclosure:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/legalDisclosure',
        restore_rate:1
      });
    },
    createNegativeFeedbackRemoval:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/negativeFeedbackRemoval',
        restore_rate:1
      });
    },
    createConfirmOrderDetails:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/confirmOrderDetails',
        restore_rate:1
      });
    },
    createConfirmServiceDetails:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/confirmServiceDetails',
        restore_rate:1
      });
    },
    CreateAmazonMotors:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/amazonMotors',
        restore_rate:1
      });
    },
    CreateWarranty:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/warranty',
        restore_rate:1
      });
    },
    GetAttributes:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/attributes',
        restore_rate:1
      });
    },
    createDigitalAccessKey:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/digitalAccessKey',
        restore_rate:1
      });
    },
    createUnexpectedProblem:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          amazonOrderId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/messaging/v1/orders/' + req_params.path.amazonOrderId + '/messages/unexpectedProblem',
        restore_rate:1
      });
    }
  }
};