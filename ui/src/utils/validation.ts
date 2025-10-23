/**
 * Excel validation utilities for browser
 * Reuses original script logic with browser-specific file reading
 */

import * as _ from 'lodash';
import type { ValidationError, Payload } from '../types';

// Browser-specific helper
import { readExcelRowsBrowser } from './browserHelpers';
import { getPayloads } from '@helpers/getPayloads';

/**
 * Reads and validates an Excel file from the browser
 * Uses original script validation logic with browser file reading
 */
export const validateExcelFile = async (
  file: File
): Promise<{ errors: ValidationError[]; payloads: Payload[] }> => {
  let rows: any[][];
  try {
    // Browser-specific: read from File object
    rows = await readExcelRowsBrowser(file);
  } catch (err) {
    console.error("\n\nError al leer el archivo Excel: ", err);
    return { errors: [{ row: 0, message: 'Error al leer el archivo Excel' }], payloads: [] };
  }

  return getPayloads(rows);
};
