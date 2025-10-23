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
import { EnvironmentConfig, ProgramResult } from "./_types";
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
export declare const program: (config: EnvironmentConfig, env: "dev" | "stg" | "prod") => Promise<ProgramResult>;
//# sourceMappingURL=_script.d.ts.map