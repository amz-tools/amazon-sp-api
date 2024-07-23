export interface Errors {
  code: string;
  message: string;
  details?: string;
}

export interface BaseResponse {
  errors?: Errors;
}

interface Credentials {
  SELLING_PARTNER_APP_CLIENT_ID?: string;
  SELLING_PARTNER_APP_CLIENT_SECRET?: string;
}
interface Options {
  credentials_path?: string;
  auto_request_tokens?: boolean;
  auto_request_throttled?: boolean;
  debug_log?: boolean;
  only_grantless_operations?: boolean;
  use_sandbox?: boolean;
  user_agent?: string;
}

export interface Config {
  region: "eu" | "na" | "fe";
  refresh_token?: string;
  endpoints_versions?: Record<string, string>;
  access_token?: string;
  credentials?: Credentials;
  options?: Options;
}

export interface Pagination {
  nextToken?: string;
}

export interface DownloadOptions {
  json?: boolean;
  unzip?: boolean;
  file?: string;
}
