const CustomError = require('./CustomError');
const request = require('./request');
const Signer = require('./Signer');
const xml_parser = require('fast-xml-parser');
const credentials = require('./credentials');

// Create a config object --> auto_request_tokens true/false, retry call true/false
// Provide the app_client id and secret (taken from the app created in Step 6 of SP API Developer Guide)
// Provide the aws_user id, secret and role (taken from Step 2 and Step 4 of SP API Developer Guide)
// SELLING_PARTNER_REGION --> one of na, eu or fe
// --> Provide both credentials as environment variables OR create a path and file called ~/amz-sp-api/credentials (located in your user folder)
// If you don't provide access_token or role_tokens, the first call to an API endpoint will request them with a TTL of 1 hour
// --> Tokens are reused for the class instance
// --> You may retrieve the tokens via getters if you want to use the tokens across multiple instances of the SellingPartner class
// Required in config is 

class SellingPartner {

  // Required config params: refresh_token and valid region (eu, na or fe)
  // Optional config params: access_token, role_tokens and options (auto_request_tokens and auto_retry_throttled, both default to true)
  constructor(config){
    if (!config.refresh_token){
      throw new CustomError({
        code:'NO_REFRESH_TOKEN_PROVIDED',
        message:'Please provide a refresh token'
      });
    }
    if (!config.region || !/^(eu|na|fe)$/.test(config.region)){
      throw new CustomError({
        code:'NO_VALID_REGION_PROVIDED',
        message:'Please provide one of: "eu", "na" or "fe"'
      });
    }
    this._region = config.region;
    this._refresh_token = config.refresh_token;
    this._access_token = config.access_token;
    this._role_tokens = config.role_tokens;
    this._options = Object.assign({
      auto_request_tokens:true,
      auto_retry_throttled:true
    }, config.options);

    this._app_client = credentials.load('app_client');
    this._aws_user = credentials.load('aws_user');
  }

  get access_token(){
    return this._access_token;
  }

  get role_tokens(){
    return this._role_tokens;
  }

  async refreshAccessToken(){
    let res = await request({
      method:'POST',
      url:'https://api.amazon.com/auth/o2/token',
      data:{
        grant_type:'refresh_token',
        refresh_token:this._refresh_token,
        client_id:this._app_client.id,
        client_secret:this._app_client.secret
      },
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    });
    let json_res;
    try {
      json_res = JSON.parse(res);
    } catch (e){
      throw new CustomError({
        code:'REFRESH_ACCESS_TOKEN_PARSE_ERROR',
        message:res
      });
    }
    if (json_res.access_token){
      this._access_token = json_res.access_token;
    } else if (json_res.error){
      throw new CustomError({
        code:json_res.error,
        message:json_res.error_description
      });
    } else {
      throw new CustomError({
        code:'UNKNOWN_REFRESH_ACCESS_TOKEN_ERROR',
        message:res
      });
    }
  }

  async refreshRoleTokens(){
    let signed_request = new Signer(this._region).signRoleTokensRequest(this._aws_user);
    let res = await request(signed_request);
    let json_res;
    try {
      json_res = xml_parser.parse(res);
    } catch(e){
      throw new CustomError({
        code:'XML_PARSE_ERROR',
        message:res
      });
    }
    if (json_res && json_res.AssumeRoleResponse && json_res.AssumeRoleResponse.AssumeRoleResult && json_res.AssumeRoleResponse.AssumeRoleResult.Credentials){
      let credentials = json_res.AssumeRoleResponse.AssumeRoleResult.Credentials;
      this._role_tokens = {
        id:credentials.AccessKeyId,
        secret:credentials.SecretAccessKey,
        security:credentials.SessionToken
      };
    } else if (json_res && json_res.ErrorResponse && json_res.ErrorResponse.Error){
      throw new CustomError({
        code:json_res.ErrorResponse.Error.Code,
        message:json_res.ErrorResponse.Error.Message
      });
    } else {
      throw new CustomError({
        code:'NO_ROLE_TOKEN_CREDENTIALS_RECEIVED',
        message:res
      });
    }
  }

  async callAPI(req_params){
    if (!req_params.path){
      throw new CustomError({
        code:'NO_API_PATH_GIVEN',
        message:'Please provide an API path to call'
      });
    }
    if (this._options.auto_request_tokens){
      if (!this._access_token){
        await this.refreshAccessToken();
      }
      if (!this._role_tokens){
        await this.refreshRoleTokens();
      }
    }
    if (!this._access_token || !this._role_tokens){
      throw new CustomError({
        code:'NO_ACCESS_TOKEN_AND_OR_ROLE_TOKENS_PRESENT',
        message:'Did you turn off "auto_request_tokens" and forgot to refresh the access token and/or role tokens?'
      });
    }
    let signed_request = new Signer(this._region).signAPIRequest(this._access_token, this._role_tokens, req_params);
    let res = await request(signed_request);
    let json_res;
    try {
      // Replace newlines in json result because some errors are returned with newline characters, i.e. "InvalidSignature"
      json_res = JSON.parse(res.replace(/\n/g, ''));
    } catch (e){
      throw new CustomError({
        code:'JSON_PARSE_ERROR',
        message:res
      });
    } 
    if (json_res.errors){
      let error = json_res.errors[0];
      // Refresh tokens when expired and auto_request_tokens is true
      if (error.code === 'Unauthorized'){
        if (this._options.auto_request_tokens){
          if (/access token.*expired/.test(error.details)){
            await this.refreshAccessToken();
          } else if (/security token.*expired/.test(error.message)){
            await this.refreshRoleTokens();
          }
          return await this.callAPI(req_params);
        }
      }
      throw new CustomError(error);
    }
    return json_res.payload;
  }

};

module.exports = SellingPartner;