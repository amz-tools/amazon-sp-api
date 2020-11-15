# amazon-sp-api (client for the Amazon Selling Partner API)
The client handles calls to the Amazon Selling Partner API. It wraps up all the neccessary stuff such as requesting access token, security token and signing requests with AWS4 signature.

## Prerequisites
Make sure that you followed the [Selling Partner API Developer Guide](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md) and have successfully completed the steps [Registering as a developer](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-as-a-developer), [Registering your Selling Partner API application](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-your-selling-partner-api-application) and have a valid refresh_token (if you use the client only for your own seller account the easiest way is using the self authorization as described in the developer guide).

## Installation
```bash
npm install amazon-sp-api
```

## Getting Started
Before you can use the client you need to add your app client and aws user credentials as environment variables:

* SELLING_PARTNER_APP_CLIENT_ID=<YOUR_APP_CLIENT_ID> ([see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information))
* SELLING_PARTNER_APP_CLIENT_SECRET=<YOUR_APP_CLIENT_SECRET> ([see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information))
* AWS_ACCESS_KEY_ID=<YOUR_AWS_USER_ID> ([see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user))
* AWS_SECRET_ACCESS_KEY=<YOUR_AWS_USER_SECRET> ([see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user))
* AWS_SELLING_PARTNER_ROLE=<YOUR_AWS_SELLING_PARTNER_API_ROLE> ([see SP Developer Guide "Create an IAM role"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-4-create-an-iam-role))

### Setting credentials from file
Instead of setting the credentials via environment variables you may load them from a credentials file. The default path to the file is ~/.amzspapi/credentials (path can be changed when creating a client) and you add the credentials one per line:
```bash
SELLING_PARTNER_APP_CLIENT_ID=<YOUR_APP_CLIENT_ID>
SELLING_PARTNER_APP_CLIENT_SECRET=<YOUR_APP_CLIENT_SECRET>
AWS_ACCESS_KEY_ID=<YOUR_AWS_USER_ID>
AWS_SECRET_ACCESS_KEY=<YOUR_AWS_USER_SECRET>
AWS_SELLING_PARTNER_ROLE=<YOUR_AWS_SELLING_PARTNER_API_ROLE>
```

## Usage
Require library:
```javascript
let SellingPartnerAPI = require('amazon-sp-api');
```

Create client and call API:
```javascript
(async() => {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region:'eu', // The region of the selling partner API endpoint ("eu", "na" or "fe")
      refresh_token:'<YOUR_REFRESH_TOKEN>' // The refresh token of your app user
    });
    let res = await sellingPartner.callAPI({
      path:'/sellers/v1/marketplaceParticipations'
    });
    console.log(res);
  } catch(e){
    console.log(e);
  }
})();
```

### Config params

The class constructor takes a config object as input:
```javascript
{
  region:'eu', // Required: The region of the selling partner API endpoint ("eu", "na" or "fe")
  refresh_token:'<YOUR_REFRESH_TOKEN>', // Required, the refresh token of your app user
  access_token:'<YOUR_ACCESS_TOKEN>', // Optional, the access token requested with the refresh token of the app user
  role_credentials:{ 
    id:'<YOUR_TEMPORARY_ROLE_ACCESS_ID>', // Optional, the temporary access id for the sp api role of the iam user
    secret:'<YOUR_TEMPORARY_ROLE_ACCESS_SECRET>', // Optional, the temporary access secret for the sp api role of the iam user
    security_token:'<YOUR_TEMPORARY_ROLE_SECURITY_TOKEN>' // Optional, the temporary security token for the sp api role of the iam user
  },
  options:{
  	credentials_path:'<YOUR_CUSTOM_ABSOLUTE_PATH>', // Optional, a custom absolute path to your credentials file location
    auto_request_tokens:true // Optional, whether or not the client should retrieve new access and role credentials if non given or expired. Default is true
  }
}
```
If you only provide the required parameters (region and refresh_token) the client will automatically request access_token and role_credentials for you (with a TTL of 1 hour) and reuse these for future api calls for the class instance.
If you want to use the same credentials for multiple instances you can retrieve them via getters and use them as input for a new instance:
```javascript
let access_token = sellingPartner.access_token;
let role_credentials = sellingPartner.role_credentials;

let sellingPartnerNewInstance = new SellingPartnerAPI({
  region:'eu',
  refresh_token:'<YOUR_REFRESH_TOKEN>',
  access_token:access_token,
  role_credentials:role_credentials
});
```

### Request tokens and role credentials manually

Instead of having the client handle the access token and role credentials requests automatically, you may also refresh them manually:
```javascript
let sellingPartner = new SellingPartnerAPI({
  region:'eu',
  refresh_token:'<YOUR_REFRESH_TOKEN>',
  options:{
    auto_request_tokens:false
  }
});
await sellingPartner.refreshAccessToken();
await sellingPartner.refreshRoleCredentials();
```

### Call the API

The .callAPI() function takes an object as input:
* path: Required, the API path you want to request, [see SP API References](https://github.com/amzn/selling-partner-api-docs/tree/main/references)
* method: Optional, HTTP Method of the call, default is GET
* query: Optional, the input parameters of the call
```javascript
let res = await sellingPartner.callAPI({
  path:'/sales/v1/orderMetrics',
  method:'GET',
  query:{
    marketplaceIds:'A1PA6795UKMFR9',
    interval:'2020-10-01T00:00:00-07:00--2020-10-01T20:00:00-07:00',
    granularity:'Hour'
  }
});
```