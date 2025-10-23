# CAVALI - Interfaz de Usuario para Migración de Pagarés

Interfaz web amigable para ejecutar el script de migración de pagarés al sistema CAVALI, diseñada para usuarios no técnicos.

## 🚀 Características

- **Carga de Archivos Excel**: Interfaz drag & drop para cargar archivos
- **Validación en Tiempo Real**: Verifica errores antes de iniciar la migración
- **Configuración Intuitiva**: Formularios guiados paso a paso
- **Seguimiento de Progreso**: Visualización en tiempo real del proceso de migración
- **Reportes Descargables**: Descarga reportes Excel de cada lote procesado
- **Seguridad**: Las credenciales no se almacenan, solo se usan durante la sesión

## 📋 Requisitos Previos

- Node.js 16 o superior
- npm o yarn

## 🔧 Instalación

1. Navega al directorio de la UI:
```bash
cd ui
```

2. Instala las dependencias:
```bash
npm install
```

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Modo Producción

1. Construir la aplicación:
```bash
npm run build
```

2. Previsualizar la build:
```bash
npm run preview
```

## 📖 Guía de Uso

La interfaz presenta todos los formularios en orden secuencial. Complete cada sección antes de ejecutar la migración.

### 1. Configurar Credenciales

Configura las credenciales de acceso a la API:

- **Host del API**: Selecciona el ambiente (desarrollo, staging o producción)
  - `api.dev.keynua.com` - Desarrollo
  - `api.stg.keynua.com` - Staging  
  - `api.keynua.com` - Producción
  
- **API Key**: Tu clave API generada desde el portal de Keynua

- **API Token**: Tu token de autorización generado desde el portal de Keynua

> ⚠️ **Importante**: Estas credenciales son sensibles y NO se almacenan. Solo se usan durante la sesión activa.

### 2. Configurar Migración

Configura los parámetros de la migración:

- **Lote Inicial**: Número del lote desde donde iniciar (por defecto: 1)

- **Lote Máximo**: Número máximo de lotes a procesar (opcional, dejar vacío para procesar todos)

- **Tamaño del Lote**: Cantidad de registros por lote (recomendado: 150-300)

- **Prefijo**: Identificador del cliente para nombrar archivos (ej: "migrante", "mi-cliente")

- **Filas Específicas** (opcional - avanzado): Para pruebas, puedes especificar filas o rangos específicos
  - Formato JSON: `[3, [5,10], 15]`
  - Ejemplo: Enviará solo la fila 3, las filas 5-10 y la fila 15

### 3. Cargar Archivo Excel

1. Arrastra y suelta tu archivo Excel o haz clic para seleccionarlo
2. El sistema validará automáticamente el archivo
3. Si hay errores, descarga el reporte y corrige el archivo
4. Una vez validado, verás un mensaje de confirmación con el número de registros

### 4. Ejecutar Migración

1. Verifica que todos los pasos anteriores estén completos (aparecerá un resumen)
2. Haz clic en "Iniciar Migración"
3. La sección de progreso aparecerá debajo mostrando:
   - Progreso por lote
   - Progreso por registro
   - Logs detallados de cada operación
4. Al finalizar, podrás descargar los reportes de cada lote
5. Visualiza las estadísticas totales (éxitos, errores, duplicados, omitidos)

## 🎨 Tecnologías Utilizadas

- **React 18**: Framework de UI
- **TypeScript**: Tipado estático
- **Vite**: Build tool y dev server
- **XLSX**: Procesamiento de archivos Excel
- **date-fns**: Manejo de fechas
- **lodash**: Utilidades JavaScript

## 📁 Estructura del Proyecto

```
ui/
├── src/
│   ├── components/          # Componentes React
│   │   ├── FileUploader.tsx
│   │   ├── CredentialsForm.tsx
│   │   ├── MigrationConfigForm.tsx
│   │   ├── ProgressDisplay.tsx
│   │   ├── ReportsPanel.tsx
│   │   └── ValidationErrors.tsx
│   ├── utils/              # Utilidades específicas del browser
│   │   ├── validation.ts       # Orquesta validación (usa @helpers)
│   │   ├── scriptRunner.ts     # Ejecuta migración (usa @helpers)
│   │   ├── browserHelpers.ts   # Adaptaciones para navegador
│   ├── types/              # Definiciones de tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── index.html
├── package.json
├── tsconfig.json          # Configurado para importar de ../src/_helpers
├── vite.config.ts         # Alias para @helpers y @types
└── ARCHITECTURE.md        # Documentación de arquitectura
```

### 🔄 Reutilización de Código

Esta UI **reutiliza el 90% de la lógica** del script original (`../src/_helpers/`):

**Importados directamente desde el script original:**
- ✅ `arrayToObject` - Conversión de arrays a objetos
- ✅ `attributes` - Mapeos de columnas Excel
- ✅ `buildNestedObjects` - Construcción de objetos anidados
- ✅ `chunks` - División de arrays
- ✅ `parseExcelRecord` - Validación de registros
- ✅ `parsers` - Funciones de parseo
- ✅ `replaceValues` - Reemplazo de valores

**Adaptados para el navegador:**
- 🌐 `readExcelRowsBrowser` - Lee archivos desde File API
- 🌐 `exportJsonToExcelBrowser` - Descarga Excel en navegador
- 🌐 `insertPromissoryNote` - Usa fetch API

Ver [ARCHITECTURE.md](ARCHITECTURE.md) para detalles completos.

## 🔒 Seguridad

- Las credenciales no se almacenan en localStorage ni en ningún lugar
- Todas las comunicaciones con la API usan HTTPS
- Los datos del Excel se procesan localmente en el navegador
- Solo se envían los datos necesarios a la API de CAVALI

## 🐛 Solución de Problemas

### El archivo no se valida correctamente

- Verifica que el archivo tenga el formato Excel correcto (.xlsx o .xls)
- Asegúrate de que las columnas coincidan con la plantilla esperada
- Descarga el reporte de errores para ver detalles específicos

### Error de conexión con la API

- Verifica que las credenciales sean correctas
- Asegúrate de estar usando el host correcto para tu ambiente
- Revisa tu conexión a internet

### La migración se detiene

- Revisa los logs en la sección de progreso
- Algunos registros pueden fallar pero el proceso continúa
- Descarga los reportes para ver detalles de cada lote

## 📝 Notas

- Recomendamos empezar con un tamaño de lote pequeño (50-100) para pruebas
- Usa el ambiente de desarrollo primero para validar
- Siempre descarga y revisa los reportes después de cada migración
- La opción "Filas Específicas" es útil para debugging y pruebas

## 🤝 Soporte

Para soporte técnico o reportar problemas, contacta al equipo de desarrollo.

