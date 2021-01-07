import { BaseResponse } from "../baseTypes";

export interface GetInboundGuidanceQuery {
  MarketplaceId: string;
  SellerSKUList?: string[];
  ASINList?: string[];
}

export interface GetInboundGuidanceResponse extends BaseResponse {
  payload?: GetInboundGuidanceResult;
}

export interface CreateInboundShipmentPlanBody {
  ShipFromAddress: Address;
  LabelPrepPreference: LabelPrepPreference;
  ShipToCountryCode?: string;
  ShipToCountrySubdivisionCode?: string;
  InboundShipmentPlanRequestItems: InboundShipmentPlanRequestItem[];
}

export interface CreateInboundShipmentPlanResponse extends BaseResponse {
  payload?: {
    InboundShipmentPlans: InboundShipmentPlan[];
  };
}

interface BasePath {
  shipmentId: string;
}

export interface UpdateInboundShipmentBody {
  body: InboundShipmentRequest;
}

export interface UpdateInboundShipmentPath extends BasePath {}

export interface UpdateInboundShipmentResponse extends BaseResponse {
  payload?: {
    ShipmentId: string;
  };
}

export interface CreateInboundShipmentBody {
  body: InboundShipmentRequest;
}

export interface CreateInboundShipmentPath extends BasePath {}

export interface CreateInboundShipmentResponse
  extends UpdateInboundShipmentResponse {}

export interface GetPreorderInfoPath extends BasePath {}

export interface GetPreorderInfoQuery {
  MarketplaceId: string;
}

export interface GetPreorderInfoResponse extends BaseResponse {
  payload?: GetPreorderInfoResult;
}

export interface ConfirmPreorderPath {
  shipmentId: string;
}

export interface ConfirmPreorderQuery {
  NeedByDate: string;
  MarketplaceId: string;
}

export interface ConfirmPreorderResponse extends BaseResponse {
  payload?: ConfirmPreorderResult;
}

export interface GetPrepInstructionsQuery {
  ShipToCountryCode: string;
  SellerSKUList?: string[];
  ASINList?: string[];
}

export interface GetPrepInstructionsResponse extends BaseResponse {
  payload?: GetPrepInstructionsResult;
}

interface GetPrepInstructionsResult {
  SKUPrepInstructionsList?: SKUPrepInstructions[];
  InvalidSKUList?: InvalidSKU[];
  ASINPrepInstructionsList?: ASINPrepInstructions[];
  InvalidASINList?: InvalidASIN[];
}

interface InvalidASIN {
  ASIN?: string;
  ErrorReason?: ErrorReason;
}

interface SKUPrepInstructions {
  SellerSKU?: string;
  ASIN?: string;
  BarcodeInstruction?: BarcodeInstruction;
  PrepGuidance?: PrepGuidance;
  PrepInstructionList?: PrepInstruction[];
  AmazonPrepFeesDetailsList?: AmazonPrepFeesDetails[];
}

interface AmazonPrepFeesDetails {
  PrepInstruction?: PrepInstruction;
  FeePerUnit?: Amount;
}

interface ASINPrepInstructions {
  ASIN?: string;
  BarcodeInstruction?: BarcodeInstruction;
  PrepGuidance?: PrepGuidance;
  PrepInstructionList?: PrepInstruction[];
}

type BarcodeInstruction =
  | "RequiresFNSKULabel"
  | "CanUseOriginalBarcode"
  | "MustProvideSellerSKU";
type PrepGuidance =
  | "ConsultHelpDocuments"
  | "NoAdditionalPrepRequired"
  | "SeePrepInstructionsList";

type SellerFreightClass =
  | "50"
  | "55"
  | "60"
  | "65"
  | "77.5"
  | "85"
  | "92.5"
  | "100"
  | "110"
  | "125"
  | "150"
  | "175"
  | "200"
  | "250"
  | "300"
  | "400"
  | "500";

interface ConfirmPreorderResult {
  ConfirmedNeedByDate?: string;
  ConfirmedFulfillableDate?: string;
}

interface GetPreorderInfoResult {
  ShipmentContainsPreorderableItems?: boolean;
  ShipmentConfirmedForPreorder?: boolean;
  NeedByDate?: string;
  ConfirmedFulfillableDate?: string;
}

interface GetInboundGuidanceResult {
  SKUInboundGuidanceList?: SKUInboundGuidance[];
  InvalidSKUList?: InvalidSKU[];
  ASINInboundGuidanceList?: ASINInboundGuidance[];
  InvalidASINList?: InvalidASIN[];
}

interface SKUInboundGuidance {
  SellerSKU: string;
  ASIN: string;
  InboundGuidance: InboundGuidance;
  GuidanceReasonList?: GuidanceReason[];
}

type InboundGuidance = "InboundNotRecommended" | "InboundOK";
type GuidanceReason = "SlowMovingASIN" | "NoApplicableGuidance";
type ErrorReason = "DoesNotExist" | "InvalidASIN";

interface InvalidSKU {
  SellerSKU?: string;
  ErrorReason?: ErrorReason;
}

interface ASINInboundGuidance {
  ASIN: string;
  InboundGuidance: InboundGuidance;
  GuidanceReasonList?: GuidanceReason[];
}

interface InvalidASIN {
  ASIN?: string;
  ErrorReason?: ErrorReason;
}

interface Address {
  Name: string;
  AddressLine1: string;
  AddressLine2?: string;
  DistrictOrCounty?: string;
  City: string;
  StateOrProvinceCode: string;
  CountryCode: string;
  PostalCode: string;
}

type LabelPrepPreference =
  | "SELLER_LABEL"
  | "AMAZON_LABEL_ONLY"
  | "AMAZON_LABEL_PREFERRED";

interface InboundShipmentPlanRequestItem {
  SellerSKU: string;
  ASIN: string;
  Condition: Condition;
  Quantity: number;
  QuantityInCase: number;
  PrepDetailsList: PrepDetails[];
}

type Condition =
  | "NewItem"
  | "NewWithWarranty"
  | "NewOEM"
  | "NewOpenBox"
  | "UsedLikeNew"
  | "UsedVeryGood"
  | "UsedGood"
  | "UsedAcceptable"
  | "UsedPoor"
  | "UsedRefurbished"
  | "CollectibleLikeNew"
  | "CollectibleVeryGood"
  | "CollectibleGood"
  | "CollectibleAcceptable"
  | "CollectiblePoor"
  | "RefurbishedWithWarranty"
  | "Refurbished"
  | "Club";

interface PrepDetails {
  PrepInstruction: PrepInstruction;
  PrepOwner: PrepOwner;
}

type PrepInstruction =
  | "Polybagging"
  | "BubbleWrapping"
  | "Taping"
  | "BlackShrinkWrapping"
  | "Labeling"
  | "HangGarment";

type PrepOwner = "AMAZON" | "SELLER";

interface InboundShipmentPlan {
  ShipmentId: string;
  DestinationFulfillmentCenterId: string;
  ShipToAddress: Address;
  LabelPrepType: LabelPrepType;
  Items: InboundShipmentPlanItem[];
  EstimatedBoxContentsFee?: BoxContentsFeeDetails;
}

type LabelPrepType = "NO_LABEL" | "SELER_LABEL" | "AMAZON_LABEL";

interface InboundShipmentPlanItem {
  SellerSKU: string;
  FulfillmentNetworkSKU: string;
  Quantity: number;
  PrepDetailsList?: PrepDetails[];
}

interface BoxContentsFeeDetails {
  TotalUnits?: number;
  FeePerUnit?: Amount;
  TotalFee?: Amount;
}

interface Amount {
  CurrencyCode: "USD" | "GBP";
  Value: number;
}

interface InboundShipmentRequest {
  InboundShipmentHeader: InboundShipmentHeader;
  InboundShipmentItems: InboundShipmentItem[];
  MarketplaceId: string;
}

interface InboundShipmentHeader {
  ShipmentName: string;
  ShipFromAddress: Address;
  DestinationFulfillmentCenterId: string;
  AreCasesRequired?: boolean;
  ShipmentStatus: ShipmentStatus;
  LabelPrepPreference: LabelPrepPreference;
  IntendedBoxContentsSource?: IntendedBoxContentsSource;
}

type ShipmentStatus =
  | "WORKING"
  | "SHIPPED"
  | "RECEIVING"
  | "CANCELLED"
  | "DELETED"
  | "CLOSED"
  | "ERROR"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CHECKED_IN";

type IntendedBoxContentsSource = "NONE" | "FEED" | "2D_BARCODE";

interface InboundShipmentItem {
  ShipmentId?: string;
  SellerSKU: string;
  FulfillmentNetworkSKU?: string;
  QuantityShipped?: number;
  QuantityReceived?: number;
  QuantityInCase?: number;
  ReleaseDate?: string;
  PrepDetailsList?: PrepDetails[];
}
