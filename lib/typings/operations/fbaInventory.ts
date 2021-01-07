import { BaseResponse, Pagination } from "../baseTypes";

type GranularityType = "Marketplace";

export interface GetInventorySummariesQuery {
  details?: boolean;
  granularityType: GranularityType;
  granularityId: string;
  startDateTime?: string;
  sellerSkus?: string[];
  nextToken?: string;
  marketplaceIds: string[];
}

export interface GetInventorySummariesResponse extends BaseResponse {
  payload?: GetInventorySummariesResult;
  pagination: Pagination;
}

interface GetInventorySummariesResult {
  granularity: Granularity;
  inventorySummaries: InventorySummary[];
}

interface Granularity {
  granularityType?: GranularityType;
  granularityId?: string;
}

interface InventorySummary {
  asin?: string;
  fnSku?: string;
  sellerSku?: string;
  condition?: string;
  inventoryDetails?: InventoryDetails;
  lastUpdatedTime?: string;
  productName?: string;
  totalQuantity?: number;
}

interface InventoryDetails {
  fulfillableQuantity?: number;
  inboundWorkingQuantity?: number;
  inboundShippedQuantity?: number;
  inboundReceivingQuantity?: number;
  reservedQuantity?: ReservedQuantity;
  researchingQuantity?: ResearchingQuantity;
  unfulfillableQuantity?: UnfulfillableQuantity;
}

interface ReservedQuantity {
  totalReservedQuantity?: number;
  pendingCustomerOrderQuantity?: number;
  pendingTransshipmentQuantity?: number;
  fcProcessingQuantity?: number;
}

interface ResearchingQuantity {
  totalResearchingQuantity?: number;
  researchingQuantityBreakdown?: ResearchingQuantityEntry[];
}

interface ResearchingQuantityEntry {
  name: Name;
  quantity: number;
}

type Name =
  | "researchingQuantityInShortTerm"
  | "researchingQuantityInMidTerm"
  | "researchingQuantityInLongTerm";

interface UnfulfillableQuantity {
  totalUnfulfillableQuantity?: number;
  customerDamagedQuantity?: number;
  warehouseDamagedQuantity?: number;
  distributorDamagedQuantity?: number;
  carrierDamagedQuantity?: number;
  defectiveQuantity?: number;
  expiredQuantity?: number;
}
