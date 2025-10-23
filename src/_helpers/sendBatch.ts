import { isArray } from "lodash";
import { Payload, ResponseRecord } from "../_types";
import { insertPromissoryNote } from "./insertPromissoryNote";

// API response messages (constants for clarity)
export const SUCCESS_MESSAGE = "Proceso ejecutado exitosamente";
export const DUPLICATE_ERROR_MESSAGE = "Error de duplicidad de Pagaré";

export type SendBatchConfig = {
    batchSize: number;
    batchId: number;
    batchNumber: number; // Added: actual batch number (1, 2, 3...) for row calculation
    toSend?: (number | [number, number])[];
    // API
    host: string;
    apikey: string;
    authorization: string;
}

export type SendBatchResponseCallback = (response: ResponseRecord, success: number, fail: number, dup: number, skip: number) => void;

export type SendBatchSkipCallback = (batchId: number, contractId: string, row: number, success: number, fail: number, dup: number, skip: number) => void;

export type SendBatchBeforeProcessCallback = (batchId: number, contractId: string, row: number, totalRecords: number, success: number, fail: number, dup: number, skip: number) => void;
/**
 * Sends a batch of payloads to the API.
 * Tracks success, failures, duplicates, and skipped records.
 * Exports results to an Excel file.
 */
const sendBatch = async (payloadsReq: Payload[], config: SendBatchConfig, onResponse?: SendBatchResponseCallback, onError?: SendBatchResponseCallback, onSkip?: SendBatchSkipCallback, onBeforeProcess?: SendBatchBeforeProcessCallback) => {
    const { batchSize, batchId, batchNumber, toSend, host, apikey, authorization } = config;
    const responses: ResponseRecord[] = [];

    // Counters for tracking results
    let success = 0; // Successfully processed
    let fail = 0; // Failed (errors)
    let dup = 0; // Duplicates
    let skip = 0; // Skipped based on toSend filter

    // Calculate the absolute row number (position in original Excel file)
    // Using batchNumber (1, 2, 3...) NOT batchId (timestamp)
    let p = (batchNumber - 1) * batchSize;

    for (const payload of payloadsReq) {
        // Extract payload data
        const contractId = payload.contractId;
        const promissoryNote = payload.promissoryNote;
        p++; // Increment row counter

        // Apply toSend filter if configured
        // toSend can contain individual row numbers or ranges: [3, [5, 10], 15]
        if (
            toSend &&
            !toSend.some((s) => {
                if (isArray(s)) {
                    // Range: check if p is within [start, end]
                    if (p >= s[0] && p <= s[1]) {
                        return true;
                    }
                } else if (p === s) {
                    // Individual number: check if p matches
                    return true;
                }
                return false;
            })
        ) {
            // Row not in toSend filter, skip it
            skip++;
            console.log("\nResponse:", p, ", SKIP");
            onSkip && onSkip(batchId, contractId, p, success, fail, dup, skip)
            continue;
        }

        // Callback before processing this record
        onBeforeProcess && onBeforeProcess(batchId, contractId, p, payloadsReq.length, success, fail, dup, skip);

        try {
            // Send promissory note to API
            const response = await insertPromissoryNote(
                host,
                apikey,
                authorization,
                batchId,
                contractId,
                promissoryNote
            );

            const responseRecord: ResponseRecord = {
                row: p,
                batchId,
                contractId,
                promissoryNote: JSON.stringify(promissoryNote),
                ...response,
            };
            // Record the response
            responses.push(responseRecord);

            // Categorize the response based on message
            if (response.message === SUCCESS_MESSAGE) {
                success++;
            } else if (response.message === DUPLICATE_ERROR_MESSAGE) {
                dup++;
            } else {
                // Other errors from API
                fail++;
            }

            onResponse && onResponse(responseRecord, success, fail, dup, skip)
            console.log("\nResponse:", p, ", ", JSON.stringify(response));
        } catch (err) {
            // Handle internal/network errors
            const responseRecord: ResponseRecord = {
                row: p,
                batchId,
                contractId,
                promissoryNote: JSON.stringify(promissoryNote),
                INTERNAL_ERROR: JSON.stringify(err),
            };
            responses.push(responseRecord);
            fail++;
            console.log(err);
            onError && onError(responseRecord, success, fail, dup, skip)
        }
    }

    return { responses, success, fail, dup, skip };
};

export default sendBatch;