import {
  DeleteSmallAndLightEnrollmentBySellerSKUPath,
  DeleteSmallAndLightEnrollmentBySellerSKUQuery,
  GetSmallAndLightEligibilityBySellerSKUPath,
  GetSmallAndLightEligibilityBySellerSKUQuery,
  GetSmallAndLightEligibilityBySellerSKUResponse,
  GetSmallAndLightEnrollmentBySellerSKUPath,
  GetSmallAndLightEnrollmentBySellerSKUQuery,
  GetSmallAndLightEnrollmentBySellerSKUResponse,
  PutSmallAndLightEnrollmentBySellerSKUPath,
  PutSmallAndLightEnrollmentBySellerSKUQuery,
  PutSmallAndLightEnrollmentBySellerSKUResponse,
} from "./operations/fba-small-and-light";
import {
  GetAuthorizationCodeQuery,
  GetAuthorizationCodeResponse,
} from "./operations/authorization";
import {
  GetCatalogItemPath,
  GetCatalogItemQuery,
  GetCatalogItemResponse,
  ListCatalogCategoriesQuery,
  ListCatalogCategoriesResponse,
  ListCatalogItemsQuery,
  ListCatalogItemsResponse,
} from "./operations/catalog-items";
import {
  GetInventorySummariesQuery,
  GetInventorySummariesResponse,
} from "./operations/fba-inventory";
import {
  GetItemEligibilityPreviewQuery,
  GetItemEligibilityPreviewResponse,
} from "./operations/fba-inbound-eligibility";

import { Config } from "./base-types";

declare module "nick-testing-amazon-sp-api" {
  import {
    GetSmallAndLightFeePreviewBody,
    GetSmallAndLightFeePreviewResponse,
  } from "./operations/fba-small-and-light";

  class SellingPartner {
    constructor(config: Config): void;
    async refreshAccessToken(): void;
    async refreshRoleCredentials(): void;
    async callAPI<TOperation extends Operation>(
      req_params: ReqParams<TOperation>
    ): ObjectType<TOperation>;
  }

  type Operation =
    | "getAuthorizationCode"
    | "listCatalogItems"
    | "getCatalogItem"
    | "listCatalogCategories";

  type ObjectType<TOperation> = TOperation extends "getAuthorizationCode"
    ? GetAuthorizationCodeResponse
    : TOperation extends "listCatalogItems"
    ? ListCatalogItemsResponse
    : TOperation extends "getCatalogItem"
    ? GetCatalogItemResponse
    : TOperation extends "listCatalogCategories"
    ? ListCatalogCategoriesResponse
    : TOperation extends "getItemEligibilityPreview"
    ? GetItemEligibilityPreviewResponse
    : TOperation extends "getInventorySummaries"
    ? GetInventorySummariesResponse
    : TOperation extends "GetSmallAndLightEnrollmentBySellerSKUResponse"
    ? GetSmallAndLightEnrollmentBySellerSKUResponse
    : TOperation extends "putSmallAndLightEnrollmentBySellerSKU"
    ? PutSmallAndLightEnrollmentBySellerSKUResponse
    : TOperation extends "getSmallAndLightEligibilityBySellerSKU"
    ? GetSmallAndLightEligibilityBySellerSKUResponse
    : TOperation extends "getSmallAndLightFeePreview"
    ? GetSmallAndLightFeePreviewResponse
    : never;

  type QueryType<
    TOperation extends Operation
  > = TOperation extends "getAuthorizationCode"
    ? GetAuthorizationCodeQuery
    : TOperation extends "listCatalogItems"
    ? ListCatalogItemsQuery
    : TOperation extends "getCatalogItem"
    ? GetCatalogItemQuery
    : TOperation extends "listCatalogCategories"
    ? ListCatalogCategoriesQuery
    : TOperation extends "getItemEligibilityPreview"
    ? GetItemEligibilityPreviewQuery
    : TOperation extends "getInventorySummaries"
    ? GetInventorySummariesQuery
    : TOperation extends "getSmallAndLightEnrollmentBySellerSKU"
    ? GetSmallAndLightEnrollmentBySellerSKUQuery
    : TOperation extends "putSmallAndLightEnrollmentBySellerSKU"
    ? PutSmallAndLightEnrollmentBySellerSKUQuery
    : TOperation extends "deleteSmallAndLightEnrollmentBySellerSKU"
    ? DeleteSmallAndLightEnrollmentBySellerSKUQuery
    : TOperation extends "getSmallAndLightEligibilityBySellerSKU"
    ? GetSmallAndLightEligibilityBySellerSKUQuery
    : never;

  type PathType<
    TOperation extends Operation
  > = TOperation extends "getCatalogItem"
    ? GetCatalogItemPath
    : TOperation extends "getSmallAndLightEnrollmentBySellerSKU"
    ? GetSmallAndLightEnrollmentBySellerSKUPath
    : TOperation extends "putSmallAndLightEnrollmentBySellerSKU"
    ? PutSmallAndLightEnrollmentBySellerSKUPath
    : TOperation extends "deleteSmallAndLightEnrollmentBySellerSKU"
    ? DeleteSmallAndLightEnrollmentBySellerSKUPath
    : TOperation extends "getSmallAndLightEligibilityBySellerSKU"
    ? GetSmallAndLightEligibilityBySellerSKUPath
    : never;

  type BodyType<
    TOperation extends Operation
  > = TOperation extends "getSmallAndLightFeePreview"
    ? GetSmallAndLightFeePreviewBody
    : never;

  export interface ReqParams<TOperation extends Operation> {
    operation: TOperation;
    path?: PathType<TOperation>;
    query?: QueryType<TOperation>;
    body?: BodyType<TOperation>;
  }

  export = SellingPartner;
}
