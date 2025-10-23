import React from 'react';
import type { BatchReport } from '../types';
import { exportJsonToExcelBrowser } from '../utils/browserHelpers';

interface ReportsPanelProps {
  reports: BatchReport[];
}

export const ReportsPanel: React.FC<ReportsPanelProps> = ({ reports }) => {
  if (reports.length === 0) {
    return null;
  }

  const handleDownload = (report: BatchReport) => {
    exportJsonToExcelBrowser(report.data, report.fileName);
  };

  const getTotalStats = () => {
    return reports.reduce(
      (acc, report) => ({
        success: acc.success + report.success,
        errors: acc.errors + report.errors,
        duplicates: acc.duplicates + report.duplicates,
        skipped: acc.skipped + report.skipped,
      }),
      { success: 0, errors: 0, duplicates: 0, skipped: 0 }
    );
  };

  const totals = getTotalStats();

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Reportes de Lotes</h2>
        <p className="card-description">
          Descarga los reportes detallados de cada lote procesado
        </p>
      </div>

      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#d1fae5', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#065f46' }}>
            {totals.success}
          </div>
          <div style={{ color: '#047857', fontWeight: 500 }}>Éxitos</div>
        </div>
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#fee2e2', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#991b1b' }}>
            {totals.errors}
          </div>
          <div style={{ color: '#dc2626', fontWeight: 500 }}>Errores</div>
        </div>
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#fef3c7', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#92400e' }}>
            {totals.duplicates}
          </div>
          <div style={{ color: '#b45309', fontWeight: 500 }}>Duplicados</div>
        </div>
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#e5e7eb', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#374151' }}>
            {totals.skipped}
          </div>
          <div style={{ color: '#6b7280', fontWeight: 500 }}>Omitidos</div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Lote</th>
            <th>Éxitos</th>
            <th>Errores</th>
            <th>Duplicados</th>
            <th>Omitidos</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.batchNumber}>
              <td style={{ fontWeight: 500 }}>Lote {report.batchNumber}</td>
              <td>
                <span className="badge badge-success">{report.success}</span>
              </td>
              <td>
                <span className="badge badge-error">{report.errors}</span>
              </td>
              <td>
                <span className="badge badge-warning">{report.duplicates}</span>
              </td>
              <td>
                <span className="badge badge-info">{report.skipped}</span>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDownload(report)}
                  style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                >
                  <svg
                    style={{ width: '16px', height: '16px' }}
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
                  Descargar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

