const utils = require('../utils');

module.exports = {
  createUploadDestinationForResource:(req_params) => {
  	utils.checkParams(req_params, {
  		query:{
  			marketplaceIds:{
  				type:'array'
  			},
        contentMD5:{
          type:'string'
        }
  		},
  		path:{
  			resource:{
  				type:'string'
  			}
  		}
  	});
    return Object.assign(req_params, {
      method:'POST',
      api_path:'/uploads/2020-11-01/uploadDestinations/' + req_params.path.resource,
      restore_rate:10
    });
  }
};