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
export const string100Attributes: string[] = [
  "ID_Contrato",
  "Nombre_Cliente",
  "Domicilio",
  "Nombre_Representante_1",
  "Nombre_Representante_2",
  "Nombre_Representante_3",

  "Domicilio_Aval_1",
  "Domicilio_Aval_2",
  "Domicilio_Aval_3",

  "Nombre_Aval_1",
  "Nombre_Aval_2",
  "Nombre_Aval_3",

  "Nombre_Representante_1_Aval_1",
  "Nombre_Representante_2_Aval_1",
  "Nombre_Representante_3_Aval_1",
  "Nombre_Representante_1_Aval_2",
  "Nombre_Representante_2_Aval_2",
  "Nombre_Representante_3_Aval_2",
  "Nombre_Representante_1_Aval_3",
  "Nombre_Representante_2_Aval_3",
  "Nombre_Representante_3_Aval_3",
];

/**
 * Excel columns that should be validated as strings with max 50 characters.
 * Includes place names and shorter text fields.
 */
export const string50Attributes: string[] = [
  "Lugar_Desembolso",
];

/**
 * Excel columns that should be validated as decimal numbers (doubles).
 * Includes monetary amounts.
 */
export const doubleAttributes: string[] = ["Monto"];

/**
 * Excel columns that should be validated as integer numbers.
 * Includes IDs, codes, and enum values.
 */
export const integerAttributes: string[] = [
  "Condicion_Pagare",
  "Codigo_Cliente",
  "Numero_Credito",
  "Banca",
  "Producto",

  "Estado_Civil",
  "Tipo_Documento",

  "Estado_Civil_Aval_1",
  "Estado_Civil_Aval_2",
  "Estado_Civil_Aval_3",
];

/**
 * Excel columns that should be validated as document numbers.
 * Includes DNI, RUC, and other identification numbers with special validation rules.
 */
export const documentsAttributes: string[] = [
  "Numero_Documento",

  "Documento_Representante_1",
  "Documento_Representante_2",
  "Documento_Representante_3",

  "Documento_Aval_1",
  "Documento_Aval_2",
  "Documento_Aval_3",

  "Documento_Representante_1_Aval_1",
  "Documento_Representante_2_Aval_1",
  "Documento_Representante_3_Aval_1",
  "Documento_Representante_1_Aval_2",
  "Documento_Representante_2_Aval_2",
  "Documento_Representante_3_Aval_2",
  "Documento_Representante_1_Aval_3",
  "Documento_Representante_2_Aval_3",
  "Documento_Representante_3_Aval_3",
];

/**
 * Excel columns that should be validated as dates.
 * Handles various date formats including Excel serial numbers.
 */
export const dateAttributes: string[] = ["Fecha_Desembolso", "Fecha_De_Expiracion"];

/**
 * Mapping for first guarantor (aval 1) fields.
 * Maps Excel column names to nested API field names (aval1.fieldName).
 */
export const aval1Attributes: AttributeMapping = {
  Estado_Civil_Aval_1: "aval1-civilStatus",
  Documento_Aval_1: "aval1-numberDocument",
  Nombre_Aval_1: "aval1-businessName",
  Domicilio_Aval_1: "aval1-domicile",
  Nombre_Representante_1_Aval_1: "aval1-nameLegalRepresentativeOne",
  Documento_Representante_1_Aval_1: "aval1-numberDocumentOne",
  Nombre_Representante_2_Aval_1: "aval1-nameLegalRepresentativeTwo",
  Documento_Representante_2_Aval_1: "aval1-numberDocumentTwo",
  Nombre_Representante_3_Aval_1: "aval1-nameLegalRepresentativeThree",
  Documento_Representante_3_Aval_1: "aval1-numberDocumentThree",
};

/**
 * Mapping for second guarantor (aval 2) fields.
 * Maps Excel column names to nested API field names (aval2.fieldName).
 */
export const aval2Attributes: AttributeMapping = {
  Estado_Civil_Aval_2: "aval2-civilStatus",
  Documento_Aval_2: "aval2-numberDocument",
  Nombre_Aval_2: "aval2-businessName",
  Domicilio_Aval_2: "aval2-domicile",
  Nombre_Representante_1_Aval_2: "aval2-nameLegalRepresentativeOne",
  Documento_Representante_1_Aval_2: "aval2-numberDocumentOne",
  Nombre_Representante_2_Aval_2: "aval2-nameLegalRepresentativeTwo",
  Documento_Representante_2_Aval_2: "aval2-numberDocumentTwo",
  Nombre_Representante_3_Aval_2: "aval2-nameLegalRepresentativeThree",
  Documento_Representante_3_Aval_2: "aval2-numberDocumentThree",
};

/**
 * Mapping for third guarantor (aval 3) fields.
 * Maps Excel column names to nested API field names (aval3.fieldName).
 */
export const aval3Attributes: AttributeMapping = {
  Estado_Civil_Aval_3: "aval3-civilStatus",
  Documento_Aval_3: "aval3-numberDocument",
  Nombre_Aval_3: "aval3-businessName",
  Domicilio_Aval_3: "aval3-domicile",
  Nombre_Representante_1_Aval_3: "aval3-nameLegalRepresentativeOne",
  Documento_Representante_1_Aval_3: "aval3-numberDocumentOne",
  Nombre_Representante_2_Aval_3: "aval3-nameLegalRepresentativeTwo",
  Documento_Representante_2_Aval_3: "aval3-numberDocumentTwo",
  Nombre_Representante_3_Aval_3: "aval3-nameLegalRepresentativeThree",
  Documento_Representante_3_Aval_3: "aval3-numberDocumentThree",
};

/**
 * Main attribute mapping from Excel column names to API field names.
 * Combines all field mappings including main client data and all guarantors.
 * 
 * The hyphenated field names (e.g., "aval1-numberDocument") are later converted
 * to nested objects by the buildNestedObjects function.
 */
export const attributes: AttributeMapping = {
  ID_Contrato: "contractId",
  Condicion_Pagare: "conditionJustSign",
  Codigo_Cliente: "uniqueCode",
  Numero_Credito: "creditNumber",
  Banca: "banking",
  Producto: "product",
  Moneda: "currency",
  Fecha_De_Expiracion: "expirationDate",
  Nombre_Cliente: "clientName",
  Estado_Civil: "civilStatus",
  Tipo_Documento: "typeDocument",
  Numero_Documento: "numberDocument",
  Domicilio: "domicile",
  Fecha_Desembolso: "issuedDate",
  Lugar_Desembolso: "issuedPlace",
  Monto: "amount",
  // representante
  Nombre_Representante_1: "nameLegalRepresentativeOne",
  Documento_Representante_1: "numberDocumentOne",
  Nombre_Representante_2: "nameLegalRepresentativeTwo",
  Documento_Representante_2: "numberDocumentTwo",
  Nombre_Representante_3: "nameLegalRepresentativeThree",
  Documento_Representante_3: "numberDocumentThree",
  // garante 1
  ...aval1Attributes,
  // garante 2
  ...aval2Attributes,
  // garante 3
  ...aval3Attributes,
};

