# amazon-sp-api (client for the Amazon Selling Partner API)
The client handles calls to the Amazon Selling Partner API. It wraps up all the necessary stuff such as requesting access token, security token and signing requests with AWS4 signature.

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
  refresh_token:'<YOUR_REFRESH_TOKEN>', // Required, the refresh token of your app user
  access_token:'<YOUR_ACCESS_TOKEN>', // Optional, the access token requested with the refresh token of the app user
  role_credentials:{ 
    id:'<YOUR_TEMPORARY_ROLE_ACCESS_ID>', // Optional, the temporary access id for the sp api role of the iam user
    secret:'<YOUR_TEMPORARY_ROLE_ACCESS_SECRET>', // Optional, the temporary access secret for the sp api role of the iam user
    security_token:'<YOUR_TEMPORARY_ROLE_SECURITY_TOKEN>' // Optional, the temporary security token for the sp api role of the iam user
  },
  options:{
    credentials_path:'<YOUR_CUSTOM_ABSOLUTE_PATH>', // Optional, a custom absolute path to your credentials file location
    auto_request_tokens:true, // Optional, whether or not the client should retrieve new access and role credentials if non given or expired. Default is true
    auto_request_throttled:true, // Optional, whether or not the client should automatically retry a request when throttled. Default is true
    use_sandbox:false // Optional, whether or not the client should automatically retry a request when throttled. Default is true
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

## Call the API

The **.callAPI()** function takes an object as input:
* operation: Required, the operation you want to request [see SP API References](https://github.com/amzn/selling-partner-api-docs/tree/main/references)
* path: The input paramaters added to the path of the operation
* query: The input parameters added to the query string of the operation
* body: The input parameters added to the body of the operation

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
* json: true/false, whether or not the content should be transformed to json before returning it (from tab delimited flat-file or XML). Defaults to false. IMPORTANT: is ignored when unzip is set to false.
* unzip: true/false, whether or not the content should be unzipped before returning it. Defaults to true. 
* file: absolute file path to save the report to. Defaults to not saving to disk. IMPORTANT: Even when saved to disk the report content is still returned.

The following call will download the report, transform it to json and save it to disk:
```javascript
let report = await sellingPartner.download(report_document, {
  json:true,
  file:'<YOUR_ABSOLUTE_FILE_PATH>/report.json'
});
```

## Encrypt and upload feeds

The **.upload()** function takes the feed upload details (url and encryption details) received from a "createFeedDocument" operation, the feed content and its content type to upload as input, encrypts the content and uploads it.
Start by creating a feed object with the following properties:
* content: Required if "file" is not provided, the content to upload as a string.
* file: Required if "content" is not provided, the absolute file path of the document to upload. IMPORTANT: Is ignored if "content" is provided
* contentType: Required, the contentType of the content to upload (should be one of "text/xml" or "text/tab-separated-values" and the charset of the content, i.e. "text/xml; charset=utf-8").

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

## Known Issues
Since the Selling Partner API is still pretty new, not all API paths and endpoints have been tested for full functionality. If you find any calls not working please open up a new issue.

Some operations don't seem to be heavy-use resistant yet, i.e. the "listCatalogItems" operation throws an "InteralFailure" error (statusCode 500) if used repetitive (although restore rate of operation is respected).
