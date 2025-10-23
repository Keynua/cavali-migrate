"use strict";
/**
 * Type definitions for the CAVALI promissory note processing system.
 * This file contains all the interfaces, types, and enums used throughout the application.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionJustSign = exports.DocumentType = exports.Currency = exports.CivilStatus = void 0;
/**
 * Civil status enumeration for individuals
 */
var CivilStatus;
(function (CivilStatus) {
    CivilStatus[CivilStatus["SOLTERO"] = 1] = "SOLTERO";
    CivilStatus[CivilStatus["CASADO"] = 2] = "CASADO";
    CivilStatus[CivilStatus["DIVORCIADO"] = 3] = "DIVORCIADO";
    CivilStatus[CivilStatus["VIUDO"] = 4] = "VIUDO";
})(CivilStatus || (exports.CivilStatus = CivilStatus = {}));
/**
 * Currency types supported by the system
 */
var Currency;
(function (Currency) {
    Currency[Currency["SOLES"] = 1] = "SOLES";
    Currency[Currency["DOLARES"] = 2] = "DOLARES";
})(Currency || (exports.Currency = Currency = {}));
/**
 * Document types for identification
 */
var DocumentType;
(function (DocumentType) {
    DocumentType[DocumentType["DNI"] = 1] = "DNI";
    DocumentType[DocumentType["RUC"] = 2] = "RUC";
    DocumentType[DocumentType["CARNET_EXTRANJERIA"] = 3] = "CARNET_EXTRANJERIA";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
/**
 * Condition for signature-only promissory notes
 */
var ConditionJustSign;
(function (ConditionJustSign) {
    ConditionJustSign[ConditionJustSign["SI"] = 1] = "SI";
    ConditionJustSign[ConditionJustSign["NO"] = 2] = "NO";
})(ConditionJustSign || (exports.ConditionJustSign = ConditionJustSign = {}));
//# sourceMappingURL=_types.js.map