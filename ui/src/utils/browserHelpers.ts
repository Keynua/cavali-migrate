/**
 * Browser-specific helpers that adapt Node.js functionality
 * These are the ONLY utilities that need browser-specific implementations
 */

import readXlsxFile from 'read-excel-file';
import * as XLSX from 'xlsx';

/**
 * Browser version of readExcelRows
 * Reads an Excel file from browser File object
 */
export const readExcelRowsBrowser = async (file: File): Promise<any[][]> => {
  return await readXlsxFile(file);
};

/**
 * Browser version of exportJsonToSheet
 * Exports JSON data to Excel file and triggers download in browser
 */
export function exportJsonToExcelBrowser(data: any[], fileName: string): void {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "data");
  
  // Generate Excel file and trigger download
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

/**
 * Creates a downloadable blob URL for Excel data
 */
export function createExcelBlob(data: any[]): Blob {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "data");
  
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
}

