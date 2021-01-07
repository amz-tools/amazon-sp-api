import { BaseResponse } from "../baseTypes";

export interface ListCatalogItemsQuery {
  MarketplaceId: string;
  Query?: string;
  QueryContextId?: string;
  SellerSKU?: string;
  UPC?: string;
  EAN?: string;
  ISBN?: string;
  JAN?: string;
}

export interface ListCatalogItemsResponse extends BaseResponse {
  payload?: {
    Items?: ListCatalogItem[];
  };
}

export interface GetCatalogItemQuery {
  MarketplaceId: string;
}

export interface GetCatalogItemPath {
  asin: string;
}

export interface GetCatalogItemResponse extends BaseResponse {
  payload?: ListCatalogItem;
}

export interface ListCatalogCategoriesQuery {
  MarketplaceId: string;
  ASIN?: string;
  SellerSKU?: string;
}

export interface ListCatalogCategoriesResponse extends BaseResponse {
  payload?: Category[];
}

interface Category {
  ProductCategoryId?: string;
  ProductCategoryName?: string;
  parent?: object;
}

interface ASINIdentifier {
  MarketplaceId: string;
  ASIN: string;
}

interface SellerSKUIdentifier {
  MarketplaceId: string;
  SellerId: string;
  SellerSKU: string;
}

interface IdentifierType {
  MarketplaceASIN?: ASINIdentifier;
  SKUIdentifier?: SellerSKUIdentifier;
}

interface DecimalWithUnits {
  value?: number;
  Units?: string;
}

interface Creator {
  value?: string;
  Role?: string;
}

interface DimensionType {
  Height?: DecimalWithUnits;
  Length?: DecimalWithUnits;
  Width?: DecimalWithUnits;
  Weight?: DecimalWithUnits;
}

interface LanguageType {
  Name?: string;
  Type?: string;
  AudioFormat?: string;
}

interface Price {
  Amount?: number;
  CurrencyCode?: string;
}

interface Image {
  URL?: string;
  Height?: DecimalWithUnits;
  Width?: DecimalWithUnits;
}

interface AttributeSet {
  Actor?: string[];
  Artist?: string[];
  AspectRatio?: string;
  AudienceRating?: string;
  Author?: string[];
  BackFinding?: string;
  BandMaterialType?: string;
  Binding?: string;
  BlurayRegion?: string;
  Brand?: string;
  CeroAgeRating?: string;
  ChainType?: string;
  ClaspType?: string;
  Color?: string;
  CpuManufacturer?: string;
  CpuSpeed?: DecimalWithUnits;
  CpuType?: string;
  Creator?: Creator[];
  Department?: string;
  Director?: string[];
  DisplaySize?: DecimalWithUnits[];
  Edition?: string;
  EpisodeSequence?: string;
  EsrbAgeRating?: string;
  Feature?: string[];
  Flavor?: string;
  Format?: string[];
  GemType?: string[];
  Genre?: string;
  GolfClubFlex?: string;
  GolfClubLoft?: DecimalWithUnits[];
  HandOrientation?: string;
  HardDisInterface?: string;
  HardDiskSize?: DecimalWithUnits;
  HardwarePlatform?: string;
  HazardousMaterialType?: string;
  ItemDimensions?: DimensionType;
  IsAdultProduct?: boolean;
  IsAutographed?: boolean;
  IsEligibleForTradeIn?: boolean;
  IsMemorabilia?: boolean;
  IssuesPerYear?: string;
  ItemPartNumber?: string;
  Label?: string;
  Languages?: LanguageType[];
  LegalDisclaimer?: string;
  ListPrice?: Price;
  Manufacturer?: string;
  ManufacturerMaximumAge?: DecimalWithUnits;
  ManufacturerMinimumAge?: DecimalWithUnits;
  ManufacturerPartsWarrantyDescription?: string;
  MaterialType?: string[];
  MaximumResolution?: DecimalWithUnits;
  MediaType?: string[];
  MetalStamp?: string;
  MetalType?: string;
  Model?: string;
  NumberOfDiscs?: number;
  NumberOfIssues?: number;
  NumberOfItems?: number;
  NumberOfPages?: number;
  NumberOfTracks?: number;
  OperatingSystem?: string[];
  OpticalZoom?: DecimalWithUnits;
  PackageDimensions?: DimensionType;
  PackageQuantity?: number;
  PartNumber?: string;
  PegiRating?: string;
  Platform?: string[];
  ProcessorCount?: number;
  ProductGroup?: string;
  ProductTypeName?: string;
  ProductTypeSubcategory?: string;
  PublicationDate?: string;
  Publisher?: string;
  RegionCode?: string;
  ReleaseDate?: string;
  RingSize?: string;
  RunningTime?: DecimalWithUnits;
  ShaftMaterial?: string;
  Scent?: string;
  SeasonSequence?: string;
  SeikodoProductCode?: string;
  Size?: string;
  SizePerPearl?: string;
  SmallImage?: Image;
  Studio?: string;
  SubscriptionLength?: DecimalWithUnits;
  SystemMemorySize?: DecimalWithUnits;
  SystemMemoryType?: string;
  TheatricalReleaseDate?: string;
  Title?: string;
  TotalDiamondWeight?: DecimalWithUnits;
  TotalGemWeight?: DecimalWithUnits;
  Warranty?: string;
  WeeeTaxValue?: Price;
}

interface Relationship {
  Color?: string;
  Edition?: string;
  Flavor?: string;
  GemType?: string[];
  GolfClubFlex?: string;
  HandOrientation?: string;
  HardwarePlatform?: string;
  MaterialType?: string[];
  MetalType?: string;
  Model?: string;
  OperatingSystem?: string[];
  ProductTypeSubcategory?: string;
  RingSize?: string;
  ShaftMaterial?: string;
  Scent?: string;
  Size?: string;
  SizePerPearl?: string;
  GolfClubLoft?: DecimalWithUnits;
  TotalDiamondWeight?: DecimalWithUnits;
  TotalGemWeight?: DecimalWithUnits;
  PackageQuantity?: number;
  ItemDimensions?: DimensionType;
}

interface SalesRank {
  ProductCategoryId?: string;
  Rank?: number;
}

interface ListCatalogItem {
  Identifiers: IdentifierType;
  AttributeSets?: AttributeSet[];
  Relationships: Relationship[];
  SalesRankings: SalesRank[];
}
