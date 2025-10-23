/**
 * Excel record parser with validation and type conversion.
 * Applies data normalization and validation rules to each Excel row.
 */

import * as _ from "lodash";
import { ExcelRecord } from "../_types";
import { replaceValues } from "./replaceValues";
import {
  string50Attributes,
  string100Attributes,
  integerAttributes,
  doubleAttributes,
  dateAttributes,
  documentsAttributes,
} from "./attributes";
import {
  parseDate,
  parseString,
  parseInteger,
  parseNumber,
  parseDocumentNumber,
} from "./parsers";

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
export const parseExcelRecord = (record: ExcelRecord): ExcelRecord => {
  const errors: string[] = [];
  
  /**
   * Helper function to parse a field and collect errors.
   * Updates the record in place if parsing succeeds.
   */
  const parser = (key: string, func: (val: any) => any): void => {
    const value = record[key];
    try {
      const parsed = func(value);
      record[key] = parsed;
    } catch (err) {
      if (typeof err === "string") {
        errors.push(`${err}: ${key}`);
      }
    }
  };

  // Step 1: Normalize text values to numeric codes
  
  // Condition: "si" (yes) or "no"
  replaceValues(record, "Condicion_Pagare", [
    ["si", 1],
    ["no", 2],
  ]);
  
  // Currency: "s/." or "s/" for Soles, "us$" or "$" for Dollars
  replaceValues(record, "Moneda", [
    ["s/.", 1],
    ["s/", 1],
    ["us$", 2],
    ["$", 2],
  ]);
  
  // Civil status for main client
  replaceValues(record, "Estado_Civil", [
    ["soltero", 1],
    ["casado", 2],
    ["divorciado", 3],
    ["viudo", 4],
  ]);
  
  // Document type
  replaceValues(record, "Tipo_Documento", [
    ["dni", 1],
    ["ruc", 2],
    ["carnet de extranjeria", 3],
  ]);
  
  // Civil status for guarantors (avales)
  replaceValues(record, "Estado_Civil_Aval_1", [
    ["soltero", 1],
    ["casado", 2],
    ["divorciado", 3],
    ["viudo", 4],
  ]);
  replaceValues(record, "Estado_Civil_Aval_2", [
    ["soltero", 1],
    ["casado", 2],
    ["divorciado", 3],
    ["viudo", 4],
  ]);
  replaceValues(record, "Estado_Civil_Aval_3", [
    ["soltero", 1],
    ["casado", 2],
    ["divorciado", 3],
    ["viudo", 4],
  ]);

  // Step 2: Parse and validate each field by type
  
  // Strings with max 50 characters (e.g., place names)
  string50Attributes.forEach((key) =>
    parser(key, (val) => parseString(val, undefined, 50))
  );
  
  // Strings with max 100 characters (e.g., names, addresses)
  string100Attributes.forEach((key) =>
    parser(key, (val) => parseString(val, undefined, 100))
  );
  
  // Integer fields (IDs, codes, statuses)
  integerAttributes.forEach((key) => parser(key, (val) => parseInteger(val)));
  
  // Decimal numbers (amounts, rates)
  doubleAttributes.forEach((key) => parser(key, (val) => parseNumber(val)));
  
  // Date fields
  dateAttributes.forEach((key) => parser(key, (val) => parseDate(val)));
  
  // Document numbers (DNI, RUC, etc.)
  documentsAttributes.forEach((key) =>
    parser(key, (val) => parseDocumentNumber(val))
  );

  // Step 3: Cross-field validations
  
  // Validate that Fecha_De_Expiracion is greater than or equal to Fecha_Desembolso
  if (record.Fecha_De_Expiracion && record.Fecha_Desembolso) {
    const fechaExpiracion = new Date(record.Fecha_De_Expiracion);
    const fechaDesembolso = new Date(record.Fecha_Desembolso);
    
    if (fechaExpiracion < fechaDesembolso) {
      errors.push(
        `Fecha_De_Expiracion debe ser mayor o igual a Fecha_Desembolso (Expiración: ${record.Fecha_De_Expiracion}, Desembolso: ${record.Fecha_Desembolso})`
      );
    }
  }

  // Step 4: Check for errors and return result
  if (errors.length > 0) {
    throw errors;
  }

  // Remove null values and return the validated record
  return _.omitBy(record, _.isNull) as ExcelRecord;
};

