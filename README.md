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
  * [Exchange an authorization code for a refresh token](#exchange-an-authorization-code-for-a-refresh-token)
  * [Request access token and role credentials](#request-access-token-and-role-credentials)
* [Call the API](#call-the-api)
  * [Examples](#examples)
  * [Endpoints](#endpoints)
  * [Versions](#versions)
    * [Version specific operation implementations](#version-specific-operation-implementations)
    * [Defining endpoints versions on class level](#defining-endpoints-versions-on-class-level)
    * [Fallback](#fallback)
  * [Unsupported endpoints/versions/operations](#unsupported-endpointsversionsoperations)
  * [Grantless operations](#grantless-operations)
  * [Restore rates](#restore-rates)
* [Download, decrypt and unzip reports](#download-decrypt-and-unzip-reports)
* [Encrypt and upload feeds](#encrypt-and-upload-feeds)
* [TypeScript Support](#typescript-support)
* [Sandbox mode](#sandbox-mode)
* [Known Issues](#known-issues)
* [Seller Support](#seller-support)

## Prerequisites

Make sure that you followed the [Selling Partner API Developer Guide](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md) and have successfully completed the steps [Registering as a developer](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-as-a-developer), [Registering your application](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#registering-your-application) and have a valid refresh token (if you use the client only for your own seller account the easiest way is using the self authorization as described in the developer guide).

## Installation
```bash
npm install amazon-sp-api
```

## Getting Started

Before you can use the client you need to add your app client and aws user credentials.

### Setting credentials from environment variables

* `SELLING_PARTNER_APP_CLIENT_ID`=<YOUR_APP_CLIENT_ID> ([see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information))
* `SELLING_PARTNER_APP_CLIENT_SECRET`=<YOUR_APP_CLIENT_SECRET> ([see SP Developer Guide "Viewing your developer information"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#viewing-your-developer-information))
* `AWS_SELLING_PARTNER_ACCESS_KEY_ID` or `AWS_ACCESS_KEY_ID`=<YOUR_AWS_USER_ID> ([see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user))
* `AWS_SELLING_PARTNER_SECRET_ACCESS_KEY` or `AWS_SECRET_ACCESS_KEY`=<YOUR_AWS_USER_SECRET> ([see SP Developer Guide "Create an IAM user"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#step-2-create-an-iam-user))
* `AWS_SELLING_PARTNER_ROLE`=<YOUR_AWS_SELLING_PARTNER_API_ROLE> ([see SP Developer Guide "Create an IAM role"](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#step-4-create-an-iam-role))

### Setting credentials from file

Instead of setting the credentials via environment variables you may load them from a credentials file. The default path to the file is `~/.amzspapi/credentials` (path can be changed when creating a client) and you add the credentials one per line:
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
      region:'eu', // The region to use for the SP-API endpoints ("eu", "na" or "fe")
      refresh_token:'<REFRESH_TOKEN>' // The refresh token of your app user
    });
    let res = await sellingPartner.callAPI({
      operation:'getMarketplaceParticipations',
      endpoint:'sellers'
    });
    console.log(res);
  } catch(e){
    console.log(e);
  }
})();
```

### Config params

The class constructor takes a config object with the following structure as input:
```javascript
{
  region:'<REGION>',
  refresh_token:'<REFRESH_TOKEN>',
  access_token:'<ACCESS_TOKEN>',
  role_credentials:{
    id:'<TEMPORARY_ROLE_ACCESS_ID>',
    secret:'<TEMPORARY_ROLE_ACCESS_SECRET>',
    security_token:'<TEMPORARY_ROLE_SECURITY_TOKEN>'
  },
  endpoints_versions:{
    ...
  },
  credentials:{
    SELLING_PARTNER_APP_CLIENT_ID:'<APP_CLIENT_ID>',
    SELLING_PARTNER_APP_CLIENT_SECRET:'<APP_CLIENT_SECRET>',
    AWS_ACCESS_KEY_ID:'<AWS_USER_ID>',
    AWS_SECRET_ACCESS_KEY:'<AWS_USER_SECRET>',
    AWS_SELLING_PARTNER_ROLE:'<AWS_SELLING_PARTNER_API_ROLE>'
  },
  options:{
    credentials_path:'~/.amzspapi/credentials',
    auto_request_tokens:true,
    auto_request_throttled:true,
    version_fallback:true,
    use_sandbox:false,
    only_grantless_operations:false,
    user_agent:'amazon-sp-api/<CLIENT_VERSION> (Language=Node.js/<NODE_VERSION>; Platform=<OS_PLATFORM>/<OS_RELEASE>)',
    debug_log:false
  }
}
```
Valid properties of the config object:

| Name | Type | Default | Description |
|:--|:--:|:--:|:--|
| **region**<br>*required* | string | - | The region to use for the SP-API endpoints.<br>Must be one of: `eu`, `na` or `fe` |
| **refresh_token**<br>*optional* | string | - | The refresh token of your app user.<br>Required if `only_grantless_operations` option is set to `false`. |
| **access_token**<br>*optional* | string | - | The temporary access token requested with the refresh token of the app user. |
| **role_credentials**<br>*optional* | object | - | The temporary role credentials for the sellingpartner api role of the iam user. Must include the three properties `id`, `secret` and `security_token` with their corresponding values. |
| **endpoints_versions**<br>*optional* | object | - | Defines the version to use for an endpoint as key/value pairs, i.e. `"reports":"2021-06-30"`. If none given the client is using the first (meaning the oldest) version for an endpoint.<br>Call `.endpoints` on class instance to retrieve a complete list of all endpoints, versions and operations supported by the client. |
| **credentials**<br>*optional* | object | - | The app client and aws user credentials. Must include the five credentials properties `SELLING_PARTNER_APP_CLIENT_ID`, `SELLING_PARTNER_APP_CLIENT_SECRET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SELLING_PARTNER_ROLE` with their corresponding values.<br>NOTE: Should only be used if you have no means of using environment vars or credentials file! |
| **options**<br>*optional* | object | - | Additional options, see table below for all possible options properties. |

Valid properties of the config options:

| Name | Type | Default | Description |
|:--|:--:|:--:|--|
| **credentials_path**<br>*optional* | string | ~/.amzspapi/credentials | A custom absolute path to your credentials file location. |
| **auto_request_tokens**<br>*optional* | boolean | true | Whether or not the client should retrieve new access and role credentials if non given or expired. |
| **auto_request_throttled**<br>*optional* | boolean | true | Whether or not the client should automatically retry a request when throttled. |
| **version_fallback**<br>*optional* | boolean | true | Whether or not the client should try to use an older version of an endpoint if the operation is not defined for the desired version. |
| **use_sandbox**<br>*optional* | boolean | false | Whether or not to use the sandbox endpoint. |
| **only_grantless_operations**<br>*optional* | boolean | false | Whether or not to only use grantless operations. |
| **user_agent**<br>*optional* | string | amazon-sp-api/<CLIENT_VERSION> (Language=Node.js/<NODE_VERSION>; Platform=<OS_PLATFORM>/<OS_RELEASE>) | A custom user-agent header ([see desired format in docs](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#include-a-user-agent-header-in-all-requests)). |
| **debug_log**<br>*optional* | boolean | false | Whether or not the client should print console logs for debugging purposes. |

### Exchange an authorization code for a refresh token
If you already have a refresh token you can skip this step. If you only want to use the API for your own seller account you can just use the [self authorization](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#self-authorization) to obtain a valid refresh token.

If you want to exchange an authorization code of a seller you can use the `.exchange()` function of the client. The neccessary authorization code is returned to your callback URI as `spapi_oauth_code` when a seller authorizes your application ([see authorization workflow in docs](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#authorizing-selling-partner-api-applications)) or via a call to the `getAuthorizationCode` operation if you want to authorize a seller for the SP-API who has previously authorized you for the MWS API (the `getAuthorizationCode` workflow is explained in the [Grantless operations](#grantless-operations) section).

Once you have obtained the authorization_code you can exchange it for a refresh token:
```javascript
let sellingPartner = new SellingPartnerAPI({
  region:'eu',
  options:{
    only_grantless_operations:true
  }
});
let res = await sellingPartner.exchange('<SELLER_AUTHORIZATION_CODE>');
console.log(res.refresh_token);
```
NOTE: You will have to create a new class instance once you have obtained the `refresh_token` and pass it inside the constructor in order to make calls to the API.

### Request access token and role credentials

If you only provide the `region` and `refresh_token` parameters the client will automatically request `access_token` and `role_credentials` for you (with a TTL of 1 hour) and reuse these for future api calls for the class instance.

Instead of having the client handle the `access_token` and `role_credentials` requests automatically, you may also refresh them manually:
```javascript
let sellingPartner = new SellingPartnerAPI({
  region:'eu',
  refresh_token:'<REFRESH_TOKEN>',
  options:{
    auto_request_tokens:false
  }
});
await sellingPartner.refreshAccessToken();
await sellingPartner.refreshRoleCredentials();
```
If you want to use the same credentials for multiple instances you can retrieve them via getters and use them as input for a new instance:
```javascript
let access_token = sellingPartner.access_token;
let role_credentials = sellingPartner.role_credentials;

let sellingPartnerNewInstance = new SellingPartnerAPI({
  region:'eu',
  refresh_token:'<REFRESH_TOKEN>',
  access_token:access_token,
  role_credentials:role_credentials
});
```

## Call the API

All calls to the SP-API will be triggered by using the `.callAPI()` function, which takes an object with the following structure as input:
```javascript
{
  operation:'<OPERATION_TO_CALL>',
  endpoint:'<ENDPOINT_OF_OPERATION>',
  path:{
    ...
  },
  query:{
    ...
  },
  body:{
    ...
  },
  api_path:'<FULL_PATH_OF_OPERATION>',
  method:'GET',
  restricted_data_token:'<RESTRICTED_DATA_TOKEN>',
  options:{
    version:'<OPERATION_ENDPOINT_VERSION>',
    restore_rate:'<RESTORE_RATE_IN_SECONDS>',
    raw_result:false
  }
}
```
Valid properties of the object:

| Name | Type | Default | Description |
|:--|:--:|:--:|:--|
| **operation**<br>*optional* | string | - | The operation you want to request, [see SP API References](https://github.com/amzn/selling-partner-api-docs/tree/main/references).<br>May also include endpoint as shorthand dot notation.<br>Call `.endpoints` on class instance to retrieve a complete list of all endpoints, versions and operations supported by the client.<br>Required if `api_path` is not defined. |
| **endpoint**<br>*optional* | string | - | The endpoint of the operation, ([see Endpoints](#endpoints)).<br>Call `.endpoints` on class instance to retrieve a complete list of all endpoints, versions and operations supported by the client.<br>Required if endpoint is not part of `operation` as shorthand dot notation and `api_path` is not defined. |
| **path**<br>*optional* | object | - | The input paramaters added to the path of the operation. |
| **query**<br>*optional* | object | - | The input paramaters added to the query string of the operation. |
| **body**<br>*optional* | object | - | The input paramaters added to the body of the operation. |
| **api_path**<br>*optional* | string | - | The full api path of an operation. Can be used to call operations that are not yet supported or have a new version that is not yet supported by the client.<br>Required if `operation` is not defined. |
| **method**<br>*optional* | string | - | The HTTP method to use.<br>Required only if `api_path` is defined.<br>Must be one of: `GET`, `POST`, `PUT`,`DELETE` or `PATCH`. |
| **restricted_data_token**<br>*optional* | string | - | A token received from a `createRestrictedDataToken` operation. Neccessary to include PII (Personally Identifiable Informaton) for some restricted operations, [see Tokens API use case guide](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/use-case-guides/tokens-api-use-case-guide/tokens-API-use-case-guide-2021-03-01.md#restricted-operations) for a list of restricted operations.<br>NOTE: Your developer account must be approved for PII by Amazon in order to be able to receive PII, otherwise the token will have no effect, meaning the result of restricted operations will not include PII. |
| **options**<br>*optional* | object | - | Additional options, see table below for all possible options properties. |

Valid properties of the config options:

| Name | Type | Default | Description |
|:--|:--:|:--:|--|
| **version**<br>*optional* | string | - | The endpoint's version that should be used when calling the operation. Will be preferred over an `endpoints_versions` setting.<br>NOTE: The call might still use an older version of the endpoint if the operation is not available for the specified version and `version_fallback` is set to `true`. |
| **restore_rate**<br>*optional* | number | - | The restore rate (in seconds) that should be used when calling the operation. Will be preferred over the default restore rate of the operation. |
| **raw_result**<br>*optional* | boolean | false | Whether or not the client should return the "raw" result, which will include the raw body, buffer chunks, statuscode and headers of the result. This will skip the internal formatting or error checking, but might be helpful when you need additional information besides the payload or when the client encounters JSON.parse errors such as the ones already encountered with old finance documents ([see Known Issues](#known-issues)). |

### Examples

To call an operation of an API endpoint you pass in the operation and the endpoint it belongs to. See the following example:
```javascript
let res = await sellingPartner.callAPI({
  operation:'getMarketplaceParticipations',
  endpoint:'sellers'
});
```
Instead of using the endpoint property you may also prepend the endpoint to the operation as shorthand dot notation:
```javascript
let res = await sellingPartner.callAPI({
  operation:'sellers.getMarketplaceParticipations'
});
```
Here are a few examples that use some more properties:
```javascript
let res = await sellingPartner.callAPI({
  operation:'getOrderMetrics',
  endpoint:'sales',
  query:{
    marketplaceIds:['A1PA6795UKMFR9'],
    interval:'2020-10-01T00:00:00-07:00--2020-10-01T20:00:00-07:00',
    granularity:'Hour'
  }
});
```
```javascript
let res = await sellingPartner.callAPI({
  operation:'catalogItems.getCatalogItem',
  path:{
    asin:'B084J4QQFT'
  },
  query:{
    MarketplaceId:'A1PA6795UKMFR9'
  },
  options:{
    version:'v0'
  }
});
```
```javascript
let res = await sellingPartner.callAPI({
  operation:'createReport',
  endpoint:'reports',
  body:{
    reportType:'GET_FLAT_FILE_OPEN_LISTINGS_DATA',
    marketplaceIds:['A1PA6795UKMFR9']
  }
});
```
```javascript
let res = await sellingPartner.callAPI({
  operation:'finances.listFinancialEvents',
  query:{
    PostedAfter:'2020-03-01T00:00:00-07:00',
    PostedBefore:'2020-03-02T00:00:00-07:00'
  },
  options:{
    raw_result:true
  }
});
```
NOTE: As the original design of the client (< v0.4.0) didn't keep in mind the possibility of having the exact same operation name for multiple endpoints (i.e. `getShipment`, [see Issue #33](https://github.com/amz-tools/amazon-sp-api/issues/33)) and multiple versions of the same endpoint, we had to replace original operation-only based calls to the API with a new concept that includes endpoints and version-specific operation calls. This concept comes without any breaking changes, so you can still safely upgrade from any version below 0.4.0 to the latest version, but the use of `.callAPI()` without specifying an endpoint is considered deprecated, is discouraged and will trigger a console warning.

### Endpoints
The exact endpoint's name of an operation will be the references name ([see SP API References](https://github.com/amzn/selling-partner-api-docs/tree/main/references)) without `-` and `api` and continued with a capital letter. So the `catalog-items-api` endpoint's name will be `catalogItems`, `fba-small-and-light-api` will be `fbaSmallAndLight`, `sellers-api` will be `sellers` and so on. You can also retrieve the endpoint names and their operations and versions by calling `sellingPartner.endpoints`.

### Versions

Every operation belongs to an endpoint that consists of one or more versions and each version consists of one or more operations. You will find a complete list of the endpoints with all versions and operations [here in the Selling Partner API Docs](https://github.com/amzn/selling-partner-api-docs/tree/main/references). For a complete list of all currently by the client supported endpoints with versions and operations you can just call `sellingPartner.endpoints`.


#### Version specific operation implementations

The client uses the first (in fact the oldest) endpoint version if no version is provided since new versions of some operations are not backward compatible. So in order to prevent breaking changes we can't enable latest endpoint versions by default. I.e. the two different implementations of the `getCatalogItem` operation (see [catalogItemsV0](https://github.com/amzn/selling-partner-api-docs/blob/main/references/catalog-items-api/catalogItemsV0.md#getcatalogitem) vs. [catalogItems_2020-12-01](https://github.com/amzn/selling-partner-api-docs/blob/main/references/catalog-items-api/catalogItems_2020-12-01.md#getcatalogitem)) expect different input parameters and return different results.

The implementation of the `getCatalogItem` operation in the `v0` version expects an `asin` and a `MarketplaceId` as input:
```javascript
let res = await sellingPartner.callAPI({
  operation:'getCatalogItem',
  endpoint:'catalogItems',
  query:{
    MarketplaceId:'A1PA6795UKMFR9'
  },
  path:{
    asin:'B084DWG2VQ'
  },
  options:{
    version:'v0'
  }
});
```
In contrast, the implementation of the `getCatalogItem` operation in the `2020-12-01` version expects an `asin`, a `marketplaceIds` array and an `includedData` array as input:
```javascript
let res = await sellingPartner.callAPI({
  operation:'getCatalogItem',
  endpoint:'catalogItems',
  query:{
    marketplaceIds:['A1PA6795UKMFR9'],
    includedData:['identifiers', 'images', 'productTypes', 'salesRanks', 'summaries', 'variations']
  },
  path:{
    asin:'B084DWG2VQ'
  },
  options:{
    version:'2020-12-01'
  }
});
```
Trying to call the new `2020-12-01` version without explicitly setting it would result in an `InvalidInput` error as the required `MarketplaceId` parameter is missing.

#### Defining endpoints versions on class level

There are different ways of specifying the version to use for endpoints and their corresponding operations. You can specify the `version` directly inside the `options` object of the `.callAPI()` function as seen in the examples above. But you can also enable a newer version for all operations of an endpoint by using the `endpoints_versions` setting in the constructor config object.
I.e. you can tell the class instance to use the new `2020-12-01` version for the `catalogItems` endpoint and thus enabling it for all operations of the endpoint throughout the class instance like this:
```javascript
  let sellingPartner = new SellingPartnerAPI({
    region:'eu',
    refresh_token:'<REFRESH_TOKEN>',
    endpoints_versions:{
      'catalogItems':'2020-12-01'
    }
  });
```
By doing so you can skip setting the `version` inside the `options` object each time when you are using `.callAPI()` with the new version of the `getCatalogItem` operation.

#### Fallback

If trying to call an operation that is not part of the endpoint's version you specified, the client will automatically try to find the operation in an earlier endpoint's version and use that implementation if `version_fallback` is set to `true` (which is the default).
I.e. the `listCatalogCategories` operation is not part of the new `catalogItems` endpoint version. So if the new version was set as in the example code above, the following call would still work, because it will automatically fallback to the operation's implementation in version `v0`:
```javascript
let res = await sellingPartner.callAPI({
  operation:'listCatalogCategories',
  endpoint:'catalogItems',
  query:{
    MarketplaceId:'A1PA6795UKMFR9',
    ASIN:'B084DWG2VQ'
  }
});
```

### Unsupported endpoints/versions/operations

The newest client version should have full support for all endpoints, versions and operations on release, however it might lack support for very recently added new endpoints, versions or operations. If you need an endpoint/version/operation that is not yet supported you can still call it by using the `api_path` parameter. I.e. if the new `catalogItems` version `2020-12-01` would not be supported yet we could still use the new implementation of the `getCatalogItem` operation by using the `api_path` and `method` properties:
```javascript
let res = await sellingPartner.callAPI({
  api_path:'/catalog/2020-12-01/items/B084DWG2VQ',
  method:'GET',
  query:{
    marketplaceIds:['A1PA6795UKMFR9'],
    includedData:['identifiers', 'images', 'productTypes', 'salesRanks', 'summaries', 'variations']
  }
});
```
NOTE: If your `api_path` includes special characters that require encoding (i.e. an SKU that contains UTF-8 characters) you will have to encode these characters manually before passing your `api_path` to `.callAPI()`.

### Grantless operations

Some operations don't require an explicit authorization by a seller, [see list of grantless operations](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#grantless-operations-1). A grantless operation needs another access token than other operations and as such a grantless token is NOT the `access_token` you can provide in the constructor config object. However if the `auto_request_tokens` option is set to `true` the client should handle everything for you.

If you do the token request manually you need to create a grantless token by calling `refreshAccessToken` with the scope of the corresponding endpoint. Currently there are only two different scopes: `sellingpartnerapi::migration` for authorization endpoint and `sellingpartnerapi::notifications` for notifications endpoint.

If you don't need or have a refresh token (i.e. because you want to retrieve an SP API authorization code of an already via MWS authorized seller) you may use the client with the `only_grantless_operations` option set to `true` which allows you to create an instance of the client without a `refresh_token`.

To sum up, please see the following example that will request an auth code for an authorized MWS seller account.

First create a class instance that only allows to call grantless operations (no `refresh_token` included):
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
  endpoint:'authorization',
  query:{
    sellingPartnerId:'<YOUR_CUSTOMERS_SELLER_ID>',
    developerId:'<YOUR_DEVELOPER_ID>',
    mwsAuthToken:'<YOUR_CUSTOMERS_MWS_TOKEN>'
  }
});
```

### Restore rates

If you set the `auto_request_throttled` option in the class constructor config object to `true` (which is the default), the client will automatically retry the call if its throttled. It will either use the restore rate from the result header field `x-amzn-ratelimit-limit` if given ([see Usage Plans and Rate Limits](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/usage-plans-rate-limits/Usage-Plans-and-Rate-Limits.md)), or the value of `restore_rate` option in `.callAPI()` function if given, or otherwise use the default restore rate of the operation. For testing purposes you can also set `debug_log` to `true`, which will trigger a console log every time the client retries a call. If you set `auto_request_throttled` to `false` the client will throw a `QuotaExceeded` error when a request is throttled.

NOTE: If you are using the same operation with the same seller account across multiple class instances the restore rate logic might NOT work correct or, even worse, result in an infinite quota exceeded loop. So if you're planning to do that you should probably set `auto_request_throttled` to `false`, catch the `QuotaExceeded` errors and handle the restore rate logic on your own.

## Download, decrypt and unzip reports

The `.download()` function takes the download details (url and encryption details) received from a `getReportDocument` operation as input, downloads the content, unzips it (if result is compressed), decrypts it and returns it.

Retrieve the download details from a `getReportDocument` operation:
```javascript
let report_document = await sellingPartner.callAPI({
  operation:'getReportDocument',
  endpoint:'reports',
  path:{
    reportDocumentId:'<REPORT_DOCUMENT_ID>' // retrieve the reportDocumentId from a "getReport" operation (when processingStatus of report is "DONE")
  }
});
```
The structure of the returned `report_document` should look like this:
```javascript
{
  reportDocumentId:'<REPORT_DOCUMENT_ID>',
  compressionAlgorithm:'GZIP', // Only included if report is compressed
  encryptionDetails:{ // Only included if old reports endpoint version used (2020-09-04)
    standard:'AES',
    initializationVector:'<INITIALIZATION_VECTOR>',
    key:'<KEY>'
  },
  url: '<REPORT_DOWNLOAD_URL>' // Expires after 5 minutes!
}
```
Call the `.download()` function to receive the content of the report. The default without any config options will download, decrypt and unzip the content and return it without reformatting or saving it to the disk:
```javascript
let report = await sellingPartner.download(report_document);
```
You may also include an options object as a 2nd parameter to the `.download()` function, i.e. to enable a json result or to additionally save the report to a file. It supports four optional properties:

| Name | Type | Default | Description |
|:--|:--:|:--:|--|
| **json**<br>*optional* | boolean | false | Whether or not the content should be transformed to json before returning it (from tab delimited flat-file or XML). |
| **unzip**<br>*optional* | boolean | true | Whether or not the content should be unzipped before returning it. |
| **file**<br>*optional* | string | - | The absolute file path to save the report to.<br>NOTE: Even when saved to disk the report content is still returned. |
| **charset**<br>*optional* | string | utf8 | The charset to use for decoding the content.<br>NOTE: Is ignored when content is compressed and `unzip` is set to `false`.|

The following call will download the report, transform it to json and save it to disk:
```javascript
let report = await sellingPartner.download(report_document, {
  json:true,
  file:'<ABSOLUTE_FILE_PATH>/report.json'
});
```

Some reports may have an encoding other than UTF-8 and require special decoding with a different charset, i.e. the `GET_MERCHANT_LISTINGS_ALL_DATA` report is encoded as `cp1252`. Proper decoding is possible with passing in the optional charset property:
 ```javascript
let report = await sellingPartner.download(report_document, {
  charset:'cp1252'
});
```

## Encrypt and upload feeds

The `.upload()` function takes the feed upload details (url and encryption details) received from a `createFeedDocument` operation, the feed content and its content type to upload as input, encrypts the content and uploads it.

Start by creating a feed object with a contentType and the content either as a string or a file path to a document:

| Name | Type | Default | Description |
|:--|:--:|:--:|--|
| **content**<br>*optional* | string | - | The content to upload as a string.<br>Required if `file` is not provided. |
| **file**<br>*optional* | string | - | The absolute file path to the feed content document to upload.<br>Required if `content` is not provided. |
| **contentType**<br>*required* | string | - | The contentType of the content to upload.<br>Should be one of `text/xml` or `text/tab-separated-values` and the charset of the content, i.e. `text/xml; charset=utf-8`. |

This will create an inventory feed (`POST_INVENTORY_AVAILABILITY_DATA`) that will update the quantity of a given SKU to 10:
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
Before you can upload the feed you need to retrieve the feed upload details from a `createFeedDocument` operation:
```javascript
let feed_upload_details = await sellingPartner.callAPI({
  operation:'createFeedDocument',
  endpoint:'feeds',
  body:{
    contentType:feed.contentType
  }
});
```
Call the `.upload()` function to encrypt and upload the content of the feed:
```javascript
let res = await sellingPartner.upload(feed_upload_details, feed);
```
After uploading the feed you have to trigger the processing of the feed by calling the `createFeed` operation with the necessary params (`marketplaceIds`, `feedType` and `inputFeedDocumentId`):
```javascript
let feed_creation_infos = await sellingPartner.callAPI({
  operation:'createFeed',
  endpoint:'feeds',
  body:{
    marketplaceIds:['A1PA6795UKMFR9'],
    feedType:'POST_INVENTORY_AVAILABILITY_DATA',
    inputFeedDocumentId:feed_upload_details.feedDocumentId // retrieve the feedDocumentId from the "createFeedDocument" operation
  }
});
```
NOTE: Although uploading and creating the feed was successful it doesn't mean that the processing of the feed itself was also successful. You can check the result of the feed once it has been processed by downloading the processing result with the `.download()` function quite similar as how to download reports. Use the `feedId` returned by the `createFeed` operation and call the `getFeed` operation, which will include a `resultFeedDocumentId` if feed processing is already done. The `resultFeedDocumentId` can be used with a `getFeedDocument` operation that will return the feed download details needed for the feed result download.

## TypeScript Support

All TypeScript related information can be found in [lib/typings](https://github.com/amz-tools/amazon-sp-api/tree/main/lib/typings). Currently types are not yet defined for all operations and/or params, so feel free to add new types following the readme. You are also welcome to create a pull request.

## Sandbox mode

You can easily enable sandbox mode by setting `use_sandbox` in the constructor config options to `true`. General information on sandbox setup and behaviour can be found [in the corresponding section in the Selling Partner API Developer Guide](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md#how-to-make-a-sandbox-call-to-the-selling-partner-api).

When using the sandbox you have to make sure to use the correct request parameters for the operation you want to test. You can find these inside the [api models definitions](https://github.com/amzn/selling-partner-api-models/tree/main/models) by searching the corresponding json file for `x-amzn-api-sandbox`.

For example, this will test the `listCatalogItems` operation in sandbox mode:
```javascript
let res = await sellingPartner.callAPI({
  operation:'listCatalogItems',
  endpoint:'catalogItems',
  query:{
    MarketplaceId:'TEST_CASE_200',
    SellerSKU:'SKU_200'
  }
});
```

## Known Issues

Since the Selling Partner API is still pretty new, not all API paths and endpoints have been tested for full functionality. If you find any calls not working please open up a new issue.

Some operations don't respect the correct restore rate yet, meaning they restore a lot slower than the default restore rate.

Some endpoints might have issues with special charsets like UTF-8. I.e. the `finances` operations return invalid UTF-8 encodings for all data prior to May 2020 resulting in JSON parse errors.

## Seller Support

If you are selling on the european market we might be able to support you with everything else that can't be done with the API, i.e. a detailed sales dashboard, review management, product sourcing or sales and revenue estimations for products. Feel free to visit us at [https://amz.tools](https://amz.tools).
