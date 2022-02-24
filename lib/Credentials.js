const CustomError = require('./CustomError');
const fs = require('fs');
const os = require('os');

class Credentials {

  constructor(config_credentials, path, debug_log){
  	this._keys = [
			['SELLING_PARTNER_APP_CLIENT_ID'],
			['SELLING_PARTNER_APP_CLIENT_SECRET'],
			['AWS_SELLING_PARTNER_ACCESS_KEY_ID', 'AWS_ACCESS_KEY_ID'],
			['AWS_SELLING_PARTNER_SECRET_ACCESS_KEY', 'AWS_SECRET_ACCESS_KEY'],
			['AWS_SELLING_PARTNER_ROLE']
		];
		this._config_credentials = config_credentials;
		this._path = path;
		this._debug_log = debug_log;
  }

  _getHomeDir(){
    let env = process.env;
    let home_dir = env.HOME || env.USERPROFILE || (env.HOMEPATH ? ((env.HOMEDRIVE || 'C:/') + env.HOMEPATH) : null);
    if (home_dir){
      return home_dir;
    }
    if (typeof os.homedir === 'function'){
      return os.homedir();
    }
    return;
  }

  _extractFromFile(credentials_file){
  	let file_content = fs.readFileSync(credentials_file);
  	file_content = file_content.toString();
		let lines = file_content.split('\n');
		let found_credentials = {};
		lines.forEach((line)=>{
			let line_split = line.split('=');
			let key = line_split[0].trim();
			if (line_split.length === 2 && this._keys.some((keyOptions) => keyOptions.includes(key))){
				found_credentials[key] = line_split[1].trim();
			}
		});
		return found_credentials;
  }

  _extractFromEnvVars(){
		let found_credentials = {};
		this._keys.forEach((keyOptions) => {
			keyOptions.forEach((key) => {
				let value = process.env[key.trim()];
				if (value){
					found_credentials[key.trim()] = value.trim();
				}
			});
    });
    return found_credentials;
  }

  // Loading credentials in the following precedence:
  // 1. Explicilty set via SellingPartner class constructor
  // 2. Credentials file
  // 3. Environment variables
  load(){
  	let credentials_type = 'config object';
  	let loaded_credentials = this._config_credentials;
  	if (!loaded_credentials){
			try {
				let credentials_file = this._path ? this._path : this._getHomeDir() + '/.amzspapi/credentials';
				credentials_type = 'file' + ' (' + credentials_file + ')';
				loaded_credentials = this._extractFromFile(credentials_file);
			} catch(e){
				credentials_type = 'environment variables';
				loaded_credentials = this._extractFromEnvVars();
			}
		}
		let missing_credentials = this._keys.filter((keyOptions) => {
			return !keyOptions.some(key => Object.keys(loaded_credentials).includes(key));
		});
		if (missing_credentials.length){
			throw new CustomError({
	  		code:'CREDENTIALS_MISSING',
				message:'Could not find the following credentials in ' + credentials_type + ': ' + missing_credentials
					.map(keyOptions => keyOptions.join(' or '))
					.join(',')
	  	});
		}
		if (this._debug_log){
			console.log('Loaded credentials from ' + credentials_type);
		}
		return {
			app_client:{
				id:loaded_credentials['SELLING_PARTNER_APP_CLIENT_ID'],
				secret:loaded_credentials['SELLING_PARTNER_APP_CLIENT_SECRET']
			},
			aws_user:{
				id:loaded_credentials['AWS_SELLING_PARTNER_ACCESS_KEY_ID'] || loaded_credentials['AWS_ACCESS_KEY_ID'],
				secret:loaded_credentials['AWS_SELLING_PARTNER_SECRET_ACCESS_KEY'] || loaded_credentials['AWS_SECRET_ACCESS_KEY'],
				role:loaded_credentials['AWS_SELLING_PARTNER_ROLE']
			}
		};
	}

};

module.exports = Credentials;