import { BaseResponse, ProcessingStatus } from "../baseTypes";

export interface CreateReportResponse extends BaseResponse {
  // payload?: {
  //   reportId: string;
  // };
  reportId: string;
}

export interface GetReportPath {
  reportId: string;
}

export interface GetReportResponse extends BaseResponse {
  // payload?: Report;
  marketplaceIds?: string[];
  reportId: string;
  reportType: string;
  dataStartTime?: string;
  dataEndTime?: string;
  reportScheduleId?: string;
  createdTime: string;
  processingStatus: ProcessingStatus;
  processingStartTime?: string;
  processingEndTime?: string;
  reportDocumentId?: string;
}

export interface GetReportDocumentPath {
  reportDocumentId: string;
}

export interface GetReportDocumentResponse extends BaseResponse {
  // payload?: ReportDocument;
  reportDocumentId: string;
  url: string;
  encryptionDetails: ReportDocumentEncryptionDetails;
  compressionAlgorithm: "GZIP";
}

export interface CreateReportBody {
  reportOptions?: ReportOptions;
  reportType: string;
  dataStartTime?: string;
  dataEndTime?: string;
  marketplaceIds: string[];
}

interface ReportOptions {
  [key: string]: string;
}

interface Report {
  marketplaceIds?: string[];
  reportId: string;
  reportType: string;
  dataStartTime?: string;
  dataEndTime?: string;
  reportScheduleId?: string;
  createdTime: string;
  processingStatus: ProcessingStatus;
  processingStartTime?: string;
  processingEndTime?: string;
  reportDocumentId?: string;
}

export interface ReportDocument {
  reportDocumentId: string;
  url: string;
  encryptionDetails: ReportDocumentEncryptionDetails;
  compressionAlgorithm: "GZIP";
}

interface ReportDocumentEncryptionDetails {
  standard: "AES";
  initializationVector: string;
  key: string;
}
