import React from 'react';
import { ProcessStatus } from '../types';
import type { ProgressUpdate } from '../types';

interface ProgressDisplayProps {
  status: ProcessStatus;
  updates: ProgressUpdate[];
  currentBatch?: number;
  totalBatches?: number;
  currentRecord?: number;
  totalRecords?: number;
}

export const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  status,
  updates,
  currentBatch,
  totalBatches,
  currentRecord,
  totalRecords,
}) => {
  if (status === ProcessStatus.IDLE) {
    return null;
  }

  const getStatusBadge = () => {
    switch (status) {
      case ProcessStatus.VALIDATING:
        return <span className="badge badge-info">Validando</span>;
      case ProcessStatus.PROCESSING:
        return <span className="badge badge-warning">Procesando</span>;
      case ProcessStatus.COMPLETE:
        return <span className="badge badge-success">Completado</span>;
      case ProcessStatus.ERROR:
        return <span className="badge badge-error">Error</span>;
      default:
        return null;
    }
  };

  const getBatchProgress = () => {
    if (!currentBatch || !totalBatches) return 0;
    return Math.round((currentBatch / totalBatches) * 100);
  };

  const getRecordProgress = () => {
    if (!currentRecord || !totalRecords) return 0;
    return Math.round((currentRecord / totalRecords) * 100);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Progreso de Migración</h2>
          {getStatusBadge()}
        </div>
      </div>

      {status === ProcessStatus.VALIDATING && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
          <p>Validando archivo Excel...</p>
        </div>
      )}

      {status === ProcessStatus.PROCESSING && (
        <>
          {currentBatch && totalBatches && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 500 }}>Lote {currentBatch} de {totalBatches}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{getBatchProgress()}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${getBatchProgress()}%` }}>
                  {getBatchProgress()}%
                </div>
              </div>
            </div>
          )}

          {currentRecord && totalRecords && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 500 }}>Registro {currentRecord} de {totalRecords}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{getRecordProgress()}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${getRecordProgress()}%`, backgroundColor: 'var(--success-color)' }}
                >
                  {getRecordProgress()}%
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div style={{ 
        maxHeight: '300px', 
        overflowY: 'auto', 
        backgroundColor: 'var(--bg-secondary)', 
        padding: '12px', 
        borderRadius: '6px',
        fontFamily: 'monospace',
        fontSize: '0.9rem'
      }}>
        {updates.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
            Sin actualizaciones aún...
          </p>
        ) : (
          updates.map((update, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: '8px',
                padding: '8px',
                backgroundColor: update.type === 'error' ? '#fee2e2' : 'transparent',
                borderRadius: '4px',
                color: update.type === 'error' ? '#991b1b' : 'inherit'
              }}
            >
              <span style={{ color: 'var(--text-secondary)', marginRight: '8px' }}>
                [{new Date().toLocaleTimeString()}]
              </span>
              {update.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

