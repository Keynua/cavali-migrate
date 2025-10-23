"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToObject = void 0;
const parsers_1 = require("../parsers");
const attributes_1 = require("./attributes");
const arrayToObject = (names, data) => {
    if (!Array.isArray(names) || !Array.isArray(data)) {
        return {};
    }
    const mapObj = new Map();
    const headers = Array.from(Object.keys(attributes_1.attributes));
    for (let i = 0; i < names.length; i++) {
        const name = (0, parsers_1.parseString)(names[i], undefined, undefined, true, true);
        if (name && headers.includes(name)) {
            mapObj.set(name, data[i]);
        }
    }
    return Object.fromEntries(mapObj);
};
exports.arrayToObject = arrayToObject;
//# sourceMappingURL=arrayToObject.js.map