import { BaseResponse } from "../base-types";

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
