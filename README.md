# amazon-sp-api (client for the Amazon Selling Partner API)
The client handles calls to the Amazon Selling Partner API. It wraps up all the neccessary stuff such as requesting access_token, security_token and signing requests with AWS4 signature.

## Prerequisites
Make sure that you followed the [Selling Partner API Developer Guide](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md) and have successfully completed the steps [Registering as a developer](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-as-a-developer), [Registering your Selling Partner API application](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-your-selling-partner-api-application) and have a valid refresh_token (if you use the client only for your own seller account the easiest way is using the self authorization as described in the developer guide).

## Installation
```bash
npm install amazon-sp-api
```

## Getting Started
Before you can use the client you need to add your app client and aws user credentials as environment variables:

* SELLING_PARTNER_APP_CLIENT_ID (your app client id, [see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information)). 
* SELLING_PARTNER_APP_CLIENT_SECRET (your app client secret, [see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information)). 
* AWS_ACCESS_KEY_ID (your aws user id, [see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user)). 
* AWS_SECRET_ACCESS_KEY (your aws user secret, [see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user)). 
* AWS_SELLING_PARTNER_ROLE (your aws selling partner api role, [see SP Developer Guide "Create an IAM role"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-4-create-an-iam-role)). 

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

###Config params

The class constructor takes a config object as input:
```javascript
{
  region:'eu', // Required: The region of the selling partner API endpoint ("eu", "na" or "fe")
  refresh_token:'<YOUR_REFRESH_TOKEN>', // Required: The refresh token of your app user
  access_token:'<YOUR_ACCESS_TOKEN>', // Optional: The access token requested with the refresh token of the app user
	role_tokens:{ 
		id:'<YOUR_TEMPORARY_ROLE_ACCESS_ID>', // Optional: The temporary access id for the sp api role of the iam user
		secret:'<YOUR_TEMPORARY_ROLE_ACCESS_SECRET>', // Optional: The temporary access secret for the sp api role of the iam user
		security:'<YOUR_TEMPORARY_ROLE_SECURITY_TOKEN>' // Optional: The temporary security token for the sp api role of the iam user
	},
	options:{
		auto_request_tokens:true // Optional: Whether or not the client should retreive new access and role tokens if non given or expired. Default is true
	}
}
```
If you only provide the required parameters (region and refresh_token) the client will automatically request access_token and role_tokens for you (with a TTL of 1 hour) and reuse these for future api calls for the class instance.
If you want to use the same credentials for multiple instances you can retrieve them via getters and use them as input for a new instance:
```javascript
let access_token = sellingPartner.access_token;
let role_tokens = sellingPartner.role_tokens;
let sellingPartnerNewInstance = new SellingPartnerAPI({
  region:'eu',
  refresh_token:'<YOUR_REFRESH_TOKEN>',
  access_token:access_token,
  role_tokens:role_tokens
});
```