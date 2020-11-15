# amazon-sp-api
Amazon SellingPartner API Client
The client handles calls to the Amazon Selling Partner API. It wraps up all the neccessary stuff such as requesting access_token, security_token and signing requests with AWS4 signature.

## Prerequisites
Make sure that you followed the [Selling Partner API Developer Guide](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md) and have successfully completed the Steps [Registering as a developer](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-as-a-developer), [Registering your Selling Partner API application](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-your-selling-partner-api-application) and have a valid refresh_token (easiest way by using the Self Authorization).

## Installation
```bash
npm install amazon-sp-api
```

## Getting Started
Before you can use the client you need to add your app client and aws user credentials as environment variables:

SELLING_PARTNER_APP_CLIENT_ID (your app client id [see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information))
SELLING_PARTNER_APP_CLIENT_SECRET (your app client secret [see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information))
AWS_ACCESS_KEY_ID (your aws user id [see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user))
AWS_SECRET_ACCESS_KEY (your aws user secret [see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user))
AWS_SELLING_PARTNER_ROLE (your aws selling partner api role [see SP Developer Guide "Create an IAM role"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-4-create-an-iam-role))

## Usage
Require library
```javascript
let SellingPartner = require('amazon-sp-api');
```

Create client and call API
```javascript
(async() => {
	try {
		let sellingPartner = new SellingPartnerAPI({
			region:'eu', 												// The region of the selling partner API endpoint ("eu", "na" or "fe")
			refresh_token:'<YOUR_REFRESH_TOKEN>'	// The refresh token of your app user
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