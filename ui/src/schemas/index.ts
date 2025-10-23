import { z } from 'zod';

/**
 * Schema de validación para las credenciales
 */
export const credentialsSchema = z.object({
  host: z.enum(['api.dev.keynua.com', 'api.stg.keynua.com', 'api.keynua.com']),
  apiKey: z.string().min(1, 'La API Key es requerida'),
  apiToken: z.string().min(1, 'El API Token es requerido'),
});

export type CredentialsFormData = z.infer<typeof credentialsSchema>;

/**
 * Schema de validación para la configuración de migración
 */
export const migrationConfigSchema = z.object({
  batch: z.number().min(1, 'El lote inicial debe ser mayor a 0'),
  maxBatch: z.number().min(1, 'El lote máximo debe ser mayor a 0').optional().nullable(),
  batchSize: z.number().min(1, 'El tamaño del lote debe ser mayor a 0'),
  prefix: z.string().min(1, 'El prefijo es requerido').trim(),
  toSend: z.string().optional().refine(
    (val) => {
      if (!val || val.trim() === '') return true;
      try {
        const parsed = JSON.parse(val);
        if (!Array.isArray(parsed)) return false;
        
        for (const item of parsed) {
          if (typeof item === 'number') {
            // Numbers must be positive (row numbers start at 1)
            if (item <= 0) return false;
            continue;
          } else if (Array.isArray(item)) {
            if (item.length !== 2 || typeof item[0] !== 'number' || typeof item[1] !== 'number') {
              return false;
            }
            // Range values must be positive
            if (item[0] <= 0 || item[1] <= 0) {
              return false;
            }
            // Start must be less than or equal to end
            if (item[0] > item[1]) {
              return false;
            }
          } else {
            return false;
          }
        }
        return true;
      } catch {
        return false;
      }
    },
    {
      message: 'Formato JSON inválido. Use: [3, [5,10], 15]',
    }
  ),
}).refine(
  (data) => {
    if (data.maxBatch && data.batch > data.maxBatch) {
      return false;
    }
    return true;
  },
  {
    message: 'El lote inicial no puede ser mayor al lote máximo',
    path: ['maxBatch'],
  }
);

export type MigrationConfigFormData = z.infer<typeof migrationConfigSchema>;

