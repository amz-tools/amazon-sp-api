import { BaseResponse} from "../baseTypes";

export interface GetOrdersQuery{
    CreatedAfter?: string;
    CreatedBefore?: string;
    LastUpdatedAfter?: string;
    LastUpdatedBefore?: string;
    OrderStatuses?:string[];
    MarketplaceIds?:string[];
    FulfillmentChannels?:string[];
    PaymentMethods?:string[];
    BuyerEmail?:string[];
    SellerOrderId?: string[];
    MaxResultPerPage?: number;
    EasyShipShipmentStatuses?: string[];
    NextToken?: string;
    AmazonOrderIds?: string[];
    ActualFulfillmentSupplySourceId?: string;
    IsISPU?: boolean;
    StoreChainStoreId?: string;
}

export interface GetOrderPath{
    orderId:string;
}

export interface GetOrderBuyerInfoPath{
    orderId:string;
}

export interface GetOrderAddressPath{
    orderId:string;
}

export interface GetOrderItemsPath{
    orderId: string;
}

export interface GetOrderItemsQuery{
    nextToken?: string;
}

export interface GetOrderItemsBuyerInfoPath{
    orderId: string;
}

export interface GetOrderItemsBuyerInfoQuery{
    nextToken?: string;
}

export interface GetOrderItemsBuyerInfoResponse extends BaseResponse{
    payload?: OrderItemBuyerInfoList
}

export interface GetOrderItemResponse extends BaseResponse{
    payload?: OrderItemsList
}

export interface GetOrderAddressResponse extends BaseResponse{
    payload?: OrderAddress;
}

export interface GetOrderBuyerInfoResponse extends BaseResponse{
    payload?: OrderBuyerInfo;
}

export interface GetOrderResponse extends BaseResponse{
    payload?: Order;
}

export interface GetOrdersResponse extends BaseResponse{
    payload?: OrdersList;
}


type DeemedResellerCategory = "IOSS" | "UOSS";
type FulfillmentChannel = "MFN" | "AFN";
type ResponsibleParty = "Amazon Services, Inc.";
type AddressType = "Residential" | "Commercial";
type paymentMethod = "COD" | "CVS" | "Other";
type Model = "MarketplaceFacilitator";
type OrderType =
    | "StandardOrder"
    | "LongLeadTimeOrder"
    | "Preorder"
    | "BackOrder"
    | "SourcingOnDemandOrder";
type OrderStatus =
    | "Pending"
    | "Unshipped"
    | "PartialShipped"
    | "Shipped"
    | "Canceled"
    | "Unfulfillable"
    | "InvoiceUnconfirmed"
    | "PendingAvailability";

interface FulfillmentInstruction{
    FulfillmentSupplySourceId?: string;
}

interface TaxCollection{
    Model?: Model;
    ResponsiblePArty?: ResponsibleParty;
}

interface BuyerCustomizedInfoDetail{
    CustomizedURL?: string;
}

interface PromotionIdList{
    PromotionId?: string[];
}

interface ProductInfoDetail{
    NumberOfItems?: number;
}

interface Money{
    CurrencyCode?: string;
    Amount?: string;
}

interface PointsGrantedDetail{
    PointsNumber?: number;
    PointsMonetaryValue?: Money;
}

interface OrderItemBuyerInfo{
    OrderItemId: string;
    BuyerCustomizedInfo?: BuyerCustomizedInfoDetail;
    GiftWrapPrice?: Money;
    GiftWrapTax?: Money;
    GiftMessageText?: string;
    GiftWrapLevel?: string;
}

interface OrderItemBuyerInfoList{
    OrderItemBuyerInfo?: OrderItemBuyerInfo[];
}

// Unused type
/*
interface OrderItemsBuyerInfoList{
    OrderItems: OrderItemBuyerInfoList;
    NextToken?: string;
    AmazonOrderId: string;
}
*/

interface OrderItem{
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

interface OrderItemList{
    OrderItem?: OrderItem[];
}

interface OrderItemsList{
    OrderItems: OrderItemList;
    NextToken?: string;
    AmazonOrderId?: string;
}

interface TaxClassification{
    Name?: string;
    Value?: string;
}

interface BuyerTaxInfo{
    CompanyLegalName?: string;
    TaxingRegion?: string;
    TaxClassifications?: TaxClassification[];
}

interface PaymentExecutionDetailItem{
    Payment: Money;
    PaymentMethod: paymentMethod;
}

interface PaymentExecutionDetailItemList{
    PaymentExecutionDetailItem?: PaymentExecutionDetailItem[];
}

interface PaymentMethodDetailItemList{
    PaymentMethodDetailItem?: string[];
}

interface Address{
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

interface OrderAddress{
    AmazonOrderId: string;
    ShippingAddress?: Address;
}

interface OrderBuyerInfo{
    AmazonOrderId: string;
    BuyerEmail?: string;
    BuyerNama?: string;
    BuyerCountry?: string;
    BuyerTaxInfo?: BuyerTaxInfo;
    PurchaseOrderNumber?: string;
}

interface Order{
    AmazonOrderId: string;
    SellerOrderId?: string;
    PurchaseDate: string;
    LastUpdateDate: string;
    OrderStatus: OrderStatus;
    FulfillmentChannel?: FulfillmentChannel;
    salesChannel?: string;
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

interface OrderList{
    OrderList?: Order[];
}

interface OrdersList{
    Orders: OrderList;
    NextToken?: string;
    LastUpdatedBefore?: string;
    CreatedBefore?: string;
}
