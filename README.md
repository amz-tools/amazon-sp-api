# amazon-sp-api (client for the Amazon Selling Partner API)
The client handles calls to the Amazon Selling Partner API. It wraps up all the necessary stuff such as requesting access token, security token and signing requests with AWS4 signature.

## Contents

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Getting Started](#getting-started)
  * [Setting credentials from environment variables](#setting-credentials-from-environment-variables)
  * [Setting credentials from file](#setting-credentials-from-file)
  * [Setting credentials from constructor config object](#setting-credentials-from-constructor-config-object)
* [Usage](#usage)
  * [Config params](#config-params)
  * [Request tokens and role credentials manually](#request-tokens-and-role-credentials-manually)
* [Call the API](#call-the-api)
  * [Examples](#examples)
  * [Grantless operations](#grantless-operations)
  * [Restore rates](#restore-rates)
* [Download, decrypt and unzip reports](#download-decrypt-and-unzip-reports)
* [Encrypt and upload feeds](#encrypt-and-upload-feeds)
* [Sandbox mode](#sandbox-mode)
* [Known Issues](#known-issues)
* [Seller Support](#seller-support)

## Prerequisites
Make sure that you followed the [Selling Partner API Developer Guide](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md) and have successfully completed the steps [Registering as a developer](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-as-a-developer), [Registering your Selling Partner API application](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-your-selling-partner-api-application) and have a valid refresh_token (if you use the client only for your own seller account the easiest way is using the self authorization as described in the developer guide).

## Installation
```bash
npm install amazon-sp-api
```

## Getting Started
Before you can use the client you need to add your app client and aws user credentials.

### Setting credentials from environment variables
* `SELLING_PARTNER_APP_CLIENT_ID`=<YOUR_APP_CLIENT_ID> ([see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information))
* `SELLING_PARTNER_APP_CLIENT_SECRET`=<YOUR_APP_CLIENT_SECRET> ([see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information))
* `AWS_SELLING_PARTNER_ACCESS_KEY_ID` or `AWS_ACCESS_KEY_ID`=<YOUR_AWS_USER_ID> ([see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user))
* `AWS_SELLING_PARTNER_SECRET_ACCESS_KEY` or `AWS_SECRET_ACCESS_KEY`=<YOUR_AWS_USER_SECRET> ([see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user))
* `AWS_SELLING_PARTNER_ROLE`=<YOUR_AWS_SELLING_PARTNER_API_ROLE> ([see SP Developer Guide "Create an IAM role"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#step-4-create-an-iam-role))

### Setting credentials from file
Instead of setting the credentials via environment variables you may load them from a credentials file. The default path to the file is ~/.amzspapi/credentials (path can be changed when creating a client) and you add the credentials one per line:
```bash
SELLING_PARTNER_APP_CLIENT_ID=<YOUR_APP_CLIENT_ID>
SELLING_PARTNER_APP_CLIENT_SECRET=<YOUR_APP_CLIENT_SECRET>
AWS_ACCESS_KEY_ID=<YOUR_AWS_USER_ID>
AWS_SECRET_ACCESS_KEY=<YOUR_AWS_USER_SECRET>
AWS_SELLING_PARTNER_ROLE=<YOUR_AWS_SELLING_PARTNER_API_ROLE>
```

### Setting credentials from constructor config object
Although the most convenient and recommended way of setting the credentials is via environment variables or config file it is also possible to pass the credentials inside the config object when creating an instance of the client (i.e. if you have no means of using env vars or a config file). The structure of the constructor config object will be explained below.

## Usage
Require library:
```javascript
const SellingPartnerAPI = require('amazon-sp-api');
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
      operation:'getMarketplaceParticipations'
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
  refresh_token:'<YOUR_REFRESH_TOKEN>', // Optional: The refresh token of your app user. Required if "only_grantless_operations" option is set to false
  access_token:'<YOUR_ACCESS_TOKEN>', // Optional: The access token requested with the refresh token of the app user
  role_credentials:{
    id:'<YOUR_TEMPORARY_ROLE_ACCESS_ID>', // Optional: The temporary access id for the sp api role of the iam user
    secret:'<YOUR_TEMPORARY_ROLE_ACCESS_SECRET>', // Optional: The temporary access secret for the sp api role of the iam user
    security_token:'<YOUR_TEMPORARY_ROLE_SECURITY_TOKEN>' // Optional: The temporary security token for the sp api role of the iam user
  },
  options:{
    credentials_path:'<YOUR_CUSTOM_ABSOLUTE_PATH>', // Optional: A custom absolute path to your credentials file location
    auto_request_tokens:true, // Optional: Whether or not the client should retrieve new access and role credentials if non given or expired. Default is true
    auto_request_throttled:true, // Optional: Whether or not the client should automatically retry a request when throttled. Default is true
    use_sandbox:false, // Optional: Whether or not to use the sandbox endpoint. Default is false
    only_grantless_operations:false // Optional: Whether or not to only use grantless operations. Default is false
  },
  // Optional: Your app client and aws user credentials
  // --> should only be used if you have no means of using environment vars or credentials file
  credentials:{
    SELLING_PARTNER_APP_CLIENT_ID:'<YOUR_APP_CLIENT_ID>',
    SELLING_PARTNER_APP_CLIENT_SECRET:'<YOUR_APP_CLIENT_SECRET>',
    AWS_ACCESS_KEY_ID:'<YOUR_AWS_USER_ID>',
    AWS_SECRET_ACCESS_KEY:'<YOUR_AWS_USER_SECRET>',
    AWS_SELLING_PARTNER_ROLE:'<YOUR_AWS_SELLING_PARTNER_API_ROLE>'
  }
}
```
If you only provide the "region" and "refresh_token" parameters the client will automatically request access_token and role_credentials for you (with a TTL of 1 hour) and reuse these for future api calls for the class instance.
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

## Call the API

The **.callAPI()** function takes an object as input:
* `operation`: Required, the operation you want to request [see SP API References](https://github.com/amzn/selling-partner-api-docs/tree/main/references)
* `path`: Optional, the input paramaters added to the path of the operation
* `query`: Optional, the input parameters added to the query string of the operation
* `body`: Optional, the input parameters added to the body of the operation
* `options`: Optional, additional options, currently only supports `raw_result:true` as key/value, see examples for more information 

### Examples
```javascript
let res = await sellingPartner.callAPI({
  operation:'getOrderMetrics',
  query:{
    marketplaceIds:['A1PA6795UKMFR9'],
    interval:'2020-10-01T00:00:00-07:00--2020-10-01T20:00:00-07:00',
    granularity:'Hour'
  }
});
```
```javascript
let res = await sellingPartner.callAPI({
  operation:'getCatalogItem',
  path:{
    asin:'B084J4QQFT'
  },
  query:{
    MarketplaceId:'A1PA6795UKMFR9'
  }
});
```
```javascript
let res = await sellingPartner.callAPI({
  operation:'createReport',
  body:{
    reportType:'GET_FLAT_FILE_OPEN_LISTINGS_DATA',
    marketplaceIds:['A1PA6795UKMFR9']
  }
});
```
Instead of having the client handle the result and error parsing you may also have the client return the "raw" result, which will include the raw body, buffer chunks, statusCode and headers of the result. I.e. this might be helpful when the client encounters JSON.parse errors such as the ones already encountered with old finance documents ([see Known Issues](#known-issues)). To do so you pass in an options object with the key `raw_result` to `true` to the .callAPI() function:
```javascript
let res = await sellingPartner.callAPI({
  operation:'listFinancialEvents',
  query:{
    PostedAfter:'2020-03-01T00:00:00-07:00',
    PostedBefore:'2020-03-02T00:00:00-07:00'
  },
  options:{
    raw_result:true
  }
});
```

### Grantless operations

Some operations don't require an explicit authorization by a seller ([list of grantless operations](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/developer-guide/SellingPartnerApiDeveloperGuide.md#grantless-operations-1)). A grantless operation needs another access_token than other operations and as such a grantless token is NOT the access_token you can provide in the constructor config object. However if you set "auto_request_tokens" option to true the client should handle everything for you.

If you do the token request manually you need to create a grantless token by calling "refreshAccessToken" with the scope of the corresponding endpoint. Currently there are only two different scopes: "sellingpartnerapi::migration" for authorization endpoint and "sellingpartnerapi::notifications" for notifications endpoint.

If you don't need or have a refresh_token (i.e. because you want to retrieve an SP API authorization code of an already via MWS authorized seller) you may use the client with the "only_grantless_operations" option set to true which allows you to create an instance of the client without a refresh_token.

To sum up, please see the following example that will request an auth code for an authorized MWS seller account.

First create a client instance that only allows to call grantless operations (no refresh_token included):
```javascript
let sellingPartner = new SellingPartnerAPI({
  region:'eu',
  options:{
    auto_request_tokens:false,
    only_grantless_operations:true
  }
});
```
Then request a grantless token with the scope needed for the operation you want to call and refresh the role credentials:
```javascript
await sellingPartner.refreshAccessToken('sellingpartnerapi::migration');
await sellingPartner.refreshRoleCredentials();
```
Finally call the grantless operation:
```javascript
let res = await sellingPartner.callAPI({
  operation:'getAuthorizationCode',
  query:{
    sellingPartnerId:'<YOUR_CUSTOMERS_SELLER_ID>',
    developerId:'<YOUR_DEVELOPER_ID>',
    mwsAuthToken:'<YOUR_CUSTOMERS_MWS_TOKEN>'
  }
});
```

### Restore rates
If you set the `auto_request_throttled` option in the class constructor config object to `true` (which is the default), the client will automatically retry the call if its throttled. It will either use the restore rate from the result header field `x-amzn-ratelimit-limit` if given [see Usage Plans and Rate Limits](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/usage-plans-rate-limits/Usage-Plans-and-Rate-Limits.md) or otherwise use the default restore rate of the operation. If you set `auto_request_throttled` to `false` the client will throw a "QuoatExceeded" error when a request is throttled.
IMPORTANT:If you are using the same operation with the same seller account across multiple class instances the restore rate logic might NOT work correct or, even worse, result in an infinite quota exceeded loop. So if you're planning to do that you should probalby set `auto_request_throttled` to `false`, catch the "QuotaExceeded" errors and handle the restore rate logic on your own.

## Download, decrypt and unzip reports

The **.download()** function takes the download details (url and encryption details) received from a "getReportDocument" operation as input, downloads the content, unzips it (if result is compressed), decrypts it and returns it.
You may also include an options object to enable a json result or to additionally save the report to a file.
Retrieve the download details from a "getReportDocument" operation:
```javascript
let report_document = await sellingPartner.callAPI({
  operation:'getReportDocument',
  path:{
    reportDocumentId:'<REPORT_DOCUMENT_ID>' // retrieve the reportDocumentId from a "getReport" operation (when processingStatus of report is "DONE")
  }
});
```
The structure of the returned report_document should look like this:
```javascript
{
  reportDocumentId:'<REPORT_DOCUMENT_ID>',
  compressionAlgorithm:'GZIP', // Only included if report is compressed
  encryptionDetails:{
    standard:'AES',
    initializationVector:'<INITIALIZATION_VECTOR>',
    key:'<KEY>'
  },
  url: '<REPORT_DOWNLOAD_URL>' // Expires after 5 minutes!
}
```
Call the .download() function to receive the content of the report. The default without any config options will download, decrypt and unzip the content and return it without reformatting or saving it to the disk:
```javascript
let report = await sellingPartner.download(report_document);
```
The options object has three optional properties:
* `json`: Optional (true|false), whether or not the content should be transformed to json before returning it (from tab delimited flat-file or XML). Defaults to false. IMPORTANT: is ignored when content is compressed and unzip is set to false.
* `unzip`: Optional (true|false), whether or not the content should be unzipped before returning it. Defaults to true. 
* `file`: Optional, absolute file path to save the report to. Defaults to not saving to disk. IMPORTANT: Even when saved to disk the report content is still returned.
* `charset`: Optional, the charset to use for decoding the content. IMPORTANT: is ignored when content is compressed and unzip is set to false.

The following call will download the report, transform it to json and save it to disk:
```javascript
let report = await sellingPartner.download(report_document, {
  json:true,
  file:'<YOUR_ABSOLUTE_FILE_PATH>/report.json'
});
```

Some reports may have an encoding other than UTF-8 and require special decoding with a different charset, i.e. the "GET_MERCHANT_LISTINGS_ALL_DATA" report is encoded as "cp1252". Proper decoding is possible with passing in the optional charset property:
 ```javascript
let report = await sellingPartner.download(report_document, {
  charset:'cp1252'
});
```

## Encrypt and upload feeds

The **.upload()** function takes the feed upload details (url and encryption details) received from a "createFeedDocument" operation, the feed content and its content type to upload as input, encrypts the content and uploads it.
Start by creating a feed object with the following properties:
* `content`: Required if "file" is not provided, the content to upload as a string.
* `file`: Required if "content" is not provided, the absolute file path of the document to upload. IMPORTANT: Is ignored if "content" is provided
* `contentType`: Required, the contentType of the content to upload (should be one of "text/xml" or "text/tab-separated-values" and the charset of the content, i.e. "text/xml; charset=utf-8").

This will create an inventory feed ("POST_INVENTORY_AVAILABILITY_DATA") that will update the quantity of a given SKU to 10:
```javascript
let feed = {
  content:`<?xml version="1.0" encoding="utf-8"?>
    <AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
      <Header>
        <DocumentVersion>1.02</DocumentVersion>
        <MerchantIdentifier>YOUR_MERCHANT_IDENTIFIER</MerchantIdentifier>
      </Header>
      <MessageType>Inventory</MessageType>
      <Message>
        <MessageID>1</MessageID>
        <Inventory>
          <SKU>YOUR_SKU</SKU>
          <Quantity>10</Quantity>
        </Inventory>
      </Message>
    </AmazonEnvelope>`,
  contentType:'text/xml; charset=utf-8'
};
```
Before you can upload the feed you need to retrieve the feed upload details from a "createFeedDocument" operation:
```javascript
let feed_upload_details = await sellingPartner.callAPI({
  operation:'createFeedDocument',
  body:{
    contentType:feed.contentType
  }
});
```
Call the .upload() function to encrypt and upload the content of the feed:
```javascript
let res = await sellingPartner.upload(feed_upload_details, feed);
```
After uploading the feed you have to trigger the processing of the feed by calling the "createFeed" operation with the necessary params (marketplaceIds, feedType and inputFeedDocumentId):
```javascript
let feed_creation_infos = await sellingPartner.callAPI({
  operation:'createFeed',
  body:{
    marketplaceIds:['A1PA6795UKMFR9'],
    feedType:'POST_INVENTORY_AVAILABILITY_DATA',
    inputFeedDocumentId:feed_upload_details.feedDocumentId // retrieve the feedDocumentId from the "createFeedDocument" operation
  }
});
```
IMPORTANT: Although uploading and creating the feed was successful it doesn't mean that the processing of the feed itself was also successful. You can check the result of the feed once it has been processed by downloading the processing result with the **.download()** function quite similar as how to download reports. Use the feedId returned by the "createFeed" operation and call the "getFeed" operation, which will include a resultFeedDocumentId if feed processing is already done. The resultFeedDocumentId can be used with a "getFeedDocument" operation that will return the feed download details needed for the feed result download.

## Sandbox mode
You can easily enable sandbox mode by setting the use_sandbox in the constructor config options to true. When using the sandbox you have to make sure to use the correct request parameters for the operation you want to test. You can find these inside the [api models definitions](https://github.com/amzn/selling-partner-api-models/tree/main/models) by searching the corresponding json file for "x-amazon-spds-sandbox-behaviors".
For example, this will test the "listCatalogItems" operation in sandbox mode:
```javascript
let res = await sellingPartner.callAPI({
  operation:'listCatalogItems',
  query:{
    MarketplaceId:'TEST_CASE_200',
    SellerSKU:'SKU_200'
  }
});
```

## Known Issues
Since the Selling Partner API is still pretty new, not all API paths and endpoints have been tested for full functionality. If you find any calls not working please open up a new issue.

Some operations don't seem to be heavy-use resistant yet, i.e. the "listCatalogItems" operation throws an "InteralFailure" error (statusCode 500) if used repetitive (although restore rate of operation is respected).

Some endpoints might have issues with special charsets like UTF-8. I.e. the finances operations return invalid UTF-8 encodings for all data prior to May 2020 resulting in JSON parse errors.

## Seller Support
If you're a european seller we might be able to support you with everything else that can't be done with the API, i.e. review management, product sourcing or sales and revenue estimations for products. Feel free to visit us at [amz.tools](https://amz.tools).
