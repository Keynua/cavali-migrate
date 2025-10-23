"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPromissoryNote = void 0;
/**
 * Inserts a promissory note into the CAVALI system via API.
 * Implements automatic retry logic for timeout errors.
 *
 * @param host - API host (e.g., "api.keynua.com")
 * @param apiKey - API key for authentication
 * @param authorization - Authorization token
 * @param batchId - Unique batch identifier for this execution
 * @param contractId - Contract/loan identifier
 * @param promissoryNote - Promissory note data to insert
 * @returns Promise resolving to the API response
 */
const insertPromissoryNote = async (host, apiKey, authorization, batchId, contractId, promissoryNote) => {
    let result;
    // Retry loop: continues until we get a non-timeout response
    while (!result) {
        const response = await fetch(`https://${host}/cavali/v1/promissory-note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                Authorization: authorization,
            },
            body: JSON.stringify({ batchId, contractId, promissoryNote }),
        });
        const body = (await response.json());
        // Only accept non-timeout responses
        if (body.message !== "Endpoint request timed out") {
            result = body;
        }
        // Otherwise, retry automatically
    }
    return result;
};
exports.insertPromissoryNote = insertPromissoryNote;
//# sourceMappingURL=insertPromissoryNote.js.map