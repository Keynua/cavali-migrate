/**
 * Exports JSON data to an Excel file (.xlsx).
 * Creates a workbook with a single sheet named "data".
 *
 * @param csvData - Array of objects to export (each object becomes a row)
 * @param fileName - Output file name (without extension)
 * @returns Promise that resolves when file is written
 */
export declare function exportJsonToSheet(csvData: any[], fileName: string): Promise<void>;
//# sourceMappingURL=exportJsonToSheet.d.ts.map