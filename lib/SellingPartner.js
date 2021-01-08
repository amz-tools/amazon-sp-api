const CustomError = require('./CustomError');
const request = require('./request');
const Signer = require('./Signer');
const xml_parser = require('fast-xml-parser');
const credentials = require('./credentials');
const operations = require('./operations');
const crypto = require('crypto');
const csv = require('csvtojson');
const fs = require('fs');
const zlib = require('zlib');

// Provide credentials as environment variables OR create a path and file ~/.amzspapi/credentials (located in your user folder)
// If you don't provide access_token or role_credentials, the first call to an API endpoint will request them with a TTL of 1 hour
// Tokens are reused for the class instance
// Retrieve the tokens via getters if you want to use them across multiple instances of the SellingPartner class

class SellingPartner {

  // config object params:
  // region:'eu', // Required: The region of the selling partner API endpoint ("eu", "na" or "fe")
  // refresh_token:'<YOUR_REFRESH_TOKEN>', // Required: The refresh token of your app user
  // access_token:'<YOUR_ACCESS_TOKEN>', // Optional: The access token requested with the refresh token of the app user
  // sandbox:'true|false', // Optional: Sandbox mode, default : false
  // role_credentials:{ 
  //   id:'<YOUR_TEMPORARY_ROLE_ACCESS_ID>', // Optional: The temporary access id for the sp api role of the iam user
  //   secret:'<YOUR_TEMPORARY_ROLE_ACCESS_SECRET>', // Optional: The temporary access secret for the sp api role of the iam user
  //   security_token:'<YOUR_TEMPORARY_ROLE_SECURITY_TOKEN>' // Optional: The temporary security token for the sp api role of the iam user
  // },
  // options:{
  //   credentials_path:'<YOUR_CUSTOM_ABSOLUTE_PATH', // Optional
  //   auto_request_tokens:true // Optional: Whether or not the client should retrieve new access and role credentials if non given or expired. Default is true
  //   auto_request_throttled:true // Optional: Whether or not the client should automatically retry a request when throttled. Default is true
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
    this._sandbox = config.sandbox ? true : false;
    if (this._sandbox) {
      console.log(' ==== SANDBOX MODE: ON ====')
      console.log('More Info: https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#how-to-make-a-sandbox-call-to-the-selling-partner-api')
    }
    this._region = config.region;
    this._refresh_token = config.refresh_token;
    this._access_token = config.access_token;
    this._role_credentials = config.role_credentials;
    this._options = Object.assign({
      auto_request_tokens:true,
      auto_request_throttled:true
    }, config.options);

    this._credentials = credentials.load(this._options.credentials_path);
  }

  get access_token(){
    return this._access_token;
  }

  get role_credentials(){
    return this._role_credentials;
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
    if (!details || !details.encryptionDetails || !details.url){
      throw new CustomError({
        code:'DOWNLOAD_INFORMATION_MISSING',
        message:'Please provide encryptionDetails and url'
      });
    }
    // Docs state that no other encryption standards should be possible, but check if its correct anyway
    if (details.encryptionDetails.standard !== 'AES'){
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
        json_res = xml_parser.parse(res.body);
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

  async refreshAccessToken(){
    let res = await request({
      method:'POST',
      url:'https://api.amazon.com/auth/o2/token',
      body:JSON.stringify({
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
      json_res = JSON.parse(res.body);
    } catch (e){
      throw new CustomError({
        code:'REFRESH_ACCESS_TOKEN_PARSE_ERROR',
        message:res.body
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
        message:res.body
      });
    }
  }

  async refreshRoleCredentials(){
    let signed_request = new Signer(this._region).signRoleCredentialsRequest(this._credentials.aws_user);
    let res = await request(signed_request);
    let json_res;
    try {
      json_res = xml_parser.parse(res.body);
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
  // * operation: Required, the operation you want to request [see SP API References](https://github.com/amzn/selling-partner-api-docs/tree/main/references)
  // * path: The input paramaters added to the path of the operation
  // * query: The input parameters added to the query string of the operation
  // * body: The input parameters added to the body of the operation
  async callAPI(req_params){
    if (!req_params.operation){
      throw new CustomError({
        code:'NO_OPERATION_GIVEN',
        message:'Please provide an operation to call'
      });
    }
    if (!operations[req_params.operation]){
      throw new CustomError({
        code:'OPERATION_NOT_FOUND',
        message:'No operation found: ' + req_params.operation
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
    req_params = operations[req_params.operation](req_params);
    let signed_request = new Signer(this._region, this._sandbox).signAPIRequest(this._access_token, this._role_credentials, req_params);
    let res = await request(signed_request);
    let json_res;
    if (res.statusCode === 204 && req_params.method === 'DELETE'){
      return {success:true};
    }
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
            await this.refreshAccessToken();
            return await this.callAPI(req_params);
          } else if (/security token.*expired/.test(error.message)){
            await this.refreshRoleCredentials();
            return await this.callAPI(req_params);
          }
        }
      // Retry when call is throttled and auto_request_throttled is true
      } else if (res.statusCode === 429 && error.code === 'QuotaExceeded' && this._options.auto_request_throttled){
        await this._wait(req_params.restore_rate);
        return await this.callAPI(req_params);
      }
      if (error && error.code && error.code === 'InternalFailure' && this._sandbox) {
        throw new CustomError({
          code: 'INVALID_SANDBOX_PARAMETERS',
          message: 'You\'re in SANDBOX mode, make sure sandbox parameters are correct, as in Amazon SP API documentation: https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#how-to-make-a-sandbox-call-to-the-selling-partner-api'
        });
      }
      throw new CustomError(error);
    }
    // Some calls do not return response in payload but directly (i.e. operation "getSmallAndLightEligibilityBySellerSKU")!
    return json_res.payload || json_res;
  }

  // Will be a tab-delimited flat file or an xml document
  // Options object:
  // * json: true/false, whether or not the content should be transformed to json before returning it (from tab delimited flat-file or XML). Defaults to false.
  // --> IMPORTANT: is ignored when unzip is set to false.
  // * unzip: true/false, whether or not the content should be unzipped before returning it. Defaults to true. 
  // * file: absolute file path to save the report to. Defaults to not saving to disk.
  // --> IMPORTANT: Even when saved to disk the report content is still returned.
  async download(details, options = {}){
    options = Object.assign({
      unzip:true
    }, options);
    this._validateEncryptionDetails(details);
    let res = await request({
      url:details.url
    });
    this._validateUpOrDownloadSuccess(res, 'DOWNLOAD');
    // Decrypt buffer
    let encrypted_buffer = Buffer.concat(res.chunks);
    let decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(details.encryptionDetails.key, 'base64'),
      Buffer.from(details.encryptionDetails.initializationVector, 'base64')
    );
    let decrypted_buffer = Buffer.concat([decipher.update(encrypted_buffer), decipher.final()]);
    // Decompress if content is compressed and unzip option is true
    if (details.compressionAlgorithm && options.unzip){
      decrypted_buffer = await this._unzip(decrypted_buffer);
    }
    let decrypted = (!details.compressionAlgorithm || options.unzip) ? decrypted_buffer.toString() : decrypted_buffer;
    if ((options.unzip || !details.compressionAlgorithm) && options.json){
      // Transform content to json --> take content type from which to transform to json from result header
      try {
        if (res.headers['content-type'].includes('xml')){
          decrypted = xml_parser.parse(decrypted);
        } else if (res.headers['content-type'].includes('plain')){
          decrypted = await csv({
            delimiter:'\t'
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
    if (options.file){
      await this._saveFile(decrypted, options);
    }
    return decrypted;
  }

  // Upload a tab-delimited flat file or an xml document
  // feed object:
  // * content: Required if "file" is not provided, the content to upload as a string
  // * file: Required if "content" is not provided, the absolute file path of the document to upload
  // --> IMPORTANT: Is ignored if "content" is provided
  // * contentType: Required, the contentType of the content to upload
  // --> (should be one of "text/xml" or "text/tab-separated-values" and the charset of the content, i.e. "text/xml; charset=utf-8")
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
    // Encrypt content to upload
    let cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(details.encryptionDetails.key, 'base64'),
      Buffer.from(details.encryptionDetails.initializationVector, 'base64')
    );
    let encrypted_buffer = Buffer.concat([cipher.update(feed_content), cipher.final()]);
    // Upload encrypted content
    let res = await request({
      url:details.url,
      method:'PUT',
      headers:{
        'Content-Type':feed.contentType
      },
      body:encrypted_buffer
    });
    this._validateUpOrDownloadSuccess(res, 'UPLOAD');
    return {success:true};
  }

};

module.exports = SellingPartner;
