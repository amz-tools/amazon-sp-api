declare module "nick-testing-amazon-sp-api" {
  import {
    ListCatalogItemsResponse,
    ListCatalogItemsQuery,
    GetCatalogItemQuery,
    GetCatalogItemPath,
    GetCatalogItemResponse,
    ListCatalogCategoriesQuery,
    ListCatalogCategoriesResponse,
  } from "./operations/catalog-items";
  import {
    GetAuthorizationCodeQuery,
    GetAuthorizationCodeResponse,
  } from "./operations/authorization";
  import { Config } from "./base-types";
  import {
    GetItemEligibilityPreviewQuery,
    GetItemEligibilityPreviewResponse,
  } from "./operations/fba-inbound-eligibility";
  import {
    GetInventorySummariesQuery,
    GetInventorySummariesResponse,
  } from "./operations/fba-inventory";

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
    : never;

  type PathType<
    TOperation extends Operation
  > = TOperation extends "getCatalogItem" ? GetCatalogItemPath : never;

  type BodyType<TOperation extends Operation> = never;

  export interface ReqParams<TOperation extends Operation> {
    operation: TOperation;
    path?: PathType<TOperation>;
    query?: QueryType<TOperation>;
    body?: BodyType<TOperation>;
  }

  export = SellingPartner;
}
