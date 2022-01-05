import {
  GetOrderAddressPath,
  GetOrderAddressResponse,
  GetOrderBuyerInfoPath,
  GetOrderBuyerInfoResponse,
  GetOrderItemResponse,
  GetOrderItemsBuyerInfoPath,
  GetOrderItemsBuyerInfoQuery,
  GetOrderItemsBuyerInfoResponse,
  GetOrderItemsPath,
  GetOrderItemsQuery,
  GetOrderPath,
  GetOrderResponse,
  GetOrdersQuery,
  GetOrdersResponse,
} from "./operations/orders";

import {
  CancelFeedPath,
  CancelFeedResponse,
  CreateFeedDocumentBody,
  CreateFeedDocumentResponse,
  CreateFeedResponse,
  GetFeedDocumentPath,
  GetFeedDocumentResponse,
  GetFeedPath,
  GetFeedResponse,
  GetFeedsQuery,
  GetFeedsResponse,
} from "./operations/feeds";
import {Config, DownloadOptions, RoleCredentials} from "./baseTypes";
import {
  ConfirmPreorderPath,
  ConfirmPreorderQuery,
  ConfirmPreorderResponse,
  ConfirmTransportPath,
  ConfirmTransportResponse,
  CreateInboundShipmentPath,
  CreateInboundShipmentBody,
  CreateInboundShipmentResponse,
  CreateInboundShipmentPlanBody,
  CreateInboundShipmentPlanResponse,
  EstimateTransportPath,
  EstimateTransportResponse,
  GetBillOfLadingPath,
  GetBillOfLadingResponse,
  GetInboundGuidanceQuery,
  GetInboundGuidanceResponse,
  GetLabelsPath,
  GetLabelsQuery,
  GetLabelsResponse,
  GetPreorderInfoPath,
  GetPreorderInfoQuery,
  GetPreorderInfoResponse,
  GetPrepInstructionsQuery,
  GetPrepInstructionsResponse,
  GetShipmentsQuery,
  GetShipmentsResponse,
  GetShipmentItemsByShipmentIdPath,
  GetShipmentItemsByShipmentIdQuery,
  GetShipmentItemsByShipmentIdResponse,
  GetShipmentItemsQuery,
  GetShipmentItemsResponse,
  GetTransportDetailsPath,
  GetTransportDetailsResponse,
  PutTransportDetailsBody,
  PutTransportDetailsPath,
  PutTransportDetailsResponse,
  UpdateInboundShipmentBody,
  UpdateInboundShipmentPath,
  UpdateInboundShipmentResponse,
  VoidTransportPath,
  VoidTransportResponse
} from "./operations/fulfillmentInbound";
import {
  CreateReportResponse,
  GetReportDocumentPath,
  GetReportDocumentResponse,
  GetReportPath,
  GetReportResponse,
  ReportDocument,
} from "./operations/reports";
import {
  DeleteSmallAndLightEnrollmentBySellerSKUPath,
  DeleteSmallAndLightEnrollmentBySellerSKUQuery,
  GetSmallAndLightEligibilityBySellerSKUPath,
  GetSmallAndLightEligibilityBySellerSKUQuery,
  GetSmallAndLightEligibilityBySellerSKUResponse,
  GetSmallAndLightEnrollmentBySellerSKUPath,
  GetSmallAndLightEnrollmentBySellerSKUQuery,
  GetSmallAndLightEnrollmentBySellerSKUResponse,
  GetSmallAndLightFeePreviewBody,
  GetSmallAndLightFeePreviewResponse,
  PutSmallAndLightEnrollmentBySellerSKUPath,
  PutSmallAndLightEnrollmentBySellerSKUQuery,
  PutSmallAndLightEnrollmentBySellerSKUResponse,
} from "./operations/fbaSmallAndLight";
import {GetAuthorizationCodeQuery, GetAuthorizationCodeResponse,} from "./operations/authorization";
import {
  GetCatalogItemPath,
  GetCatalogItemQuery,
  GetCatalogItemResponse,
  ListCatalogCategoriesQuery,
  ListCatalogCategoriesResponse,
  ListCatalogItemsQuery,
  ListCatalogItemsResponse,
} from "./operations/catalogItems";
import {GetInventorySummariesQuery, GetInventorySummariesResponse,} from "./operations/fbaInventory";
import {GetItemEligibilityPreviewQuery, GetItemEligibilityPreviewResponse,} from "./operations/fbaInboundEligibility";
import {
  ListFinancialEventGroupsByGroupIdPath,
  ListFinancialEventGroupsByGroupIdQuery,
  ListFinancialEventGroupsByGroupIdResponse,
  ListFinancialEventGroupsQuery,
  ListFinancialEventGroupsResponse,
  ListFinancialEventsByOrderIdPath,
  ListFinancialEventsByOrderIdQuery,
  ListFinancialEventsByOrderIdResponse,
  ListFinancialEventsQuery,
  ListFinancialEventsResponse,
} from "./operations/finances";
import {
  CreateRestrictedDataTokenBody,
  CreateRestrictedDataTokenResponse
} from "./operations/tokens";

import {ReportDocumentType} from "./download";

declare module "amazon-sp-api" {
  class SellingPartner {
    constructor(config: Config);

    refreshAccessToken(): Promise<void>;

    refreshRoleCredentials(): Promise<void>;

    exchange(auth_code:string): Promise<any>;

    get access_token(): string;

    get role_credentials(): RoleCredentials;

    callAPI<TOperation extends Operation>(
      req_params: ReqParams<TOperation>
    ): Promise<ObjectType<TOperation>>;

    download<T extends ReportDocumentType>(
      details: ReportDocument,
      options?: DownloadOptions
    ): T;

    upload<T>(
        details: {
          url: string;
          encryptionDetails?: {
            key: string;
            initializationVector: string;
          };
        },
        feed: {
          content?: string;
          file?: string;
          contentType?: string;
        }
      ): T;

  }

  type Operation =
    | "getAuthorizationCode"
    | "listCatalogItems"
    | "getCatalogItem"
    | "listCatalogCategories"
    | "getItemEligibilityPreview"
    | "getInventorySummaries"
    | "getSmallAndLightEnrollmentBySellerSKU"
    | "putSmallAndLightEnrollmentBySellerSKU"
    | "getSmallAndLightEligibilityBySellerSKU"
    | "getSmallAndLightFeePreview"
    | "getFeeds"
    | "createFeed"
    | "getFeed"
    | "cancelFeed"
    | "createFeedDocument"
    | "getFeedDocument"
    | "listFinancialEventGroups"
    | "listFinancialEventsByGroupId"
    | "listFinancialEventsByOrderId"
    | "listFinancialEvents"
    | "getInboundGuidance"
    | "updateInboundShipment"
    | "createInboundShipment"
    | "getPreorderInfo"
    | "confirmPreorder"
    | "getPrepInstructions"
    | "getReport"
    | "getReportDocument"
    | "getOrders"
    | "getOrder"
    | "getOrderBuyerInfo"
    | "getOrderAddress"
    | "getOrderItems"
    | "getOrderItemsBuyerInfo"
    | "getTransportDetails"
    | "putTransportDetails"
    | "voidTransport"
    | "estimateTransport"
    | "confirmTransport"
    | "createRestrictedDataToken"
    | "getLabels"
    | "getBillOfLading"
    | "getShipments"
    | "getShipmentItemsByShipmentId"
    | "getShipmentItems"
    | string;

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
    : TOperation extends "getSmallAndLightEnrollmentBySellerSKU"
    ? GetSmallAndLightEnrollmentBySellerSKUResponse
    : TOperation extends "putSmallAndLightEnrollmentBySellerSKU"
    ? PutSmallAndLightEnrollmentBySellerSKUResponse
    : TOperation extends "getSmallAndLightEligibilityBySellerSKU"
    ? GetSmallAndLightEligibilityBySellerSKUResponse
    : TOperation extends "getSmallAndLightFeePreview"
    ? GetSmallAndLightFeePreviewResponse
    : TOperation extends "getFeeds"
    ? GetFeedsResponse
    : TOperation extends "createFeed"
    ? CreateFeedResponse
    : TOperation extends "getFeed"
    ? GetFeedResponse
    : TOperation extends "cancelFeed"
    ? CancelFeedResponse
    : TOperation extends "createFeedDocument"
    ? CreateFeedDocumentResponse
    : TOperation extends "getFeedDocument"
    ? GetFeedDocumentResponse
    : TOperation extends "listFinancialEventGroups"
    ? ListFinancialEventGroupsResponse
    : TOperation extends "listFinancialEventsByGroupId"
    ? ListFinancialEventGroupsByGroupIdResponse
    : TOperation extends "listFinancialEventsByOrderId"
    ? ListFinancialEventsByOrderIdResponse
    : TOperation extends "listFinancialEvents"
    ? ListFinancialEventsResponse
    : TOperation extends "getInboundGuidance"
    ? GetInboundGuidanceResponse
    : TOperation extends "updateInboundShipment"
    ? UpdateInboundShipmentResponse
    : TOperation extends "createInboundShipment"
    ? CreateInboundShipmentResponse
    : TOperation extends "getPreorderInfo"
    ? GetPreorderInfoResponse
    : TOperation extends "confirmPreorder"
    ? ConfirmPreorderResponse
    : TOperation extends "getPrepInstructions"
    ? GetPrepInstructionsResponse
    : TOperation extends "getReport"
    ? GetReportResponse
    : TOperation extends "getReportDocument"
    ? GetReportDocumentResponse
    : TOperation extends "getOrders"
    ? GetOrdersResponse
    : TOperation extends "getOrder"
    ? GetOrderResponse
    : TOperation extends "getOrderBuyerInfo"
    ? GetOrderBuyerInfoResponse
    : TOperation extends "getOrderAddress"
    ? GetOrderAddressResponse
    : TOperation extends "getOrderItem"
    ? GetOrderItemResponse
    : TOperation extends "getOrderItemsBuyerInfo"
    ? GetOrderItemsBuyerInfoResponse
    : TOperation extends "createInboundShipmentPlan"
    ? CreateInboundShipmentPlanResponse
    : TOperation extends "putTransportDetails"
    ? PutTransportDetailsResponse
    : TOperation extends "getTransportDetails"
    ? GetTransportDetailsResponse
    : TOperation extends "voidTransport"
    ? VoidTransportResponse
    : TOperation extends "estimateTransport"
    ? EstimateTransportResponse
    : TOperation extends "confirmTransport"
    ? ConfirmTransportResponse
    : TOperation extends "createRestrictedDataToken"
    ? CreateRestrictedDataTokenResponse
    : TOperation extends "getLabels"
    ? GetLabelsResponse
    : TOperation extends "getBillOfLading"
    ? GetBillOfLadingResponse
    : TOperation extends "getShipments"
    ? GetShipmentsResponse
    : TOperation extends "getShipmentItemsByShipmentId"
    ? GetShipmentItemsByShipmentIdResponse
    : TOperation extends "getShipmentItems"
    ? GetShipmentItemsResponse
    : any;

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
    : TOperation extends "getFeeds"
    ? GetFeedsQuery
    : TOperation extends "listFinancialEventGroups"
    ? ListFinancialEventGroupsQuery
    : TOperation extends "listFinancialEventsByGroupId"
    ? ListFinancialEventGroupsByGroupIdQuery
    : TOperation extends "listFinancialEventsByOrderId"
    ? ListFinancialEventsByOrderIdQuery
    : TOperation extends "listFinancialEvents"
    ? ListFinancialEventsQuery
    : TOperation extends "getInboundGuidance"
    ? GetInboundGuidanceQuery
    : TOperation extends "getPreorderInfo"
    ? GetPreorderInfoQuery
    : TOperation extends "confirmPreorder"
    ? ConfirmPreorderQuery
    : TOperation extends "getPrepInstructions"
    ? GetPrepInstructionsQuery
    : TOperation extends "createReport"
    ? CreateReportResponse
    : TOperation extends "getOrders"
    ? GetOrdersQuery
    : TOperation extends "getOrderItems"
    ? GetOrderItemsQuery
    : TOperation extends "getOrderItemsBuyerInfo"
    ? GetOrderItemsBuyerInfoQuery
    : TOperation extends "getLabels"
    ? GetLabelsQuery
    : TOperation extends "getShipments"
    ? GetShipmentsQuery
    : TOperation extends "getShipmentItemsByShipmentId"
    ? GetShipmentItemsByShipmentIdQuery
    : TOperation extends "getShipmentItems"
    ? GetShipmentItemsQuery
    : any;

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
    : TOperation extends "getFeed"
    ? GetFeedPath
    : TOperation extends "cancelFeed"
    ? CancelFeedPath
    : TOperation extends "getFeedDocument"
    ? GetFeedDocumentPath
    : TOperation extends "listFinancialEventsByGroupId"
    ? ListFinancialEventGroupsByGroupIdPath
    : TOperation extends "listFinancialEventsByOrderId"
    ? ListFinancialEventsByOrderIdPath
    : TOperation extends "updateInboundShipment"
    ? UpdateInboundShipmentPath
    : TOperation extends "createInboundShipment"
    ? CreateInboundShipmentPath
    : TOperation extends "getPreorderInfo"
    ? GetPreorderInfoPath
    : TOperation extends "confirmPreorder"
    ? ConfirmPreorderPath
    : TOperation extends "getReport"
    ? GetReportPath
    : TOperation extends "getReportDocument"
    ? GetReportDocumentPath
    : TOperation extends "getOrder"
    ? GetOrderPath
    : TOperation extends "getOrderAddress"
    ? GetOrderAddressPath
    : TOperation extends "getOrderItems"
    ? GetOrderItemsPath
    : TOperation extends "getOrderItemsBuyerInfo"
    ? GetOrderItemsBuyerInfoPath
    : TOperation extends "getOrderBuyerInfo"
    ? GetOrderBuyerInfoPath
    : TOperation extends "putTransportDetails"
    ? PutTransportDetailsPath
    : TOperation extends "getTransportDetails"
    ? GetTransportDetailsPath
    : TOperation extends "voidTransport"
    ? VoidTransportPath
    : TOperation extends "estimateTransport"
    ? EstimateTransportPath
    : TOperation extends "confirmTransport"
    ? ConfirmTransportPath
    : TOperation extends "getLabels"
    ? GetLabelsPath
    : TOperation extends "getBillOfLading"
    ? GetBillOfLadingPath
    : TOperation extends "getShipmentItemsByShipmentId"
    ? GetShipmentItemsByShipmentIdPath
    : any;

  type BodyType<
    TOperation extends Operation
  > = TOperation extends "getSmallAndLightFeePreview"
    ? GetSmallAndLightFeePreviewBody
    : TOperation extends "createFeed"
    ? CreateFeedBody
    : TOperation extends "createFeedDocument"
    ? CreateFeedDocumentBody
    : TOperation extends "createInboundShipmentPlan"
    ? CreateInboundShipmentPlanBody
    : TOperation extends "updateInboundShipment"
    ? UpdateInboundShipmentBody
    : TOperation extends "createInboundShipment"
    ? CreateInboundShipmentBody
    : TOperation extends "createReport"
    ? CreateReportBody
    : TOperation extends "putTransportDetails"
    ? PutTransportDetailsBody
    : TOperation extends "createRestrictedDataToken"
    ? CreateRestrictedDataTokenBody
    : any;

  type ReqOptions = IReqOptions;

  export interface ReqParams<TOperation extends Operation> {
    operation: TOperation;
    path?: PathType<TOperation>;
    query?: QueryType<TOperation>;
    body?: BodyType<TOperation>;
    options?: ReqOptions
  }

  export = SellingPartner;
}
