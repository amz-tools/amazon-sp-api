import type { BaseResponse } from "../baseTypes";

interface MarketplaceParticipation {
  marketplace: Marketplace;
  participation: Participation;
}

interface Marketplace {
  id: string;
  name: string;
  countryCode: string;
  defaultCurrencyCode: string;
  defaultLanguageCode: string;
  domainName: string;
}

interface Participation {
  isParticipating: boolean;
  hasSuspendedListings: boolean;
}

export interface GetMarketplaceParticipationsResponse extends BaseResponse {
  payload?: MarketplaceParticipation[];
}
