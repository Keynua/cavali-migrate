"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNestedObjects = void 0;
/**
 * Transforms a flat object with hyphenated keys into a nested object structure.
 * Keys with hyphens (e.g., "aval1-numberDocument") become nested properties.
 *
 * Example: { "aval1-numberDocument": "123" } becomes { aval1: { numberDocument: "123" } }
 *
 * @param obj - Flat object with potentially hyphenated keys
 * @returns Nested object structure
 */
const buildNestedObjects = (obj) => {
    const newObj = {};
    for (const [key, val] of Object.entries(obj)) {
        const isNestedAttribute = key.includes("-");
        if (isNestedAttribute) {
            // Split hyphenated key into parent object and property name
            const parts = key.split("-");
            const parent = parts[0];
            const attribute = parts[1];
            // Create or merge into parent object
            newObj[parent] = {
                ...(newObj[parent] ? newObj[parent] : {}),
                [attribute]: val,
            };
        }
        else {
            // Keep non-nested attributes as-is
            newObj[key] = val;
        }
    }
    return newObj;
};
exports.buildNestedObjects = buildNestedObjects;
//# sourceMappingURL=buildNestedObjects.js.map