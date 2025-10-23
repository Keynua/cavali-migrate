# Arquitectura de la UI

## 📋 Reutilización de Código

La UI reutiliza la lógica del script original en lugar de duplicarla, siguiendo el principio DRY (Don't Repeat Yourself).

### Configuración de Importaciones

Se configuró TypeScript y Vite para permitir importar desde el script original:

**`tsconfig.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@helpers/*": ["../src/_helpers/*"],
      "@types": ["../src/_types.ts"]
    }
  },
  "include": ["src", "../src/_helpers", "../src/_types.ts"]
}
```

**`vite.config.ts`:**
```javascript
{
  resolve: {
    alias: {
      '@helpers': path.resolve(__dirname, '../src/_helpers'),
      '@types': path.resolve(__dirname, '../src/_types.ts'),
    },
  },
}
```

## 🔄 Funciones Reutilizadas del Script Original

Las siguientes funciones se importan directamente desde `src/_helpers/`:

### ✅ Reutilizadas Completamente

1. **`arrayToObject.ts`**
   - Convierte arrays paralelos a objetos
   - No usa APIs de Node.js ✓

2. **`attributes.ts`**
   - Mapeos de columnas Excel a campos API
   - Definiciones de tipos de atributos
   - No usa APIs de Node.js ✓

3. **`buildNestedObjects.ts`**
   - Construye objetos anidados desde estructura plana
   - No usa APIs de Node.js ✓

4. **`chunks.ts`**
   - Divide arrays en chunks
   - No usa APIs de Node.js ✓

5. **`parseExcelRecord.ts`**
   - Parsea y valida registros de Excel
   - No usa APIs de Node.js ✓

6. **`parsers.ts`** (a través de parseExcelRecord)
   - Funciones de parseo de datos
   - Validación de tipos
   - No usa APIs de Node.js ✓

7. **`replaceValues.ts`** (a través de parseExcelRecord)
   - Reemplaza valores basados en mapeos
   - No usa APIs de Node.js ✓

## 🌐 Adaptaciones para Browser

Solo se crearon versiones específicas del navegador para funciones que usan APIs de Node.js:

### `ui/src/utils/browserHelpers.ts`

Contiene las **únicas** funciones específicas del navegador:

1. **`readExcelRowsBrowser(file: File)`**
   - Reemplaza: `readExcelRows.ts` (usa `fs` de Node.js)
   - Usa: `read-excel-file` (versión browser)
   - Lee archivos desde el objeto `File` del navegador

2. **`exportJsonToExcelBrowser(data, fileName)`**
   - Reemplaza: `exportJsonToSheet.ts` (usa `fs` de Node.js)
   - Usa: `xlsx` (librería universal)
   - Descarga archivos usando `XLSX.writeFile` del navegador

3. **`insertPromissoryNote(...)`** (en scriptRunner.ts)
   - Usa: `fetch` API del navegador
   - Misma lógica que el original pero con fetch en vez de otra librería HTTP

## 📁 Estructura de Archivos

### Eliminados (Duplicados) ❌

- ~~`ui/src/utils/attributes.ts`~~ → Ahora usa `@helpers/attributes`
- ~~`ui/src/utils/parsers.ts`~~ → Ahora usa `@helpers/parsers` (a través de parseExcelRecord)

### Mantenidos (Específicos del Browser) ✓

- `ui/src/utils/browserHelpers.ts` - Adaptaciones para navegador
- `ui/src/utils/validation.ts` - Orquestador que usa helpers originales
- `ui/src/utils/scriptRunner.ts` - Usa `chunks` original y fetch del navegador

## 🔍 Flujo de Validación

```
Usuario carga archivo
        ↓
readExcelRowsBrowser (browser-specific)
        ↓
arrayToObject (@helpers/arrayToObject) ← REUTILIZADO
        ↓
parseExcelRecord (@helpers/parseExcelRecord) ← REUTILIZADO
  ├── parsers (@helpers/parsers) ← REUTILIZADO
  ├── replaceValues (@helpers/replaceValues) ← REUTILIZADO
  └── attributes (@helpers/attributes) ← REUTILIZADO
        ↓
buildNestedObjects (@helpers/buildNestedObjects) ← REUTILIZADO
        ↓
Payloads listos para enviar
```

## 🚀 Flujo de Migración

```
Payloads validados
        ↓
chunks (@helpers/chunks) ← REUTILIZADO
        ↓
insertPromissoryNote (fetch API del browser)
        ↓
exportJsonToExcelBrowser (browser-specific)
        ↓
Usuario descarga reportes
```

## 📊 Métricas de Reutilización

- **Funciones reutilizadas:** 7 archivos completos
- **Funciones adaptadas:** 3 funciones específicas del browser
- **Reducción de código duplicado:** ~90%
- **Mantenibilidad:** ✓ Cambios en el script original se reflejan automáticamente

## 🔧 Mantenimiento

### Para actualizar validaciones o parsers:

1. Editar **solo** en `src/_helpers/`
2. Los cambios se aplican automáticamente a:
   - Script CLI (Node.js)
   - UI (Browser)

### Para agregar nueva funcionalidad del browser:

1. Si usa APIs de Node.js → Agregar en `ui/src/utils/browserHelpers.ts`
2. Si es lógica universal → Agregar en `src/_helpers/` y reutilizar

## ✅ Ventajas

1. **Single Source of Truth:** La lógica de validación está en un solo lugar
2. **Mantenibilidad:** Cambios una vez, actualizan ambos entornos
3. **Consistencia:** Mismo comportamiento en CLI y UI
4. **Menos bugs:** Menos código duplicado = menos probabilidad de errores
5. **Performance:** El bundler optimiza automáticamente las importaciones

## 🎯 Conclusión

La UI ahora es una **capa delgada sobre el script original**, solo adaptando lo mínimo necesario para el navegador. Esto garantiza que las validaciones, parseos y lógica de negocio sean idénticas en ambos entornos.

