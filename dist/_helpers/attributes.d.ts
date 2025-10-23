/**
 * Attribute definitions and mappings for Excel data validation.
 *
 * This file defines:
 * 1. Which Excel columns belong to which data types (for validation)
 * 2. Mapping from Excel column names to API field names
 *
 * The Excel columns use Spanish naming conventions with underscores,
 * which are then mapped to camelCase API field names.
 */
import { AttributeMapping } from "../_types";
/**
 * Excel columns that should be validated as strings with max 100 characters.
 * Includes names, addresses, and other text fields.
 */
export declare const string100Attributes: string[];
/**
 * Excel columns that should be validated as strings with max 50 characters.
 * Includes place names and shorter text fields.
 */
export declare const string50Attributes: string[];
/**
 * Excel columns that should be validated as decimal numbers (doubles).
 * Includes monetary amounts.
 */
export declare const doubleAttributes: string[];
/**
 * Excel columns that should be validated as integer numbers.
 * Includes IDs, codes, and enum values.
 */
export declare const integerAttributes: string[];
/**
 * Excel columns that should be validated as document numbers.
 * Includes DNI, RUC, and other identification numbers with special validation rules.
 */
export declare const documentsAttributes: string[];
/**
 * Excel columns that should be validated as dates.
 * Handles various date formats including Excel serial numbers.
 */
export declare const dateAttributes: string[];
/**
 * Mapping for first guarantor (aval 1) fields.
 * Maps Excel column names to nested API field names (aval1.fieldName).
 */
export declare const aval1Attributes: AttributeMapping;
/**
 * Mapping for second guarantor (aval 2) fields.
 * Maps Excel column names to nested API field names (aval2.fieldName).
 */
export declare const aval2Attributes: AttributeMapping;
/**
 * Mapping for third guarantor (aval 3) fields.
 * Maps Excel column names to nested API field names (aval3.fieldName).
 */
export declare const aval3Attributes: AttributeMapping;
/**
 * Main attribute mapping from Excel column names to API field names.
 * Combines all field mappings including main client data and all guarantors.
 *
 * The hyphenated field names (e.g., "aval1-numberDocument") are later converted
 * to nested objects by the buildNestedObjects function.
 */
export declare const attributes: AttributeMapping;
//# sourceMappingURL=attributes.d.ts.map