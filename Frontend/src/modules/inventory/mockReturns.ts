export interface ReturnEntry {
  id: number;
  productId: number;
  quantity: number;
  reason: string;
  user: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const mockReturns: ReturnEntry[] = [
  {
    id: 1,
    productId: 1,
    quantity: 1,
    reason: 'Defecto de fábrica',
    user: 'cliente1',
    date: '2025-06-10',
    status: 'pending',
  },
  {
    id: 2,
    productId: 2,
    quantity: 2,
    reason: 'Pedido incorrecto',
    user: 'cliente2',
    date: '2025-06-11',
    status: 'approved',
  },
];