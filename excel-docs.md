# 📋 Guía para Construir el Archivo Excel de Pagarés

Esta guía explica cómo crear correctamente el archivo Excel que el script necesita para migrar pagarés a Cavali. Está diseñada para personas no técnicas del equipo de operaciones.

---

## 📌 Requisitos Generales

- **Formato del archivo**: `.xlsx` (Excel moderno)
- **Primera fila**: Debe contener exactamente los nombres de las columnas especificadas abajo
- **Filas siguientes**: Cada fila representa un pagaré diferente
- **Espacios en columnas**: Los nombres de columnas pueden tener espacios o guiones bajos (el script los convierte automáticamente)

---

## 📊 Columnas del Excel

### ✅ Columnas OBLIGATORIAS

Estas columnas son **absolutamente necesarias** para todos los pagarés:

| Columna | Descripción | Formato | Ejemplo |
|---------|-------------|---------|---------|
| **ID_Contrato** | Identificador único del contrato | Texto de hasta 100 caracteres | `77db2a80-d64a-11ee-b6e0-49d3b3f545cee1` |
| **Numero_Documento** | Número de documento del cliente (DNI o RUC) | Solo números, entre 7-15 dígitos | `20570774337` |

### 📝 Columnas RECOMENDADAS

Estas columnas no son obligatorias, pero se recomienda completarlas para evitar valores aleatorios:

| Columna | Descripción | Formato | Ejemplo | Valor por defecto si está vacía |
|---------|-------------|---------|---------|--------------------------------|
| **Condicion_Pagare** | Condición del pagaré | `SI` o `NO` (sin acentos) | `SI` | `NO` |
| **Moneda** | Tipo de moneda | `s/.`, `s/`, `us$` o `$` | `$` | `s/.` (Soles) |
| **Tipo_Documento** | Tipo de documento | `dni`, `ruc`, o `carnet de extranjeria` | `ruc` | `dni` |
| **Numero_Credito** | Número de crédito | Número entero | `202402655` | Número aleatorio |
| **Codigo_Cliente** | Código único del cliente | Número entero | `20570774337` | Se usa el Numero_Documento |

### 🔢 Columnas de NÚMEROS Y FECHAS

| Columna | Descripción | Formato | Ejemplo | ¿Obligatoria? |
|---------|-------------|---------|---------|---------------|
| **Banca** | Código de banca | Número entero | `4` | Opcional |
| **Producto** | Código de producto | Número entero | `41` | Opcional |
| **Monto** | Monto del pagaré | Número decimal | `11000.41` | Opcional |
| **Fecha_De_Expiracion** | Fecha de vencimiento | Fecha de Excel (día/mes/año) | `19/01/2025` | Opcional |
| **Fecha_Desembolso** | Fecha de desembolso | Fecha de Excel (día/mes/año) | `19/01/2024` | Opcional |

### 👤 Columnas de INFORMACIÓN DEL CLIENTE

| Columna | Descripción | Formato | Ejemplo | Longitud máxima |
|---------|-------------|---------|---------|-----------------|
| **Nombre_Cliente** | Nombre o razón social del cliente | Texto | `CONSORCIO DE TECNOLOGIA E INFORMACION S.A.C.` | 100 caracteres |
| **Estado_Civil** | Estado civil del cliente (solo personas naturales) | `soltero`, `casado`, `divorciado`, `viudo` | `casado` | - |
| **Domicilio** | Dirección del cliente | Texto | `CAL.SAN MARTIN NRO. 1439 CENTRO JAEN` | 100 caracteres |
| **Lugar_Desembolso** | Lugar donde se desembolsó | Texto | `LIMA` | 50 caracteres |

### 👔 Columnas de REPRESENTANTES LEGALES (del cliente)

El cliente puede tener hasta **3 representantes legales**:

| Columna | Descripción | Formato | Ejemplo | Longitud máxima |
|---------|-------------|---------|---------|-----------------|
| **Nombre_Representante_1** | Nombre del primer representante | Texto | `ARIANNE NICOLE RODRIGUEZ MUÑOZ` | 100 caracteres |
| **Documento_Representante_1** | DNI del primer representante | Solo números, 7-15 dígitos | `72928067` | - |
| **Nombre_Representante_2** | Nombre del segundo representante | Texto | - | 100 caracteres |
| **Documento_Representante_2** | DNI del segundo representante | Solo números, 7-15 dígitos | - | - |
| **Nombre_Representante_3** | Nombre del tercer representante | Texto | - | 100 caracteres |
| **Documento_Representante_3** | DNI del tercer representante | Solo números, 7-15 dígitos | - | - |

### 🛡️ Columnas de AVALES/GARANTES

Puedes tener hasta **3 avales** por pagaré. Cada aval puede tener a su vez hasta **3 representantes legales**.

#### Aval 1

| Columna | Descripción | Formato | Ejemplo |
|---------|-------------|---------|---------|
| **Nombre_Aval_1** | Nombre del primer aval | Texto (máx 100 caracteres) | `Erick Rodriguez Martínez` |
| **Documento_Aval_1** | Documento del primer aval | Solo números, 7-15 dígitos | `10000705` |
| **Estado_Civil_Aval_1** | Estado civil del aval | `soltero`, `casado`, `divorciado`, `viudo` | `casado` |
| **Domicilio_Aval_1** | Dirección del aval | Texto (máx 100 caracteres) | - |
| **Nombre_Representante_1_Aval_1** | Nombre del primer representante del aval 1 | Texto (máx 100 caracteres) | - |
| **Documento_Representante_1_Aval_1** | Documento del primer representante del aval 1 | Solo números, 7-15 dígitos | - |
| **Nombre_Representante_2_Aval_1** | Nombre del segundo representante del aval 1 | Texto (máx 100 caracteres) | - |
| **Documento_Representante_2_Aval_1** | Documento del segundo representante del aval 1 | Solo números, 7-15 dígitos | - |
| **Nombre_Representante_3_Aval_1** | Nombre del tercer representante del aval 1 | Texto (máx 100 caracteres) | - |
| **Documento_Representante_3_Aval_1** | Documento del tercer representante del aval 1 | Solo números, 7-15 dígitos | - |

#### Aval 2

| Columna | Descripción | Formato |
|---------|-------------|---------|
| **Nombre_Aval_2** | Nombre del segundo aval | Texto (máx 100 caracteres) |
| **Documento_Aval_2** | Documento del segundo aval | Solo números, 7-15 dígitos |
| **Estado_Civil_Aval_2** | Estado civil del aval | `soltero`, `casado`, `divorciado`, `viudo` |
| **Domicilio_Aval_2** | Dirección del aval | Texto (máx 100 caracteres) |
| **Nombre_Representante_1_Aval_2** | Nombre del primer representante del aval 2 | Texto (máx 100 caracteres) |
| **Documento_Representante_1_Aval_2** | Documento del primer representante del aval 2 | Solo números, 7-15 dígitos |
| **Nombre_Representante_2_Aval_2** | Nombre del segundo representante del aval 2 | Texto (máx 100 caracteres) |
| **Documento_Representante_2_Aval_2** | Documento del segundo representante del aval 2 | Solo números, 7-15 dígitos |
| **Nombre_Representante_3_Aval_2** | Nombre del tercer representante del aval 2 | Texto (máx 100 caracteres) |
| **Documento_Representante_3_Aval_2** | Documento del tercer representante del aval 2 | Solo números, 7-15 dígitos |

#### Aval 3

| Columna | Descripción | Formato |
|---------|-------------|---------|
| **Nombre_Aval_3** | Nombre del tercer aval | Texto (máx 100 caracteres) |
| **Documento_Aval_3** | Documento del tercer aval | Solo números, 7-15 dígitos |
| **Estado_Civil_Aval_3** | Estado civil del aval | `soltero`, `casado`, `divorciado`, `viudo` |
| **Domicilio_Aval_3** | Dirección del aval | Texto (máx 100 caracteres) |
| **Nombre_Representante_1_Aval_3** | Nombre del primer representante del aval 3 | Texto (máx 100 caracteres) |
| **Documento_Representante_1_Aval_3** | Documento del primer representante del aval 3 | Solo números, 7-15 dígitos |
| **Nombre_Representante_2_Aval_3** | Nombre del segundo representante del aval 3 | Texto (máx 100 caracteres) |
| **Documento_Representante_2_Aval_3** | Documento del segundo representante del aval 3 | Solo números, 7-15 dígitos |
| **Nombre_Representante_3_Aval_3** | Nombre del tercer representante del aval 3 | Texto (máx 100 caracteres) |
| **Documento_Representante_3_Aval_3** | Documento del tercer representante del aval 3 | Solo números, 7-15 dígitos |

---

## ⚠️ Reglas IMPORTANTES

### 1. Nombres de Columnas

- **Los nombres de las columnas DEBEN ser exactos** (pueden llevar espacios o guiones bajos)
- Estos nombres son válidos: `ID_Contrato`, `ID Contrato`
- **Mayúsculas y minúsculas NO importan**: `id_contrato`, `ID_CONTRATO`, `Id_Contrato` son iguales
- **La primera fila siempre debe tener los nombres de columnas**

### 2. Formato de Datos

#### 📝 Textos
- No exceder la longitud máxima (50 o 100 caracteres según la columna)
- Se permiten acentos y caracteres especiales
- Los saltos de línea dentro de una celda serán eliminados automáticamente

#### 🔢 Números de Documento
- **Solo números**: NO incluir guiones, puntos o espacios
- ✅ Correcto: `20570774337`
- ❌ Incorrecto: `20.570.774-337` o `20 570 774 337`
- Longitud: entre 7 y 15 dígitos
- **Nota especial**: Si el DNI tiene 7 dígitos, el script agregará automáticamente un `0` al inicio

#### 💰 Moneda
Estos valores son aceptados (no importa mayúsculas/minúsculas):
- Para **Soles**: `s/.`, `s/`, `S/.`, `S/`
- Para **Dólares**: `us$`, `$`, `US$`, `USD`

#### 📅 Fechas
- Usa el formato de fecha de Excel (por ejemplo: `19/01/2025`)
- Excel las convierte automáticamente al formato interno
- El script acepta fechas en formato `YYYY-MM-DD` o números seriales de Excel

#### 🔘 Estado Civil
Valores permitidos (no importa mayúsculas/minúsculas):
- `soltero`
- `casado`
- `divorciado`
- `viudo` (ojo: sin "d" al final)

#### 📋 Tipo de Documento
Valores permitidos:
- `dni` - Para personas naturales peruanas
- `ruc` - Para personas jurídicas o naturales con negocio
- `carnet de extranjeria` - Para extranjeros

#### ✓ Condición del Pagaré
Valores permitidos:
- `SI` - Solo firma
- `NO` - Requiere condiciones adicionales

### 3. Celdas Vacías

- **Puedes dejar celdas vacías** para columnas opcionales
- Si dejas vacía una columna recomendada, el script usará un valor por defecto
- Nunca dejes vacías las columnas obligatorias (`ID_Contrato`, `Numero_Documento`)

### 4. Avales

- **Un aval solo se incluirá si tiene `Documento_Aval_X` completado**
- Si no completas `Documento_Aval_1`, el aval 1 NO se enviará (aunque llenes el nombre)
- Puedes tener 0, 1, 2 o 3 avales por pagaré
- No es necesario llenar todos los representantes de un aval

---

## 📝 Ejemplo de Fila Completa

```
ID_Contrato: 77db2a80-d64a-11ee-b6e0-49d3b3f545cee1
Condicion_Pagare: SI
Numero_Credito: 202402655
Banca: 4
Producto: 41
Moneda: $
Fecha_De_Expiracion: 19/01/2025
Nombre_Cliente: CONSORCIO DE TECNOLOGIA E INFORMACION S.A.C.
Estado_Civil: (vacío, porque es empresa)
Tipo_Documento: ruc
Numero_Documento: 20570774337
Domicilio: CAL.SAN MARTIN NRO. 1439 CENTRO JAEN, provincia de JAEN y departamento de CAJAMARCA
Fecha_Desembolso: 19/01/2024
Lugar_Desembolso: LIMA
Monto: 11000.41
Nombre_Representante_1: ARIANNE NICOLE RODRIGUEZ MUÑOZ
Documento_Representante_1: 72928067
Nombre_Aval_1: Erick Rodriguez Martínez
Documento_Aval_1: 10000705
Nombre_Aval_2: Mery Arleny Muñoz Vasquez
Documento_Aval_2: 10268648
(todas las demás columnas vacías)
```

---

## ❌ Errores Comunes

### 1. Error: "document number must contain only numeric characters"
**Causa**: El número de documento tiene guiones, puntos o espacios  
**Solución**: Usar solo números. Cambiar `20.570.774-337` por `20570774337`

### 2. Error: "document number must be between 7 and 15 characters"
**Causa**: El documento es muy corto o muy largo  
**Solución**: Verificar que el número de documento tenga entre 7 y 15 dígitos

### 3. Error: "the field must have 100 characters maximum"
**Causa**: Un texto excede los 100 caracteres  
**Solución**: Acortar el texto (por ejemplo, en direcciones muy largas)

### 4. Error: "invalid integer"
**Causa**: Se puso texto en una columna que debe ser número (Banca, Producto, Numero_Credito)  
**Solución**: Verificar que solo haya números en esas columnas

### 5. Error: "required string"
**Causa**: Falta completar una columna obligatoria  
**Solución**: Completar `ID_Contrato` y `Numero_Documento` en todas las filas

---

## ✅ Checklist Antes de Enviar el Excel

- [ ] La primera fila tiene los nombres de todas las columnas
- [ ] Cada fila representa un pagaré diferente
- [ ] Todas las filas tienen `ID_Contrato` y `Numero_Documento`
- [ ] Los números de documento solo contienen dígitos (sin puntos, guiones o espacios)
- [ ] Las fechas están en formato de Excel
- [ ] Los valores de moneda son: `s/.`, `s/`, `us$` o `$`
- [ ] Los valores de estado civil son: `soltero`, `casado`, `divorciado` o `viudo`
- [ ] Los valores de tipo de documento son: `dni`, `ruc` o `carnet de extranjeria`
- [ ] Los valores de condición son: `SI` o `NO`
- [ ] Los textos no exceden 100 caracteres (50 para Lugar_Desembolso)
- [ ] Si hay avales, tienen al menos el `Documento_Aval_X` completado

---

## 🔍 ¿Cómo Saber si Hubo Errores?

Cuando ejecutes el script:

1. **Si hay errores de validación**: Se generará un archivo Excel con el nombre `[cliente]-errors-[fecha]-batch[número].xlsx`
   - Este archivo contiene:
     - `row`: Número de fila donde ocurrió el error
     - `message`: Descripción del error

2. **Si todo va bien**: Se generará un archivo con los resultados: `[cliente]-responses-[fecha]-batch-[número]-e-[errores]-s-[exitosos]-d-[duplicados]-sk-[saltados].xlsx`
   - `e`: Número de errores de la API
   - `s`: Número de pagarés enviados exitosamente
   - `d`: Número de pagarés duplicados
   - `sk`: Número de pagarés saltados (por filtros de configuración)

---

## 💡 Consejos

1. **Usa el archivo de plantilla**: En la carpeta `files/` hay ejemplos de archivos Excel correctos que puedes usar como base

2. **Copia el formato**: Es más fácil copiar un Excel que ya funcionó y solo cambiar los datos

3. **Revisa los errores uno por uno**: Si el script genera un archivo de errores, revísalo línea por línea. Cada error te dice exactamente qué está mal y en qué fila

4. **Prueba con pocas filas primero**: Antes de enviar 1000 pagarés, prueba con 5-10 filas para verificar que todo esté bien

5. **DNIs de 7 dígitos**: No te preocupes por agregar el 0 inicial, el script lo hace automáticamente

6. **Celdas vacías están bien**: No llenes con "N/A" o "-" las celdas vacías, déjalas completamente vacías

7. **Consistencia en el formato**: Mantén el mismo formato en toda la columna (por ejemplo, si usas `$` para dólares, úsalo en todos los registros)

---

**Última actualización**: Octubre 2025  
**Versión del script**: TypeScript v1.0

