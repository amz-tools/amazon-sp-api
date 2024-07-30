import type { BaseResponse } from "../baseTypes";

export interface GetOrdersQuery {
  CreatedAfter?: string;
  CreatedBefore?: string;
  LastUpdatedAfter?: string;
  LastUpdatedBefore?: string;
  OrderStatuses?: string[];
  MarketplaceIds?: string[];
  FulfillmentChannels?: string[];
  PaymentMethods?: string[];
  BuyerEmail?: string[];
  SellerOrderId?: string[];
  MaxResultPerPage?: number;
  EasyShipShipmentStatuses?: string[];
  NextToken?: string;
  AmazonOrderIds?: string[];
  ActualFulfillmentSupplySourceId?: string;
  IsISPU?: boolean;
  StoreChainStoreId?: string;
}

export interface GetOrderPath {
  orderId: string;
}

export interface GetOrderBuyerInfoPath {
  orderId: string;
}

export interface GetOrderAddressPath {
  orderId: string;
}

export interface GetOrderItemsPath {
  orderId: string;
}

export interface GetOrderItemsQuery {
  nextToken?: string;
}

export interface GetOrderItemsBuyerInfoPath {
  orderId: string;
}

export interface GetOrderItemsBuyerInfoQuery {
  nextToken?: string;
}

export interface GetOrderItemsBuyerInfoResponse extends BaseResponse {
  payload?: OrderItemsBuyerInfoList;
}

export interface GetOrderItemsResponse extends BaseResponse {
  payload?: OrderItemsList;
}

export interface GetOrderAddressResponse extends BaseResponse {
  payload?: OrderAddress;
}

export interface GetOrderBuyerInfoResponse extends BaseResponse {
  payload?: OrderBuyerInfo;
}

export interface GetOrderResponse extends BaseResponse {
  payload?: Order;
}

export interface GetOrdersResponse extends BaseResponse {
  payload?: OrdersList;
}

export type DeemedResellerCategory = "IOSS" | "UOSS";
export type FulfillmentChannel = "MFN" | "AFN";
export type ResponsibleParty = "Amazon Services, Inc.";
export type AddressType = "Residential" | "Commercial";
export type paymentMethod = "COD" | "CVS" | "Other";
export type Model = "MarketplaceFacilitator";
export type OrderType =
  | "StandardOrder"
  | "LongLeadTimeOrder"
  | "Preorder"
  | "BackOrder"
  | "SourcingOnDemandOrder";
export type OrderStatus =
  | "Pending"
  | "Unshipped"
  | "PartialShipped"
  | "Shipped"
  | "Canceled"
  | "Unfulfillable"
  | "InvoiceUnconfirmed"
  | "PendingAvailability";

export interface FulfillmentInstruction {
  FulfillmentSupplySourceId?: string;
}

export interface TaxCollection {
  Model?: Model;
  ResponsiblePArty?: ResponsibleParty;
}

export interface BuyerCustomizedInfoDetail {
  CustomizedURL?: string;
}

export interface PromotionIdList {
  PromotionId?: string[];
}

export interface ProductInfoDetail {
  NumberOfItems?: number;
}

export interface Money {
  CurrencyCode?: string;
  Amount?: string;
}

export interface PointsGrantedDetail {
  PointsNumber?: number;
  PointsMonetaryValue?: Money;
}

export interface OrderItemBuyerInfo {
  OrderItemId: string;
  BuyerCustomizedInfo?: BuyerCustomizedInfoDetail;
  GiftWrapPrice?: Money;
  GiftWrapTax?: Money;
  GiftMessageText?: string;
  GiftWrapLevel?: string;
}

export interface OrderItemsBuyerInfoList {
  OrderItems: OrderItemBuyerInfo[];
  NextToken?: string;
  AmazonOrderId: string;
}

export interface OrderItem {
  ASIN: string;
  SellerSKU?: string;
  OrderItemId: string;
  Title?: string;
  QuantityOrdered: number;
  QuantityShipped?: number;
  ProductInfo?: ProductInfoDetail;
  PointsGranted?: PointsGrantedDetail;
  ItemPrice?: Money;
  ShippingPrice?: Money;
  ItemTax?: Money;
  ShippingTax?: Money;
  ShippingDiscount?: Money;
  ShippingDiscountTax?: Money;
  PromotionDiscount?: Money;
  PromotionDiscountTax?: Money;
  PromotionIds?: PromotionIdList;
  CODFee?: Money;
  CODFeeDiscount?: Money;
  IsGift?: boolean;
  ConditionNote?: string;
  ConditionId?: string;
  ConditionSubtypeId?: string;
  ScheduledDeliveryStartDate?: string;
  ScheduledDeliveryEndDate?: string;
  PriceDesination?: string;
  TaxCollection?: TaxCollection;
  SerialNumberRequired?: boolean;
  IsTransparency?: boolean;
  IossNumber?: string;
  StoreChainStoreId?: string;
  DeemedResellerCategory?: DeemedResellerCategory;
}

export interface OrderItemsList {
  OrderItems: OrderItem[];
  NextToken?: string;
  AmazonOrderId?: string;
}

export interface TaxClassification {
  Name?: string;
  Value?: string;
}

export interface BuyerTaxInfo {
  CompanyLegalName?: string;
  TaxingRegion?: string;
  TaxClassifications?: TaxClassification[];
}

export interface PaymentExecutionDetailItem {
  Payment: Money;
  PaymentMethod: paymentMethod;
}

export interface PaymentExecutionDetailItemList {
  PaymentExecutionDetailItem?: PaymentExecutionDetailItem[];
}

export interface PaymentMethodDetailItemList {
  PaymentMethodDetailItem?: string[];
}

export interface Address {
  Name: string;
  AddressLine1?: string;
  AddressLine2?: string;
  AddressLine3?: string;
  City?: string;
  Country?: string;
  District?: string;
  StateOrRegion?: string;
  Municipality?: string;
  PostalCode?: string;
  CountryCode?: string;
  Phone?: string;
  AddressType?: AddressType;
}

export interface OrderAddress {
  AmazonOrderId: string;
  ShippingAddress?: Address;
}

export interface OrderBuyerInfo {
  AmazonOrderId: string;
  BuyerEmail?: string;
  BuyerNama?: string;
  BuyerCountry?: string;
  BuyerTaxInfo?: BuyerTaxInfo;
  PurchaseOrderNumber?: string;
}

export interface Order {
  AmazonOrderId: string;
  SellerOrderId?: string;
  PurchaseDate: string;
  LastUpdateDate: string;
  OrderStatus: OrderStatus;
  FulfillmentChannel?: FulfillmentChannel;
  SalesChannel?: string;
  OrderChannel?: string;
  ShipServiceLevel?: string;
  OrderTotal?: Money;
  NumberOfItemsShipped?: number;
  NumberOfItemsUnshipped?: number;
  PaymentExecutionDetail?: PaymentExecutionDetailItemList;
  PaymentMethod?: paymentMethod;
  PaymentMethodDetails?: PaymentMethodDetailItemList;
  MarketplaceId?: string;
  ShipmentServiceLevelCategory?: string;
  EasyShipShipmentStatus?: string;
  CbaDisplayableShippingLabel?: string;
  OrderType?: OrderType;
  EarliestShipDate?: string;
  LatestShipDate?: string;
  EarliestDeliveryDate?: string;
  LatestDeliveryDate?: string;
  IsBusinessOrder?: boolean;
  IsPrime?: boolean;
  IsPremiumOrder?: boolean;
  IsGlobalExpressEnabled?: boolean;
  ReplaceOrderId?: string;
  IsReplacementOrder?: boolean;
  PromiseResponseDueDate?: string;
  IsEstimatedShipDateSet?: boolean;
  IsSoldByAB?: boolean;
  DefaultShipFromLocationAddress?: Address;
  FulfillmentInstruction?: FulfillmentInstruction;
  IsSPU?: boolean;
}

export interface OrdersList {
  Orders: Order[];
  NextToken?: string;
  LastUpdatedBefore?: string;
  CreatedBefore?: string;
}
