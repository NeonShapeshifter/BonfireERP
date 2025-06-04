import React from 'react';
import clsx from 'clsx';
import { BarChart3 } from 'lucide-react';

interface ModuleItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

interface SidebarProps {
  modules: ModuleItem[];
  permissions: string[];
  activeModule: string;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ modules, permissions, activeModule, onSelect }) => (
  <aside className="w-64 hidden sm:block border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
    <div className="flex items-center mb-8">
      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
        <BarChart3 className="w-5 h-5 text-white" />
      </div>
      <span className="ml-3 text-xl font-bold">Bonfire ERP</span>
    </div>
    <nav className="space-y-2">
      <SidebarButton label="Dashboard" icon={BarChart3} active={activeModule === 'dashboard'} onClick={() => onSelect('dashboard')} />
      {modules.filter(m => permissions.includes(m.id)).map(m => (
        <SidebarButton key={m.id} label={m.name} icon={m.icon} active={activeModule === m.id} onClick={() => onSelect(m.id)} />
      ))}
    </nav>
  </aside>
);

interface SidebarButtonProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={clsx(
      'flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200',
      active ? 'bg-orange-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
    )}
  >
    <Icon className="w-5 h-5 mr-3" />
    {label}
  </button>
);

export default Sidebar;