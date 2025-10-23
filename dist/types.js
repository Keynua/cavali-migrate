"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionJustSign = exports.DocumentType = exports.Currency = exports.CivilStatus = void 0;
// Enums para valores específicos
var CivilStatus;
(function (CivilStatus) {
    CivilStatus[CivilStatus["SOLTERO"] = 1] = "SOLTERO";
    CivilStatus[CivilStatus["CASADO"] = 2] = "CASADO";
    CivilStatus[CivilStatus["DIVORCIADO"] = 3] = "DIVORCIADO";
    CivilStatus[CivilStatus["VIUDO"] = 4] = "VIUDO";
})(CivilStatus || (exports.CivilStatus = CivilStatus = {}));
var Currency;
(function (Currency) {
    Currency[Currency["SOLES"] = 1] = "SOLES";
    Currency[Currency["DOLARES"] = 2] = "DOLARES";
})(Currency || (exports.Currency = Currency = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType[DocumentType["DNI"] = 1] = "DNI";
    DocumentType[DocumentType["RUC"] = 2] = "RUC";
    DocumentType[DocumentType["CARNET_EXTRANJERIA"] = 3] = "CARNET_EXTRANJERIA";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var ConditionJustSign;
(function (ConditionJustSign) {
    ConditionJustSign[ConditionJustSign["SI"] = 1] = "SI";
    ConditionJustSign[ConditionJustSign["NO"] = 2] = "NO";
})(ConditionJustSign || (exports.ConditionJustSign = ConditionJustSign = {}));
//# sourceMappingURL=types.js.map