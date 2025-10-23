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
exports.replaceValues = void 0;
const _ = __importStar(require("lodash"));
/**
 * Replaces values in an object based on a mapping.
 * Used to normalize Excel data (e.g., "si" -> 1, "no" -> 2).
 * String comparisons are case-insensitive and trimmed.
 *
 * @param obj - Object to modify
 * @param key - Property key to check and replace
 * @param values - Array of [original value, replacement value] tuples
 *
 * @example
 * const obj = { status: "si" };
 * replaceValues(obj, "status", [["si", 1], ["no", 2]]);
 * // obj becomes { status: 1 }
 */
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
exports.replaceValues = replaceValues;
//# sourceMappingURL=replaceValues.js.map