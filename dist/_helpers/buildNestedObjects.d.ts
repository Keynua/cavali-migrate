import { ExcelRecord } from "../_types";
/**
 * Transforms a flat object with hyphenated keys into a nested object structure.
 * Keys with hyphens (e.g., "aval1-numberDocument") become nested properties.
 *
 * Example: { "aval1-numberDocument": "123" } becomes { aval1: { numberDocument: "123" } }
 *
 * @param obj - Flat object with potentially hyphenated keys
 * @returns Nested object structure
 */
export declare const buildNestedObjects: (obj: ExcelRecord) => any;
//# sourceMappingURL=buildNestedObjects.d.ts.map