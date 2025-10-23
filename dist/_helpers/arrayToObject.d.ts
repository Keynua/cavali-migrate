import { ExcelRecord } from "../_types";
/**
 * Converts parallel arrays of column names and values into an object.
 * Only includes columns that are defined in the attributes mapping.
 *
 * @param names - Array of column names from Excel headers
 * @param data - Array of corresponding values from an Excel row
 * @returns Object with column names as keys and row values as values
 */
export declare const arrayToObject: (names: any[], data: any[]) => ExcelRecord;
//# sourceMappingURL=arrayToObject.d.ts.map