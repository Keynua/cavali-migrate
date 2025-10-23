import { Payload, ResponseRecord } from "../_types";
export declare const SUCCESS_MESSAGE = "Proceso ejecutado exitosamente";
export declare const DUPLICATE_ERROR_MESSAGE = "Error de duplicidad de Pagar\u00E9";
export type SendBatchConfig = {
    batchSize: number;
    batchId: number;
    batchNumber: number;
    toSend?: (number | [number, number])[];
    host: string;
    apikey: string;
    authorization: string;
};
export type SendBatchResponseCallback = (response: ResponseRecord, success: number, fail: number, dup: number, skip: number) => void;
export type SendBatchSkipCallback = (batchId: number, contractId: string, row: number, success: number, fail: number, dup: number, skip: number) => void;
export type SendBatchBeforeProcessCallback = (batchId: number, contractId: string, row: number, totalRecords: number, success: number, fail: number, dup: number, skip: number) => void;
/**
 * Sends a batch of payloads to the API.
 * Tracks success, failures, duplicates, and skipped records.
 * Exports results to an Excel file.
 */
declare const sendBatch: (payloadsReq: Payload[], config: SendBatchConfig, onResponse?: SendBatchResponseCallback, onError?: SendBatchResponseCallback, onSkip?: SendBatchSkipCallback, onBeforeProcess?: SendBatchBeforeProcessCallback) => Promise<{
    responses: ResponseRecord[];
    success: number;
    fail: number;
    dup: number;
    skip: number;
}>;
export default sendBatch;
//# sourceMappingURL=sendBatch.d.ts.map