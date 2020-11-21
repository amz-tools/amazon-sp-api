const CustomError = require('./CustomError');

module.exports = {
	// TODO: Check all first level required params and their values also for query and body!
	// --> Traverse down the whole query and/or body object to check if all required parameters are given
	checkParams:(req_params, requirements) => {
		// param_type_key is query, body or path
		for (let param_type_key in requirements){
			if (!req_params[param_type_key]){
				throw new CustomError({
		  		code:'NO_' + param_type_key.toUpperCase() + '_FOUND',
		  		message: 'Please provide a ' + param_type_key
		  	});
			} else if (param_type_key === 'path'){
				for (let key in requirements[param_type_key]){
					if (!req_params[param_type_key][key]){
						throw new CustomError({
				  		code:'REQUIRED_PATH_PARAMETER_NOT_FOUND',
				  		message: 'Please provide the following path parameter: ' + key
				  	});
					}
				}
			}
		}
	}
};