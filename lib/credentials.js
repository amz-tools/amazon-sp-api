const CustomError = require('./CustomError');

module.exports = {
	load:(credentials_type) => {
		let keys = {
			'app_client':{
				id:'SELLING_PARTNER_APP_CLIENT_ID',
				secret:'SELLING_PARTNER_APP_CLIENT_SECRET'
			},
			'aws_user':{
				id:'AWS_ACCESS_KEY_ID',
	      secret:'AWS_SECRET_ACCESS_KEY',
	      role:'AWS_SELLING_PARTNER_ROLE'
			}
		}

    for (let key in keys[credentials_type]){
      let value = process.env[keys[credentials_type][key]];
      if (value){
        keys[credentials_type][key] = value;
      } else {
      	throw new CustomError({
      		code:'ENV_VARIABLE_MISSING',
      		message:'Could not find environment variable ' + keys[credentials_type][key]
      	});
      }
    }

    return keys[credentials_type];
	}
}