declare module "nick-testing-amazon-sp-api" {
  class SellingPartner {
    constructor(config: Config): void;

    async refreshAccessToken(): void;
    async refreshRoleCredentials(): void;

    async callAPI(test: string): void;
  }

  export = SellingPartner;

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
}
