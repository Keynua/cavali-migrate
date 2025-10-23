# Cavali Script - TypeScript

Script para procesar y enviar pagarés a la API de Cavali/Keynua.

## 📋 Características

- ✅ Escrito en TypeScript para mejor mantenibilidad y seguridad de tipos
- ✅ Lee archivos Excel con datos de pagarés
- ✅ Valida y parsea los datos según las reglas de negocio
- ✅ Envía los pagarés a la API de Cavali
- ✅ Exporta resultados a Excel
- ✅ Manejo de errores robusto
- ✅ Procesamiento por lotes (batches)
- ✅ **Interfaz de usuario web** para usuarios no técnicos

## 🚀 Instalación

```bash
npm install
```

## 📦 Dependencias

Este proyecto requiere las siguientes dependencias de desarrollo para TypeScript:

```bash
npm install --save-dev typescript @types/node @types/lodash ts-node
```

## 🛠️ Uso

### Opción 1: Interfaz de Usuario Web (Recomendado para usuarios no técnicos)

La forma más fácil de usar este script es a través de la interfaz web:

```bash
cd ui
npm install
npm run dev
```

Luego abre tu navegador en `http://localhost:3000`

Ver [ui/README.md](ui/README.md) para más información.

### Opción 2: Script de Línea de Comandos (Para desarrolladores)

#### Configuración Inicial

1. Copia los archivos de ejemplo de configuración para cada ambiente:

```bash
cp .env.dev.example .env.dev
cp .env.stg.example .env.stg
cp .env.prod.example .env.prod
```

2. Edita cada archivo `.env.*` con tus credenciales y configuraciones específicas:

```bash
# Ejemplo de .env.prod
NODE_ENV=prod
FILE=./files/mi-archivo.xlsx
BATCH=1
MAX_BATCH=1
BATCH_SIZE=150
PREFIX=mi-cliente
AUTHORIZATION=tu-token-de-autorizacion
APIKEY=tu-api-key
```

#### Ejecución

##### Con TypeScript (desarrollo):

```bash
npm run dev-script:ts    # Desarrollo (.env.dev)
npm run stg-script:ts    # Staging (.env.stg)
npm run prod-script:ts   # Producción (.env.prod)
```

##### Con JavaScript compilado (producción):

```bash
npm run build            # Compilar primero
npm run dev-script       # Desarrollo (.env.dev)
npm run stg-script       # Staging (.env.stg)
npm run prod-script      # Producción (.env.prod)
```

## 📁 Estructura del Proyecto

```
.
├── src/                         # Código fuente TypeScript del script CLI
│   ├── index.ts                # Archivo principal de entrada
│   ├── _script.ts              # Lógica principal del programa
│   ├── _types.ts               # Definiciones de tipos e interfaces TypeScript
│   └── _helpers/
│       ├── arrayToObject.ts           # Convierte arrays a objetos
│       ├── attributes.ts              # Mapeo de atributos Excel → API
│       ├── exportJsonToSheet.ts       # Exporta datos a Excel
│       ├── insertPromissoryNote.ts    # Cliente API para insertar pagarés
│       ├── parseExcelRecord.ts        # Parseo y validación de registros
│       └── readExcelRows.ts           # Lee archivos Excel
├── ui/                          # Interfaz de usuario web (React + TypeScript)
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── utils/              # Utilidades compartidas
│   │   ├── types/              # Tipos TypeScript
│   │   └── App.tsx             # Componente principal
│   ├── package.json
│   └── README.md               # Documentación de la UI
├── dist/                        # Código compilado (generado por TypeScript)
├── files/                       # Archivos Excel de entrada
├── tests/                       # Tests unitarios
├── tsconfig.json               # Configuración de TypeScript
└── package.json                # Dependencias y scripts
```

## ⚙️ Configuración

El script utiliza archivos `.env` separados para cada ambiente:

- **`.env.dev`**: Desarrollo
- **`.env.stg`**: Staging  
- **`.env.prod`**: Producción

### Variables de Entorno Disponibles

| Variable | Requerida | Descripción | Ejemplo |
|----------|-----------|-------------|---------|
| `NODE_ENV` | ✅ | Ambiente de ejecución | `dev`, `stg`, `prod` |
| `FILE` | ✅ | Ruta al archivo Excel | `./files/datos.xlsx` |
| `BATCH_SIZE` | ✅ | Registros por lote | `150` |
| `PREFIX` | ✅ | Prefijo del cliente | `mi-cliente` |
| `AUTHORIZATION` | ✅ | Token de autorización | `Bearer xxx...` |
| `APIKEY` | ✅ | API key | `xxx...` |
| `BATCH` | ❌ | Lote inicial (default: 1) | `1` |
| `MAX_BATCH` | ❌ | Lote máximo | `5` |
| `TO_SEND` | ❌ | Filas específicas a enviar | `3,5-10,15` |

### Ejemplo de archivo `.env.prod`:

```bash
NODE_ENV=prod
FILE=./files/mi-archivo.xlsx
BATCH=1
BATCH_SIZE=300
PREFIX=mi-cliente
AUTHORIZATION=Bearer tu-token-aqui
APIKEY=tu-api-key-aqui
```

## 📊 Tipos de Datos

El proyecto utiliza TypeScript para definir interfaces claras:

- `PromissoryNote`: Estructura de un pagaré
- `Payload`: Datos a enviar a la API
- `ExcelRecord`: Registro del archivo Excel
- `Config`: Configuración del entorno
- Y más...

Ver `src/types.ts` para la lista completa.

## 🔍 Validaciones

El script valida:

- Formatos de fecha
- Longitud de strings (50, 100 caracteres)
- Números enteros y decimales
- Números de documento (7-15 dígitos)
- Estados civiles, tipos de documento, monedas

## 📤 Proceso de Envío

1. Lee el archivo Excel
2. Parsea y valida cada fila
3. Convierte los datos al formato de la API
4. Envía por lotes a la API de Cavali
5. Exporta los resultados (éxitos, errores, duplicados)

## 🐛 Manejo de Errores

- Los errores de parsing se exportan a un archivo Excel separado
- Los errores de API se registran en el archivo de resultados
- Se reintenta automáticamente en caso de timeout

## 📝 Scripts Disponibles

### Scripts de Ejecución
- `npm run dev-script:ts` - Ejecuta con TypeScript (dev)
- `npm run stg-script:ts` - Ejecuta con TypeScript (staging)
- `npm run prod-script:ts` - Ejecuta con TypeScript (producción)
- `npm run dev-script` - Ejecuta compilado (dev)
- `npm run stg-script` - Ejecuta compilado (staging)
- `npm run prod-script` - Ejecuta compilado (producción)

### Scripts de Desarrollo
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Compila y ejecuta el script
- `npm run dev` - Ejecuta directamente con ts-node

### Scripts de Testing
- `npm test` - Ejecuta los tests
- `npm run test:watch` - Tests en modo watch
- `npm run test:ui` - Tests con interfaz visual
- `npm run test:coverage` - Genera reporte de cobertura

## 🔒 Seguridad

- ⚠️ **NUNCA** versiones archivos `.env.dev`, `.env.stg` o `.env.prod` con credenciales reales
- ✅ Solo versiona los archivos `.env.*.example` como plantillas
- ✅ Los archivos `.env*` están protegidos en `.gitignore`
- ✅ Las credenciales se cargan desde variables de entorno
- ✅ Los archivos Excel están excluidos de git

## 📋 Requisitos

- Node.js >= 14
- TypeScript >= 5.1
- NPM o Yarn

## 🤝 Contribuir

Este proyecto ahora usa TypeScript para mejorar la calidad del código. Por favor:

1. Mantén los tipos actualizados en `src/types.ts`
2. Usa tipos explícitos en las funciones
3. Evita usar `any` cuando sea posible
4. Todo el código fuente debe estar en la carpeta `src/`
5. Ejecuta `npm run build` antes de hacer commit

## 📄 Licencia

ISC
