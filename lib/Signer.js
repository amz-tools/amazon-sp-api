const crypto = require('crypto-js');
const qs = require('qs');
const utils = require('./utils');

class Signer {

  constructor(region, use_sandbox, user_agent){
    this._region = region;
    this._aws_regions = {
      'eu':'eu-west-1',
      'na':'us-east-1',
      'fe':'us-west-2'
    };
    let sandbox_prefix = use_sandbox ? 'sandbox.' : '';
    this._api_endpoint = sandbox_prefix + 'sellingpartnerapi-' + this._region + '.amazon.com';
    this._user_agent = user_agent;
    this._iso_date;
  }

  _createUTCISODate(){
    let iso_date = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '');
    this._iso_date = {
      short:iso_date.substr(0,8),
      full:iso_date
    };
  }

  _encodeApiPath(api_path){
    return api_path.split('/').map((url_part) => {
      return utils.encodeURIComponent(url_part);
    }).join('/');
  }

  _constructEncodedQueryString(query){
    if (query){
      let key_is_sku = false;
      return qs.stringify(query, {
        encoder:(value, defaultEncoder, charset, type) => {
          return utils.encodeURIComponent(value);
        },
        arrayFormat:'comma',
        sort:(a, b) => {
          return a.localeCompare(b);
        }
      });
    }
    return '';
  }

  _constructCanonicalRequestForRoleCredentials(encoded_query_string){
    let canonical = [];
    canonical.push('POST');
    canonical.push('/');
    canonical.push('');
    canonical.push('host:sts.amazonaws.com');
    canonical.push('user-agent:' + this._user_agent);
    canonical.push('x-amz-content-sha256:' + crypto.SHA256(encoded_query_string));
    canonical.push('x-amz-date:' + this._iso_date.full);
    canonical.push('');
    canonical.push('host;user-agent;x-amz-content-sha256;x-amz-date');
    canonical.push(crypto.SHA256(encoded_query_string));
    return canonical.join('\n');
  }

  _constructCanonicalRequestForAPI(access_token, params, encoded_query_string){
    let canonical = [];
    canonical.push(params.method);
	  // URI components must be double encoded when constructing the canonical request
	  // --> https://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html
    // First encode is done inside version operation definitions when constructing the api_path (utils.checkAndEncodeParams)
    canonical.push(this._encodeApiPath(params.api_path));
    canonical.push(encoded_query_string);
    canonical.push('host:' + this._api_endpoint);
    canonical.push('user-agent:' + this._user_agent);
    canonical.push('x-amz-access-token:' + access_token);
    canonical.push('x-amz-date:' + this._iso_date.full);
    canonical.push('');
    canonical.push('host;user-agent;x-amz-access-token;x-amz-date');
    canonical.push(crypto.SHA256(params.body ? JSON.stringify(params.body) : ''));
    return canonical.join('\n');
  }

  _constructStringToSign(region, action_type, canonical_request){
    let string_to_sign = [];
    string_to_sign.push('AWS4-HMAC-SHA256')
    string_to_sign.push(this._iso_date.full);
    string_to_sign.push(this._iso_date.short + '/' + region + '/' + action_type + '/aws4_request');
    string_to_sign.push(crypto.SHA256(canonical_request));
    return string_to_sign.join('\n');
  }

  _constructSignature(region, action_type, string_to_sign, secret){
    let signature = crypto.HmacSHA256(this._iso_date.short, 'AWS4' + secret);
    signature = crypto.HmacSHA256(region, signature);
    signature = crypto.HmacSHA256(action_type, signature);
    signature = crypto.HmacSHA256('aws4_request', signature);
    return crypto.HmacSHA256(string_to_sign, signature).toString(crypto.enc.Hex);
  }

  _constructURL(req_params, encoded_query_string){
    // We don't have to encode api_path parts here because parts have already been encoded in version operation definitions
    let url = 'https://' + this._api_endpoint + req_params.api_path;
    if (encoded_query_string !== ''){
      url += '?' + encoded_query_string;
    }
    return url;
  }

  signAPIRequest(access_token, role_credentials, req_params){

    this._createUTCISODate();

    let encoded_query_string = this._constructEncodedQueryString(req_params.query);
    let canonical_request = this._constructCanonicalRequestForAPI(access_token, req_params, encoded_query_string);
    let string_to_sign = this._constructStringToSign(this._aws_regions[this._region], 'execute-api', canonical_request);
    let signature = this._constructSignature(this._aws_regions[this._region], 'execute-api', string_to_sign, role_credentials.secret);

    return {
      method:req_params.method,
      url:this._constructURL(req_params, encoded_query_string),
      body:req_params.body ? JSON.stringify(req_params.body) : null,
      headers:{
        'Authorization':'AWS4-HMAC-SHA256 Credential=' + role_credentials.id + '/' + this._iso_date.short + '/' + this._aws_regions[this._region] + '/execute-api/aws4_request, SignedHeaders=host;user-agent;x-amz-access-token;x-amz-date, Signature=' + signature,
        'Content-Type': 'application/json; charset=utf-8',
        'host':this._api_endpoint,
        'user-agent':this._user_agent,
        'x-amz-access-token':access_token,
        'x-amz-security-token':role_credentials.security_token,
        'x-amz-date':this._iso_date.full     
      }
    };

  }

  signRoleCredentialsRequest(aws_user){
    let query = {
      'Action':'AssumeRole',
      'DurationSeconds':'3600',
      'RoleArn':aws_user.role,
      'RoleSessionName':'SPAPISession',
      'Version':'2011-06-15'
    };

    this._createUTCISODate();

    let encoded_query_string = this._constructEncodedQueryString(query);
    let canonical_request = this._constructCanonicalRequestForRoleCredentials(encoded_query_string);
    // TODO: Find out why role credentials request only works with us-east-1 AWS region
    let string_to_sign = this._constructStringToSign('us-east-1', 'sts', canonical_request);
    let signature = this._constructSignature('us-east-1', 'sts', string_to_sign, aws_user.secret);

    return {
      method:'POST',
      url:'https://sts.amazonaws.com',
      body:encoded_query_string,
      headers:{
        'Authorization':'AWS4-HMAC-SHA256 Credential=' + aws_user.id + '/' + this._iso_date.short + '/us-east-1/sts/aws4_request, SignedHeaders=host;user-agent;x-amz-content-sha256;x-amz-date, Signature=' + signature,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Host':'sts.amazonaws.com',
        'user-agent':this._user_agent,
        'X-Amz-Content-Sha256':crypto.SHA256(encoded_query_string).toString(crypto.enc.Hex),
        'X-Amz-Date':this._iso_date.full
      }
    };

  }

};

module.exports = Signer;
