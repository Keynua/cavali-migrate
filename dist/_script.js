"use strict";
/**
 * Main execution script for CAVALI promissory note batch processing.
 *
 * This script:
 * 1. Reads promissory note data from Excel files
 * 2. Validates and transforms the data
 * 3. Sends the data to the CAVALI API in batches
 * 4. Exports results to Excel files
 *
 * The script supports multiple environments (dev, staging, production)
 * and allows filtering specific rows or ranges to send.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.program = void 0;
const exportJsonToSheet_1 = require("./_helpers/exportJsonToSheet");
const getPayloads_1 = require("./_helpers/getPayloads");
const chunks_1 = require("./_helpers/chunks");
const readExcelRows_1 = require("./_helpers/readExcelRows");
const sendBatch_1 = __importDefault(require("./_helpers/sendBatch"));
/**
 * API host configuration for each environment.
 * These are not exposed in the public config for security.
 */
const privateConfig = {
    dev: {
        host: "api.dev.keynua.com",
    },
    stg: {
        host: "api.stg.keynua.com",
    },
    prod: {
        host: "api.keynua.com",
    },
};
/**
 * Main program execution function.
 *
 * Processes an Excel file containing promissory note data and sends it to the CAVALI API.
 *
 * Process flow:
 * 1. Reads and validates the Excel file
 * 2. If validation errors exist, exports them and stops
 * 3. Splits valid records into batches
 * 4. For each batch:
 *    - Filters records based on toSend config (if specified)
 *    - Sends each record to the API
 *    - Tracks success, failures, duplicates, and skipped records
 *    - Exports results to Excel
 *
 * @param config - Environment-specific configuration
 * @param env - Environment name ('dev', 'stg', or 'prod')
 * @returns Promise with batchId of this execution
 */
const program = async (config, env) => {
    // Initialize execution timestamp and batch ID
    const date = new Date();
    const batchId = date.getTime(); // Unix timestamp as unique batch identifier
    const name = date.toLocaleString().replace(new RegExp("/", "g"), "-"); // For file naming
    // Extract configuration
    const file = config.file;
    let batch = config.batch || 1; // Starting batch number
    const maxBatch = config.maxBatch || batch; // Maximum batch to process
    const batchSize = config.batchSize; // Records per batch
    const prefix = config.prefix; // Client identifier for output files
    const host = privateConfig[env].host;
    const authorization = config.authorization;
    const apikey = config.apikey;
    // Optional: specific rows or ranges to send (for testing or partial processing)
    const toSend = config.toSend;
    // Read Excel file
    let rows;
    try {
        rows = await (0, readExcelRows_1.readExcelRows)(file);
    }
    catch (err) {
        console.log("\n\nError al leer el archivo Excel: ", err);
        return { batchId };
    }
    // Read and validate Excel file, convert to API payloads
    const { errors, payloads } = await (0, getPayloads_1.getPayloads)(rows);
    // Check for validation errors
    console.log("\n\nErrors Count:", errors.length);
    if (errors.length > 0) {
        // Export errors to Excel and stop execution
        (0, exportJsonToSheet_1.exportJsonToSheet)(errors, `${prefix}-errors-${name}-batch${batch}`);
        return { batchId };
    }
    // Split payloads into batches for processing
    console.log("\n\nPayloads Count:", payloads.length);
    const chunksPayloads = (0, chunks_1.chunks)(payloads, batchSize);
    console.log("\n\nChunks: ", batch, " (max: ", chunksPayloads.length, ", size: ", batchSize, ")");
    // Process batches sequentially
    // Start from 'batch' config and go up to the minimum of maxBatch or total chunks
    while (batch <= Math.min(chunksPayloads.length, maxBatch)) {
        const currChunk = chunksPayloads[batch - 1];
        if (currChunk) {
            console.log("\n\nCurrent Chunk: ", batch, ", records: ", currChunk.length);
            // Process this batch
            const { responses, success, fail, dup, skip } = await (0, sendBatch_1.default)(currChunk, { batchSize, batchId, batchNumber: batch, host, apikey, authorization, toSend });
            // Export batch results to Excel file
            // Filename includes counters for easy identification of results
            (0, exportJsonToSheet_1.exportJsonToSheet)(responses, `${prefix}-responses-${name}-batch-${batchId}-e-${fail}-s-${success}-d-${dup}-sk-${skip}`);
        }
        else {
            // This shouldn't happen, but log it if it does
            console.log("\n\nInvalid Chunk: ", batch, " (max: ", chunksPayloads.length, ")");
        }
        batch++;
    }
    console.log("\n\n");
    return {
        batchId,
    };
};
exports.program = program;
//# sourceMappingURL=_script.js.map