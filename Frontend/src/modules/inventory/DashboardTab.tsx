import React from 'react';
import { Package, AlertTriangle, DollarSign, FileText } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { mockProducts } from './mockInventory';

const DashboardTab: React.FC = () => {
  const totalProducts = mockProducts.length;
  const lowStock = mockProducts.filter(p => p.stock <= p.minStock).length;
  const totalValue = mockProducts.reduce((sum, p) => sum + p.stock * p.cost, 0);
  const movements = mockProducts.reduce((sum, p) => sum + p.movements.length, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Productos" value={totalProducts} icon={Package} />
      <StatCard title="Stock bajo" value={lowStock} icon={AlertTriangle} />
      <StatCard title="Valor inventario" value={`$${totalValue.toLocaleString()}`} icon={DollarSign} />
      <StatCard title="Movimientos" value={movements} icon={FileText} />
    </div>
  );
};

export default DashboardTab;