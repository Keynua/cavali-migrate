import * as _ from "lodash";
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
export const replaceValues = (
  obj: ExcelRecord,
  key: string,
  values: ValueReplacement[]
): void => {
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

