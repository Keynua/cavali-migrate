import { PromissoryNote, ApiResponse } from "../_types";
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
export declare const insertPromissoryNote: (host: string, apiKey: string, authorization: string, batchId: number, contractId: string, promissoryNote: PromissoryNote) => Promise<ApiResponse>;
//# sourceMappingURL=insertPromissoryNote.d.ts.map