import type { BaseResponse } from "../baseTypes";

export interface CreateRestrictedDataTokenBody {
  targetApplication?: string;
  restrictedResources: RestrictedResource[];
}

export interface RestrictedResource {
  method: Method;
  path: string;
  dataElements?: string[];
}

type Method =
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE";

export interface CreateRestrictedDataTokenResponse extends BaseResponse {
  restrictedDataToken?: string;
  expiresIn?: string;
}