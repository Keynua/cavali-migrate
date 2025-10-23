/**
 * Unit tests for getPayloads function.
 * Tests various scenarios including valid data, validation errors, and edge cases.
 */

import { describe, it, expect } from 'vitest';
import { getPayloads } from '../../src/_helpers/getPayloads';

describe('getPayloads', () => {

  describe('successful payload generation', () => {
    it('should process a valid row with minimal required fields', async () => {
      // Mock Excel data with headers and one valid row
      const mockExcelData = [
        // Headers
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
        ],
        // Data row
        ['CONTRACT001', '12345678', 'Juan Perez', '2023-01-15', 1000],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      expect(result.payloads[0]).toMatchObject({
        contractId: 'CONTRACT001',
        promissoryNote: {
          numberDocument: '12345678',
          clientName: 'Juan Perez',
          issuedDate: '2023-01-15',
          amount: 1000,
          special: 2,
          typeDocument: 1, // Default to DNI
          conditionJustSign: 2, // Default to NO
          currency: 1, // Default to Soles
          uniqueCode: 12345678, // Parsed from numberDocument
        },
      });
      // Check that creditNumber is a random number
      expect(result.payloads[0].promissoryNote.creditNumber).toBeGreaterThan(0);
    });

    it('should process a complete row with all fields', async () => {
      const mockExcelData = [
        // Headers
        [
          'ID Contrato',
          'Condicion Pagare',
          'Tipo Documento',
          'Numero Documento',
          'Nombre Cliente',
          'Estado Civil',
          'Domicilio',
          'Fecha Desembolso',
          'Lugar Desembolso',
          'Fecha De Expiracion',
          'Monto',
          'Moneda',
          'Numero Credito',
          'Codigo Cliente',
          'Banca',
          'Producto',
          'Nombre Representante 1',
          'Documento Representante 1',
        ],
        // Data row
        [
          'CONTRACT002',
          'si',
          'dni',
          '87654321',
          'Maria Lopez',
          'casado',
          'Av. Siempre Viva 123',
          '2023-02-20',
          'Lima',
          '2024-02-20',
          5000,
          's/.',
          12345,
          999,
          1,
          2,
          'Carlos Lopez',
          '11223344',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      expect(result.payloads[0]).toMatchObject({
        contractId: 'CONTRACT002',
        promissoryNote: {
          conditionJustSign: 1, // si = 1
          typeDocument: 1, // dni = 1
          numberDocument: '87654321',
          clientName: 'Maria Lopez',
          civilStatus: 2, // casado = 2
          domicile: 'Av. Siempre Viva 123',
          issuedDate: '2023-02-20',
          issuedPlace: 'Lima',
          expirationDate: '2024-02-20',
          amount: 5000,
          currency: 1, // s/. = 1
          creditNumber: 12345,
          uniqueCode: 999,
          banking: 1,
          product: 2,
          nameLegalRepresentativeOne: 'Carlos Lopez',
          numberDocumentOne: '11223344',
          special: 2,
        },
      });
    });

    it('should process a row with one guarantor (aval)', async () => {
      const mockExcelData = [
        // Headers
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
          'Documento Aval 1',
          'Nombre Aval 1',
          'Estado Civil Aval 1',
          'Domicilio Aval 1',
        ],
        // Data row
        [
          'CONTRACT003',
          '11111111',
          'Pedro Garcia',
          '2023-03-01',
          2000,
          '22222222',
          'Ana Garcia',
          'soltero',
          'Jr. Test 456',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail).toHaveLength(1);
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail![0]).toMatchObject({
        numberDocument: '22222222',
        businessName: 'Ana Garcia',
        civilStatus: 1, // soltero = 1
        domicile: 'Jr. Test 456',
      });
    });

    it('should process a row with multiple guarantors', async () => {
      const mockExcelData = [
        // Headers
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
          'Documento Aval 1',
          'Nombre Aval 1',
          'Documento Aval 2',
          'Nombre Aval 2',
          'Documento Aval 3',
          'Nombre Aval 3',
        ],
        // Data row
        [
          'CONTRACT004',
          '33333333',
          'Luis Martinez',
          '2023-04-01',
          3000,
          '44444444',
          'Aval One',
          '55555555',
          'Aval Two',
          '66666666',
          'Aval Three',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail).toHaveLength(3);
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail![0].numberDocument).toBe('44444444');
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail![1].numberDocument).toBe('55555555');
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail![2].numberDocument).toBe('66666666');
    });

    it('should only include guarantors with document numbers', async () => {
      const mockExcelData = [
        // Headers
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
          'Documento Aval 1',
          'Nombre Aval 1',
          'Documento Aval 2',
          'Nombre Aval 2',
        ],
        // Data row - aval2 has name but no document
        [
          'CONTRACT005',
          '77777777',
          'Sofia Ramirez',
          '2023-05-01',
          4000,
          '88888888',
          'Aval One',
          null,
          'Aval Two Without Doc',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      // Only aval1 should be included (has document number)
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail).toHaveLength(1);
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail![0].numberDocument).toBe('88888888');
    });

    it('should process multiple valid rows', async () => {
      const mockExcelData = [
        // Headers
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        // Row 1
        ['CONTRACT006', '10000001', 'Cliente Uno', '2023-06-01', 1000],
        // Row 2
        ['CONTRACT007', '10000002', 'Cliente Dos', '2023-06-02', 2000],
        // Row 3
        ['CONTRACT008', '10000003', 'Cliente Tres', '2023-06-03', 3000],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(3);
      expect(result.payloads[0].contractId).toBe('CONTRACT006');
      expect(result.payloads[1].contractId).toBe('CONTRACT007');
      expect(result.payloads[2].contractId).toBe('CONTRACT008');
    });

    it('should handle different currency formats', async () => {
      const mockExcelData = [
        // Headers
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto', 'Moneda'],
        // Row 1 - Soles with s/.
        ['CONTRACT009', '20000001', 'Cliente A', '2023-07-01', 1000, 's/.'],
        // Row 2 - Soles with s/
        ['CONTRACT010', '20000002', 'Cliente B', '2023-07-02', 2000, 's/'],
        // Row 3 - Dollars with us$
        ['CONTRACT011', '20000003', 'Cliente C', '2023-07-03', 3000, 'us$'],
        // Row 4 - Dollars with $
        ['CONTRACT012', '20000004', 'Cliente D', '2023-07-04', 4000, '$'],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(4);
      expect(result.payloads[0].promissoryNote.currency).toBe(1); // s/.
      expect(result.payloads[1].promissoryNote.currency).toBe(1); // s/
      expect(result.payloads[2].promissoryNote.currency).toBe(2); // us$
      expect(result.payloads[3].promissoryNote.currency).toBe(2); // $
    });
  });

  describe('validation and error handling', () => {
    it('should collect validation errors for invalid rows', async () => {
      const mockExcelData = [
        // Headers
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        // Invalid row - Nombre_Cliente is too long (max 100 chars)
        ['CONTRACT013', '12345678', 'A'.repeat(150), '2023-08-01', 1000],
      ];

      const result = await getPayloads(mockExcelData);

      // Should have errors
      expect(result.errors.length).toBeGreaterThan(0);
      // Should not create payload for invalid row
      expect(result.payloads).toHaveLength(0);
    });

    it('should continue processing valid rows after encountering invalid ones', async () => {
      const mockExcelData = [
        // Headers
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        // Valid row
        ['CONTRACT014', '30000001', 'Valid Client 1', '2023-09-01', 1000],
        // Invalid row - Domicilio is too long (exceeds max length)
        ['CONTRACT015', '30000002', 'B'.repeat(150), '2023-09-02', 2000],
        // Valid row
        ['CONTRACT016', '30000003', 'Valid Client 2', '2023-09-03', 3000],
      ];

      const result = await getPayloads(mockExcelData);

      // Should have errors from the invalid row
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].row).toBe(2); // Second data row (1-indexed)
      
      // Should still process the 2 valid rows
      expect(result.payloads).toHaveLength(2);
      expect(result.payloads[0].contractId).toBe('CONTRACT014');
      expect(result.payloads[1].contractId).toBe('CONTRACT016');
    });

    it('should handle empty data array', async () => {
      const mockExcelData: any[][] = [];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(0);
    });

    it('should handle empty Excel file', async () => {
      const mockExcelData: any[][] = [];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(0);
    });

    it('should handle Excel file with only headers', async () => {
      const mockExcelData = [
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        // No data rows
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(0);
    });
  });

  describe('business rules and defaults', () => {
    it('should always set special to 2', async () => {
      const mockExcelData = [
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        ['CONTRACT017', '40000001', 'Test Client', '2023-10-01', 1000],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.payloads[0].promissoryNote.special).toBe(2);
    });

    it('should default typeDocument to 1 (DNI) when not provided', async () => {
      const mockExcelData = [
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        ['CONTRACT018', '50000001', 'Test Client', '2023-11-01', 1000],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.payloads[0].promissoryNote.typeDocument).toBe(1);
    });

    it('should default conditionJustSign to 2 (NO) when not provided', async () => {
      const mockExcelData = [
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        ['CONTRACT019', '60000001', 'Test Client', '2023-12-01', 1000],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.payloads[0].promissoryNote.conditionJustSign).toBe(2);
    });

    it('should default currency to 1 (Soles) when not provided', async () => {
      const mockExcelData = [
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        ['CONTRACT020', '70000001', 'Test Client', '2024-01-01', 1000],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.payloads[0].promissoryNote.currency).toBe(1);
    });

    it('should generate random creditNumber when not provided', async () => {
      const mockExcelData = [
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        ['CONTRACT021', '80000001', 'Test Client', '2024-02-01', 1000],
      ];

      const result = await getPayloads(mockExcelData);

      const creditNumber = result.payloads[0].promissoryNote.creditNumber;
      expect(creditNumber).toBeGreaterThan(0);
      expect(creditNumber).toBeLessThanOrEqual(99999999);
    });

    it('should use provided creditNumber when available', async () => {
      const mockExcelData = [
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto', 'Numero Credito'],
        ['CONTRACT022', '90000001', 'Test Client', '2024-03-01', 1000, 123456],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.payloads[0].promissoryNote.creditNumber).toBe(123456);
    });

    it('should use numberDocument as uniqueCode when not provided', async () => {
      const mockExcelData = [
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        ['CONTRACT023', '12345678', 'Test Client', '2024-04-01', 1000],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.payloads[0].promissoryNote.uniqueCode).toBe(12345678);
    });

    it('should use provided uniqueCode when available', async () => {
      const mockExcelData = [
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto', 'Codigo Cliente'],
        ['CONTRACT024', '98765432', 'Test Client', '2024-05-01', 1000, 999888],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.payloads[0].promissoryNote.uniqueCode).toBe(999888);
    });
  });

  describe('header normalization', () => {
    it('should normalize headers by replacing spaces with underscores', async () => {
      const mockExcelData = [
        // Headers with spaces (as they come from Excel)
        ['ID Contrato', 'Numero Documento', 'Nombre Cliente', 'Fecha Desembolso', 'Monto'],
        ['CONTRACT025', '11111111', 'Test Client', '2024-06-01', 1000],
      ];

      const result = await getPayloads(mockExcelData);

      // Should successfully process the row (proves headers were normalized)
      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      expect(result.payloads[0].contractId).toBe('CONTRACT025');
    });
  });

  describe('guarantor legal representatives', () => {
    it('should include guarantor legal representatives when provided', async () => {
      const mockExcelData = [
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
          'Documento Aval 1',
          'Nombre Aval 1',
          'Nombre Representante 1 Aval 1',
          'Documento Representante 1 Aval 1',
          'Nombre Representante 2 Aval 1',
          'Documento Representante 2 Aval 1',
        ],
        [
          'CONTRACT026',
          '22222222',
          'Main Client',
          '2024-07-01',
          5000,
          '33333333',
          'Guarantor Company',
          'Rep One',
          '44444444',
          'Rep Two',
          '55555555',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      
      const guarantor = result.payloads[0].promissoryNote.guaranteeDataDetail![0];
      expect(guarantor.nameLegalRepresentativeOne).toBe('Rep One');
      expect(guarantor.numberDocumentOne).toBe('44444444');
      expect(guarantor.nameLegalRepresentativeTwo).toBe('Rep Two');
      expect(guarantor.numberDocumentTwo).toBe('55555555');
    });
  });

  describe('robust guarantor (aval) scenarios', () => {
    it('should handle guarantor with all three legal representatives', async () => {
      const mockExcelData = [
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
          'Documento Aval 1',
          'Nombre Aval 1',
          'Estado Civil Aval 1',
          'Domicilio Aval 1',
          'Nombre Representante 1 Aval 1',
          'Documento Representante 1 Aval 1',
          'Nombre Representante 2 Aval 1',
          'Documento Representante 2 Aval 1',
          'Nombre Representante 3 Aval 1',
          'Documento Representante 3 Aval 1',
        ],
        [
          'CONTRACT027',
          '11111111',
          'Main Client',
          '2024-08-01',
          10000,
          '20000000',
          'Corp Garantizadora S.A.',
          'casado',
          'Av. Principal 100',
          'Pedro Representante',
          '20000001',
          'Juan Representante',
          '20000002',
          'Maria Representante',
          '20000003',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      
      const guarantor = result.payloads[0].promissoryNote.guaranteeDataDetail![0];
      expect(guarantor.numberDocument).toBe('20000000');
      expect(guarantor.businessName).toBe('Corp Garantizadora S.A.');
      expect(guarantor.civilStatus).toBe(2); // casado
      expect(guarantor.domicile).toBe('Av. Principal 100');
      expect(guarantor.nameLegalRepresentativeOne).toBe('Pedro Representante');
      expect(guarantor.numberDocumentOne).toBe('20000001');
      expect(guarantor.nameLegalRepresentativeTwo).toBe('Juan Representante');
      expect(guarantor.numberDocumentTwo).toBe('20000002');
      expect(guarantor.nameLegalRepresentativeThree).toBe('Maria Representante');
      expect(guarantor.numberDocumentThree).toBe('20000003');
    });

    it('should correctly process three guarantors with different data completeness levels', async () => {
      const mockExcelData = [
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
          // Aval 1 - Complete data
          'Documento Aval 1',
          'Nombre Aval 1',
          'Estado Civil Aval 1',
          'Domicilio Aval 1',
          'Nombre Representante 1 Aval 1',
          'Documento Representante 1 Aval 1',
          // Aval 2 - Minimal data (only required fields)
          'Documento Aval 2',
          'Nombre Aval 2',
          // Aval 3 - Medium data (with civil status)
          'Documento Aval 3',
          'Nombre Aval 3',
          'Estado Civil Aval 3',
        ],
        [
          'CONTRACT028',
          '30000000',
          'Cliente Principal',
          '2024-09-01',
          15000,
          // Aval 1
          '30000001',
          'Empresa Aval Uno',
          'soltero',
          'Jr. Comercio 456',
          'Rep Aval Uno',
          '30000011',
          // Aval 2
          '30000002',
          'Persona Aval Dos',
          // Aval 3
          '30000003',
          'Empresa Aval Tres',
          'divorciado',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail).toHaveLength(3);

      // Verify Aval 1 - Complete
      const aval1 = result.payloads[0].promissoryNote.guaranteeDataDetail![0];
      expect(aval1.numberDocument).toBe('30000001');
      expect(aval1.businessName).toBe('Empresa Aval Uno');
      expect(aval1.civilStatus).toBe(1); // soltero
      expect(aval1.domicile).toBe('Jr. Comercio 456');
      expect(aval1.nameLegalRepresentativeOne).toBe('Rep Aval Uno');
      expect(aval1.numberDocumentOne).toBe('30000011');

      // Verify Aval 2 - Minimal
      const aval2 = result.payloads[0].promissoryNote.guaranteeDataDetail![1];
      expect(aval2.numberDocument).toBe('30000002');
      expect(aval2.businessName).toBe('Persona Aval Dos');
      expect(aval2.civilStatus).toBeUndefined();
      expect(aval2.domicile).toBeUndefined();

      // Verify Aval 3 - Medium
      const aval3 = result.payloads[0].promissoryNote.guaranteeDataDetail![2];
      expect(aval3.numberDocument).toBe('30000003');
      expect(aval3.businessName).toBe('Empresa Aval Tres');
      expect(aval3.civilStatus).toBe(3); // divorciado
    });

    it('should handle mixed scenario: some avales with documents and some without', async () => {
      const mockExcelData = [
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
          'Documento Aval 1',
          'Nombre Aval 1',
          'Documento Aval 2',
          'Nombre Aval 2',
          'Documento Aval 3',
          'Nombre Aval 3',
        ],
        [
          'CONTRACT029',
          '40000000',
          'Cliente Test',
          '2024-10-01',
          20000,
          '40000001', // Aval 1 - Has document
          'Aval Con Documento',
          null, // Aval 2 - No document (should be excluded)
          'Aval Sin Documento',
          '40000003', // Aval 3 - Has document
          'Otro Aval Con Documento',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      
      // Should only include avales 1 and 3 (those with documents)
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail).toHaveLength(2);
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail![0].numberDocument).toBe('40000001');
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail![0].businessName).toBe('Aval Con Documento');
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail![1].numberDocument).toBe('40000003');
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail![1].businessName).toBe('Otro Aval Con Documento');
    });

    it('should handle guarantors with partial legal representative information', async () => {
      const mockExcelData = [
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
          'Documento Aval 1',
          'Nombre Aval 1',
          'Nombre Representante 1 Aval 1',
          'Documento Representante 1 Aval 1',
          'Nombre Representante 2 Aval 1',
          'Documento Representante 2 Aval 1',
          'Nombre Representante 3 Aval 1',
          'Documento Representante 3 Aval 1',
          'Documento Aval 2',
          'Nombre Aval 2',
          'Nombre Representante 1 Aval 2',
          'Documento Representante 1 Aval 2',
        ],
        [
          'CONTRACT030',
          '50000000',
          'Cliente Complejo',
          '2024-11-01',
          25000,
          '50000001',
          'Aval Con 3 Reps',
          'Rep 1',
          '50000011',
          'Rep 2',
          '50000012',
          null, // Rep 3 name is null
          '50000013',
          '50000002',
          'Aval Con 1 Rep',
          'Solo Rep 1',
          '50000021',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail).toHaveLength(2);

      // Aval 1 - Has reps 1 and 2, rep 3 name is null but doc exists
      const aval1 = result.payloads[0].promissoryNote.guaranteeDataDetail![0];
      expect(aval1.nameLegalRepresentativeOne).toBe('Rep 1');
      expect(aval1.numberDocumentOne).toBe('50000011');
      expect(aval1.nameLegalRepresentativeTwo).toBe('Rep 2');
      expect(aval1.numberDocumentTwo).toBe('50000012');
      expect(aval1.nameLegalRepresentativeThree).toBeUndefined();
      expect(aval1.numberDocumentThree).toBe('50000013');

      // Aval 2 - Has only rep 1
      const aval2 = result.payloads[0].promissoryNote.guaranteeDataDetail![1];
      expect(aval2.nameLegalRepresentativeOne).toBe('Solo Rep 1');
      expect(aval2.numberDocumentOne).toBe('50000021');
      expect(aval2.nameLegalRepresentativeTwo).toBeUndefined();
      expect(aval2.nameLegalRepresentativeThree).toBeUndefined();
    });

    it('should correctly handle all civil status types across multiple guarantors', async () => {
      const mockExcelData = [
        [
          'ID Contrato',
          'Numero Documento',
          'Nombre Cliente',
          'Fecha Desembolso',
          'Monto',
          'Documento Aval 1',
          'Nombre Aval 1',
          'Estado Civil Aval 1',
          'Documento Aval 2',
          'Nombre Aval 2',
          'Estado Civil Aval 2',
          'Documento Aval 3',
          'Nombre Aval 3',
          'Estado Civil Aval 3',
        ],
        [
          'CONTRACT031',
          '60000000',
          'Cliente Estados Civiles',
          '2024-12-01',
          30000,
          '60000001',
          'Aval Soltero',
          'soltero',
          '60000002',
          'Aval Casado',
          'casado',
          '60000003',
          'Aval Divorciado',
          'divorciado',
        ],
      ];

      const result = await getPayloads(mockExcelData);

      expect(result.errors).toHaveLength(0);
      expect(result.payloads).toHaveLength(1);
      expect(result.payloads[0].promissoryNote.guaranteeDataDetail).toHaveLength(3);

      const avales = result.payloads[0].promissoryNote.guaranteeDataDetail!;
      
      // Verify civil status conversions
      expect(avales[0].civilStatus).toBe(1); // soltero
      expect(avales[0].businessName).toBe('Aval Soltero');
      
      expect(avales[1].civilStatus).toBe(2); // casado
      expect(avales[1].businessName).toBe('Aval Casado');
      
      expect(avales[2].civilStatus).toBe(3); // divorciado
      expect(avales[2].businessName).toBe('Aval Divorciado');
    });
  });
});

