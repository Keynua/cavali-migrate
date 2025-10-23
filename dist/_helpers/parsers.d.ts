/**
 * Parsing utilities for converting Excel data to typed values.
 * These functions handle data validation and type conversion with proper error handling.
 */
/**
 * Converts an Excel date serial number to a JavaScript Date object.
 * Excel stores dates as the number of days since January 1, 1900 (with some quirks).
 *
 * @param excelDate - Excel serial date number
 * @returns JavaScript Date object
 */
export declare const getJsDateFromExcel: (excelDate: number) => Date;
/**
 * Parses a date from various formats and returns it as a formatted string.
 * Handles Date objects, ISO strings, and Excel serial numbers.
 *
 * @param arg - Input value (Date, string, or Excel serial number)
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @returns Date string in 'yyyy-MM-dd' format or null
 * @throws Error if date is required and not provided
 */
export declare const parseDate: (arg: string | Date | number | null | undefined, optional?: boolean) => string | null;
/**
 * Converts any value to a string representation.
 *
 * @param arg - Value to convert
 * @returns String representation of the value
 */
export declare const convertString: (arg: any) => string;
/**
 * Parses and validates a string value with optional length constraints.
 *
 * @param arg - Value to parse as string
 * @param min - Minimum string length (optional)
 * @param max - Maximum string length (optional)
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @param convert - If true, converts numbers to strings automatically
 * @returns Parsed and validated string or null
 * @throws Error if validation fails
 */
export declare const parseString: (arg: any, min?: number, max?: number, optional?: boolean, convert?: boolean) => string | null;
/**
 * Safely converts a value to a number.
 *
 * @param arg - Value to convert
 * @param defaultValue - Default value to return if conversion fails
 * @returns Converted number or default value
 */
export declare const toNumber: (arg: any, defaultValue?: number) => number | undefined;
/**
 * Parses and validates a double (floating-point) number.
 *
 * @param arg - Value to parse
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @param convert - If true, attempts to convert strings to numbers
 * @returns Parsed double or null
 * @throws Error if value is not a valid double
 */
export declare const parseDouble: (arg: any, optional?: boolean, convert?: boolean) => number | null;
/**
 * Parses and validates an integer number.
 *
 * @param arg - Value to parse
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @param convert - If true, attempts to convert strings to numbers
 * @returns Parsed integer or null
 * @throws Error if value is not a valid integer
 */
export declare const parseInteger: (arg: any, optional?: boolean, convert?: boolean) => number | null;
/**
 * Parses and validates a generic number (integer or float).
 *
 * @param arg - Value to parse
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @param convert - If true, attempts to convert strings to numbers
 * @returns Parsed number or null
 * @throws Error if value is not a valid number
 */
export declare const parseNumber: (arg: any, optional?: boolean, convert?: boolean) => number | null;
/**
 * Parses and validates a document number (DNI, RUC, etc.).
 * Validates format, length, and applies normalization rules:
 * - Must contain only numeric characters
 * - Length must be between 7-15 characters
 * - 7-digit numbers get a leading zero added (8 digits for DNI)
 *
 * @param arg - Value to parse
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @param convert - If true, attempts to convert numbers to strings
 * @returns Validated and normalized document number or null
 * @throws Error if document number format is invalid
 */
export declare const parseDocumentNumber: (arg: any, optional?: boolean, convert?: boolean) => string | null;
//# sourceMappingURL=parsers.d.ts.map