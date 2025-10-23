"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributes = exports.aval3Attributes = exports.aval2Attributes = exports.aval1Attributes = exports.dateAttributes = exports.documentsAttributes = exports.integerAttributes = exports.doubleAttributes = exports.string50Attributes = exports.string100Attributes = void 0;
exports.string100Attributes = [
    "ID_Contrato",
    "Nombre_Cliente",
    "Domicilio",
    "Lugar_Desembolso",
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
exports.string50Attributes = [
    "Lugar_Desembolso", // 50
];
exports.doubleAttributes = ["Monto"];
exports.integerAttributes = [
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
exports.documentsAttributes = [
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
exports.dateAttributes = ["Fecha_Desembolso", "Fecha_De_Expiracion"];
exports.aval1Attributes = {
    Estado_Civil_Aval_1: "guaranteeDataDetail-civilStatus",
    Documento_Aval_1: "guaranteeDataDetail-numberDocument",
    Nombre_Aval_1: "guaranteeDataDetail-businessName",
    Domicilio_Aval_1: "guaranteeDataDetail-domicile",
    Nombre_Representante_1_Aval_1: "guaranteeDataDetail-nameLegalRepresentativeOne",
    Documento_Representante_1_Aval_1: "guaranteeDataDetail-numberDocumentOne",
    Nombre_Representante_2_Aval_1: "guaranteeDataDetail-nameLegalRepresentativeTwo",
    Documento_Representante_2_Aval_1: "guaranteeDataDetail-numberDocumentTwo",
    Nombre_Representante_3_Aval_1: "guaranteeDataDetail-nameLegalRepresentativeThree",
    Documento_Representante_3_Aval_1: "guaranteeDataDetail-numberDocumentThree",
};
exports.aval2Attributes = {
    Estado_Civil_Aval_2: "guaranteeDataDetail-civilStatus",
    Documento_Aval_2: "guaranteeDataDetail-numberDocument",
    Nombre_Aval_2: "guaranteeDataDetail-businessName",
    Domicilio_Aval_2: "guaranteeDataDetail-domicile",
    Nombre_Representante_1_Aval_2: "guaranteeDataDetail-nameLegalRepresentativeOne",
    Documento_Representante_1_Aval_2: "guaranteeDataDetail-numberDocumentOne",
    Nombre_Representante_2_Aval_2: "guaranteeDataDetail-nameLegalRepresentativeTwo",
    Documento_Representante_2_Aval_2: "guaranteeDataDetail-numberDocumentTwo",
    Nombre_Representante_3_Aval_2: "guaranteeDataDetail-nameLegalRepresentativeThree",
    Documento_Representante_3_Aval_2: "guaranteeDataDetail-numberDocumentThree",
};
exports.aval3Attributes = {
    Estado_Civil_Aval_3: "guaranteeDataDetail-civilStatus",
    Documento_Aval_3: "guaranteeDataDetail-numberDocument",
    Nombre_Aval_3: "guaranteeDataDetail-businessName",
    Domicilio_Aval_3: "guaranteeDataDetail-domicile",
    Nombre_Representante_1_Aval_3: "guaranteeDataDetail-nameLegalRepresentativeOne",
    Documento_Representante_1_Aval_3: "guaranteeDataDetail-numberDocumentOne",
    Nombre_Representante_2_Aval_3: "guaranteeDataDetail-nameLegalRepresentativeTwo",
    Documento_Representante_2_Aval_3: "guaranteeDataDetail-numberDocumentTwo",
    Nombre_Representante_3_Aval_3: "guaranteeDataDetail-nameLegalRepresentativeThree",
    Documento_Representante_3_Aval_3: "guaranteeDataDetail-numberDocumentThree",
};
exports.attributes = {
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
    ...exports.aval1Attributes,
    // garante 2
    ...exports.aval2Attributes,
    // garante 3
    ...exports.aval3Attributes,
};
//# sourceMappingURL=attributes.js.map