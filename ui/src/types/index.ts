/**
 * Tipos para la UI de migración de pagarés CAVALI
 */

export interface CredentialsConfig {
  host: 'api.dev.keynua.com' | 'api.stg.keynua.com' | 'api.keynua.com';
  apiKey: string;
  apiToken: string;
}

export interface MigrationConfig {
  batch?: number;
  maxBatch?: number;
  batchSize: number;
  prefix: string;
  toSend?: (number | [number, number])[];
}

export interface ValidationError {
  row: number;
  message: string;
}

export interface BatchReport {
  batchNumber: number;
  fileName: string;
  success: number;
  errors: number;
  duplicates: number;
  skipped: number;
  data: any[];
}

export interface ProgressUpdate {
  type: 'validation' | 'processing' | 'complete' | 'error';
  message: string;
  currentBatch?: number;
  totalBatches?: number;
  currentRecord?: number;
  totalRecords?: number;
  batchReport?: BatchReport;
}

export enum ProcessStatus {
  IDLE = 'idle',
  VALIDATING = 'validating',
  PROCESSING = 'processing',
  COMPLETE = 'complete',
  ERROR = 'error',
}

// Tipos del script original
export interface PromissoryNote {
  conditionJustSign: number;
  special: number;
  typeDocument: number;
  currency: number;
  creditNumber: number;
  uniqueCode: number;
  banking?: number;
  product?: number;
  expirationDate?: string;
  clientName?: string;
  civilStatus?: number;
  numberDocument?: string;
  domicile?: string;
  issuedDate?: string;
  issuedPlace?: string;
  amount?: number;
  nameLegalRepresentativeOne?: string;
  numberDocumentOne?: string;
  nameLegalRepresentativeTwo?: string;
  numberDocumentTwo?: string;
  nameLegalRepresentativeThree?: string;
  numberDocumentThree?: string;
  guaranteeDataDetail?: GuaranteeDataDetail[];
}

export interface GuaranteeDataDetail {
  civilStatus?: number;
  numberDocument?: string;
  businessName?: string;
  domicile?: string;
  nameLegalRepresentativeOne?: string;
  numberDocumentOne?: string;
  nameLegalRepresentativeTwo?: string;
  numberDocumentTwo?: string;
  nameLegalRepresentativeThree?: string;
  numberDocumentThree?: string;
}

export interface Payload {
  contractId: string;
  promissoryNote: PromissoryNote;
}

export interface ResponseRecord {
  row: number;
  batchId: number;
  contractId: string;
  promissoryNote: string;
  message?: string;
  INTERNAL_ERROR?: string;
  [key: string]: any;
}

export interface ExcelRecord {
  [key: string]: string | number | null | undefined;
}

