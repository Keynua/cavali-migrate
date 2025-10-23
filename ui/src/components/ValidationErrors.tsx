import React from 'react';
import type { ValidationError } from '../types';
import { exportJsonToExcelBrowser } from '../utils/browserHelpers';

interface ValidationErrorsProps {
  errors: ValidationError[];
  onClose: () => void;
}

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors, onClose }) => {
  const handleDownloadErrors = () => {
    exportJsonToExcelBrowser(errors, `errores-validacion-${new Date().toISOString().slice(0, 10)}`);
  };

  return (
    <div className="card">
      <div className="alert alert-error">
        <svg
          style={{ width: '24px', height: '24px', flexShrink: 0 }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <strong>Errores de Validación Encontrados ({errors.length})</strong>
          <p style={{ marginTop: '4px' }}>
            El archivo Excel contiene errores que deben ser corregidos antes de continuar.
            Por favor, descargue el reporte de errores, corrija el archivo y vuelva a cargarlo.
          </p>
        </div>
      </div>

      <div style={{ 
        maxHeight: '300px', 
        overflowY: 'auto',
        marginTop: '16px',
        marginBottom: '16px',
        border: '1px solid var(--border-color)',
        borderRadius: '6px'
      }}>
        <table className="table">
          <thead>
            <tr>
              <th>Fila</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {errors.map((error, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 500 }}>Fila {error.row}</td>
                <td>{error.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn btn-primary" onClick={handleDownloadErrors}>
          <svg
            style={{ width: '20px', height: '20px' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Descargar Reporte de Errores
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cargar Nuevo Archivo
        </button>
      </div>
    </div>
  );
};

