export declare enum CivilStatus {
    SOLTERO = 1,
    CASADO = 2,
    DIVORCIADO = 3,
    VIUDO = 4
}
export declare enum Currency {
    SOLES = 1,
    DOLARES = 2
}
export declare enum DocumentType {
    DNI = 1,
    RUC = 2,
    CARNET_EXTRANJERIA = 3
}
export declare enum ConditionJustSign {
    SI = 1,
    NO = 2
}
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
export interface Payload {
    contractId: string;
    promissoryNote: PromissoryNote;
}
export interface ExcelRecord {
    [key: string]: string | number | null | undefined;
}
export interface ParseError {
    row: number;
    message: string;
}
export interface ApiResponse {
    message: string;
    [key: string]: any;
}
export interface ResponseRecord {
    row: number;
    batchId: number;
    contractId: string;
    promissoryNote: string;
    message?: string;
    INTERNAL_ERROR?: string;
    [key: string]: any;
}
export interface KeyConfig {
    prefix: string;
    authorization: string;
    apikey: string;
}
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
export interface Config {
    dev: Partial<EnvironmentConfig>;
    stg: Partial<EnvironmentConfig>;
    prod: Partial<EnvironmentConfig>;
}
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
export interface ProgramResult {
    batchId: number;
}
export interface PayloadsResult {
    errors: ParseError[];
    payloads: Payload[];
}
export type AttributeMapping = {
    [key: string]: string;
};
export type ValueReplacement = [string | number, number];
//# sourceMappingURL=types.d.ts.map