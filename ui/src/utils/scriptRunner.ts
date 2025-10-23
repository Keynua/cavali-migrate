/**
 * Script runner - adapts the original script logic for browser execution
 */

import type {
  CredentialsConfig,
  MigrationConfig,
  ProgressUpdate,
  BatchReport,
  Payload,
} from '../types';

// Import from original helpers
import { chunks } from '@helpers/chunks';
import sendBatch, { 
  SendBatchResponseCallback, 
  SendBatchSkipCallback, 
  SendBatchBeforeProcessCallback 
} from '@helpers/sendBatch';

/**
 * Runs the migration script with given configuration and payloads
 */
export const runMigration = async (
  credentials: CredentialsConfig,
  config: MigrationConfig,
  payloads: Payload[],
  onProgress: (update: ProgressUpdate) => void
): Promise<BatchReport[]> => {
  const date = new Date();
  const batchId = date.getTime();
  const name = date.toLocaleString().replace(new RegExp("/", "g"), "-");
  
  const batch = config.batch || 1;
  const maxBatch = config.maxBatch || batch;
  const batchSize = config.batchSize;
  const prefix = config.prefix;
  const toSend = config.toSend;
  
  const host = credentials.host;
  const apikey = credentials.apiKey;
  const authorization = credentials.apiToken;
  
  const chunksPayloads = chunks(payloads, batchSize);
  const totalBatches = Math.min(chunksPayloads.length, maxBatch) - batch + 1;
  
  onProgress({
    type: 'processing',
    message: `Iniciando procesamiento de ${totalBatches} lote(s)`,
    currentBatch: 0,
    totalBatches,
  });
  
  const reports: BatchReport[] = [];
  let currentBatch = batch;
  
  while (currentBatch <= Math.min(chunksPayloads.length, maxBatch)) {
    const currChunk = chunksPayloads[currentBatch - 1];
    
    if (!currChunk) {
      currentBatch++;
      continue;
    }
    
    onProgress({
      type: 'processing',
      message: `Procesando lote ${currentBatch} de ${totalBatches}`,
      currentBatch: currentBatch - batch + 1,
      totalBatches,
      totalRecords: currChunk.length,
    });
    
    // Callbacks for sendBatch to update progress
    const onBeforeProcess: SendBatchBeforeProcessCallback = (_batchId, _contractId, row, totalRecords, _success, _fail, _dup, _skip) => {
      onProgress({
        type: 'processing',
        message: `Procesando registro ${row - (currentBatch - 1) * batchSize} de ${totalRecords} en lote ${currentBatch}...`,
        currentBatch: currentBatch - batch + 1,
        totalBatches,
        currentRecord: row - (currentBatch - 1) * batchSize,
        totalRecords,
      });
    };
    
    const onResponseCallback: SendBatchResponseCallback = (response, success, fail, dup, skip) => {
      onProgress({
        type: 'processing',
        message: `Lote ${currentBatch}: ${success} éxitos, ${fail} errores, ${dup} duplicados, ${skip} omitidos`,
        currentBatch: currentBatch - batch + 1,
        totalBatches,
        currentRecord: response.row - (currentBatch - 1) * batchSize,
        totalRecords: currChunk.length,
      });
    };
    
    const onErrorCallback: SendBatchResponseCallback = (response, success, fail, dup, skip) => {
      onProgress({
        type: 'processing',
        message: `Lote ${currentBatch}: ${success} éxitos, ${fail} errores, ${dup} duplicados, ${skip} omitidos`,
        currentBatch: currentBatch - batch + 1,
        totalBatches,
        currentRecord: response.row - (currentBatch - 1) * batchSize,
        totalRecords: currChunk.length,
      });
    };
    
    const onSkipCallback: SendBatchSkipCallback = (_batchIdParam, _contractId, row, success, fail, dup, skip) => {
      onProgress({
        type: 'processing',
        message: `Lote ${currentBatch}: ${success} éxitos, ${fail} errores, ${dup} duplicados, ${skip} omitidos`,
        currentBatch: currentBatch - batch + 1,
        totalBatches,
        currentRecord: row - (currentBatch - 1) * batchSize,
        totalRecords: currChunk.length,
      });
    };
    
    // Use sendBatch to process the chunk - wrap in try-catch to handle batch-level errors
    try {
      const { responses, success, fail, dup, skip } = await sendBatch(
        currChunk,
        {
          batchSize,
          batchId,
          batchNumber: currentBatch,
          toSend,
          host,
          apikey,
          authorization,
        },
        onResponseCallback,
        onErrorCallback,
        onSkipCallback,
        onBeforeProcess
      );
      
      const report: BatchReport = {
        batchNumber: currentBatch,
        fileName: `${prefix}-responses-${name}-batch-${currentBatch}-e-${fail}-s-${success}-d-${dup}-sk-${skip}`,
        success,
        errors: fail,
        duplicates: dup,
        skipped: skip,
        data: responses,
      };
      
      reports.push(report);
      
      onProgress({
        type: 'processing',
        message: `Lote ${currentBatch} completado: ${success} éxitos, ${fail} errores, ${dup} duplicados, ${skip} omitidos`,
        currentBatch: currentBatch - batch + 1,
        totalBatches,
        batchReport: report,
      });
    } catch (batchError) {
      // If a batch fails completely, log the error and continue with the next batch
      const errorMessage = batchError instanceof Error ? batchError.message : String(batchError);
      
      onProgress({
        type: 'error',
        message: `Error en lote ${currentBatch}: ${errorMessage}. Continuando con el siguiente lote...`,
        currentBatch: currentBatch - batch + 1,
        totalBatches,
      });
      
      // Create an error report for this batch
      const errorReport: BatchReport = {
        batchNumber: currentBatch,
        fileName: `${prefix}-responses-${name}-batch-${currentBatch}-FAILED`,
        success: 0,
        errors: currChunk.length,
        duplicates: 0,
        skipped: 0,
        data: [{
          row: currentBatch,
          batchId,
          contractId: 'BATCH_ERROR',
          promissoryNote: JSON.stringify({ error: errorMessage }),
          INTERNAL_ERROR: errorMessage,
        }],
      };
      
      reports.push(errorReport);
    }
    
    currentBatch++;
  }
  
  onProgress({
    type: 'complete',
    message: `Proceso completado. ${reports.length} lote(s) procesado(s)`,
    currentBatch: totalBatches,
    totalBatches,
  });
  
  return reports;
};

