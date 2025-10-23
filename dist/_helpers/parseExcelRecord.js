"use strict";
/**
 * Excel record parser with validation and type conversion.
 * Applies data normalization and validation rules to each Excel row.
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
exports.parseExcelRecord = void 0;
const _ = __importStar(require("lodash"));
const replaceValues_1 = require("./replaceValues");
const attributes_1 = require("./attributes");
const parsers_1 = require("./parsers");
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
const parseExcelRecord = (record) => {
    const errors = [];
    /**
     * Helper function to parse a field and collect errors.
     * Updates the record in place if parsing succeeds.
     */
    const parser = (key, func) => {
        const value = record[key];
        try {
            const parsed = func(value);
            record[key] = parsed;
        }
        catch (err) {
            if (typeof err === "string") {
                errors.push(`${err}: ${key}`);
            }
        }
    };
    // Step 1: Normalize text values to numeric codes
    // Condition: "si" (yes) or "no"
    (0, replaceValues_1.replaceValues)(record, "Condicion_Pagare", [
        ["si", 1],
        ["no", 2],
    ]);
    // Currency: "s/." or "s/" for Soles, "us$" or "$" for Dollars
    (0, replaceValues_1.replaceValues)(record, "Moneda", [
        ["s/.", 1],
        ["s/", 1],
        ["us$", 2],
        ["$", 2],
    ]);
    // Civil status for main client
    (0, replaceValues_1.replaceValues)(record, "Estado_Civil", [
        ["soltero", 1],
        ["casado", 2],
        ["divorciado", 3],
        ["vuido", 4],
    ]);
    // Document type
    (0, replaceValues_1.replaceValues)(record, "Tipo_Documento", [
        ["dni", 1],
        ["ruc", 2],
        ["carnet de extranjeria", 3],
    ]);
    // Civil status for guarantors (avales)
    (0, replaceValues_1.replaceValues)(record, "Estado_Civil_Aval_1", [
        ["soltero", 1],
        ["casado", 2],
        ["divorciado", 3],
        ["vuido", 4],
    ]);
    (0, replaceValues_1.replaceValues)(record, "Estado_Civil_Aval_2", [
        ["soltero", 1],
        ["casado", 2],
        ["divorciado", 3],
        ["vuido", 4],
    ]);
    (0, replaceValues_1.replaceValues)(record, "Estado_Civil_Aval_3", [
        ["soltero", 1],
        ["casado", 2],
        ["divorciado", 3],
        ["vuido", 4],
    ]);
    // Step 2: Parse and validate each field by type
    // Strings with max 50 characters (e.g., place names)
    attributes_1.string50Attributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseString)(val, undefined, 50)));
    // Strings with max 100 characters (e.g., names, addresses)
    attributes_1.string100Attributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseString)(val, undefined, 100)));
    // Integer fields (IDs, codes, statuses)
    attributes_1.integerAttributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseInteger)(val)));
    // Decimal numbers (amounts, rates)
    attributes_1.doubleAttributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseNumber)(val)));
    // Date fields
    attributes_1.dateAttributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseDate)(val)));
    // Document numbers (DNI, RUC, etc.)
    attributes_1.documentsAttributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseDocumentNumber)(val)));
    // Step 3: Cross-field validations
    // Validate that Fecha_De_Expiracion is greater than or equal to Fecha_Desembolso
    if (record.Fecha_De_Expiracion && record.Fecha_Desembolso) {
        const fechaExpiracion = new Date(record.Fecha_De_Expiracion);
        const fechaDesembolso = new Date(record.Fecha_Desembolso);
        if (fechaExpiracion < fechaDesembolso) {
            errors.push(`Fecha_De_Expiracion debe ser mayor o igual a Fecha_Desembolso (Expiración: ${record.Fecha_De_Expiracion}, Desembolso: ${record.Fecha_Desembolso})`);
        }
    }
    // Step 4: Check for errors and return result
    if (errors.length > 0) {
        throw errors;
    }
    // Remove null values and return the validated record
    return _.omitBy(record, _.isNull);
};
exports.parseExcelRecord = parseExcelRecord;
//# sourceMappingURL=parseExcelRecord.js.map