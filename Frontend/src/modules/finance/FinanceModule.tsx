import { useState } from 'react';
import { BarChart2, List, UploadCloud, FileText, Wallet } from 'lucide-react';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import BankReconciliation from './BankReconciliation';
import Reports from './Reports';
import Budgeting from './Budgeting';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
  { id: 'transacciones', label: 'Transacciones', icon: List },
  { id: 'conciliacion', label: 'Conciliación', icon: UploadCloud },
  { id: 'reportes', label: 'Reportes', icon: FileText },
  { id: 'presupuestos', label: 'Presupuestos', icon: Wallet },
];

const FinanceModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transacciones':
        return <Transactions />;
      case 'conciliacion':
        return <BankReconciliation />;
      case 'reportes':
        return <Reports />;
      case 'presupuestos':
        return <Budgeting />;
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

export default FinanceModule;