/**
 * Main payload generation module.
 * Reads an Excel file and converts it to API-ready payloads.
 */

import * as _ from "lodash";
import { Payload, PayloadsResult, ParseError } from "../_types";
import { arrayToObject } from "./arrayToObject";
import { parseExcelRecord } from "./parseExcelRecord";
import { buildNestedObjects } from "./buildNestedObjects";
import { attributes } from "./attributes";

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
export const getPayloads = async (rows: any[][]): Promise<PayloadsResult> => {
  // Handle empty data gracefully - not an error, just no data to process
  if (!rows || rows.length === 0) {
    return {
      errors: [],
      payloads: []
    };
  }

  const errors: ParseError[] = [];
  const payloads: Payload[] = [];

  // Extract data rows (skip header row)
  const rowsData = (rows || []).slice(1);

  // If there are only headers but no data rows, return empty results
  if (rowsData.length === 0) {
    return {
      errors: [],
      payloads: []
    };
  }

  // Process each data row
  for (let i = 0; i < rowsData.length; i++) {
    // Normalize headers: replace spaces with underscores
    const headers = rows[0].map((h) => h.replace(new RegExp(" ", "g"), "_"));
    const row = rowsData[i];

    // Convert row array to object using headers as keys
    const data = arrayToObject(headers, row);

    // Parse and validate the record
    let excelRecord;
    try {
      excelRecord = parseExcelRecord(data);
    } catch (error) {
      // Collect validation errors
      if (_.isArray(error)) {
        errors.push(...error.map((e: string) => ({ row: i + 1, message: e })));
      } else {
        console.log(error);
      }
      continue;
    }

    // Map Excel column names to API field names and build nested structure
    const cavaliRecord = buildNestedObjects(
      _.mapKeys(excelRecord, (_, key) => attributes[key])
    );

    // Extract contract ID and prepare promissory note data
    const contractId = _.get(cavaliRecord, "contractId") as string;
    const promissoryNote = _.omit(cavaliRecord, "contractId", "aval1", "aval2", "aval3");

    // Build guarantor (aval) array from individual aval1, aval2, aval3 objects
    const guaranteeDataDetail = [];
    // Only include guarantors that have a document number (i.e., they exist)
    if (cavaliRecord.aval1 && cavaliRecord.aval1.numberDocument) {
      guaranteeDataDetail.push(cavaliRecord.aval1);
    }
    if (cavaliRecord.aval2 && cavaliRecord.aval2.numberDocument) {
      guaranteeDataDetail.push(cavaliRecord.aval2);
    }
    if (cavaliRecord.aval3 && cavaliRecord.aval3.numberDocument) {
      guaranteeDataDetail.push(cavaliRecord.aval3);
    }

    // Add guarantor array if there are any guarantors
    if (guaranteeDataDetail.length > 0) {
      promissoryNote.guaranteeDataDetail = guaranteeDataDetail;
    }

    // Calculate uniqueCode with validation
    let uniqueCode = promissoryNote.uniqueCode;
    if (!uniqueCode) {
      // Try to parse from numberDocument
      const parsedCode = Number.parseInt(promissoryNote.numberDocument);
      // Only use parsed code if it's a valid number
      uniqueCode = !isNaN(parsedCode) ? parsedCode : Math.floor(Math.random() * 99999999);
    }

    // Create final payload with defaults and business rules applied
    payloads.push({
      contractId,
      promissoryNote: {
        ...promissoryNote,
        special: 2, // Always set to 2 (business rule)
        typeDocument: promissoryNote.typeDocument || 1, // Default to DNI
        conditionJustSign: promissoryNote.conditionJustSign || 2, // Default to NO
        currency: promissoryNote.currency || 1, // Default to Soles
        // Generate random credit number if not provided
        creditNumber:
          promissoryNote.creditNumber || Math.floor(Math.random() * 99999999),
        // Use calculated uniqueCode
        uniqueCode,
      },
    });
  }

  // Log errors if any occurred
  if (errors.length > 0) {
    console.log("\n\nErrors:\n\n", errors);
  }

  return { errors, payloads };
};

