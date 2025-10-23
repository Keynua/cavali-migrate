"use strict";
/**
 * Main payload generation module.
 * Reads an Excel file and converts it to API-ready payloads.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloads = void 0;
const _ = __importStar(require("lodash"));
const arrayToObject_1 = require("./arrayToObject");
const parseExcelRecord_1 = require("./parseExcelRecord");
const buildNestedObjects_1 = require("./buildNestedObjects");
const attributes_1 = require("./attributes");
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
const getPayloads = async (rows) => {
    // Handle empty data gracefully - not an error, just no data to process
    if (!rows || rows.length === 0) {
        return {
            errors: [],
            payloads: []
        };
    }
    const errors = [];
    const payloads = [];
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
        const data = (0, arrayToObject_1.arrayToObject)(headers, row);
        // Parse and validate the record
        let excelRecord;
        try {
            excelRecord = (0, parseExcelRecord_1.parseExcelRecord)(data);
        }
        catch (error) {
            // Collect validation errors
            if (_.isArray(error)) {
                errors.push(...error.map((e) => ({ row: i + 1, message: e })));
            }
            else {
                console.log(error);
            }
            continue;
        }
        // Map Excel column names to API field names and build nested structure
        const cavaliRecord = (0, buildNestedObjects_1.buildNestedObjects)(_.mapKeys(excelRecord, (_, key) => attributes_1.attributes[key]));
        // Extract contract ID and prepare promissory note data
        const contractId = _.get(cavaliRecord, "contractId");
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
                creditNumber: promissoryNote.creditNumber || Math.floor(Math.random() * 99999999),
                // Use document number as unique code if not provided
                uniqueCode: promissoryNote.uniqueCode ||
                    Number.parseInt(promissoryNote.numberDocument),
            },
        });
    }
    // Log errors if any occurred
    if (errors.length > 0) {
        console.log("\n\nErrors:\n\n", errors);
    }
    return { errors, payloads };
};
exports.getPayloads = getPayloads;
//# sourceMappingURL=getPayloads.js.map