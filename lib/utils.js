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
	printWarning:{
		'OPERATION_ONLY':() => {
			console.warn('WARNING! Calling an operation without an endpoint is deprecated and discouraged. You should specify an "endpoint" parameter or use shorthand dot notation (i.e. "catalogItems.getCatalogItem") as operation parameter value.');
		}
	},
	warn:(warn_type) => {
		utils.printWarning[warn_type]();
		// Overwrite original function definition --> this will ensure that warning is printed only once
		utils.printWarning[warn_type] = ()=>{};
	}
}

module.exports = {
	checkAndEncodeParams:utils.checkAndEncodeParams,
	encodeSpecialChars:utils.encodeSpecialChars,
	encodeURIComponent:utils.encodeURIComponent,
	warn:utils.warn
};