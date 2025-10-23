"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DUPLICATE_ERROR_MESSAGE = exports.SUCCESS_MESSAGE = void 0;
const lodash_1 = require("lodash");
const insertPromissoryNote_1 = require("./insertPromissoryNote");
// API response messages (constants for clarity)
exports.SUCCESS_MESSAGE = "Proceso ejecutado exitosamente";
exports.DUPLICATE_ERROR_MESSAGE = "Error de duplicidad de Pagaré";
/**
 * Sends a batch of payloads to the API.
 * Tracks success, failures, duplicates, and skipped records.
 * Exports results to an Excel file.
 */
const sendBatch = async (payloadsReq, config, onResponse, onError, onSkip, onBeforeProcess) => {
    const { batchSize, batchId, batchNumber, toSend, host, apikey, authorization } = config;
    const responses = [];
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
        if (toSend &&
            !toSend.some((s) => {
                if ((0, lodash_1.isArray)(s)) {
                    // Range: check if p is within [start, end]
                    if (p >= s[0] && p <= s[1]) {
                        return true;
                    }
                }
                else if (p === s) {
                    // Individual number: check if p matches
                    return true;
                }
                return false;
            })) {
            // Row not in toSend filter, skip it
            skip++;
            console.log("\nResponse:", p, ", SKIP");
            onSkip && onSkip(batchId, contractId, p, success, fail, dup, skip);
            continue;
        }
        // Callback before processing this record
        onBeforeProcess && onBeforeProcess(batchId, contractId, p, payloadsReq.length, success, fail, dup, skip);
        try {
            // Send promissory note to API
            const response = await (0, insertPromissoryNote_1.insertPromissoryNote)(host, apikey, authorization, batchId, contractId, promissoryNote);
            const responseRecord = {
                row: p,
                batchId,
                contractId,
                promissoryNote: JSON.stringify(promissoryNote),
                ...response,
            };
            // Record the response
            responses.push(responseRecord);
            // Categorize the response based on message
            if (response.message === exports.SUCCESS_MESSAGE) {
                success++;
            }
            else if (response.message === exports.DUPLICATE_ERROR_MESSAGE) {
                dup++;
            }
            else {
                // Other errors from API
                fail++;
            }
            onResponse && onResponse(responseRecord, success, fail, dup, skip);
            console.log("\nResponse:", p, ", ", JSON.stringify(response));
        }
        catch (err) {
            // Handle internal/network errors
            const responseRecord = {
                row: p,
                batchId,
                contractId,
                promissoryNote: JSON.stringify(promissoryNote),
                INTERNAL_ERROR: JSON.stringify(err),
            };
            responses.push(responseRecord);
            fail++;
            console.log(err);
            onError && onError(responseRecord, success, fail, dup, skip);
        }
    }
    return { responses, success, fail, dup, skip };
};
exports.default = sendBatch;
//# sourceMappingURL=sendBatch.js.map