"use strict";
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
exports.program = void 0;
const _ = __importStar(require("lodash"));
const lodash_1 = require("lodash");
const insertPromissoryNote_1 = require("./helpers/insertPromissoryNote");
const parsers_1 = require("./parsers");
const exportJsonToSheet_1 = require("./helpers/exportJsonToSheet");
const readExcelRows_1 = require("./helpers/readExcelRows");
const arrayToObject_1 = require("./helpers/arrayToObject");
const attributes_1 = require("./helpers/attributes");
const privateConfig = {
    dev: {
        host: "api.dev.keynua.com",
    },
    stg: {
        host: "api.stg.keynua.com",
    },
    prod: {
        host: "api.keynua.com",
    },
};
const replaceValues = (obj, key, values) => {
    let curr = _.get(obj, key);
    if (typeof curr === "string") {
        curr = curr.toLowerCase().trim();
    }
    for (const value of values) {
        if (value[0] === curr) {
            _.set(obj, key, value[1]);
        }
    }
};
const buildNestedObjects = (obj) => {
    const newObj = {};
    for (const [key, val] of Object.entries(obj)) {
        const isNestedAttribute = key.includes("-");
        if (isNestedAttribute) {
            const parts = key.split("-");
            const parent = parts[0];
            const attribute = parts[1];
            newObj[parent] = {
                ...(newObj[parent] ? newObj[parent] : {}),
                [attribute]: val,
            };
        }
        else {
            newObj[key] = val;
        }
    }
    return newObj;
};
const parseExcelRecord = (record) => {
    const errors = [];
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
    replaceValues(record, "Condicion_Pagare", [
        ["si", 1],
        ["no", 2],
    ]);
    replaceValues(record, "Moneda", [
        ["s/.", 1],
        ["s/", 1],
        ["us$", 2],
        ["$", 2],
    ]);
    replaceValues(record, "Estado_Civil", [
        ["soltero", 1],
        ["casado", 2],
        ["divorciado", 3],
        ["vuido", 4],
    ]);
    replaceValues(record, "Tipo_Documento", [
        ["dni", 1],
        ["ruc", 2],
        ["carnet de extranjeria", 3],
    ]);
    replaceValues(record, "Estado_Civil_Aval-civilStatus", [
        ["soltero", 1],
        ["casado", 2],
        ["divorciado", 3],
        ["vuido", 4],
    ]);
    attributes_1.string50Attributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseString)(val, undefined, 50)));
    attributes_1.string100Attributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseString)(val, undefined, 100)));
    attributes_1.integerAttributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseInteger)(val)));
    attributes_1.doubleAttributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseNumber)(val)));
    attributes_1.dateAttributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseDate)(val)));
    attributes_1.documentsAttributes.forEach((key) => parser(key, (val) => (0, parsers_1.parseDocumentNumber)(val)));
    if (errors.length > 0) {
        throw errors;
    }
    return _.omitBy(record, _.isNull);
};
const getPayloads = async (file) => {
    let rows;
    const errors = [];
    const payloads = [];
    try {
        rows = await (0, readExcelRows_1.readExcelRows)(file);
    }
    catch (err) {
        console.log(err);
        return { errors, payloads };
    }
    const rowsData = (rows || []).slice(1);
    for (let i = 0; i < rowsData.length; i++) {
        const headers = rows[0].map((h) => h.replace(new RegExp(" ", "g"), "_"));
        const row = rowsData[i];
        const data = (0, arrayToObject_1.arrayToObject)(headers, row);
        let excelRecord;
        try {
            excelRecord = parseExcelRecord(data);
        }
        catch (error) {
            if (_.isArray(error)) {
                errors.push(...error.map((e) => ({ row: i + 1, message: e })));
            }
            else {
                console.log(error);
            }
            continue;
        }
        const cavaliRecord = buildNestedObjects(_.mapKeys(excelRecord, (_, key) => attributes_1.attributes[key]));
        const contractId = _.get(cavaliRecord, "contractId");
        const promissoryNote = _.omit(cavaliRecord, "contractId");
        if (promissoryNote.guaranteeDataDetail) {
            promissoryNote.guaranteeDataDetail = [promissoryNote.guaranteeDataDetail];
        }
        payloads.push({
            contractId,
            promissoryNote: {
                conditionJustSign: 2,
                special: 2,
                typeDocument: promissoryNote.typeDocument || 1,
                currency: 1,
                creditNumber: promissoryNote.creditNumber || Math.floor(Math.random() * 99999999),
                uniqueCode: promissoryNote.uniqueCode ||
                    Number.parseInt(promissoryNote.numberDocument),
                ...promissoryNote,
            },
        });
    }
    if (errors.length > 0) {
        console.log("\n\nErrors:\n\n", errors);
    }
    return { errors, payloads };
};
function chunks(arr, n) {
    const list = [];
    for (let i = 0; i < arr.length; i += n) {
        list.push(arr.slice(i, i + n));
    }
    return list;
}
// program
const program = async (config, env) => {
    const date = new Date();
    const file = config[env].file;
    let batch = config[env].batch || 1;
    const maxBatch = config[env].maxBatch || batch;
    const batchSize = config[env].batchSize;
    const prefix = config[env].prefix;
    const host = privateConfig[env].host;
    const authorization = config[env].authorization;
    const apikey = config[env].apikey;
    const toSend = config[env].toSend;
    const batchId = date.getTime();
    const name = date.toLocaleString().replace(new RegExp("/", "g"), "-");
    const { errors, payloads } = await getPayloads(file);
    console.log("\n\nErrors Count:", errors.length);
    if (errors.length > 0) {
        (0, exportJsonToSheet_1.exportJsonToSheet)(errors, `${prefix}-errors-${name}-batch${batch}`);
        return { batchId };
    }
    console.log("\n\nPayloads Count:", payloads.length);
    const chunksPayloads = chunks(payloads, batchSize);
    console.log("\n\nChunks: ", batch, " (max: ", chunksPayloads.length, ", size: ", batchSize, ")");
    const send = async (payloadsReq) => {
        const responses = [];
        let success = 0;
        let fail = 0;
        let dup = 0;
        let skip = 0;
        let p = (batch - 1) * batchSize;
        for (const payload of payloadsReq) {
            p++;
            if (toSend &&
                !toSend.some((s) => {
                    if ((0, lodash_1.isArray)(s)) {
                        if (p >= s[0] && p <= s[1]) {
                            return true;
                        }
                    }
                    else if (p === s) {
                        return true;
                    }
                    return false;
                })) {
                skip++;
                console.log("\nResponse:", p, ", SKIP");
                continue;
            }
            const contractId = payload.contractId;
            const promissoryNote = payload.promissoryNote;
            try {
                const response = await (0, insertPromissoryNote_1.insertPromissoryNote)(host, apikey, authorization, batchId, contractId, promissoryNote);
                responses.push({
                    row: p,
                    batchId,
                    contractId,
                    promissoryNote: JSON.stringify(promissoryNote),
                    ...response,
                });
                if (response.message === "Proceso ejecutado exitosamente") {
                    success++;
                }
                else if (response.message === "Error de duplicidad de Pagaré") {
                    dup++;
                }
                else {
                    fail++;
                }
                console.log("\nResponse:", p, ", ", JSON.stringify(response));
            }
            catch (err) {
                responses.push({
                    row: p,
                    batchId,
                    contractId,
                    promissoryNote: JSON.stringify(promissoryNote),
                    INTERNAL_ERROR: JSON.stringify(err),
                });
                fail++;
                console.log(err);
            }
        }
        (0, exportJsonToSheet_1.exportJsonToSheet)(responses, `${prefix}-responses-${name}-batch-${batch}-e-${fail}-s-${success}-d-${dup}-sk-${skip}`);
    };
    while (batch <= Math.min(chunksPayloads.length, maxBatch)) {
        const currChunk = chunksPayloads[batch - 1];
        if (currChunk) {
            console.log("\n\nCurrent Chunk: ", batch, ", records: ", currChunk.length);
            await send(currChunk);
        }
        else {
            console.log("\n\nInvalid Chunk: ", batch, " (max: ", chunksPayloads.length, ")");
        }
        batch++;
    }
    console.log("\n\n");
    return {
        batchId,
    };
};
exports.program = program;
//# sourceMappingURL=script.js.map