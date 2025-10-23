import * as fs from "fs";
import * as XLSX from "xlsx";

/**
 * Exports JSON data to an Excel file (.xlsx).
 * Creates a workbook with a single sheet named "data".
 * 
 * @param csvData - Array of objects to export (each object becomes a row)
 * @param fileName - Output file name (without extension)
 * @returns Promise that resolves when file is written
 */
export async function exportJsonToSheet(
  csvData: any[],
  fileName: string
): Promise<void> {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = await new Blob([excelBuffer], { type: fileType }).arrayBuffer();
  fs.writeFileSync(fileName + fileExtension, Buffer.from(data));
}

