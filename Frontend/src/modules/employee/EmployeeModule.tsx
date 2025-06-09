import React, { useState } from 'react';
import DashboardTab from './DashboardTab';
import EmployeeListTab from './EmployeeListTab';
import EmployeeCalendarTab from './EmployeeCalendarTab';
import { Calendar, LayoutList, BarChart3 } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'list', label: 'Empleados', icon: LayoutList },
  { id: 'calendar', label: 'Calendario', icon: Calendar },
];

const EmployeeModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'list':
        return <EmployeeListTab />;
      case 'calendar':
        return <EmployeeCalendarTab />;
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

export default EmployeeModule;
