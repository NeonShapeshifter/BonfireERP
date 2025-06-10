+24
-1

import { useState } from 'react';
import DashboardTab from './DashboardTab';
import ProductListTab from './ProductListTab';
import ReturnManagement from './ReturnManagement';
import ReportView from './ReportView';
import AuditLog from './AuditLog';
import WarehouseOptimizer from './WarehouseOptimizer';
import {
  BarChart3,
  LayoutList,
  RotateCcw,
  FileText,
  ListChecks,
  Boxes,
} from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'products', label: 'Productos', icon: LayoutList },
  { id: 'returns', label: 'Devoluciones', icon: RotateCcw },
  { id: 'reports', label: 'Reportes', icon: FileText },
  { id: 'audit', label: 'Bitácora', icon: ListChecks },
  { id: 'optimizer', label: 'Optimizar', icon: Boxes },
];

const InventoryModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'products':
        return <ProductListTab />;
      case 'returns':
        return <ReturnManagement />;
      case 'reports':
        return <ReportView />;
      case 'audit':
        return <AuditLog />;
      case 'optimizer':
        return <WarehouseOptimizer />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4 border-b">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors duration-200 ${
              activeTab === id
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-gray-500 hover:text-orange-500'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div>{renderTab()}</div>
    </div>
  );
};

export default InventoryModule;