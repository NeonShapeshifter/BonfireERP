import type { Product, Movement } from './mockInventory';

export const getLowStockProducts = (products: Product[]): Product[] =>
  products.filter(p => p.stock < p.minStock);

export const getExpiringSoon = (
  products: Product[],
  days = 15,
): Product[] => {
  const limit = new Date();
  limit.setDate(limit.getDate() + days);
  return products.filter(
    p => p.expiryDate && new Date(p.expiryDate) <= limit,
  );
};

export const getNoRecentMovements = (
  products: Product[],
  days = 30,
): Product[] => {
  const limit = new Date();
  limit.setDate(limit.getDate() - days);
  return products.filter(p => {
    const last = p.movements[p.movements.length - 1];
    return !last || new Date(last.date) <= limit;
  });
};

export const recordMovement = (
  products: Product[],
  setProducts: (cb: (prev: Product[]) => Product[]) => void,
  productId: number,
  movement: Movement,
) => {
  setProducts(prev =>
    prev.map(p => {
      if (p.id !== productId) return p;
      let stock = p.stock;
      if (movement.type === 'entry') stock += movement.quantity;
      else if (movement.type === 'exit') stock -= movement.quantity;
      else if (movement.type === 'adjust') stock = movement.quantity;
      return {
        ...p,
        stock,
        movements: [...p.movements, movement],
      };
    }),
  );
};