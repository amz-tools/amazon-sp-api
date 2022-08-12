const CustomError = require('./CustomError');

let utils = {
	// Check if all required path parameters are given
	// --> not neccessary for body or querystring as SP API error messages are meaningful enough
	checkAndEncodeParams:(req_params, requirements) => {
		if (!req_params || !req_params.path){
			throw new CustomError({
	  		code:'NO_PATH_FOUND',
	  		message: 'Please provide the following path parameters: ' + Object.keys(requirements.path).join(',')
	  	});
		}
		for (let param in requirements.path){
			if (!req_params.path[param]){
				throw new CustomError({
		  		code:'REQUIRED_PATH_PARAMETER_NOT_FOUND',
		  		message: 'Please provide the following path parameter: ' + param
		  	});
			} else if (requirements.path[param].type === 'enum' && !requirements.path[param].enum.includes(req_params.path[param])){
				throw new CustomError({
		  		code:'INVALID_PATH_PARAMETER_VALUE',
		  		message: 'Invalid value "' + req_params.path[param] + '" for path parameter ' + param
		  	});
			}
			req_params.path[param] = utils.encodeURIComponent(req_params.path[param]);
		}
		return req_params;
	},
	// encodeURIComponent is not encoding chars !'()* by default, but SP endpoints expect these to be encoded once!
	encodeSpecialChars:(str) => {
		return str.replace(/[!'()*]/g, (c) => {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	  });
	},
	encodeURIComponent:(str) => {
		return utils.encodeSpecialChars(encodeURIComponent(str));
  },
  // Two operations (getPricing, getCompetitivePricing) of productPricing endpoint (i.e. productPricing) require double encoding for query params
  // --> for array values we need to make sure that ',' delimiter is only encoded once, so we replace '%2C' with ','
  doubleEncodeURICompenent:(str, key_is_array) => {
  	return key_is_array ? 
  		utils.encodeURIComponent(utils.encodeURIComponent(str).replace(/%2C/g, ',')) :
  		utils.encodeURIComponent(utils.encodeURIComponent(str));
  },
	printWarning:{
		'OPERATION_ONLY':() => {
			console.warn('WARNING! Calling an operation without an endpoint is deprecated and discouraged. You should specify an "endpoint" parameter or use shorthand dot notation (i.e. "catalogItems.getCatalogItem") as operation parameter value.');
			return true;
		},
		'DEPRECATION':(deprecation_date) => {
			console.warn('WARNING! This operation will be deprecated on ' + deprecation_date + '! You should update the operation and/or the version of the endpoint to use.');
			return;
		}
	},
	warn:(warn_type, params) => {
		let overwrite = utils.printWarning[warn_type](params);
		// Overwrite original function definition --> this will ensure that warning is printed only once
		if (overwrite) utils.printWarning[warn_type] = ()=>{};
	}
}

module.exports = {
	checkAndEncodeParams:utils.checkAndEncodeParams,
	encodeSpecialChars:utils.encodeSpecialChars,
	encodeURIComponent:utils.encodeURIComponent,
	doubleEncodeURICompenent:utils.doubleEncodeURICompenent,
	warn:utils.warn
};