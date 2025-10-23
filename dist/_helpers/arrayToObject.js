"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToObject = void 0;
const parsers_1 = require("./parsers");
const attributes_1 = require("./attributes");
/**
 * Converts parallel arrays of column names and values into an object.
 * Only includes columns that are defined in the attributes mapping.
 *
 * @param names - Array of column names from Excel headers
 * @param data - Array of corresponding values from an Excel row
 * @returns Object with column names as keys and row values as values
 */
const arrayToObject = (names, data) => {
    if (!Array.isArray(names) || !Array.isArray(data)) {
        return {};
    }
    const mapObj = new Map();
    const headers = Array.from(Object.keys(attributes_1.attributes));
    // Iterate through column names and match them with their values
    for (let i = 0; i < names.length; i++) {
        const name = (0, parsers_1.parseString)(names[i], undefined, undefined, true, true);
        // Only include columns that exist in the attributes mapping
        if (name && headers.includes(name)) {
            mapObj.set(name, data[i]);
        }
    }
    return Object.fromEntries(mapObj);
};
exports.arrayToObject = arrayToObject;
//# sourceMappingURL=arrayToObject.js.map