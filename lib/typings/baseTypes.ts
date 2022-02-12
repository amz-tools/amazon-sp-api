export interface Errors {
  code: string;
  message: string;
  details?: string;
}

export interface BaseResponse {
  errors?: Errors;
}

export interface RoleCredentials {
  id?: string;
  secret?: string;
  security_token?: string;
}

interface Credentials {
  SELLING_PARTNER_APP_CLIENT_ID?: string;
  SELLING_PARTNER_APP_CLIENT_SECRET?: string;
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_SELLING_PARTNER_ROLE?: string;
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
  access_token?: string;
  role_credentials?: RoleCredentials;
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

export enum ProcessingStatus {
  InQueue = "IN_QUEUE",
  InProgress = "IN_PROGRESS",
  Done = "DONE",
  Cancelled = "CANCELLED",
  Fatal = "FATAL",
}
