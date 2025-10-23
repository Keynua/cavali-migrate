import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { CredentialsForm } from './components/CredentialsForm';
import { MigrationConfigForm } from './components/MigrationConfigForm';
import { ProgressDisplay } from './components/ProgressDisplay';
import { ReportsPanel } from './components/ReportsPanel';
import { ValidationErrors } from './components/ValidationErrors';
import { ExcelDocsModal } from './components/ExcelDocsModal';
import { validateExcelFile } from './utils/validation';
import { runMigration } from './utils/scriptRunner';
import { ProcessStatus } from './types';
import type {
  CredentialsConfig,
  MigrationConfig,
  ValidationError,
  Payload,
  BatchReport,
  ProgressUpdate,
} from './types';

function App() {
  // File and validation state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [payloads, setPayloads] = useState<Payload[]>([]);

  // Configuration state
  const [credentials, setCredentials] = useState<CredentialsConfig | null>(null);
  const [migrationConfig, setMigrationConfig] = useState<MigrationConfig | null>(null);

  // Process state
  const [status, setStatus] = useState<ProcessStatus>(ProcessStatus.IDLE);
  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>([]);
  const [currentBatch, setCurrentBatch] = useState<number | undefined>();
  const [totalBatches, setTotalBatches] = useState<number | undefined>();
  const [currentRecord, setCurrentRecord] = useState<number | undefined>();
  const [totalRecords, setTotalRecords] = useState<number | undefined>();
  const [reports, setReports] = useState<BatchReport[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setStatus(ProcessStatus.VALIDATING);
    setValidationErrors([]);
    setPayloads([]);

    try {
      const result = await validateExcelFile(file);

      if (result.errors.length > 0) {
        setValidationErrors(result.errors);
        setStatus(ProcessStatus.ERROR);
      } else {
        setPayloads(result.payloads);
        setStatus(ProcessStatus.IDLE);
      }
    } catch (error) {
      setStatus(ProcessStatus.ERROR);
      console.error(error);
    }
  };

  const handleCredentialsChange = (creds: CredentialsConfig | null) => {
    setCredentials(creds);
  };

  const handleConfigChange = (config: MigrationConfig | null) => {
    setMigrationConfig(config);
  };

  const handleStartMigration = async () => {
    // Validate all prerequisites
    const validationErrors: string[] = [];

    if (!credentials) {
      validationErrors.push('Complete las credenciales de la API (Host, API Key, API Token)');
    }

    if (!migrationConfig) {
      validationErrors.push('Complete la configuración de migración (Prefijo es requerido)');
    }

    if (!selectedFile) {
      validationErrors.push('Cargue un archivo Excel con los datos a migrar');
    }

    if (payloads.length === 0) {
      validationErrors.push('El archivo Excel debe contener registros válidos');
    }

    if (validationErrors.length > 0) {
      const errorMessage = 'Antes de iniciar la migración, debe:\n\n' + validationErrors.map((e, i) => `${i + 1}. ${e}`).join('\n');
      alert(errorMessage);
      return;
    }

    setIsExecuting(true);
    setStatus(ProcessStatus.PROCESSING);
    setProgressUpdates([]);
    setReports([]);
    setCurrentBatch(undefined);
    setTotalBatches(undefined);
    setCurrentRecord(undefined);
    setTotalRecords(undefined);

    const onProgress = (update: ProgressUpdate) => {
      setProgressUpdates((prev) => [...prev, update]);

      if (update.currentBatch !== undefined) {
        setCurrentBatch(update.currentBatch);
      }
      if (update.totalBatches !== undefined) {
        setTotalBatches(update.totalBatches);
      }
      if (update.currentRecord !== undefined) {
        setCurrentRecord(update.currentRecord);
      }
      if (update.totalRecords !== undefined) {
        setTotalRecords(update.totalRecords);
      }
      if (update.batchReport) {
        setReports((prev) => [...prev, update.batchReport!]);
      }
    };

    try {
      const batchReports = await runMigration(credentials!, migrationConfig!, payloads, onProgress);
      setReports(batchReports);
      setStatus(ProcessStatus.COMPLETE);
    } catch (error) {
      setStatus(ProcessStatus.ERROR);
      setProgressUpdates((prev) => [
        ...prev,
        { type: 'error', message: `Error: ${error}` },
      ]);
      console.error(error);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setValidationErrors([]);
    setPayloads([]);
    setCredentials(null);
    setMigrationConfig(null);
    setStatus(ProcessStatus.IDLE);
    setProgressUpdates([]);
    setCurrentBatch(undefined);
    setTotalBatches(undefined);
    setCurrentRecord(undefined);
    setTotalRecords(undefined);
    setReports([]);
    setIsExecuting(false);
  };

  const isProcessing = status === ProcessStatus.PROCESSING;
  const canExecute = credentials && migrationConfig && payloads.length > 0 && !validationErrors.length;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '8px' }}>
          CAVALI - Migración de Pagarés
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          Herramienta de migración de pagarés al sistema CAVALI
        </p>
      </div>

      {/* Credentials Form */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">1. Configurar Credenciales</h2>
          <p className="card-description">
            Ingrese las credenciales para conectarse a la API de CAVALI
          </p>
        </div>
        <CredentialsForm onChange={handleCredentialsChange} disabled={isProcessing} />
      </div>

      {/* Migration Config Form */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">2. Configurar Migración</h2>
          <p className="card-description">
            Configure los parámetros de la migración
          </p>
        </div>
        <MigrationConfigForm onChange={handleConfigChange} disabled={isProcessing} />
      </div>

      {/* File Upload */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">3. Cargar Archivo Excel</h2>
          <p className="card-description">
            Seleccione el archivo Excel con los datos de los pagarés a migrar
          </p>
          <button
            onClick={() => setShowDocsModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              border: '1px solid #bfdbfe',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              marginTop: '12px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#bfdbfe';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#dbeafe';
            }}
          >
            <svg
              style={{ width: '18px', height: '18px' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Ver guía de columnas del Excel
          </button>
        </div>
        <FileUploader onFileSelect={handleFileSelect} disabled={isProcessing} />
        {selectedFile && !validationErrors.length && status === ProcessStatus.VALIDATING && (
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 12px' }}></div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Validando archivo: <strong>{selectedFile.name}</strong>
            </p>
          </div>
        )}
        {selectedFile && payloads.length > 0 && (
          <div className="alert alert-success" style={{ marginTop: '16px' }}>
            <svg
              style={{ width: '20px', height: '20px', flexShrink: 0 }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <strong>Archivo validado correctamente</strong>
              <p style={{ marginTop: '4px' }}>
                <strong>{selectedFile.name}</strong> - {payloads.length} registros válidos
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <ValidationErrors
          errors={validationErrors}
          onClose={() => {
            setValidationErrors([]);
            setSelectedFile(null);
            setStatus(ProcessStatus.IDLE);
          }}
        />
      )}

      {/* Execute Button - Always visible when file is loaded */}
      {!isExecuting && selectedFile && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">4. Ejecutar Migración</h2>
            {canExecute && migrationConfig && (
              <div style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                padding: '16px', 
                borderRadius: '8px',
                marginTop: '16px'
              }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Resumen de Configuración:</h3>
                <div className="grid grid-2" style={{ gap: '12px' }}>
                  <div><strong>Registros a procesar:</strong> {payloads.length}</div>
                  <div><strong>Tamaño de lote:</strong> {migrationConfig.batchSize}</div>
                  <div><strong>Lote inicial:</strong> {migrationConfig.batch || 1}</div>
                  <div>
                    <strong>Lote máximo:</strong> {migrationConfig.maxBatch || 'Todos'}
                  </div>
                  <div><strong>Prefijo:</strong> {migrationConfig.prefix}</div>
                  <div><strong>Ambiente:</strong> {credentials?.host}</div>
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="btn btn-primary" 
            onClick={handleStartMigration}
            style={{ 
              width: '100%', 
              fontSize: '1.1rem',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
              <svg
                style={{ width: '24px', height: '24px' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Iniciar Migración
          </button>
        </div>
      )}

      {/* Execution Section */}
      {isExecuting && (
        <>
          {status === ProcessStatus.COMPLETE && (
            <div className="alert alert-success">
              <svg
                style={{ width: '24px', height: '24px', flexShrink: 0 }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong>¡Migración Completada!</strong>
                <p style={{ marginTop: '4px' }}>
                  La migración se ha completado exitosamente. Puede descargar los reportes a continuación.
                </p>
              </div>
            </div>
          )}

          <ProgressDisplay
            status={status}
            updates={progressUpdates}
            currentBatch={currentBatch}
            totalBatches={totalBatches}
            currentRecord={currentRecord}
            totalRecords={totalRecords}
          />

          {reports.length > 0 && <ReportsPanel reports={reports} />}

          {status === ProcessStatus.COMPLETE && (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button className="btn btn-primary" onClick={handleReset}>
                Nueva Migración
              </button>
            </div>
          )}
        </>
      )}

      {/* Excel Documentation Modal */}
      <ExcelDocsModal isOpen={showDocsModal} onClose={() => setShowDocsModal(false)} />
    </div>
  );
}

export default App;

