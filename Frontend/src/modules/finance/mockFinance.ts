export interface Transaction {
  id: number;
  date: string;
  type: 'ingreso' | 'gasto';
  categoria: string;
  monto: number;
  descripcion?: string;
  metodo: string;
  estado: 'pendiente' | 'pagado';
  sucursal?: string;
  conciliado?: boolean;
}

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    date: '2025-05-01',
    type: 'ingreso',
    categoria: 'Ventas',
    monto: 1500,
    metodo: 'Efectivo',
    estado: 'pagado',
    sucursal: 'Sucursal A',
    conciliado: true,
  },
  {
    id: 2,
    date: '2025-05-03',
    type: 'gasto',
    categoria: 'Servicios',
    monto: 300,
    metodo: 'Tarjeta',
    estado: 'pagado',
    sucursal: 'Sucursal A',
    conciliado: true,
  },
  {
    id: 3,
    date: '2025-05-04',
    type: 'gasto',
    categoria: 'Nomina',
    monto: 800,
    metodo: 'Transferencia',
    estado: 'pendiente',
    sucursal: 'Sucursal B',
    conciliado: false,
  },
  {
    id: 4,
    date: '2025-05-05',
    type: 'ingreso',
    categoria: 'Servicios',
    monto: 700,
    metodo: 'Transferencia',
    estado: 'pagado',
    sucursal: 'Sucursal B',
    conciliado: false,
  },
];

export interface BankEntry {
  id: number;
  date: string;
  descripcion: string;
  monto: number;
  conciliado?: boolean;
}

export const mockBank: BankEntry[] = [
  { id: 1, date: '2025-05-01', descripcion: 'Depósito ventas', monto: 1500 },
  { id: 2, date: '2025-05-03', descripcion: 'Pago servicios', monto: -300 },
  { id: 3, date: '2025-05-06', descripcion: 'Pago nómina', monto: -800 },
];

export interface Budget {
  categoria: string;
  monto: number;
  periodo: 'Mensual' | 'Trimestral' | 'Anual';
  gastoReal: number;
}

export const mockBudgets: Budget[] = [
  { categoria: 'Servicios', monto: 1000, periodo: 'Mensual', gastoReal: 300 },
  { categoria: 'Nomina', monto: 2000, periodo: 'Mensual', gastoReal: 800 },
  { categoria: 'Marketing', monto: 1500, periodo: 'Mensual', gastoReal: 1200 },
];