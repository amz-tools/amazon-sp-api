const utils = require('../../../utils');

module.exports = {
  'v1':{
    getSmallAndLightEnrollmentBySellerSKU:(req_params) => {
    	utils.checkParams(req_params, {
        path:{
          sellerSKU:{
            type:'string'
          }
        }
  	  });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/smallAndLight/v1/enrollments/' + req_params.path.sellerSKU,
        restore_rate:0.5
      });
    },
    putSmallAndLightEnrollmentBySellerSKU:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          sellerSKU:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/fba/smallAndLight/v1/enrollments/' + req_params.path.sellerSKU,
        restore_rate:0.5
      });
    },
    deleteSmallAndLightEnrollmentBySellerSKU:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          sellerSKU:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'DELETE',
        api_path:'/fba/smallAndLight/v1/enrollments/' + req_params.path.sellerSKU,
        restore_rate:0.5
      });
    },
    getSmallAndLightEligibilityBySellerSKU:(req_params) => {
      utils.checkParams(req_params, {
        path:{
          sellerSKU:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/fba/smallAndLight/v1/eligibilities/' + req_params.path.sellerSKU,
        restore_rate:0.5
      });
    },
    getSmallAndLightFeePreview:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/fba/smallAndLight/v1/feePreviews',
        restore_rate:1
      });
    }
  }
};