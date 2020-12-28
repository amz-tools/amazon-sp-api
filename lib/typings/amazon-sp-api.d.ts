declare module "SellingPartner" {
  interface RoleCredentials {
    id?: string;
    secret?: string;
    security_token?: string;
  }

  interface Options {
    credentials_path?: string;
    auto_request_tokens?: boolean;
    auto_request_throttled?: boolean;
  }

  interface ConstructorConfig {
    region: "eu" | "na" | "fe";
    refresh_token: string;
    access_token?: string;
    role_credentials: RoleCredentials;
    options: Options;
  }

  export class SellingPartner {
    constructor(config: ConstructorConfig): void {}
  }
}
