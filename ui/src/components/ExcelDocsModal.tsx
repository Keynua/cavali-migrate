import React from 'react';

interface ExcelDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExcelDocsModal: React.FC<ExcelDocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          maxWidth: '1200px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '2px solid var(--bg-secondary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
            📋 Guía del Archivo Excel
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              lineHeight: 1,
              padding: '0 8px',
            }}
            title="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {/* Requisitos Generales */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--primary-color)' }}>
              📌 Requisitos Generales
            </h3>
            <ul style={{ lineHeight: '1.8' }}>
              <li><strong>Formato:</strong> .xlsx (Excel moderno)</li>
              <li><strong>Primera fila:</strong> Nombres de las columnas (exactos)</li>
              <li><strong>Siguientes filas:</strong> Cada fila = un pagaré</li>
              <li><strong>Espacios:</strong> Los nombres pueden tener espacios o guiones bajos</li>
            </ul>
          </section>

          {/* Columnas Obligatorias */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: '#ef4444' }}>
              ✅ Columnas OBLIGATORIAS
            </h3>
            <div style={{ backgroundColor: '#fee2e2', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
              <table className="table" style={{ marginTop: 0 }}>
                <thead>
                  <tr>
                    <th>Columna</th>
                    <th>Descripción</th>
                    <th>Formato</th>
                    <th>Ejemplo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>ID_Contrato</code></td>
                    <td>Identificador único del contrato</td>
                    <td>Texto (hasta 100 caracteres)</td>
                    <td><code>77db2a80-d64a-11ee...</code></td>
                  </tr>
                  <tr>
                    <td><code>Numero_Documento</code></td>
                    <td>DNI o RUC del cliente</td>
                    <td>Solo números (7-15 dígitos)</td>
                    <td><code>20570774337</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Columnas Recomendadas */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: '#f59e0b' }}>
              📝 Columnas RECOMENDADAS
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Columna</th>
                  <th>Formato</th>
                  <th>Ejemplo</th>
                  <th>Valor por defecto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Condicion_Pagare</code></td>
                  <td><code>SI</code> o <code>NO</code></td>
                  <td><code>SI</code></td>
                  <td><code>NO</code></td>
                </tr>
                <tr>
                  <td><code>Moneda</code></td>
                  <td><code>s/.</code>, <code>s/</code>, <code>us$</code>, <code>$</code></td>
                  <td><code>$</code></td>
                  <td><code>s/.</code> (Soles)</td>
                </tr>
                <tr>
                  <td><code>Tipo_Documento</code></td>
                  <td><code>dni</code>, <code>ruc</code>, <code>carnet de extranjeria</code></td>
                  <td><code>ruc</code></td>
                  <td><code>dni</code></td>
                </tr>
                <tr>
                  <td><code>Numero_Credito</code></td>
                  <td>Número entero</td>
                  <td><code>202402655</code></td>
                  <td>Aleatorio</td>
                </tr>
                <tr>
                  <td><code>Codigo_Cliente</code></td>
                  <td>Número entero</td>
                  <td><code>20570774337</code></td>
                  <td>Usa Numero_Documento</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Números y Fechas */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--primary-color)' }}>
              🔢 Columnas de NÚMEROS Y FECHAS
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Columna</th>
                  <th>Descripción</th>
                  <th>Formato</th>
                  <th>Ejemplo</th>
                  <th>¿Obligatoria?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Banca</code></td>
                  <td>Código de banca</td>
                  <td>Número entero</td>
                  <td><code>4</code></td>
                  <td>Opcional</td>
                </tr>
                <tr>
                  <td><code>Producto</code></td>
                  <td>Código de producto</td>
                  <td>Número entero</td>
                  <td><code>41</code></td>
                  <td>Opcional</td>
                </tr>
                <tr>
                  <td><code>Monto</code></td>
                  <td>Monto del pagaré</td>
                  <td>Número decimal</td>
                  <td><code>11000.41</code></td>
                  <td>Opcional</td>
                </tr>
                <tr>
                  <td><code>Fecha_De_Expiracion</code></td>
                  <td>Fecha de vencimiento</td>
                  <td>Fecha de Excel (día/mes/año)</td>
                  <td><code>19/01/2025</code></td>
                  <td>Opcional</td>
                </tr>
                <tr>
                  <td><code>Fecha_Desembolso</code></td>
                  <td>Fecha de desembolso</td>
                  <td>Fecha de Excel (día/mes/año)</td>
                  <td><code>19/01/2024</code></td>
                  <td>Opcional</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Información del Cliente */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--primary-color)' }}>
              👤 Columnas de INFORMACIÓN DEL CLIENTE
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Columna</th>
                  <th>Descripción</th>
                  <th>Formato</th>
                  <th>Ejemplo</th>
                  <th>Longitud máxima</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Nombre_Cliente</code></td>
                  <td>Nombre o razón social del cliente</td>
                  <td>Texto</td>
                  <td><code>CONSORCIO DE TECNOLOGIA E INFORMACION S.A.C.</code></td>
                  <td>100 caracteres</td>
                </tr>
                <tr>
                  <td><code>Estado_Civil</code></td>
                  <td>Estado civil del cliente (solo personas naturales)</td>
                  <td><code>soltero</code>, <code>casado</code>, <code>divorciado</code>, <code>viudo</code></td>
                  <td><code>casado</code></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>Domicilio</code></td>
                  <td>Dirección del cliente</td>
                  <td>Texto</td>
                  <td><code>CAL.SAN MARTIN NRO. 1439 CENTRO JAEN</code></td>
                  <td>100 caracteres</td>
                </tr>
                <tr>
                  <td><code>Lugar_Desembolso</code></td>
                  <td>Lugar donde se desembolsó</td>
                  <td>Texto</td>
                  <td><code>LIMA</code></td>
                  <td>50 caracteres</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Representantes */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--primary-color)' }}>
              👔 Columnas de REPRESENTANTES LEGALES (del cliente)
            </h3>
            <p style={{ marginBottom: '12px' }}>El cliente puede tener hasta <strong>3 representantes legales</strong>:</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Columna</th>
                  <th>Descripción</th>
                  <th>Formato</th>
                  <th>Ejemplo</th>
                  <th>Longitud máxima</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Nombre_Representante_1</code></td>
                  <td>Nombre del primer representante</td>
                  <td>Texto</td>
                  <td><code>ARIANNE NICOLE RODRIGUEZ MUÑOZ</code></td>
                  <td>100 caracteres</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_1</code></td>
                  <td>DNI del primer representante</td>
                  <td>Solo números, 7-15 dígitos</td>
                  <td><code>72928067</code></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_2</code></td>
                  <td>Nombre del segundo representante</td>
                  <td>Texto</td>
                  <td>-</td>
                  <td>100 caracteres</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_2</code></td>
                  <td>DNI del segundo representante</td>
                  <td>Solo números, 7-15 dígitos</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_3</code></td>
                  <td>Nombre del tercer representante</td>
                  <td>Texto</td>
                  <td>-</td>
                  <td>100 caracteres</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_3</code></td>
                  <td>DNI del tercer representante</td>
                  <td>Solo números, 7-15 dígitos</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Avales */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--primary-color)' }}>
              🛡️ Columnas de AVALES/GARANTES
            </h3>
            <p style={{ marginBottom: '16px' }}>Puedes tener hasta <strong>3 avales</strong> por pagaré. Cada aval puede tener a su vez hasta <strong>3 representantes legales</strong>.</p>
            
            <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#2563eb' }}>Aval 1</h4>
            <table className="table" style={{ marginBottom: '24px' }}>
              <thead>
                <tr>
                  <th>Columna</th>
                  <th>Descripción</th>
                  <th>Formato</th>
                  <th>Ejemplo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Nombre_Aval_1</code></td>
                  <td>Nombre del primer aval</td>
                  <td>Texto (máx 100 caracteres)</td>
                  <td><code>Erick Rodriguez Martínez</code></td>
                </tr>
                <tr>
                  <td><code>Documento_Aval_1</code></td>
                  <td>Documento del primer aval</td>
                  <td>Solo números, 7-15 dígitos</td>
                  <td><code>10000705</code></td>
                </tr>
                <tr>
                  <td><code>Estado_Civil_Aval_1</code></td>
                  <td>Estado civil del aval</td>
                  <td><code>soltero</code>, <code>casado</code>, <code>divorciado</code>, <code>viudo</code></td>
                  <td><code>casado</code></td>
                </tr>
                <tr>
                  <td><code>Domicilio_Aval_1</code></td>
                  <td>Dirección del aval</td>
                  <td>Texto (máx 100 caracteres)</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_1_Aval_1</code></td>
                  <td>Nombre del primer representante del aval 1</td>
                  <td>Texto (máx 100 caracteres)</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_1_Aval_1</code></td>
                  <td>Documento del primer representante del aval 1</td>
                  <td>Solo números, 7-15 dígitos</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_2_Aval_1</code></td>
                  <td>Nombre del segundo representante del aval 1</td>
                  <td>Texto (máx 100 caracteres)</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_2_Aval_1</code></td>
                  <td>Documento del segundo representante del aval 1</td>
                  <td>Solo números, 7-15 dígitos</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_3_Aval_1</code></td>
                  <td>Nombre del tercer representante del aval 1</td>
                  <td>Texto (máx 100 caracteres)</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_3_Aval_1</code></td>
                  <td>Documento del tercer representante del aval 1</td>
                  <td>Solo números, 7-15 dígitos</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>

            <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#2563eb' }}>Aval 2</h4>
            <table className="table" style={{ marginBottom: '24px' }}>
              <thead>
                <tr>
                  <th>Columna</th>
                  <th>Descripción</th>
                  <th>Formato</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Nombre_Aval_2</code></td>
                  <td>Nombre del segundo aval</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Documento_Aval_2</code></td>
                  <td>Documento del segundo aval</td>
                  <td>Solo números, 7-15 dígitos</td>
                </tr>
                <tr>
                  <td><code>Estado_Civil_Aval_2</code></td>
                  <td>Estado civil del aval</td>
                  <td><code>soltero</code>, <code>casado</code>, <code>divorciado</code>, <code>viudo</code></td>
                </tr>
                <tr>
                  <td><code>Domicilio_Aval_2</code></td>
                  <td>Dirección del aval</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_1_Aval_2</code></td>
                  <td>Nombre del primer representante del aval 2</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_1_Aval_2</code></td>
                  <td>Documento del primer representante del aval 2</td>
                  <td>Solo números, 7-15 dígitos</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_2_Aval_2</code></td>
                  <td>Nombre del segundo representante del aval 2</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_2_Aval_2</code></td>
                  <td>Documento del segundo representante del aval 2</td>
                  <td>Solo números, 7-15 dígitos</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_3_Aval_2</code></td>
                  <td>Nombre del tercer representante del aval 2</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_3_Aval_2</code></td>
                  <td>Documento del tercer representante del aval 2</td>
                  <td>Solo números, 7-15 dígitos</td>
                </tr>
              </tbody>
            </table>

            <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#2563eb' }}>Aval 3</h4>
            <table className="table" style={{ marginBottom: '16px' }}>
              <thead>
                <tr>
                  <th>Columna</th>
                  <th>Descripción</th>
                  <th>Formato</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Nombre_Aval_3</code></td>
                  <td>Nombre del tercer aval</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Documento_Aval_3</code></td>
                  <td>Documento del tercer aval</td>
                  <td>Solo números, 7-15 dígitos</td>
                </tr>
                <tr>
                  <td><code>Estado_Civil_Aval_3</code></td>
                  <td>Estado civil del aval</td>
                  <td><code>soltero</code>, <code>casado</code>, <code>divorciado</code>, <code>viudo</code></td>
                </tr>
                <tr>
                  <td><code>Domicilio_Aval_3</code></td>
                  <td>Dirección del aval</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_1_Aval_3</code></td>
                  <td>Nombre del primer representante del aval 3</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_1_Aval_3</code></td>
                  <td>Documento del primer representante del aval 3</td>
                  <td>Solo números, 7-15 dígitos</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_2_Aval_3</code></td>
                  <td>Nombre del segundo representante del aval 3</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_2_Aval_3</code></td>
                  <td>Documento del segundo representante del aval 3</td>
                  <td>Solo números, 7-15 dígitos</td>
                </tr>
                <tr>
                  <td><code>Nombre_Representante_3_Aval_3</code></td>
                  <td>Nombre del tercer representante del aval 3</td>
                  <td>Texto (máx 100 caracteres)</td>
                </tr>
                <tr>
                  <td><code>Documento_Representante_3_Aval_3</code></td>
                  <td>Documento del tercer representante del aval 3</td>
                  <td>Solo números, 7-15 dígitos</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Reglas Importantes */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: '#ef4444' }}>
              ⚠️ Reglas IMPORTANTES
            </h3>
            
            <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>1. Nombres de Columnas</h4>
            <ul style={{ marginBottom: '16px', lineHeight: '1.8' }}>
              <li><strong>Los nombres de las columnas DEBEN ser exactos</strong> (pueden llevar espacios o guiones bajos)</li>
              <li>Estos nombres son válidos: <code>ID_Contrato</code>, <code>ID Contrato</code></li>
              <li><strong>Mayúsculas y minúsculas NO importan</strong>: <code>id_contrato</code>, <code>ID_CONTRATO</code>, <code>Id_Contrato</code> son iguales</li>
              <li><strong>La primera fila siempre debe tener los nombres de columnas</strong></li>
            </ul>

            <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>2. Formato de Datos</h4>
            
            <div style={{ display: 'grid', gap: '12px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '6px' }}>
                <strong>📝 Textos</strong>
                <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
                  <li>No exceder la longitud máxima (50 o 100 caracteres según la columna)</li>
                  <li>Se permiten acentos y caracteres especiales</li>
                  <li>Los saltos de línea dentro de una celda serán eliminados automáticamente</li>
                </ul>
              </div>

              <div style={{ backgroundColor: '#fef3c7', padding: '12px', borderRadius: '6px' }}>
                <strong>🔢 Números de Documento</strong>
                <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
                  <li><strong>Solo números</strong>: NO incluir guiones, puntos o espacios</li>
                  <li>✅ Correcto: <code>20570774337</code></li>
                  <li>❌ Incorrecto: <code>20.570.774-337</code> o <code>20 570 774 337</code></li>
                  <li>Longitud: entre 7 y 15 dígitos</li>
                  <li><strong>Nota especial</strong>: Si el DNI tiene 7 dígitos, el script agregará automáticamente un <code>0</code> al inicio</li>
                </ul>
              </div>

              <div style={{ backgroundColor: '#dbeafe', padding: '12px', borderRadius: '6px' }}>
                <strong>💰 Moneda</strong>
                <div style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                  Estos valores son aceptados (no importa mayúsculas/minúsculas):
                  <ul style={{ margin: '4px 0 0 20px' }}>
                    <li>Para <strong>Soles</strong>: <code>s/.</code>, <code>s/</code>, <code>S/.</code>, <code>S/</code></li>
                    <li>Para <strong>Dólares</strong>: <code>us$</code>, <code>$</code>, <code>US$</code>, <code>USD</code></li>
                  </ul>
                </div>
              </div>

              <div style={{ backgroundColor: '#d1fae5', padding: '12px', borderRadius: '6px' }}>
                <strong>📅 Fechas</strong>
                <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
                  <li>Usa el formato de fecha de Excel (por ejemplo: <code>19/01/2025</code>)</li>
                  <li>Excel las convierte automáticamente al formato interno</li>
                  <li>El script acepta fechas en formato <code>YYYY-MM-DD</code> o números seriales de Excel</li>
                </ul>
              </div>

              <div style={{ backgroundColor: '#fce7f3', padding: '12px', borderRadius: '6px' }}>
                <strong>🔘 Estado Civil</strong>
                <div style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                  Valores permitidos (no importa mayúsculas/minúsculas):
                  <ul style={{ margin: '4px 0 0 20px' }}>
                    <li><code>soltero</code></li>
                    <li><code>casado</code></li>
                    <li><code>divorciado</code></li>
                    <li><code>viudo</code> (ojo: sin "d" al final)</li>
                  </ul>
                </div>
              </div>

              <div style={{ backgroundColor: '#e0e7ff', padding: '12px', borderRadius: '6px' }}>
                <strong>📋 Tipo de Documento</strong>
                <div style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                  Valores permitidos:
                  <ul style={{ margin: '4px 0 0 20px' }}>
                    <li><code>dni</code> - Para personas naturales peruanas</li>
                    <li><code>ruc</code> - Para personas jurídicas o naturales con negocio</li>
                    <li><code>carnet de extranjeria</code> - Para extranjeros</li>
                  </ul>
                </div>
              </div>

              <div style={{ backgroundColor: '#f3e8ff', padding: '12px', borderRadius: '6px' }}>
                <strong>✓ Condición del Pagaré</strong>
                <div style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                  Valores permitidos:
                  <ul style={{ margin: '4px 0 0 20px' }}>
                    <li><code>SI</code> - Solo firma</li>
                    <li><code>NO</code> - Requiere condiciones adicionales</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>3. Celdas Vacías</h4>
            <ul style={{ marginBottom: '16px', lineHeight: '1.8' }}>
              <li><strong>Puedes dejar celdas vacías</strong> para columnas opcionales</li>
              <li>Si dejas vacía una columna recomendada, el script usará un valor por defecto</li>
              <li>Nunca dejes vacías las columnas obligatorias (<code>ID_Contrato</code>, <code>Numero_Documento</code>)</li>
            </ul>

            <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>4. Avales</h4>
            <ul style={{ lineHeight: '1.8' }}>
              <li><strong>Un aval solo se incluirá si tiene <code>Documento_Aval_X</code> completado</strong></li>
              <li>Si no completas <code>Documento_Aval_1</code>, el aval 1 NO se enviará (aunque llenes el nombre)</li>
              <li>Puedes tener 0, 1, 2 o 3 avales por pagaré</li>
              <li>No es necesario llenar todos los representantes de un aval</li>
            </ul>
          </section>

          {/* Ejemplo */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--success-color)' }}>
              📝 Ejemplo de Fila Completa
            </h3>
            <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', overflowX: 'auto' }}>
              <div><strong>ID_Contrato:</strong> 77db2a80-d64a-11ee-b6e0-49d3b3f545cee1</div>
              <div><strong>Condicion_Pagare:</strong> SI</div>
              <div><strong>Numero_Credito:</strong> 202402655</div>
              <div><strong>Banca:</strong> 4</div>
              <div><strong>Producto:</strong> 41</div>
              <div><strong>Moneda:</strong> $</div>
              <div><strong>Fecha_De_Expiracion:</strong> 19/01/2025</div>
              <div><strong>Nombre_Cliente:</strong> CONSORCIO DE TECNOLOGIA E INFORMACION S.A.C.</div>
              <div><strong>Estado_Civil:</strong> (vacío, porque es empresa)</div>
              <div><strong>Tipo_Documento:</strong> ruc</div>
              <div><strong>Numero_Documento:</strong> 20570774337</div>
              <div><strong>Domicilio:</strong> CAL.SAN MARTIN NRO. 1439 CENTRO JAEN, provincia de JAEN y departamento de CAJAMARCA</div>
              <div><strong>Fecha_Desembolso:</strong> 19/01/2024</div>
              <div><strong>Lugar_Desembolso:</strong> LIMA</div>
              <div><strong>Monto:</strong> 11000.41</div>
              <div><strong>Nombre_Representante_1:</strong> ARIANNE NICOLE RODRIGUEZ MUÑOZ</div>
              <div><strong>Documento_Representante_1:</strong> 72928067</div>
              <div><strong>Nombre_Aval_1:</strong> Erick Rodriguez Martínez</div>
              <div><strong>Documento_Aval_1:</strong> 10000705</div>
              <div><strong>Nombre_Aval_2:</strong> Mery Arleny Muñoz Vasquez</div>
              <div><strong>Documento_Aval_2:</strong> 10268648</div>
              <div style={{ marginTop: '8px', fontStyle: 'italic' }}>(todas las demás columnas vacías)</div>
            </div>
          </section>

          {/* Errores Comunes */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: '#ef4444' }}>
              ❌ Errores Comunes
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ padding: '12px', border: '1px solid #fecaca', borderRadius: '6px', backgroundColor: '#fee2e2' }}>
                <strong>1. Error: "document number must contain only numeric characters"</strong><br/>
                <span style={{ fontSize: '0.9rem' }}>
                  <strong>Causa:</strong> El número de documento tiene guiones, puntos o espacios<br/>
                  <strong>Solución:</strong> Usar solo números. Cambiar <code>20.570.774-337</code> por <code>20570774337</code>
                </span>
              </div>
              <div style={{ padding: '12px', border: '1px solid #fecaca', borderRadius: '6px', backgroundColor: '#fee2e2' }}>
                <strong>2. Error: "document number must be between 7 and 15 characters"</strong><br/>
                <span style={{ fontSize: '0.9rem' }}>
                  <strong>Causa:</strong> El documento es muy corto o muy largo<br/>
                  <strong>Solución:</strong> Verificar que el número de documento tenga entre 7 y 15 dígitos
                </span>
              </div>
              <div style={{ padding: '12px', border: '1px solid #fecaca', borderRadius: '6px', backgroundColor: '#fee2e2' }}>
                <strong>3. Error: "the field must have 100 characters maximum"</strong><br/>
                <span style={{ fontSize: '0.9rem' }}>
                  <strong>Causa:</strong> Un texto excede los 100 caracteres<br/>
                  <strong>Solución:</strong> Acortar el texto (por ejemplo, en direcciones muy largas)
                </span>
              </div>
              <div style={{ padding: '12px', border: '1px solid #fecaca', borderRadius: '6px', backgroundColor: '#fee2e2' }}>
                <strong>4. Error: "invalid integer"</strong><br/>
                <span style={{ fontSize: '0.9rem' }}>
                  <strong>Causa:</strong> Se puso texto en una columna que debe ser número (Banca, Producto, Numero_Credito)<br/>
                  <strong>Solución:</strong> Verificar que solo haya números en esas columnas
                </span>
              </div>
              <div style={{ padding: '12px', border: '1px solid #fecaca', borderRadius: '6px', backgroundColor: '#fee2e2' }}>
                <strong>5. Error: "required string"</strong><br/>
                <span style={{ fontSize: '0.9rem' }}>
                  <strong>Causa:</strong> Falta completar una columna obligatoria<br/>
                  <strong>Solución:</strong> Completar <code>ID_Contrato</code> y <code>Numero_Documento</code> en todas las filas
                </span>
              </div>
            </div>
          </section>

          {/* Checklist */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--success-color)' }}>
              ✅ Checklist Antes de Enviar el Excel
            </h3>
            <div style={{ backgroundColor: '#d1fae5', padding: '16px', borderRadius: '8px' }}>
              <ul style={{ lineHeight: '2', margin: 0 }}>
                <li>☐ La primera fila tiene los nombres de todas las columnas</li>
                <li>☐ Cada fila representa un pagaré diferente</li>
                <li>☐ Todas las filas tienen <code>ID_Contrato</code> y <code>Numero_Documento</code></li>
                <li>☐ Los números de documento solo contienen dígitos (sin puntos, guiones o espacios)</li>
                <li>☐ Las fechas están en formato de Excel</li>
                <li>☐ Los valores de moneda son: <code>s/.</code>, <code>s/</code>, <code>us$</code> o <code>$</code></li>
                <li>☐ Los valores de estado civil son: <code>soltero</code>, <code>casado</code>, <code>divorciado</code> o <code>viudo</code></li>
                <li>☐ Los valores de tipo de documento son: <code>dni</code>, <code>ruc</code> o <code>carnet de extranjeria</code></li>
                <li>☐ Los valores de condición son: <code>SI</code> o <code>NO</code></li>
                <li>☐ Los textos no exceden 100 caracteres (50 para Lugar_Desembolso)</li>
                <li>☐ Si hay avales, tienen al menos el <code>Documento_Aval_X</code> completado</li>
              </ul>
            </div>
          </section>

          {/* Cómo Saber si Hubo Errores */}
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--primary-color)' }}>
              🔍 ¿Cómo Saber si Hubo Errores?
            </h3>
            <p style={{ marginBottom: '12px' }}>Cuando ejecutes el script:</p>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ backgroundColor: '#fee2e2', padding: '12px', borderRadius: '6px' }}>
                <strong>1. Si hay errores de validación:</strong> Se generará un archivo Excel con el nombre <code>[cliente]-errors-[fecha]-batch[número].xlsx</code>
                <ul style={{ marginTop: '8px', fontSize: '0.9rem' }}>
                  <li><code>row</code>: Número de fila donde ocurrió el error</li>
                  <li><code>message</code>: Descripción del error</li>
                </ul>
              </div>
              <div style={{ backgroundColor: '#d1fae5', padding: '12px', borderRadius: '6px' }}>
                <strong>2. Si todo va bien:</strong> Se generará un archivo con los resultados: <code>[cliente]-responses-[fecha]-batch-[número]-e-[errores]-s-[exitosos]-d-[duplicados]-sk-[saltados].xlsx</code>
                <ul style={{ marginTop: '8px', fontSize: '0.9rem' }}>
                  <li><code>e</code>: Número de errores de la API</li>
                  <li><code>s</code>: Número de pagarés enviados exitosamente</li>
                  <li><code>d</code>: Número de pagarés duplicados</li>
                  <li><code>sk</code>: Número de pagarés saltados (por filtros de configuración)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Consejos */}
          <section>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--primary-color)' }}>
              💡 Consejos
            </h3>
            <ol style={{ lineHeight: '1.8' }}>
              <li><strong>Usa el archivo de plantilla:</strong> En la carpeta <code>files/</code> hay ejemplos de archivos Excel correctos que puedes usar como base</li>
              <li><strong>Copia el formato:</strong> Es más fácil copiar un Excel que ya funcionó y solo cambiar los datos</li>
              <li><strong>Revisa los errores uno por uno:</strong> Si el script genera un archivo de errores, revísalo línea por línea. Cada error te dice exactamente qué está mal y en qué fila</li>
              <li><strong>Prueba con pocas filas primero:</strong> Antes de enviar 1000 pagarés, prueba con 5-10 filas para verificar que todo esté bien</li>
              <li><strong>DNIs de 7 dígitos:</strong> No te preocupes por agregar el 0 inicial, el script lo hace automáticamente</li>
              <li><strong>Celdas vacías están bien:</strong> No llenes con "N/A" o "-" las celdas vacías, déjalas completamente vacías</li>
              <li><strong>Consistencia en el formato:</strong> Mantén el mismo formato en toda la columna (por ejemplo, si usas <code>$</code> para dólares, úsalo en todos los registros)</li>
            </ol>
          </section>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button className="btn btn-primary" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

