import { BaseResponse } from "../baseTypes";

interface SmallAndLightEnrollmentQuery {
  marketplaceIds: string[];
}

interface SmallAndLightEnrollmentPath {
  sellerSKU: string;
}

interface SmallAndLightEnrollment {
  marketplaceId: string;
  sellerSKU: string;
  status: "ENROLLED" | "NOT_ENROLLED";
}

export interface GetSmallAndLightEnrollmentBySellerSKUQuery
  extends SmallAndLightEnrollmentQuery {}

export interface GetSmallAndLightEnrollmentBySellerSKUPath
  extends SmallAndLightEnrollmentPath {}

export interface GetSmallAndLightEnrollmentBySellerSKUResponse
  extends SmallAndLightEnrollment {}

export interface PutSmallAndLightEnrollmentBySellerSKUQuery
  extends SmallAndLightEnrollmentQuery {}

export interface PutSmallAndLightEnrollmentBySellerSKUPath
  extends SmallAndLightEnrollmentPath {}

export interface PutSmallAndLightEnrollmentBySellerSKUResponse
  extends SmallAndLightEnrollment {}

export interface DeleteSmallAndLightEnrollmentBySellerSKUQuery
  extends SmallAndLightEnrollmentQuery {}

export interface DeleteSmallAndLightEnrollmentBySellerSKUPath
  extends SmallAndLightEnrollmentPath {}

export interface GetSmallAndLightEligibilityBySellerSKUQuery
  extends SmallAndLightEnrollmentQuery {}

export interface GetSmallAndLightEligibilityBySellerSKUPath
  extends SmallAndLightEnrollmentPath {}

export interface GetSmallAndLightEligibilityBySellerSKUResponse
  extends SmallAndLightEnrollment {}

export interface GetSmallAndLightFeePreviewBody {
  marketplaceId: string;
  items: Item[];
}

interface Item {
  asin: string;
  price: MoneyType;
}

interface MoneyType {
  currencyCode?: string;
  amount?: number;
}

export interface GetSmallAndLightFeePreviewResponse {
  data?: FeePreview[];
}

interface FeePreview extends BaseResponse {
  asin?: string;
  price?: MoneyType;
  feeBreakdown?: FeeLineItem[];
  totalFees?: MoneyType;
}

interface FeeLineItem {
  feeType:
    | "FBAWeightBasedFee"
    | "FBAPerOrderFulfillmentFee"
    | "FBAPerUnitFulfillmentFee"
    | "Commission";
  feeCharge: MoneyType;
}
