declare module "nick-testing-amazon-sp-api" {
  export interface RoleCredentials {
    id?: string;
    secret?: string;
    security_token?: string;
  }

  export interface Options {
    credentials_path?: string;
    auto_request_tokens?: boolean;
    auto_request_throttled?: boolean;
  }

  export interface Config {
    region: "eu" | "na" | "fe";
    refresh_token: string;
    access_token?: string;
    role_credentials: RoleCredentials;
    options: Options;
  }

  class SellingPartner {
    constructor(config: Config): void;
    async refreshAccessToken(): void;
    async refreshRoleCredentials(): void;
    async callAPI<T extends Operation>(req_params: ReqParams<T>): ObjectType<T>;
  }

  const testing = new SellingPartner().callAPI<'getAuthorizationCode'>({
    operation: 'getAuthorizationCode',
    query: {
      sellingPartnerId: 'string',
    }
  });
  console.log(testing);

  type Operation = "getAuthorizationCode" | "x";

  type ObjectType<T> = T extends "getAuthorizationCode" ? GetAuthorizationCodeResponse
      : T extends "x" ? SomethingElse
      : never;

  export interface ReqParams<T> {
    operation: T;
    path?: any;
    query?: T extends "getAuthorizationCode" ? GetAuthorizationCodeQuery
      : T extends "something else" ? SomethingElse
      : never;
    body?: any;
  }

  interface Errors {
    code: string;
    message: string;
    details?: string;
  }

  interface SomethingElse {}

  interface GetAuthorizationCodeQuery {
    sellingPartnerId: string;
    developerId: string;
    mwsAuthToken: string;
  }

  interface GetAuthorizationCodeResponse {
    payload?: {
      authorizationCode: string;
    };
    errors?: Errors;
  }

  export = SellingPartner;
}
