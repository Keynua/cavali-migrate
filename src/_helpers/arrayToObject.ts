import { parseString } from "./parsers";
import { attributes } from "./attributes";
import { ExcelRecord } from "../_types";

/**
 * Converts parallel arrays of column names and values into an object.
 * Only includes columns that are defined in the attributes mapping.
 * 
 * @param names - Array of column names from Excel headers
 * @param data - Array of corresponding values from an Excel row
 * @returns Object with column names as keys and row values as values
 */
export const arrayToObject = (
  names: any[],
  data: any[]
): ExcelRecord => {
  if (!Array.isArray(names) || !Array.isArray(data)) {
    return {};
  }
  const mapObj = new Map<string, any>();
  const headers = Array.from(Object.keys(attributes));
  
  // Iterate through column names and match them with their values
  for (let i = 0; i < names.length; i++) {
    const name = parseString(names[i], undefined, undefined, true, true);
    // Only include columns that exist in the attributes mapping
    if (name && headers.includes(name)) {
      mapObj.set(name, data[i]);
    }
  }
  return Object.fromEntries(mapObj);
};

