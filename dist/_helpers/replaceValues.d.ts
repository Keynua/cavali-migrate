import { ExcelRecord, ValueReplacement } from "../_types";
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
export declare const replaceValues: (obj: ExcelRecord, key: string, values: ValueReplacement[]) => void;
//# sourceMappingURL=replaceValues.d.ts.map