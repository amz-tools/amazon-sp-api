export interface Errors {
  code: string;
  message: string;
  details?: string;
}

export interface BaseResponse {
  errors?: Errors;
}

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

export interface Config {
  region: "eu" | "na" | "fe";
  refresh_token: string;
  access_token?: string;
  role_credentials?: RoleCredentials;
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
