const utils = require('../../../utils');

module.exports = {
  '2021-06-30':{
    getFeeds:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/feeds/2021-06-30/feeds',
        restore_rate:45
      });
    },
    createFeed:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/feeds/2021-06-30/feeds',
        restore_rate:120
      });
    },
    getFeed:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          feedId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/feeds/2021-06-30/feeds/' + req_params.path.feedId,
        restore_rate:0.5
      });
    },
    cancelFeed:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          feedId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'DELETE',
        api_path:'/feeds/2021-06-30/feeds/' + req_params.path.feedId,
        restore_rate:45
      });
    },
    createFeedDocument:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/feeds/2021-06-30/documents',
        restore_rate:120
      });
    },
    getFeedDocument:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          feedDocumentId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/feeds/2021-06-30/documents/' + req_params.path.feedDocumentId,
        restore_rate:45
      });
    }
  }
};