export interface Movement {
  date: string;
  type: 'entry' | 'exit' | 'transfer' | 'adjust';
  quantity: number;
  user: string;
  note?: string;
}

export interface ActionLogEntry {
  id: number;
  date: string;
  user: string;
  action: string;
  description: string;
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
  archived: boolean;
  movements: Movement[];
  history: ActionLogEntry[];
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
    archived: false,
    history: [],
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
    archived: false,
    history: [],
  },
  {
    id: 3,
    sku: 'P-3001',
    barcode: '9876543210987',
    name: 'Auriculares Bluetooth Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido.',
    category: 'Audio',
    brand: 'SoundWave',
    color: 'Blanco',
    weight: 0.3,
    stock: 35,
    minStock: 10,
    maxStock: 50,
    location: 'B2-03',
    serialNumber: 'AUR001',
    batch: 'A2025',
    movements: [
      { date: '2025-06-03', type: 'entry', quantity: 40, user: 'admin' },
      { date: '2025-06-07', type: 'exit', quantity: 5, user: 'ventas', note: 'Promoción especial' },
    ],
    cost: 80,
    price: 150,
    archived: false,
    history: [],
  },
  {
    id: 4,
    sku: 'P-4001',
    barcode: '5555666677778',
    name: 'Monitor 4K 27"',
    description: 'Monitor UHD para diseño gráfico y gaming.',
    category: 'Tecnología',
    brand: 'ViewMax',
    size: '27"',
    color: 'Negro',
    weight: 5.2,
    stock: 8,
    minStock: 3,
    maxStock: 15,
    location: 'C1-02',
    serialNumber: 'MON4K001',
    batch: 'M2025',
    movements: [
      { date: '2025-05-28', type: 'entry', quantity: 10, user: 'admin' },
      { date: '2025-06-04', type: 'exit', quantity: 2, user: 'ventas', note: 'Venta corporativa' },
    ],
    cost: 400,
    price: 650,
    archived: false,
    history: [],
  },
  {
    id: 5,
    sku: 'P-5001',
    barcode: '1111222233334',
    name: 'Teclado Mecánico RGB',
    description: 'Teclado gaming con switches mecánicos y retroiluminación.',
    category: 'Accesorios',
    brand: 'GameTech',
    color: 'Negro',
    weight: 1.1,
    stock: 25,
    minStock: 8,
    maxStock: 40,
    location: 'B1-07',
    batch: 'TEC2025',
    movements: [
      { date: '2025-06-01', type: 'entry', quantity: 30, user: 'admin' },
      { date: '2025-06-08', type: 'exit', quantity: 5, user: 'ventas' },
    ],
    cost: 60,
    price: 120,
    archived: false,
    history: [],
  },
  {
    id: 6,
    sku: 'P-6001',
    barcode: '8888999900001',
    name: 'Tablet 10" Wi-Fi',
    description: 'Tablet para entretenimiento y productividad básica.',
    category: 'Tecnología',
    brand: 'TabletCorp',
    size: '10"',
    color: 'Azul',
    weight: 0.5,
    stock: 18,
    minStock: 5,
    maxStock: 30,
    location: 'A2-04',
    serialNumber: 'TAB10001',
    batch: 'T2025B',
    movements: [
      { date: '2025-05-30', type: 'entry', quantity: 20, user: 'admin' },
      { date: '2025-06-09', type: 'exit', quantity: 2, user: 'ventas', note: 'Regalo corporativo' },
    ],
    cost: 200,
    price: 350,
    archived: false,
    history: [],
  },
  {
    id: 7,
    sku: 'P-7001',
    barcode: '4444555566667',
    name: 'Cámara Web HD',
    description: 'Cámara web 1080p para videoconferencias.',
    category: 'Accesorios',
    brand: 'WebCam Pro',
    color: 'Negro',
    weight: 0.15,
    stock: 42,
    minStock: 15,
    maxStock: 60,
    location: 'B3-01',
    batch: 'CAM2025',
    movements: [
      { date: '2025-06-02', type: 'entry', quantity: 50, user: 'admin' },
      { date: '2025-06-10', type: 'exit', quantity: 8, user: 'ventas', note: 'Pedido empresarial' },
    ],
    cost: 30,
    price: 70,
    archived: false,
    history: [],
  },
  {
    id: 8,
    sku: 'P-8001',
    name: 'Mouse Inalámbrico',
    description: 'Mouse ergonómico con conectividad Bluetooth.',
    category: 'Accesorios',
    brand: 'ErgoMouse',
    color: 'Gris',
    weight: 0.08,
    stock: 65,
    minStock: 20,
    maxStock: 80,
    location: 'B1-12',
    batch: 'MOU2025',
    movements: [
      { date: '2025-06-01', type: 'entry', quantity: 70, user: 'admin' },
      { date: '2025-06-11', type: 'exit', quantity: 5, user: 'ventas' },
    ],
    cost: 15,
    price: 35,
    archived: false,
    history: [],
  }
];