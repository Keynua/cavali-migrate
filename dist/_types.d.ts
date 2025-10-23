/**
 * Type definitions for the CAVALI promissory note processing system.
 * This file contains all the interfaces, types, and enums used throughout the application.
 */
/**
 * Civil status enumeration for individuals
 */
export declare enum CivilStatus {
    SOLTERO = 1,// Single
    CASADO = 2,// Married
    DIVORCIADO = 3,// Divorced
    VIUDO = 4
}
/**
 * Currency types supported by the system
 */
export declare enum Currency {
    SOLES = 1,// Peruvian Soles (PEN)
    DOLARES = 2
}
/**
 * Document types for identification
 */
export declare enum DocumentType {
    DNI = 1,// National ID (Documento Nacional de Identidad)
    RUC = 2,// Tax ID (Registro Único de Contribuyentes)
    CARNET_EXTRANJERIA = 3
}
/**
 * Condition for signature-only promissory notes
 */
export declare enum ConditionJustSign {
    SI = 1,// Yes - signature only
    NO = 2
}
/**
 * Guarantee (aval) data details structure.
 * Contains information about guarantors and their legal representatives.
 */
export interface GuaranteeDataDetail {
    civilStatus?: number;
    numberDocument?: string;
    businessName?: string;
    domicile?: string;
    nameLegalRepresentativeOne?: string;
    numberDocumentOne?: string;
    nameLegalRepresentativeTwo?: string;
    numberDocumentTwo?: string;
    nameLegalRepresentativeThree?: string;
    numberDocumentThree?: string;
}
/**
 * Promissory Note (Pagaré) structure.
 * Contains all the information required to create a promissory note in CAVALI.
 */
export interface PromissoryNote {
    conditionJustSign: number;
    special: number;
    typeDocument: number;
    currency: number;
    creditNumber: number;
    uniqueCode: number;
    banking?: number;
    product?: number;
    expirationDate?: string;
    clientName?: string;
    civilStatus?: number;
    numberDocument?: string;
    domicile?: string;
    issuedDate?: string;
    issuedPlace?: string;
    amount?: number;
    nameLegalRepresentativeOne?: string;
    numberDocumentOne?: string;
    nameLegalRepresentativeTwo?: string;
    numberDocumentTwo?: string;
    nameLegalRepresentativeThree?: string;
    numberDocumentThree?: string;
    guaranteeDataDetail?: GuaranteeDataDetail[];
}
/**
 * Payload structure for API requests.
 * Combines a contract ID with its corresponding promissory note data.
 */
export interface Payload {
    contractId: string;
    promissoryNote: PromissoryNote;
}
/**
 * Represents a raw record from an Excel file.
 * Keys are column names and values can be of various types.
 */
export interface ExcelRecord {
    [key: string]: string | number | null | undefined;
}
/**
 * Represents a parsing error that occurred during Excel record processing.
 */
export interface ParseError {
    row: number;
    message: string;
}
/**
 * Response structure from the CAVALI API.
 */
export interface ApiResponse {
    message: string;
    [key: string]: any;
}
/**
 * Response record structure for export.
 * Contains the API response along with metadata about the request.
 */
export interface ResponseRecord {
    row: number;
    batchId: number;
    contractId: string;
    promissoryNote: string;
    message?: string;
    INTERNAL_ERROR?: string;
    [key: string]: any;
}
/**
 * Authentication and identification configuration for a specific client.
 */
export interface KeyConfig {
    prefix: string;
    authorization: string;
    apikey: string;
}
/**
 * Environment-specific configuration settings.
 */
export interface EnvironmentConfig {
    file: string;
    batch?: number;
    maxBatch?: number;
    batchSize: number;
    prefix: string;
    authorization: string;
    apikey: string;
    toSend?: (number | [number, number])[];
}
/**
 * Configuration for all environments (dev, staging, production).
 */
export interface Config {
    dev: Partial<EnvironmentConfig>;
    stg: Partial<EnvironmentConfig>;
    prod: Partial<EnvironmentConfig>;
}
/**
 * Private configuration containing API host information per environment.
 */
export interface PrivateConfig {
    dev: {
        host: string;
    };
    stg: {
        host: string;
    };
    prod: {
        host: string;
    };
}
/**
 * Result returned by the main program execution.
 */
export interface ProgramResult {
    batchId: number;
}
/**
 * Result of payload generation from Excel file.
 */
export interface PayloadsResult {
    errors: ParseError[];
    payloads: Payload[];
}
/**
 * Mapping type for Excel column names to API field names.
 */
export type AttributeMapping = {
    [key: string]: string;
};
/**
 * Value replacement tuple: [original value, replacement value].
 * Used for normalizing Excel data (e.g., "si" -> 1).
 */
export type ValueReplacement = [string | number, number];
//# sourceMappingURL=_types.d.ts.map