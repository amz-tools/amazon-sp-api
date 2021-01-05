import { BaseResponse } from "../baseTypes";

export interface ListFinancialEventGroupsQuery {
  MaxResultsPerPage?: number;
  FinancialEventGroupStartedBefore?: string;
  FinancialEventGroupStartedAfter?: string;
  NextToken?: string;
}

export interface ListFinancialEventGroupsResponse extends BaseResponse {
  payload?: ListFinancialEventGroupsPayload;
}

export interface ListFinancialEventGroupsByGroupIdQuery {
  MaxResultsPerPage?: number;
  NextToken?: string;
}

export interface ListFinancialEventGroupsByGroupIdPath {
  eventGroupId: string;
}

export interface ListFinancialEventGroupsByGroupIdResponse
  extends BaseResponse {
  payload?: ListFinancialEventsPayload;
}

export interface ListFinancialEventsByOrderIdPath {
  orderId: string;
}

export interface ListFinancialEventsByOrderIdQuery {
  MaxResultsPerPage?: number;
  NextToken?: string;
}

export interface ListFinancialEventsByOrderIdResponse
  extends ListFinancialEventGroupsByGroupIdResponse {}

export interface ListFinancialEventsQuery {
  MaxResultsPerPage?: number;
  PostedAfter?: string;
  PostedBefore?: string;
  NextToken?: string;
}

export interface ListFinancialEventsResponse
  extends ListFinancialEventGroupsByGroupIdResponse {}

interface ListFinancialEventGroupsPayload {
  NextToken?: string;
  FinancialEventGroupList?: FinancialEventGroup[];
}

interface FinancialEventGroup {
  FinancialEventGroupId?: string;
  ProcessingStatus?: string;
  FundTransferStatus?: string;
  OriginalTotal?: Currency;
  ConvertedTotal?: Currency;
  FundTransferDate?: string;
  TraceId?: string;
  AccountTail?: string;
  BeginningBalance?: Currency;
  FinancialEventGroupStart?: string;
  FinancialEventGroupEnd?: string;
}

interface Currency {
  CurrencyCode?: string;
  CurrencyAmount?: number;
}

interface ListFinancialEventsPayload {
  FinancialEvents?: FinancialEvents;
  NextToken?: string;
}

interface FinancialEvents {
  ShipmentEventList?: ShipmentEvent[];
  RefundEventList?: ShipmentEvent[];
  GuaranteeClaimEventList?: ShipmentEvent[];
  ChargebackEventList?: ShipmentEvent[];
  PayWithAmazonEventList?: PayWithAmazonEvent[];
  ServiceProviderCreditEventList?: SolutionProviderCreditEvent[];
  RetrochargeEventList?: RetrochargeEvent[];
  RentalTransactionEventList?: RentalTransactionEvent[];
  ProductAdsPaymentEventList?: ProductAdsPaymentEvent[];
  ServiceFeeEventList?: ServiceFeeEvent[];
  SellerDealPaymentEventList?: SellerDealPaymentEvent[];
  DebtRecoveryEventList?: DebtRecoveryEvent[];
  LoanServicingEventList?: LoanServicingEvent[];
  AdjustmentEventList?: AdjustmentEvent[];
  SAFETReimbursementEventList?: SAFETReimbursementEvent[];
  SellerReviewEnrollmentPaymentEventList?: SellerReviewEnrollmentPaymentEvent[];
  FBALiquidationEventList?: FBALiquidationEvent[];
  CouponPaymentEventList?: CouponPaymentEvent[];
  ImagingServicesFeeEventList?: ImagingServicesFeeEvent[];
  NetworkComminglingTransactionEventList?: NetworkComminglingTransactionEvent[];
  AffordabilityExpenseEventList?: AffordabilityExpenseEvent[];
  AffordabilityExpenseReversalEventList?: AffordabilityExpenseEvent[];
}

interface ShipmentEvent {
  AmazonOrderId?: string;
  SellerOrderId?: string;
  MarketplaceName?: string;
  OrderChargeList?: ChargeComponent[];
  OrderChargeAdjustmentList?: ChargeComponent[];
  ShipmentFeeList?: FeeComponent[];
  ShipmentFeeAdjustmentList?: FeeComponent[];
  OrderFeeList?: FeeComponent[];
  OrderFeeAdjustmentList?: FeeComponent[];
  DirectPaymentList?: DirectPayment[];
  PostedDate?: string;
  ShipmentItemList?: ShipmentItem[];
  ShipmentItemAdjustmentList?: ShipmentItem[];
}

interface ChargeComponent {
  ChargeType?: string;
  ChargeAmount?: Currency;
}

interface FeeComponent {
  FeeType?: string;
  FeeAmount?: Currency;
}

interface DirectPayment {
  DirectPaymentType?: string;
  DirectPaymentAmount?: Currency;
}

interface ShipmentItem {
  SellerSKU?: string;
  OrderItemId?: string;
  OrderAdjustmentItemId?: string;
  QuantityShipped?: number;
  ItemChargeList?: ChargeComponent[];
  ItemChargeAdjustmentList?: ChargeComponent[];
  ItemFeeList?: FeeComponent[];
  ItemFeeAdjustmentList?: FeeComponent[];
  ItemTaxWithheldList?: TaxWithheldComponent[];
  PromotionList?: Promotion[];
  PromotionAdjustmentList?: Promotion[];
  CostOfPointsGranted?: Currency;
  CostOfPointsReturned?: Currency;
}

interface TaxWithheldComponent {
  TaxCollectionModel?: string;
  TaxesWithheld?: ChargeComponent[];
}

interface Promotion {
  PromotionType?: string;
  PromotionId?: string;
  PromotionAmount?: Currency;
}

interface PayWithAmazonEvent {
  SellerOrderId?: string;
  TransactionPostedDate?: string;
  BusinessObjectType?: string;
  SalesChannel?: string;
  Charge?: ChargeComponent;
  FeeList?: FeeComponent[];
  PaymentAmountType?: string;
  AmountDescription?: string;
  FulfillmentChannel?: string;
  StoreName?: string;
}

interface SolutionProviderCreditEvent {
  ProviderTransactionType?: string;
  SellerOrderId?: string;
  MarketplaceId?: string;
  MarketplaceCountryCode?: string;
  SellerId?: string;
  SellerStoreName?: string;
  ProviderId?: string;
  ProviderStoreName?: string;
  TransactionAmount?: Currency;
  TransactionCreationDate?: string;
}

interface RetrochargeEvent {
  RetrochargeEventType?: string;
  AmazonOrderId?: string;
  PostedDate?: string;
  BaseTax?: Currency;
  ShippingTax?: Currency;
  MarketplaceName?: string;
  RetrochargeTaxWithheldList?: TaxWithheldComponent[];
}

interface RentalTransactionEvent {
  AmazonOrderId?: string;
  RentalEventType?: string;
  ExtensionLength?: number;
  PostedDate?: string;
  RentalChargeList?: ChargeComponent[];
  RentalFeeList?: FeeComponent[];
  MarketplaceName?: string;
  RentalInitialValue?: Currency;
  RentalReimbursement?: Currency;
  RentalTaxWithheldList?: TaxWithheldComponent[];
}

interface ProductAdsPaymentEvent {
  postedDate?: string;
  transactionType?: string;
  invoiceId?: string;
  baseValue?: Currency;
  taxValue?: Currency;
  transactionValue?: Currency;
}

interface ServiceFeeEvent {
  AmazonOrderId?: string;
  FeeReason?: string;
  FeeList?: FeeComponent[];
  SellerSKU?: string;
  FnSKU?: string;
  FeeDescription?: string;
  ASIN?: string;
}

interface SellerDealPaymentEvent {
  postedDate?: string;
  dealId?: string;
  dealDescription?: string;
  eventType?: string;
  feeType?: string;
  feeAmount?: Currency;
  taxAmount?: Currency;
  totalAmount?: Currency;
}

interface DebtRecoveryEvent {
  DebtRecoveryType?: string;
  RecoveryAmount?: Currency;
  OverPaymentCredit?: Currency;
  DebtRecoveryItemList?: DebtRecoveryItem[];
  ChargeInstrumentList?: ChargeInstrument[];
}

interface DebtRecoveryItem {
  RecoveryAmount?: Currency;
  OriginalAmount?: Currency;
  GroupBeginDate?: string;
  GroupEndDate?: string;
}

interface ChargeInstrument {
  Description?: string;
  Tail?: string;
  Amount?: Currency;
}

interface LoanServicingEvent {
  LoanAmount?: Currency;
  LoanServicingEvent?: string;
}

interface AdjustmentEvent {
  AdjustmentType?: string;
  PostedDate?: string;
  AdjustmentAmount?: Currency;
  AdjustmentItemList?: AdjustmentItem[];
}

interface AdjustmentItem {
  Quantity?: string;
  PerUnitAmount?: Currency;
  TotalAmount?: Currency;
  SellerSKU?: string;
  FnSKU?: string;
  ProductDescription?: string;
  ASIN?: string;
}

interface SAFETReimbursementEvent {
  PostedDate?: string;
  SAFETClaimId: string;
  ReimbursedAmount?: Currency;
  ReasonCode?: string;
  SAFETReimbursementItemList?: SAFETReimbursementItem[];
}

interface SAFETReimbursementItem {
  itemChargeList?: ChargeComponent[];
  productDescription?: string;
  quantity?: string;
}

interface SellerReviewEnrollmentPaymentEvent {
  PostedDate?: string;
  EnrollmentId?: string;
  ParentASIN?: string;
  FeeComponent?: FeeComponent;
  ChargeComponent?: ChargeComponent;
  TotalAmount?: Currency;
}

interface FBALiquidationEvent {
  PostedDate?: string;
  OriginalRemovalOrderId?: string;
  LiquidationProceedsAmount?: Currency;
  LiquidationFeeAmount?: Currency;
}

interface CouponPaymentEvent {
  PostedDate?: string;
  CouponId?: string;
  SellerCouponDescription?: string;
  ClipOrRedemptionCount?: number;
  PaymentEventId?: string;
  FeeComponent?: FeeComponent;
  ChargeComponent?: ChargeComponent;
  TotalAmount?: Currency;
}

interface ImagingServicesFeeEvent {
  ImagingRequestBillingItemID?: string;
  ASIN?: string;
  PostedDate?: string;
  FeeList?: FeeComponent[];
}

interface NetworkComminglingTransactionEvent {
  TransactionType?: string;
  PostedDate?: string;
  NetCoTransactionID?: string;
  SwapReason?: string;
  ASIN?: string;
  MarketplaceId?: string;
  TaxExclusiveAmount?: Currency;
  TaxAmount?: Currency;
}

interface AffordabilityExpenseEvent {
  AmazonOrderId?: string;
  PostedDate?: string;
  MarketplaceId?: string;
  TransactionType?: string;
  BaseExpense?: Currency;
  TaxTypeCGST: Currency;
  TaxTypeSGST: Currency;
  TaxTypeIGST: Currency;
  TotalExpense?: Currency;
}
