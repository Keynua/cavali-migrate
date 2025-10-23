/**
 * Main payload generation module.
 * Reads an Excel file and converts it to API-ready payloads.
 */
import { PayloadsResult } from "../_types";
/**
 * Reads an Excel file and converts it to validated API payloads.
 *
 * Process:
 * 1. Reads Excel file rows
 * 2. Converts each row to an object using headers
 * 3. Validates and parses each field
 * 4. Maps Excel columns to API field names
 * 5. Builds nested objects (e.g., guarantor data)
 * 6. Applies default values and business rules
 *
 * @param file - Path to Excel file
 * @returns Object containing successfully parsed payloads and any errors
 */
export declare const getPayloads: (rows: any[][]) => Promise<PayloadsResult>;
//# sourceMappingURL=getPayloads.d.ts.map