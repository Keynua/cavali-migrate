import * as fs from "fs";
import readXlsxFile from "read-excel-file/node";

/**
 * Reads an Excel file and returns all rows as a 2D array.
 * The first row typically contains headers, and subsequent rows contain data.
 * 
 * @param file - Path to the Excel file (.xlsx)
 * @returns Promise resolving to a 2D array where each element is a row
 * @throws Error if file cannot be read
 */
export const readExcelRows = async (file: string): Promise<any[][]> =>
  await readXlsxFile(Buffer.from(fs.readFileSync(file)));

