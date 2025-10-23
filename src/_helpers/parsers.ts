/**
 * Parsing utilities for converting Excel data to typed values.
 * These functions handle data validation and type conversion with proper error handling.
 */

import { format, parse } from "date-fns";

/**
 * Converts an Excel date serial number to a JavaScript Date object.
 * Excel stores dates as the number of days since January 1, 1900 (with some quirks).
 * 
 * @param excelDate - Excel serial date number
 * @returns JavaScript Date object
 */
export const getJsDateFromExcel = (excelDate: number): Date => {
  if (!Number(excelDate)) {
    return new Date();
  }

  const e0date = new Date(0); // Epoch "zero" date (Jan 1, 1970)
  const offset = e0date.getTimezoneOffset(); // Timezone offset in minutes
  // Calculate the date by adding Excel days to the base date, accounting for timezone
  const date = new Date(0, 0, excelDate, 0, -offset, 0);

  if (Object.prototype.toString.call(date) === "[object Date]") {
    if (isNaN(date.getTime())) {
      return new Date();
    } else {
      return date;
    }
  }
  return new Date();
};

/**
 * Parses a date from various formats and returns it as a formatted string.
 * Handles Date objects, ISO strings, and Excel serial numbers.
 * 
 * @param arg - Input value (Date, string, or Excel serial number)
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @returns Date string in 'yyyy-MM-dd' format or null
 * @throws Error if date is required and not provided
 */
export const parseDate = (
  arg: string | Date | number | null | undefined,
  optional: boolean = true
): string | null => {
  if (!arg) {
    if (!optional) {
      throw "required date";
    }
    return null;
  }
  let date = new Date();
  if (arg instanceof Date) {
    // Convert to UTC to avoid timezone issues
    date = new Date(arg.getTime() + arg.getTimezoneOffset() * 60000);
  } else if (typeof arg === "string") {
    // Parse string date in ISO format
    date = parse(arg, "yyyy-MM-dd", new Date());
  } else {
    // Handle Excel serial number
    date = getJsDateFromExcel(arg);
  }
  return format(date, "yyyy-MM-dd");
};

/**
 * Converts any value to a string representation.
 * 
 * @param arg - Value to convert
 * @returns String representation of the value
 */
export const convertString = (arg: any): string => {
  if (!arg) return "";
  if (typeof arg === "number") {
    return `${arg}`;
  }
  if (typeof arg !== "string") {
    return "";
  }
  return arg;
};

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
export const parseString = (
  arg: any,
  min?: number,
  max?: number,
  optional: boolean = true,
  convert: boolean = true
): string | null => {
  let val = arg;
  if (!val) {
    if (!optional) {
      throw "required string";
    }
    return null;
  }
  if (convert) {
    val = convertString(val);
  }

  // Remove newline characters that might come from Excel cells
  val = val.replace(/\n/g, "");

  if (typeof val !== "string") {
    throw "invalid string";
  }
  if (min !== undefined && val.length < min) {
    throw `the string must have at least ${min} characters`;
  }
  if (max !== undefined && val.length > max) {
    throw `the field must have ${max} characters maximum`;
  }
  return val;
};

/**
 * Safely converts a value to a number.
 * 
 * @param arg - Value to convert
 * @param defaultValue - Default value to return if conversion fails
 * @returns Converted number or default value
 */
export const toNumber = (
  arg: any,
  defaultValue?: number
): number | undefined => {
  if (arg === null || arg === undefined) {
    return defaultValue;
  }

  if (typeof arg === "number") {
    return arg;
  }

  if (typeof arg === "string") {
    const val = parseFloat(arg);
    return isNaN(val) ? defaultValue : val;
  }

  return defaultValue;
};

/**
 * Parses and validates a double (floating-point) number.
 * 
 * @param arg - Value to parse
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @param convert - If true, attempts to convert strings to numbers
 * @returns Parsed double or null
 * @throws Error if value is not a valid double
 */
export const parseDouble = (
  arg: any,
  optional: boolean = true,
  convert: boolean = true
): number | null => {
  const value = convert ? toNumber(arg) : arg;
  if (!value && value !== 0) {
    if (!optional) {
      throw "required double";
    }
    return null;
  }
  if (Number.isFinite(value)) {
    return value;
  }
  throw "invalid double";
};

/**
 * Parses and validates an integer number.
 * 
 * @param arg - Value to parse
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @param convert - If true, attempts to convert strings to numbers
 * @returns Parsed integer or null
 * @throws Error if value is not a valid integer
 */
export const parseInteger = (
  arg: any,
  optional: boolean = true,
  convert: boolean = true
): number | null => {
  const value = convert ? toNumber(arg) : arg;
  if (!value && value !== 0) {
    if (!optional) {
      throw "required integer";
    }
    return null;
  }
  if (Number.isInteger(value)) {
    return value;
  }
  throw "invalid integer";
};

/**
 * Parses and validates a generic number (integer or float).
 * 
 * @param arg - Value to parse
 * @param optional - If true, returns null for empty values; if false, throws an error
 * @param convert - If true, attempts to convert strings to numbers
 * @returns Parsed number or null
 * @throws Error if value is not a valid number
 */
export const parseNumber = (
  arg: any,
  optional: boolean = true,
  convert: boolean = true
): number | null => {
  const value = convert ? toNumber(arg) : arg;
  if (!value && value !== 0) {
    if (!optional) {
      throw "required number";
    }
    return null;
  }
  if (typeof value === "number") {
    return value;
  }
  throw "invalid number";
};

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
export const parseDocumentNumber = (
  arg: any,
  optional: boolean = true,
  convert: boolean = true
): string | null => {
  let val = arg;
  if (!val) {
    if (!optional) {
      throw "required document number";
    }
    return null;
  }

  if (convert) {
    val = convertString(val);
  }

  if (typeof val !== "string") {
    throw "invalid document number format";
  }

  // Remove semicolons that might come from Excel
  val = val.replace(";", "");

  // Validate that the document contains only numeric characters
  const numericRegex = /^[0-9]+$/;
  if (!numericRegex.test(val)) {
    throw "document number must contain only numeric characters, value: " + val;
  }

  // Validate length: must be between 7-15 characters
  if (val.length < 7 || val.length > 15) {
    throw "document number must be between 7 and 15 characters, value: " + val;
  }

  // Normalize 7-digit DNIs by adding a leading zero (standard format is 8 digits)
  if (val.length === 7) {
    val = "0" + val;
  }

  return val;
};

