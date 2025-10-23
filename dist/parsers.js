"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDocumentNumber = exports.parseNumber = exports.parseInteger = exports.parseDouble = exports.toNumber = exports.parseString = exports.convertString = exports.parseDate = exports.getJsDateFromExcel = void 0;
const date_fns_1 = require("date-fns");
const getJsDateFromExcel = (excelDate) => {
    if (!Number(excelDate)) {
        return new Date();
    }
    const e0date = new Date(0); // epoch "zero" date
    const offset = e0date.getTimezoneOffset(); // tz offset in min
    // calculate Excel xxx days later, with local tz offset
    const date = new Date(0, 0, excelDate, 0, -offset, 0);
    if (Object.prototype.toString.call(date) === "[object Date]") {
        if (isNaN(date.getTime())) {
            return new Date();
        }
        else {
            return date;
        }
    }
    return new Date();
};
exports.getJsDateFromExcel = getJsDateFromExcel;
const parseDate = (arg, optional = true) => {
    if (!arg) {
        if (!optional) {
            throw "required date";
        }
        return null;
    }
    let date = new Date();
    if (arg instanceof Date) {
        // utc
        date = new Date(arg.getTime() + arg.getTimezoneOffset() * 60000);
    }
    else if (typeof arg === "string") {
        date = (0, date_fns_1.parse)(arg, "yyyy-MM-dd", new Date());
    }
    else {
        date = (0, exports.getJsDateFromExcel)(arg);
    }
    return (0, date_fns_1.format)(date, "yyyy-MM-dd");
};
exports.parseDate = parseDate;
const convertString = (arg) => {
    if (!arg)
        return "";
    if (typeof arg === "number") {
        return `${arg}`;
    }
    if (typeof arg !== "string") {
        return "";
    }
    return arg;
};
exports.convertString = convertString;
const parseString = (arg, min, max, optional = true, convert = true) => {
    let val = arg;
    if (!val) {
        if (!optional) {
            throw "required string";
        }
        return null;
    }
    if (convert) {
        val = (0, exports.convertString)(val);
    }
    // remove new lines
    val = val.replace(/\n/g, "");
    if (typeof val !== "string") {
        throw "invalid string";
    }
    if (min !== undefined && val.length < min) {
        throw `the string must have at least ${min} characters`;
    }
    if (max !== undefined && val.length > max) {
        throw `the field must have ${max} characters maximum`;
    }
    return val;
};
exports.parseString = parseString;
const toNumber = (arg, defaultValue) => {
    if (arg === null || arg === undefined) {
        return defaultValue;
    }
    if (typeof arg === "number") {
        return arg;
    }
    if (typeof arg === "string") {
        const val = parseFloat(arg);
        return isNaN(val) ? defaultValue : val;
    }
    return defaultValue;
};
exports.toNumber = toNumber;
const parseDouble = (arg, optional = true, convert = true) => {
    const value = convert ? (0, exports.toNumber)(arg) : arg;
    if (!value && value !== 0) {
        if (!optional) {
            throw "required double";
        }
        return null;
    }
    if (Number.isFinite(value)) {
        return value;
    }
    throw "invalid double";
};
exports.parseDouble = parseDouble;
const parseInteger = (arg, optional = true, convert = true) => {
    const value = convert ? (0, exports.toNumber)(arg) : arg;
    if (!value && value !== 0) {
        if (!optional) {
            throw "required integer";
        }
        return null;
    }
    if (Number.isInteger(value)) {
        return value;
    }
    throw "invalid integer";
};
exports.parseInteger = parseInteger;
const parseNumber = (arg, optional = true, convert = true) => {
    const value = convert ? (0, exports.toNumber)(arg) : arg;
    if (!value && value !== 0) {
        if (!optional) {
            throw "required number";
        }
        return null;
    }
    if (typeof value === "number") {
        return value;
    }
    throw "invalid number";
};
exports.parseNumber = parseNumber;
const parseDocumentNumber = (arg, optional = true, convert = true) => {
    let val = arg;
    if (!val) {
        if (!optional) {
            throw "required document number";
        }
        return null;
    }
    if (convert) {
        val = (0, exports.convertString)(val);
    }
    if (typeof val !== "string") {
        throw "invalid document number format";
    }
    val = val.replace(";", "");
    // Validar que sea numérico (solo números) - PRIMERO
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(val)) {
        throw "document number must contain only numeric characters, valor: " + val;
    }
    // Validar longitud (7-15 caracteres)
    if (val.length < 7 || val.length > 15) {
        throw "document number must be between 7 and 15 characters, valor: " + val;
    }
    // Si tiene 7 dígitos, agregar un 0 al inicio
    if (val.length === 7) {
        val = "0" + val;
    }
    return val;
};
exports.parseDocumentNumber = parseDocumentNumber;
//# sourceMappingURL=parsers.js.map