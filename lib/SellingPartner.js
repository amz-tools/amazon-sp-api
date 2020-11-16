const CustomError = require('./CustomError');
const request = require('./request');
const Signer = require('./Signer');
const xml_parser = require('fast-xml-parser');
const credentials = require('./credentials');

// Provide credentials as environment variables OR create a path and file ~/.amzspapi/credentials (located in your user folder)
// If you don't provide access_token or role_credentials, the first call to an API endpoint will request them with a TTL of 1 hour
// Tokens are reused for the class instance
// Retrieve the tokens via getters if you want to use them across multiple instances of the SellingPartner class

class SellingPartner {

  // config object params:
  // region:'eu', // Required: The region of the selling partner API endpoint ("eu", "na" or "fe")
  // refresh_token:'<YOUR_REFRESH_TOKEN>', // Required: The refresh token of your app user
  // access_token:'<YOUR_ACCESS_TOKEN>', // Optional: The access token requested with the refresh token of the app user
  // role_credentials:{ 
  //   id:'<YOUR_TEMPORARY_ROLE_ACCESS_ID>', // Optional: The temporary access id for the sp api role of the iam user
  //   secret:'<YOUR_TEMPORARY_ROLE_ACCESS_SECRET>', // Optional: The temporary access secret for the sp api role of the iam user
  //   security_token:'<YOUR_TEMPORARY_ROLE_SECURITY_TOKEN>' // Optional: The temporary security token for the sp api role of the iam user
  // },
  // options:{
  //   credentials_path:'<YOUR_CUSTOM_ABSOLUTE_PATH', // Optional
  //   auto_request_tokens:true // Optional: Whether or not the client should retrieve new access and role credentials if non given or expired. Default is true
  // }
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
    this._role_credentials = config.role_credentials;
    this._options = Object.assign({
      auto_request_tokens:true
    }, config.options);

    this._credentials = credentials.load(this._options.credentials_path);
  }

  get access_token(){
    return this._access_token;
  }

  get role_credentials(){
    return this._role_credentials;
  }

  async refreshAccessToken(){
    let res = await request({
      method:'POST',
      url:'https://api.amazon.com/auth/o2/token',
      query:JSON.stringify({
        grant_type:'refresh_token',
        refresh_token:this._refresh_token,
        client_id:this._credentials.app_client.id,
        client_secret:this._credentials.app_client.secret
      }),
      headers:{
        'Content-Type':'application/json'
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

  async refreshRoleCredentials(){
    let signed_request = new Signer(this._region).signRoleCredentialsRequest(this._credentials.aws_user);
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
        message:res
      });
    }
  }

  // req_params object params:
  // path: Required, the API path you want to request, [see SP API References](https://github.com/amzn/selling-partner-api-docs/tree/main/references)
  // method: Optional, HTTP Method of the call, default is GET
  // query: Optional, the input parameters of the call
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
      if (!this._role_credentials){
        await this.refreshRoleCredentials();
      }
    }
    if (!this._access_token || !this._role_credentials){
      throw new CustomError({
        code:'NO_ACCESS_TOKEN_AND_OR_ROLE_CREDENTIALS_PRESENT',
        message:'Did you turn off "auto_request_tokens" and forgot to refresh the access token and/or role credentials?'
      });
    }
    let signed_request = new Signer(this._region).signAPIRequest(this._access_token, this._role_credentials, req_params);
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
            return await this.callAPI(req_params);
          } else if (/security token.*expired/.test(error.message)){
            await this.refreshRoleCredentials();
            return await this.callAPI(req_params);
          }
        }
      }
      throw new CustomError(error);
    }
    return json_res.payload;
  }

};

module.exports = SellingPartner;