# 🔧 Guía de Configuración - Sistema de Variables de Entorno

## 📖 Resumen

El script ahora utiliza archivos `.env` separados para cada ambiente (desarrollo, staging, producción). Esto permite:

- ✅ Mayor seguridad: credenciales fuera del código
- ✅ Fácil cambio entre ambientes
- ✅ No riesgo de commitear credenciales por error
- ✅ Configuración más limpia y mantenible

## 🚀 Setup Rápido

### 1. Crear archivos de configuración

```bash
# Copia los archivos de ejemplo
cp .env.dev.example .env.dev
cp .env.stg.example .env.stg
cp .env.prod.example .env.prod
```

### 2. Editar configuraciones

Abre cada archivo `.env.*` y completa con tus valores reales:

**`.env.dev`** (Desarrollo):
```bash
NODE_ENV=dev
FILE=./files/test-data.xlsx
BATCH=1
BATCH_SIZE=10
PREFIX=test-dev
AUTHORIZATION=Bearer tu-token-dev
APIKEY=tu-apikey-dev
TO_SEND=3,5-10
```

**`.env.stg`** (Staging):
```bash
NODE_ENV=stg
FILE=./files/staging-data.xlsx
BATCH=1
BATCH_SIZE=50
PREFIX=client-stg
AUTHORIZATION=Bearer tu-token-stg
APIKEY=tu-apikey-stg
```

**`.env.prod`** (Producción):
```bash
NODE_ENV=prod
FILE=./files/production-data.xlsx
BATCH=1
BATCH_SIZE=150
PREFIX=client-prod
AUTHORIZATION=Bearer tu-token-prod
APIKEY=tu-apikey-prod
```

### 3. Ejecutar el script

```bash
# Compilar (solo la primera vez o después de cambios en el código)
npm run build

# Ejecutar según el ambiente
npm run dev-script      # Desarrollo
npm run stg-script      # Staging
npm run prod-script     # Producción
```

## 📋 Variables de Entorno

### Variables Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NODE_ENV` | Ambiente de ejecución | `dev`, `stg`, `prod` |
| `FILE` | Ruta al archivo Excel a procesar | `./files/datos.xlsx` |
| `BATCH_SIZE` | Cantidad de registros por lote | `150` |
| `PREFIX` | Prefijo para archivos de salida | `mi-cliente` |
| `AUTHORIZATION` | Token de autorización de la API | `Bearer eyJ...` |
| `APIKEY` | API Key para autenticación | `abc123...` |

### Variables Opcionales

| Variable | Descripción | Default | Ejemplo |
|----------|-------------|---------|---------|
| `BATCH` | Número de lote inicial | `1` | `3` |
| `MAX_BATCH` | Número máximo de lotes a procesar | Todos | `5` |
| `TO_SEND` | Filas específicas a enviar (testing) | Todas | `3,5-10,15` |

### Formato de TO_SEND

La variable `TO_SEND` permite enviar solo filas específicas del Excel (útil para testing):

```bash
# Una sola fila
TO_SEND=3

# Múltiples filas específicas
TO_SEND=3,7,12

# Rangos de filas
TO_SEND=5-10

# Combinación
TO_SEND=3,5-10,15,20-25
```

## 🎯 Comandos Disponibles

### Ejecución con TypeScript (desarrollo, más rápido para testing)

```bash
npm run dev-script:ts      # Desarrollo (.env.dev)
npm run stg-script:ts      # Staging (.env.stg)
npm run prod-script:ts     # Producción (.env.prod)
```

### Ejecución compilado (producción, más optimizado)

```bash
npm run build              # Compilar primero
npm run dev-script         # Desarrollo (.env.dev)
npm run stg-script         # Staging (.env.stg)
npm run prod-script        # Producción (.env.prod)
```

## 🔒 Seguridad

### ✅ Buenas Prácticas

- **NUNCA** comitees archivos `.env.dev`, `.env.stg` o `.env.prod`
- Solo comitea archivos `.env.*.example` (sin credenciales reales)
- Los archivos `.env*` ya están en `.gitignore`
- Usa tokens diferentes para cada ambiente
- Rota las credenciales periódicamente

### ⚠️ Qué NO hacer

- ❌ No pongas credenciales en el código fuente
- ❌ No compartas archivos `.env` por email o chat
- ❌ No uses las mismas credenciales en todos los ambientes
- ❌ No comitees archivos `.env` al repositorio

## 🔄 Migración desde el sistema antiguo

Si tenías configuraciones hardcodeadas en `src/index.ts`:

**Antes** (❌ sistema antiguo):
```typescript
const config: Config = {
  prod: {
    file: "./files/datos.xlsx",
    batchSize: 150,
    prefix: "cliente",
    authorization: "Bearer xxx...",
    apikey: "yyy...",
  }
};
```

**Ahora** (✅ nuevo sistema):
1. Crea `.env.prod` con:
```bash
NODE_ENV=prod
FILE=./files/datos.xlsx
BATCH_SIZE=150
PREFIX=cliente
AUTHORIZATION=Bearer xxx...
APIKEY=yyy...
```

2. Ejecuta:
```bash
npm run prod-script
```

## 🐛 Troubleshooting

### Error: "Missing required environment variable"

**Problema**: Falta una variable requerida en tu archivo `.env.*`

**Solución**: Verifica que tu archivo `.env` tenga todas las variables requeridas:
```bash
NODE_ENV=
FILE=
BATCH_SIZE=
PREFIX=
AUTHORIZATION=
APIKEY=
```

### Error: "Cannot find module 'dotenv'"

**Problema**: La dependencia dotenv no está instalada

**Solución**:
```bash
npm install
```

### El script usa el ambiente incorrecto

**Problema**: Estás usando el comando equivocado

**Solución**: Verifica que estés usando el comando correcto:
- Dev: `npm run dev-script` o `npm run dev-script:ts`
- Staging: `npm run stg-script` o `npm run stg-script:ts`
- Prod: `npm run prod-script` o `npm run prod-script:ts`

## 💡 Tips

### Verificar qué variables se están cargando

Puedes agregar temporalmente un `console.log` en `src/index.ts`:

```typescript
console.log('Environment:', process.env.NODE_ENV);
console.log('File:', process.env.FILE);
console.log('Prefix:', process.env.PREFIX);
```

### Usar múltiples configuraciones del mismo ambiente

Puedes crear archivos adicionales:
```bash
.env.prod.cliente1
.env.prod.cliente2
```

Y ejecutar con:
```bash
node -r dotenv/config dist/index.js dotenv_config_path=.env.prod.cliente1
```

## 📞 Soporte

Si tienes problemas con la configuración:

1. Verifica que todos los archivos `.env.*` existan
2. Comprueba que las variables requeridas estén completas
3. Asegúrate de haber ejecutado `npm install`
4. Revisa que hayas compilado con `npm run build` (para comandos sin `:ts`)

