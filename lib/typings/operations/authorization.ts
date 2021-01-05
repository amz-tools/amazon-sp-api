import { BaseResponse } from "../baseTypes";

export interface GetAuthorizationCodeQuery {
  sellingPartnerId: string;
  developerId: string;
  mwsAuthToken: string;
}

export interface GetAuthorizationCodeResponse extends BaseResponse {
  payload?: {
    authorizationCode: string;
  };
}
