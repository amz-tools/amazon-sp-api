const utils = require('../../../utils');

module.exports = {
  '2020-11-01':{
    searchContentDocuments:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/aplus/2020-11-01/contentDocuments',
        restore_rate:0.1
      });
    },
    createContentDocument:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/aplus/2020-11-01/contentDocuments',
        restore_rate:0.1
      });
    },
    getContentDocument:(req_params) => {
    	utils.checkParams(req_params, {
    	  path:{
          contentReferenceKey:{
            type:'string'
          }
        }
  	  });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/aplus/2020-11-01/contentDocuments/' + req_params.path.contentReferenceKey,
        restore_rate:0.1
      });
    },
    updateContentDocument:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          contentReferenceKey:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/aplus/2020-11-01/contentDocuments/' + req_params.path.contentReferenceKey,
        restore_rate:0.1
      });
    },
    listContentDocumentAsinRelations:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          contentReferenceKey:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/aplus/2020-11-01/contentDocuments/' + req_params.path.contentReferenceKey + '/asins',
        restore_rate:0.1
      });
    },
    postContentDocumentAsinRelations:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          contentReferenceKey:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/aplus/2020-11-01/contentDocuments/' + req_params.path.contentReferenceKey + '/asins',
        restore_rate:0.1
      });
    },
    validateContentDocumentAsinRelations:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/aplus/2020-11-01/contentAsinValidations',
        restore_rate:0.1
      });
    },
    searchContentPublishRecords:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/aplus/2020-11-01/contentPublishRecords',
        restore_rate:0.1
      });
    },
    postContentDocumentApprovalSubmission:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          contentReferenceKey:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/aplus/2020-11-01/contentDocuments/' + req_params.path.contentReferenceKey + '/approvalSubmissions',
        restore_rate:0.1
      });
    },
    postContentDocumentSuspendSubmission:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          contentReferenceKey:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/aplus/2020-11-01/contentDocuments/' + req_params.path.contentReferenceKey + '/suspendSubmissions',
        restore_rate:0.1
      });
    }
  }
};