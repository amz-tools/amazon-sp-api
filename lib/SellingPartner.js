const CustomError = require('./CustomError');
const request = require('./request');
const Signer = require('./Signer');
const {XMLParser} = require('fast-xml-parser/src/fxp');
const Credentials = require('./Credentials');
const endpoints = require('./endpoints');
const operations = require('./operations')(endpoints);
const utils = require('./utils');
const crypto = require('crypto');
const csv = require('csvtojson');
const fs = require('fs');
const zlib = require('zlib');
const iconv = require('iconv-lite');
const client_version = require('../package.json').version;
const node_version = process.version;
const os = require('os');

// Provide credentials as environment variables OR create a path and file ~/.amzspapi/credentials (located in your user folder)
// If you don't provide access_token or role_credentials, the first call to an API endpoint will request them with a TTL of 1 hour
// Tokens are reused for the class instance
// Retrieve the tokens via getters if you want to use them across multiple instances of the SellingPartner class

class SellingPartner {

  // config object params:
  // region:'<REGION>', // Required: The region to use for the SP-API endpoints. Must be one of: "eu", "na" or "fe"
  // refresh_token:'<REFRESH_TOKEN>', // Optional: The refresh token of your app user. Required if "only_grantless_operations" option is set to "false".
  // access_token:'<ACCESS_TOKEN>', // Optional: The temporary access token requested with the refresh token of the app user.
  // role_credentials:{ // Optional: The temporary role credentials for the sellingpartner api role of the iam user.
  //   id:'<TEMPORARY_ROLE_ACCESS_ID>',
  //   secret:'<TEMPORARY_ROLE_ACCESS_SECRET>',
  //   security_token:'<TEMPORARY_ROLE_SECURITY_TOKEN>'
  // },
  // endpoints_versions:{ // Optional: Defines the version to use for an endpoint as key/value pairs, i.e. "reports":"2021-06-30".
  //   ...
  // },
  // credentials:{ // Optional: The app client and aws user credentials. Should only be used if you have no means of using environment vars or credentials file!
  //   SELLING_PARTNER_APP_CLIENT_ID:'<APP_CLIENT_ID>',
  //   SELLING_PARTNER_APP_CLIENT_SECRET:'<APP_CLIENT_SECRET>',
  //   AWS_ACCESS_KEY_ID:'<AWS_USER_ID>',
  //   AWS_SECRET_ACCESS_KEY:'<AWS_USER_SECRET>',
  //   AWS_SELLING_PARTNER_ROLE:'<AWS_SELLING_PARTNER_API_ROLE>'
  // },
  // options:{
  //   credentials_path:'~/.amzspapi/credentials', // Optional: A custom absolute path to your credentials file location.
  //   auto_request_tokens:true, // Optional: Whether or not the client should retrieve new access and role credentials if non given or expired.
  //   auto_request_throttled:true, // Optional: Whether or not the client should automatically retry a request when throttled.
  //   version_fallback:true, // Optional: Whether or not the client should try to use an older version of an endpoint if the operation is not defined for the desired version.
  //   use_sandbox:false, // Optional: Whether or not to use the sandbox endpoint.
  //   only_grantless_operations:false // Optional: Whether or not to only use grantless operations.
  //   user_agent:'amazon-sp-api/<CLIENT_VERSION> (Language=Node.js/<NODE_VERSION>; Platform=<OS_PLATFORM>/<OS_RELEASE>)', // A custom user-agent header.
  //   debug_log:false // Optional: Whether or not the client should print console logs for debugging purposes.
  // }
  // TODO: We could add something like a debug option, that will enable included info logs, i.e. sandbox activated, credentials load type (env, file, config), etc.
  constructor(config){
    this._region = config.region;
    this._refresh_token = config.refresh_token;
    this._access_token = config.access_token;
    this._role_credentials = config.role_credentials;
    // Will hold access tokens for grantless operations (with scope as key)
    this._grantless_tokens = {};
    this._options = Object.assign({
      auto_request_tokens:true,
      auto_request_throttled:true,
      use_sandbox:false,
      only_grantless_operations:false,
      version_fallback:true,
      user_agent:'amazon-sp-api/' + client_version  + ' (Language=Node.js/' + node_version + '; Platform=' + os.type() + '/' + os.release() + ')',
      debug_log:false
    }, config.options);
    this._endpoints_versions = this._validateEndpointsVersions(Object.assign({}, config.endpoints_versions));
    this._credentials = new Credentials(config.credentials, this._options.credentials_path, this._options.debug_log).load();
    this._xml_parser = new XMLParser();

    if (!this._region || !/^(eu|na|fe)$/.test(this._region)){
      throw new CustomError({
        code:'NO_VALID_REGION_PROVIDED',
        message:'Please provide one of: "eu", "na" or "fe"'
      });
    }
    if (!this._refresh_token && !this._options.only_grantless_operations){
      throw new CustomError({
        code:'NO_REFRESH_TOKEN_PROVIDED',
        message:'Please provide a refresh token or set "only_grantless_operations" option to true'
      });
    }
  }

  get access_token(){
    return this._access_token;
  }

  get role_credentials(){
    return this._role_credentials;
  }

  get endpoints(){
    return endpoints;
  }

  // Make sure that all defined endpoints and its defined versions exist
  _validateEndpointsVersions(endpoints_versions){
    let invalid_endpoints = Object.keys(endpoints_versions).filter((endpoint) => {
      return !endpoints[endpoint];
    });
    if (invalid_endpoints.length){
      throw new CustomError({
        code:'VERSION_DEFINED_FOR_INVALID_ENDPOINTS',
        message:'One or more endpoints are not valid. These endpoints don\'t exist: "' + invalid_endpoints.join('","') + '"'
      });
    }
    let invalid_endpoints_versions = Object.keys(endpoints_versions).filter((endpoint) => {
      return !endpoints[endpoint].__versions.includes(endpoints_versions[endpoint]);
    });
    if (invalid_endpoints_versions.length){
      throw new CustomError({
        code:'INVALID_VERSION_FOR_ENDPOINTS',
        message:'The provided version for the following endpoint(s) is not valid: "' + invalid_endpoints_versions.join('","') + '"'
      });
    }
    return endpoints_versions;
  }

  async _wait(restore_rate){
    return new Promise((resolve, reject) => {
      setTimeout(resolve, restore_rate * 1000);
    });
  }

  async _unzip(buffer){
    return new Promise((resolve, reject) => {
      zlib.gunzip(buffer, (err, unzipped_buffer) => {
        if (err){
          reject(err);
        }
        resolve(unzipped_buffer);
      });
    });
  }

  async _saveFile(content, options){
    return new Promise((resolve, reject) => {
      if (options.json){
        content = JSON.stringify(content);
      }
      fs.writeFile(options.file, content, (err) => {
        err ? reject(err) : resolve();
      })
    });
  }

  async _readFile(file, content_type){
    return new Promise((resolve, reject) => {
      let regexp_charset = /charset=([^;]*)/;
      let content_match = content_type.match(regexp_charset);
      let encoding = content_match && content_match[1] ? content_match[1] : 'utf-8';
      // fs.readFile doesn't accept ISO-8859-1 as encoding value --> use latin1 as value which is the same
      if (encoding.toUpperCase() === 'ISO-8859-1'){
        encoding = 'latin1';
      }
      fs.readFile(file, encoding, (err, content) => {
        err ? reject(err) : resolve(content);
      })
    });
  }

  _validateEncryptionDetails(details){
    if (!details || !details.url){
      throw new CustomError({
        code:'DOWNLOAD_INFORMATION_MISSING',
        message:'Please provide url'
      });
    }
    let encryption = details.encryptionDetails;
    // Docs state that no other encryption standards should be possible, but check if its correct anyway
    if (encryption && encryption.standard !== 'AES'){
      throw new CustomError({
        code:'UNKNOWN_ENCRYPTION_STANDARD',
        message:'Cannot decrypt ' + details.encryptionDetails.standard + ', expecting AES'
      });
    }
    let compression = details.compressionAlgorithm;
    // Docs state that no other zip standards should be possible, but check if its correct anyway
    if (compression && compression !== 'GZIP'){
      throw new CustomError({
        code:'UNKNOWN_ZIP_STANDARD',
        message:'Cannot unzip ' + compression + ', expecting GZIP'
      });
    }
  }

  _validateUpOrDownloadSuccess(res, request_type){
    if (res.statusCode !== 200){
      let json_res;
      try {
        json_res = this._xml_parser.parse(res.body);
      } catch(e){
        throw new CustomError({
          code:request_type + '_ERROR',
          message:res.body
        });
      }
      if (json_res && json_res.Error){
        throw new CustomError({
          code:json_res.Error.Code,
          message:json_res.Error.Message
        });
      } else {
        throw new CustomError({
          code:request_type + '_ERROR',
          message:json_res
        });
      }
    }
  }

  _constructRefreshAccessTokenBody(scope){
    let body = {
      client_id:this._credentials.app_client.id,
      client_secret:this._credentials.app_client.secret
    };
    let valid_scopes = ['sellingpartnerapi::notifications', 'sellingpartnerapi::migration'];
    if (scope){
      // Make sure that scope is valid
      if (!valid_scopes.includes(scope)){
        throw new CustomError({
          code:'INVALID_SCOPE_ERROR',
          message:'Scope for requesting token for grantless operations is invalid. Please provide one of: ' + valid_scopes.join(',')
        });
      }
      body.grant_type = 'client_credentials';
      body.scope = scope;
    } else if (!this._options.only_grantless_operations){
      body.grant_type = 'refresh_token';
      body.refresh_token = this._refresh_token;
    } else {
      throw new CustomError({
        code:'NO_SCOPE_PROVIDED',
        message:'Grantless tokens require a scope. Please provide one of: ' + valid_scopes.join(',')
      });
    }
    return JSON.stringify(body);
  }

  _tokenExists(scope){
    return (this._access_token && !scope) || (scope && this._grantless_tokens[scope]);
  }

  async _validateAccessTokenAndRoleCredentials(scope){
    if (this._options.auto_request_tokens){
      if (!this._tokenExists(scope)){
        await this.refreshAccessToken(scope);
      }
      if (!this._role_credentials){
        await this.refreshRoleCredentials();
      }
    }
    if (!this._tokenExists(scope) || !this._role_credentials){
      throw new CustomError({
        code:'NO_ACCESS_TOKEN_AND_OR_ROLE_CREDENTIALS_PRESENT',
        message:'Did you turn off "auto_request_tokens" and forgot to refresh the access token and/or role credentials and/or the scope for a grantless token?'
      });
    }
  }

  _validateMethod(method){
    if (!method || !/^(GET|POST|PUT|DELETE|PATCH)$/.test(method.toUpperCase())){
      throw new CustomError({
        code:'NO_VALID_METHOD_PROVIDED',
        message:'Please provide a valid HTTP Method ("GET","POST","PUT","DELETE" or "PATCH") when using "api_path"'
      });
    }
    return method.toUpperCase();
  }

  _validateOperationAndEndpoint(operation, endpoint){
    if (!operation){
      throw new CustomError({
        code:'NO_OPERATION_GIVEN',
        message:'Please provide an operation to call'
      });
    }
    // Split operation in endpoint and operation if shorthand dot notation
    if (operation.includes('.')){
      let op_split = operation.split('.');
      endpoint = op_split[0];
      operation = op_split[1];
    }
    // Still possible to use operation without an endpoint, but deprecated and discouraged
    if (!endpoint){
      utils.warn('OPERATION_ONLY');
      endpoint = operations[operation];
    }
    if (!operations[operation]){
      throw new CustomError({
        code:'OPERATION_NOT_FOUND',
        message:'No operation found: ' + operation
      });
    }
    if (!endpoints[endpoint]){
      throw new CustomError({
        code:'ENDPOINT_NOT_FOUND',
        message:'No endpoint found: ' + endpoint
      });
    }
    if (!endpoints[endpoint].__operations.includes(operation)){
      throw new CustomError({
        code:'INVALID_OPERATION_FOR_ENDPOINT',
        message:'The operation "' + operation + '" is not valid for endpoint "' + endpoint + '"'
      });
    }
    return {operation, endpoint};
  }

  _getFallbackVersion(operation, endpoint, version){
    // Make sure to only look for the operation in older versions
    // --> we don't want to break stuff by accidently calling a newer version than expected!
    let version_index = endpoints[endpoint].__versions.indexOf(version);
    let fallback_version = endpoints[endpoint].__versions.slice(0, version_index).reverse().find((__version) => {
      return endpoints[endpoint][__version][operation];
    });
    // Throw error if version_fallback is disabled or no fallback version was found
    if (!this._options.version_fallback || !fallback_version){
      throw new CustomError({
        code:'OPERATION_NOT_FOUND_FOR_VERSION',
        message:'Operation "' + operation + '" not found for version "' + version + '"'
      });
    }
    return fallback_version;
  }

  // Logic if version was explicitly set in .callAPI options
  _validateLocallySetVersion(operation, endpoint, version){
    // Throw error if the explicitly specified version in .callAPI can't be found for the endpoint
    if (!endpoints[endpoint].__versions.includes(version)){
      throw new CustomError({
        code:'INVALID_VERSION',
        message:'Invalid version "' + version + '" for endpoint "' + endpoint + '" and operation "' + operation + '". Should be one of: "' + endpoints[endpoint].__versions.join('","') + '"'
      });
    }
    // If operation is not supported for the version:
    // --> try to find an older version of the endpoint that supports the operation
    if (!endpoints[endpoint][version][operation]){
      return this._getFallbackVersion(operation, endpoint, version);
    }
    return version;
  }

  // Logic if version was NOT explicitly set in .callAPI options
  _validateGloballySetVersion(operation, endpoint){
    // If no version for the endpoint was set in constructor config:
    // --> find the oldest version that supports the operation
    if (!this._endpoints_versions[endpoint]){
      // We can directly return the version as its impossible for a valid operation to have no version
      return endpoints[endpoint].__versions.find((__version) => {
        return endpoints[endpoint][__version][operation];
      });
    }
    // Get the version specified for the endpoint in constructor config
    let version = this._endpoints_versions[endpoint];
    // If operation is not supported for the version:
    // --> try to find an older version of the endpoint that supports the operation
    if (!endpoints[endpoint][version][operation]){
      return this._getFallbackVersion(operation, endpoint, version);
    }
    return version;
  }

  _validateAndGetVersion(operation, endpoint, version){
    return version ? this._validateLocallySetVersion(operation, endpoint, version) : this._validateGloballySetVersion(operation, endpoint);
  }

  _validateOperationAllowance(scope){
    if (this._options.only_grantless_operations && !scope){
      throw new CustomError({
        code:'INVALID_OPERATION_ERROR',
        message:'Operation is not grantless. Set "only_grantless_operations" to false and provide a "refresh_token" to be able to call the operation.'
      });
    }
  }

  _constructExchangeBody(auth_code){
    if (!auth_code){
      throw new CustomError({
        code:'NO_AUTH_CODE_PROVIDED',
        message:'Please provide an authorization code received from a "getAuthorizationCode" operation to exchange it for a "refresh_token".'
      });
    }
    let body = {
      grant_type:'authorization_code',
      code:auth_code,
      client_id:this._credentials.app_client.id,
      client_secret:this._credentials.app_client.secret
    };
    return JSON.stringify(body);
  }

  // Exchange an authorization code received from a getAuthorizationCode operation for a refresh token
  async exchange(auth_code){
    let res = await request({
      method:'POST',
      url:'https://api.amazon.com/auth/o2/token',
      body:this._constructExchangeBody(auth_code),
      headers:{
        'Content-Type':'application/json'
      }
    });
    let json_res;
    try {
      json_res = JSON.parse(res.body);
    } catch (e){
      throw new CustomError({
        code:'EXCHANGE_AUTH_CODE_PARSE_ERROR',
        message:res.body
      });
    }
    if (json_res.error){
      throw new CustomError({
        code:json_res.error,
        message:json_res.error_description
      });
    }
    return json_res;
  }

  // If scope is provided a token for a grantless operation is requested
  // scope should be one of: ['sellingpartnerapi::notifications', 'sellingpartnerapi::migration']
  async refreshAccessToken(scope){
    let res = await request({
      method:'POST',
      url:'https://api.amazon.com/auth/o2/token',
      body:this._constructRefreshAccessTokenBody(scope),
      headers:{
        'Content-Type':'application/json'
      }
    });
    let json_res;
    try {
      json_res = JSON.parse(res.body);
    } catch (e){
      throw new CustomError({
        code:'REFRESH_ACCESS_TOKEN_PARSE_ERROR',
        message:res.body
      });
    }
    if (json_res.access_token){
      if (!scope){
        this._access_token = json_res.access_token;
      } else {
        this._grantless_tokens[scope] = json_res.access_token;
      }
    } else if (json_res.error){
      throw new CustomError({
        code:json_res.error,
        message:json_res.error_description
      });
    } else {
      throw new CustomError({
        code:'UNKNOWN_REFRESH_ACCESS_TOKEN_ERROR',
        message:res.body
      });
    }
  }

  async refreshRoleCredentials(){
    let signed_request = new Signer(this._region, this._options.use_sandbox, this._options.user_agent).signRoleCredentialsRequest(this._credentials.aws_user);
    let res = await request(signed_request);
    let json_res;
    try {
      json_res = this._xml_parser.parse(res.body);
    } catch(e){
      throw new CustomError({
        code:'XML_PARSE_ERROR',
        message:res.body
      });
    }
    if (json_res && json_res.AssumeRoleResponse && json_res.AssumeRoleResponse.AssumeRoleResult && json_res.AssumeRoleResponse.AssumeRoleResult.Credentials){
      let role_credentials = json_res.AssumeRoleResponse.AssumeRoleResult.Credentials;
      this._role_credentials = {
        id:role_credentials.AccessKeyId,
        secret:role_credentials.SecretAccessKey,
        security_token:role_credentials.SessionToken
      };
    } else if (json_res && json_res.ErrorResponse && json_res.ErrorResponse.Error){
      throw new CustomError({
        code:json_res.ErrorResponse.Error.Code,
        message:json_res.ErrorResponse.Error.Message
      });
    } else {
      throw new CustomError({
        code:'NO_ROLE_CREDENTIALS_RECEIVED',
        message:res.body
      });
    }
  }

  // req_params object:
  // operation:'<OPERATION_TO_CALL>', // Optional: The operation you want to request. May also include endpoint as shorthand dot notation. Required if "api_path" is not defined.
  // endpoint:'<ENDPOINT_OF_OPERATION>', // Optional: The endpoint of the operation. Required if endpoint is not part of operation as shorthand dot notation and if "api_path" is not defined.
  // path:{ // Optional: The input paramaters added to the path of the operation.
  //   ...
  // },
  // query:{ // Optional: The input paramaters added to the query string of the operation.
  //   ...
  // },
  // body:{ // Optional: The input paramaters added to the body of the operation.
  //   ...
  // },
  // api_path:'<FULL_PATH_OF_OPERATION>', // Optional: The full path of an operation. Required if "operation" is not defined.
  // method:'GET' // The HTTP method to use. Required only if "api_path" is defined. Must be one of: "GET", "POST", "PUT", "DELETE" or "PATCH".
  // restricted_data_token:'<RESTRICTED_DATA_TOKEN>' // Optional: A token received from a "createRestrictedDataToken" operation for receiving PII from a restricted operation.
  // options:{
  //   version:'<OPERATION_ENDPOINT_VERSION>', // Optional: The endpoint’s version that should be used when calling the operation. Will be preferred over an "endpoints_versions" setting.
  //   restore_rate:'<RESTORE_RATE_IN_SECONDS>', // Optional: The restore rate (in seconds) that should be used when calling the operation. Will be preferred over the default restore rate of the operation.
  //   raw_result:false // Whether or not the client should return the "raw" result, which will include the raw body, buffer chunks, statuscode and headers of the result.
  // }
  async callAPI(req_params){
    let options = Object.assign({}, req_params.options);
    if (req_params.api_path){
      req_params.method = this._validateMethod(req_params.method);
    } else {
      let {operation, endpoint} = this._validateOperationAndEndpoint(req_params.operation, req_params.endpoint);
      let version = this._validateAndGetVersion(operation, endpoint, options.version);
      req_params = {
        ...endpoints[endpoint][version][operation](req_params)
      };
    }
    // Use user-defined restore_rate if specified, otherwise use default for operation
    if (options.restore_rate && !isNaN(options.restore_rate)){
      req_params.restore_rate = options.restore_rate;
    }
    // Scope will only be defined for grantless operations
    let scope = req_params.scope;
    this._validateOperationAllowance(scope);
    await this._validateAccessTokenAndRoleCredentials(scope);
    // Make sure to use the correct token for the request
    let token_for_request = this._access_token;
    if (scope){
      token_for_request = this._grantless_tokens[scope];
    } else if (req_params.restricted_data_token){
      token_for_request = req_params.restricted_data_token;
    }
    let signed_request = new Signer(this._region, this._options.use_sandbox, this._options.user_agent).signAPIRequest(token_for_request, this._role_credentials, req_params);
    let res = await request(signed_request);
    if (options.raw_result){
      return res;
    }
    if (res.statusCode === 204 && req_params.method === 'DELETE'){
      return {success:true};
    }
    let json_res;
    try {
      json_res = JSON.parse(res.body.replace(/\n/g, ''));
    } catch (e){
      throw new CustomError({
        code:'JSON_PARSE_ERROR',
        message:res.body
      });
    }
    if (json_res.errors){
      let error = json_res.errors[0];
      // Refresh tokens when expired and auto_request_tokens is true
      if (res.statusCode === 403 && error.code === 'Unauthorized'){
        if (this._options.auto_request_tokens){
          if (/access token.*expired/.test(error.details)){
            if (this._options.debug_log){
              console.log('Refresh token expired, refreshing it now');
            }
            await this.refreshAccessToken(scope);
            return await this.callAPI(req_params);
          } else if (/security token.*expired/.test(error.message)){
            if (this._options.debug_log){
              console.log('Role credentials security token expired, refreshing it now');
            }
            await this.refreshRoleCredentials();
            return await this.callAPI(req_params);
          }
        }
      // Retry when call is throttled and auto_request_throttled is true
      } else if (res.statusCode === 429 && error.code === 'QuotaExceeded' && this._options.auto_request_throttled){
        // Wait the restore rate before retrying the call if dynamic or static restore rate is set
        if (res.headers['x-amzn-ratelimit-limit'] || req_params.restore_rate){
          // Use dynamic restore rate from result header if given --> otherwise use defined default restore_rate of the operation
          let restore_rate = res.headers['x-amzn-ratelimit-limit'] ? (1 / (res.headers['x-amzn-ratelimit-limit'] * 1)) : req_params.restore_rate;
          if (this._options.debug_log){
            console.log('Request throttled, retrying a call of "' + (req_params.operation || req_params.api_path) + '" in ' + restore_rate + ' seconds...');
          }
          await this._wait(restore_rate);
        }
        return await this.callAPI(req_params);
      } else if (error.code === 'InternalFailure' && this._options.use_sandbox){
        throw new CustomError({
          code:'INVALID_SANDBOX_PARAMETERS',
          message:'You\'re in SANDBOX mode, make sure sandbox parameters are correct, as in Amazon SP API documentation: https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#how-to-make-a-sandbox-call-to-the-selling-partner-api'
        });
      }
      throw new CustomError(error);
    }

    // If there is a pagination outside payload (like for getInventorySummaries), this will include it with the result
  	if (json_res.pagination && json_res.payload){
  		return Object.assign(json_res.pagination, json_res.payload);
  	}

    // Some calls do not return response in payload but directly (i.e. operation "getSmallAndLightEligibilityBySellerSKU")!
    return json_res.payload || json_res;
  }

  // Download a report or feed result
  // Options object:
  // json:false, // Optional: Whether or not the content should be transformed to json before returning it (from tab delimited flat-file or XML).
  // unzip:true, // Optional: Whether or not the content should be unzipped before returning it.
  // file:'<FILE_PATH>', // Optional: The absolute file path to save the report to. Even when saved to disk the report content is still returned.
  // charset:'utf8' // Optional: The charset to use for decoding the content. Is ignored when content is compressed and unzip is set to false.
  async download(details, options = {}){
    options = Object.assign({
      unzip:true
    }, options);
    this._validateEncryptionDetails(details);
    // Result will be a tab-delimited flat file or an xml document
    let res = await request({
      url:details.url
    });
    this._validateUpOrDownloadSuccess(res, 'DOWNLOAD');

    // Decrypt buffer
    let decrypted_buffer;
    if (details.encryptionDetails) {
      let encrypted_buffer = Buffer.concat(res.chunks);
      let decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(details.encryptionDetails.key, 'base64'),
        Buffer.from(details.encryptionDetails.initializationVector, 'base64')
      );
      decrypted_buffer = Buffer.concat([decipher.update(encrypted_buffer), decipher.final()]);
    } else {
      decrypted_buffer = Buffer.concat(res.chunks);
    }
    // Decompress if content is compressed and unzip option is true
    if (details.compressionAlgorithm && options.unzip){
      decrypted_buffer = await this._unzip(decrypted_buffer);
    }
    let decrypted = decrypted_buffer;
    if (!details.compressionAlgorithm || options.unzip){
      // Decode buffer with given charset
      if (options.charset){
        try {
          decrypted = iconv.decode(decrypted, options.charset);
        } catch(e){
          throw new CustomError({
            code:'DECODE_ERROR',
            message:e.message
          });
        }
      } else {
        decrypted = decrypted.toString();
      }
      if (options.json){
        // Transform content to json --> take content type from which to transform to json from result header
        try {
          if (res.headers['content-type'].includes('xml')){
            decrypted = this._xml_parser.parse(decrypted);
          } else if (res.headers['content-type'].includes('plain')){
            decrypted = await csv({
              delimiter:'\t',
              quote:'off'
            }).fromString(decrypted);
          }
        } catch(e){
          throw new CustomError({
            code:'PARSE_ERROR',
            message:'Could not parse result to JSON.',
            details:decrypted
          });
        }
      }
    }
    if (options.file){
      await this._saveFile(decrypted, options);
    }
    return decrypted;
  }

  // Upload a tab-delimited flat file or an xml document
  // Feed object:
  // content:'<CONTENT>', // Optional: The content to upload as a string. Required if "file" is not provided.
  // file:'<FILE_PATH>', // Optional: The absolute file path to the feed content document to upload. Required if "content" is not provided.
  // contentType:'<CONTENT_TYPE>' // Optional: The contentType of the content to upload. Should be one of "text/xml" or "text/tab-separated-values" and the charset of the content, i.e. "text/xml; charset=utf-8".
  async upload(details, feed){
    this._validateEncryptionDetails(details);
    if (!feed || (!feed.content && !feed.file)){
      throw new CustomError({
        code:'NO_FEED_CONTENT_PROVIDED',
        message:'Please provide "content" (string) or "file" (absolute path) of feed.'
      });
    }
    if (!feed.contentType){
      throw new CustomError({
        code:'NO_FEED_CONTENT_TYPE_PROVIDED',
        message:'Please provide "contentType" of feed (should be identical to the contentType used in "createFeedDocument" operation).'
      });
    }
    let feed_content = feed.content || await this._readFile(feed.file, feed.contentType);
    let content_buffer;
    if (details.encryptionDetails) {
      // Encrypt content to upload
      let cipher = crypto.createCipheriv(
        'aes-256-cbc',
        Buffer.from(details.encryptionDetails.key, 'base64'),
        Buffer.from(details.encryptionDetails.initializationVector, 'base64')
      );
      content_buffer = Buffer.concat([cipher.update(feed_content), cipher.final()]);
    } else {
      content_buffer = Buffer.from(feed_content);
    }
    // Upload encrypted content
    let res = await request({
      url:details.url,
      method:'PUT',
      headers:{
        'Content-Type':feed.contentType
      },
      body:content_buffer
    });
    this._validateUpOrDownloadSuccess(res, 'UPLOAD');
    return {success:true};
  }

};

module.exports = SellingPartner;
