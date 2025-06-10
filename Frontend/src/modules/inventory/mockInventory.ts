export interface Movement {
  date: string;
  type: 'entry' | 'exit' | 'transfer' | 'adjust';
  quantity: number;
  user: string;
  note?: string;
}

export interface Product {
  id: number;
  sku: string;
  barcode?: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  size?: string;
  color?: string;
  weight?: number;
  stock: number;
  minStock: number;
  maxStock: number;
  location: string;
  serialNumber?: string;
  batch?: string;
  expiryDate?: string;
  movements: Movement[];
  cost: number;
  price: number;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    sku: 'P-1001',
    barcode: '1234567890123',
    name: 'Laptop Pro 15"',
    description: 'Laptop de alto rendimiento para profesionales.',
    category: 'Tecnología',
    brand: 'Bonfire',
    size: '15"',
    color: 'Gris',
    weight: 1.8,
    stock: 12,
    minStock: 5,
    maxStock: 20,
    location: 'A1-01',
    serialNumber: 'SN12345',
    batch: 'L001',
    movements: [
      { date: '2025-06-01', type: 'entry', quantity: 10, user: 'admin' },
      { date: '2025-06-05', type: 'exit', quantity: 3, user: 'ventas', note: 'Orden #45' },
    ],
    cost: 800,
    price: 1200,
  },
  {
    id: 2,
    sku: 'P-2001',
    barcode: '7894561230123',
    name: 'Teléfono X',
    description: 'Smartphone de última generación.',
    category: 'Tecnología',
    brand: 'Bonfire',
    color: 'Negro',
    weight: 0.2,
    stock: 50,
    minStock: 20,
    maxStock: 100,
    location: 'A1-05',
    batch: 'T2024',
    movements: [
      { date: '2025-06-02', type: 'entry', quantity: 50, user: 'admin' },
      { date: '2025-06-06', type: 'exit', quantity: 5, user: 'ventas' },
    ],
    cost: 300,
    price: 500,
  },
  {
    id: 3,
    sku: 'P-3001',
    barcode: '9876543210987',
    name: 'Silla Ergonómica',
    description: 'Silla ajustable para oficina.',
    category: 'Mobiliario',
    brand: 'Comfort',
    color: 'Negro',
    stock: 30,
    minStock: 10,
    maxStock: 40,
    location: 'B2-03',
    movements: [
      { date: '2025-05-20', type: 'entry', quantity: 30, user: 'admin' },
      { date: '2025-06-03', type: 'exit', quantity: 2, user: 'ventas' },
    ],
    cost: 70,
    price: 120,
  },
  {
    id: 4,
    sku: 'P-4001',
    name: 'Café Molido 1kg',
    description: 'Empaque de café de alta calidad.',
    category: 'Alimentos',
    brand: 'Panama Beans',
    weight: 1,
    stock: 80,
    minStock: 30,
    maxStock: 150,
    location: 'C1-02',
    batch: 'CAF2025',
    expiryDate: '2026-01-01',
    movements: [
      { date: '2025-06-01', type: 'entry', quantity: 80, user: 'admin' },
    ],
    cost: 5,
    price: 8,
  },
  {
    id: 5,
    sku: 'P-5001',
    name: 'Camisa Polo',
    description: 'Camisa polo de algodón.',
    category: 'Ropa',
    brand: 'Bonfire Wear',
    size: 'M',
    color: 'Azul',
    stock: 25,
    minStock: 10,
    maxStock: 60,
    location: 'D4-01',
    movements: [
      { date: '2025-05-15', type: 'entry', quantity: 25, user: 'admin' },
    ],
    cost: 12,
    price: 25,
  },
];