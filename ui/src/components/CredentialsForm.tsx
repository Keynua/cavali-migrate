import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { credentialsSchema, type CredentialsFormData } from '../schemas';
import type { CredentialsConfig } from '../types';

interface CredentialsFormProps {
  onChange: (credentials: CredentialsConfig | null) => void;
  disabled?: boolean;
}

export const CredentialsForm: React.FC<CredentialsFormProps> = ({ onChange, disabled }) => {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<CredentialsFormData>({
    resolver: zodResolver(credentialsSchema),
    mode: 'onChange',
    defaultValues: {
      host: 'api.dev.keynua.com',
      apiKey: '',
      apiToken: '',
    },
  });

  const formValues = watch();

  // Notify parent of changes
  useEffect(() => {
    if (isValid) {
      onChange({
        host: formValues.host,
        apiKey: formValues.apiKey.trim(),
        apiToken: formValues.apiToken.trim(),
      });
    } else {
      onChange(null);
    }
  }, [formValues, isValid, onChange]);

  return (
    <div>
      <div className="alert alert-info" style={{ marginBottom: '20px' }}>
        <svg
          style={{ width: '20px', height: '20px', flexShrink: 0 }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <strong>Información Sensible:</strong> Estos datos son sensibles y no serán almacenados. 
          Solo se utilizan para la comunicación con la API durante esta sesión.
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="host">
          Host del API *
        </label>
        <select
          id="host"
          className={`form-select ${errors.host ? 'error' : ''}`}
          {...register('host')}
          disabled={disabled}
        >
          <option value="api.dev.keynua.com">Desarrollo (api.dev.keynua.com)</option>
          <option value="api.stg.keynua.com">Staging (api.stg.keynua.com)</option>
          <option value="api.keynua.com">Producción (api.keynua.com)</option>
        </select>
        <p className="form-help">
          Seleccione el ambiente donde se ejecutará la migración
        </p>
        {errors.host && (
          <p className="form-error">{errors.host.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="apiKey">
          API Key *
        </label>
        <input
          id="apiKey"
          type="password"
          className={`form-input ${errors.apiKey ? 'error' : ''}`}
          {...register('apiKey')}
          placeholder="Ingrese su API Key"
          disabled={disabled}
        />
        <p className="form-help">
          Generado desde el portal de Keynua
        </p>
        {errors.apiKey && (
          <p className="form-error">{errors.apiKey.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="apiToken">
          API Token (Authorization) *
        </label>
        <input
          id="apiToken"
          type="password"
          className={`form-input ${errors.apiToken ? 'error' : ''}`}
          {...register('apiToken')}
          placeholder="Ingrese su API Token"
          disabled={disabled}
        />
        <p className="form-help">
          Token de autorización generado desde el portal de Keynua
        </p>
        {errors.apiToken && (
          <p className="form-error">{errors.apiToken.message}</p>
        )}
      </div>
    </div>
  );
};

