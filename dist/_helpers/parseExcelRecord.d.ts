/**
 * Excel record parser with validation and type conversion.
 * Applies data normalization and validation rules to each Excel row.
 */
import { ExcelRecord } from "../_types";
/**
 * Parses and validates an Excel record.
 * Performs the following operations:
 * 1. Normalizes text values to numeric codes (e.g., "si" -> 1)
 * 2. Validates and converts each field to its expected type
 * 3. Removes null/undefined values
 *
 * @param record - Raw Excel record object
 * @returns Validated and typed record
 * @throws Array of error messages if validation fails
 */
export declare const parseExcelRecord: (record: ExcelRecord) => ExcelRecord;
//# sourceMappingURL=parseExcelRecord.d.ts.map