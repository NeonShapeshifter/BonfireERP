import React from 'react';
import {
  Package,
  AlertTriangle,
  DollarSign,
  FileText,
  Clock,
} from 'lucide-react';
import StatCard from '../../components/StatCard';
import { mockProducts } from './mockInventory';
import {
  getLowStockProducts,
  getExpiringSoon,
  getNoRecentMovements,
} from './inventoryUtils';

const DashboardTab: React.FC = () => {
  const totalProducts = mockProducts.length;
  const lowStock = getLowStockProducts(mockProducts).length;
  const totalValue = mockProducts.reduce((sum, p) => sum + p.stock * p.cost, 0);
  const movements = mockProducts.reduce((sum, p) => sum + p.movements.length, 0);

  const noMovement = getNoRecentMovements(mockProducts);
  const expiring = getExpiringSoon(mockProducts);
  const expired = mockProducts.filter(
    p => p.expiryDate && new Date(p.expiryDate) < new Date(),
  );

  return (
    <div className="space-y-4">
      {(noMovement.length > 0 || expiring.length > 0 || expired.length > 0 || lowStock > 0) && (
        <div className="space-y-2">
          {noMovement.map(p => (
            <div
              key={p.id}
              className="flex items-center gap-2 p-2 bg-yellow-100 rounded"
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {p.name} sin movimiento en 30 días
              </span>
            </div>
          ))}
          {expiring.map(p => (
            <div
              key={p.id}
              className="flex items-center gap-2 p-2 bg-red-100 rounded"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">
                {p.name} expira el {p.expiryDate}
              </span>
            </div>
          ))}
          {expired.map(p => (
            <div
              key={p.id}
              className="flex items-center gap-2 p-2 bg-red-200 rounded"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">{p.name} expirado</span>
            </div>
          ))}
          {getLowStockProducts(mockProducts).map(p => (
            <div
              key={p.id}
              className="flex items-center gap-2 p-2 bg-orange-200 rounded"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">{p.name} con stock bajo</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Productos" value={totalProducts} icon={Package} />
        <StatCard title="Stock bajo" value={lowStock} icon={AlertTriangle} />
        <StatCard
          title="Valor inventario"
          value={`$${totalValue.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatCard title="Movimientos" value={movements} icon={FileText} />
      </div>
    </div>
  );
};

export default DashboardTab;