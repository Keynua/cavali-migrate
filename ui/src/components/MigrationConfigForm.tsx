import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { migrationConfigSchema, type MigrationConfigFormData } from '../schemas';
import type { MigrationConfig } from '../types';

interface MigrationConfigFormProps {
  onChange: (config: MigrationConfig | null) => void;
  disabled?: boolean;
}

export const MigrationConfigForm: React.FC<MigrationConfigFormProps> = ({ onChange, disabled }) => {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<MigrationConfigFormData>({
    resolver: zodResolver(migrationConfigSchema),
    mode: 'onChange',
    defaultValues: {
      batch: 1,
      maxBatch: null,
      batchSize: 150,
      prefix: '',
      toSend: '',
    },
  });

  const formValues = watch();
  const [toSendPreview, setToSendPreview] = useState<string>('');

  // Update preview for toSend
  useEffect(() => {
    const toSendValue = formValues.toSend;
    if (!toSendValue || toSendValue.trim() === '') {
      setToSendPreview('');
      return;
    }

    try {
      const parsed = JSON.parse(toSendValue);
      if (!Array.isArray(parsed)) {
        setToSendPreview('');
        return;
      }

      const preview = parsed
        .map((item: number | [number, number]) => {
          if (Array.isArray(item)) {
            return `filas ${item[0]}-${item[1]}`;
          }
          return `fila ${item}`;
        })
        .join(', ');

      setToSendPreview(`Se procesarán: ${preview}`);
    } catch {
      setToSendPreview('');
    }
  }, [formValues.toSend]);

  // Notify parent of changes
  useEffect(() => {
    if (isValid) {
      let toSendParsed: (number | [number, number])[] | undefined = undefined;
      if (formValues.toSend && formValues.toSend.trim()) {
        try {
          toSendParsed = JSON.parse(formValues.toSend);
        } catch {
          // Invalid JSON, will be caught by validation
        }
      }

      onChange({
        batch: formValues.batch,
        maxBatch: formValues.maxBatch || undefined,
        batchSize: formValues.batchSize,
        prefix: formValues.prefix.trim(),
        toSend: toSendParsed,
      });
    } else {
      onChange(null);
    }
  }, [formValues, isValid, onChange]);

  return (
    <div>
      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="batch">
            Lote Inicial
          </label>
          <input
            id="batch"
            type="number"
            className={`form-input ${errors.batch ? 'error' : ''}`}
            {...register('batch', { valueAsNumber: true })}
            min="1"
            disabled={disabled}
          />
          <p className="form-help">Número del lote desde donde iniciar la migración</p>
          {errors.batch && <p className="form-error">{errors.batch.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="maxBatch">
            Lote Máximo (opcional)
          </label>
          <input
            id="maxBatch"
            type="number"
            className={`form-input ${errors.maxBatch ? 'error' : ''}`}
            {...register('maxBatch', {
              setValueAs: (v) => (v === '' || v === null ? null : Number(v)),
            })}
            min="1"
            placeholder="Dejar vacío para procesar todos"
            disabled={disabled}
          />
          <p className="form-help">
            Número máximo de lotes a procesar. Dejar vacío para procesar todos los lotes
          </p>
          {errors.maxBatch && <p className="form-error">{errors.maxBatch.message}</p>}
        </div>
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="batchSize">
            Tamaño del Lote *
          </label>
          <input
            id="batchSize"
            type="number"
            className={`form-input ${errors.batchSize ? 'error' : ''}`}
            {...register('batchSize', { valueAsNumber: true })}
            min="1"
            disabled={disabled}
          />
          <p className="form-help">Cantidad de registros que se procesarán en cada lote</p>
          {errors.batchSize && <p className="form-error">{errors.batchSize.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="prefix">
            Prefijo *
          </label>
          <input
            id="prefix"
            type="text"
            className={`form-input ${errors.prefix ? 'error' : ''}`}
            {...register('prefix')}
            placeholder="ej: mi-cliente"
            disabled={disabled}
          />
          <p className="form-help">Identificador del cliente para nombrar los archivos de reporte</p>
          {errors.prefix && <p className="form-error">{errors.prefix.message}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="toSend">
          Filas Específicas (opcional - avanzado)
        </label>
        <textarea
          id="toSend"
          className={`form-input ${errors.toSend ? 'error' : ''}`}
          {...register('toSend')}
          placeholder="[3, [5,10], 15]"
          disabled={disabled}
          rows={2}
          style={{
            fontFamily: 'monospace',
            resize: 'vertical',
          }}
        />
        <p className="form-help" style={{ marginBottom: '8px' }}>
          <strong>Para pruebas:</strong> Especifica qué filas del Excel procesar (las filas de
          datos, sin contar la fila de encabezado).
          <br />
          <strong>Formato JSON:</strong>
          <br />• Número individual: <code>3</code> = solo la fila 3
          <br />• Rango: <code>[5,10]</code> = filas 5 a 10 (inclusive)
          <br />• Múltiples: <code>[3, [5,10], 15, [20,25]]</code> = fila 3, filas 5-10, fila 15 y
          filas 20-25
        </p>
        {errors.toSend && (
          <div className="alert alert-error" style={{ marginTop: '8px' }}>
            <svg
              style={{ width: '20px', height: '20px', flexShrink: 0 }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>{errors.toSend.message}</div>
          </div>
        )}
        {toSendPreview && !errors.toSend && (
          <div className="alert alert-success" style={{ marginTop: '8px' }}>
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
            <div>{toSendPreview}</div>
          </div>
        )}
      </div>
    </div>
  );
};
