import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, Sun, Moon, Bell } from 'lucide-react';

interface TopbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedSucursal: string;
  setSelectedSucursal: (s: string) => void;
  sucursales: string[];
  avatar: string;
}

const Topbar: React.FC<TopbarProps> = ({
  darkMode,
  toggleDarkMode,
  selectedSucursal,
  setSelectedSucursal,
  sucursales,
  avatar,
}) => (
  <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
    <div className="flex items-center gap-4 w-full">
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar..."
          aria-label="Buscar"
          className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 text-sm focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <SucursalDropdown selected={selectedSucursal} setSelected={setSelectedSucursal} options={sucursales} />
    </div>

    <div className="flex items-center gap-4 ml-4">
      <button onClick={toggleDarkMode} aria-label="Toggle dark mode" className="p-2 rounded hover:bg-orange-500 hover:text-white">
        {darkMode ? <Sun /> : <Moon />}
      </button>
      <button aria-label="Notificaciones" className="p-2 rounded hover:bg-orange-500 hover:text-white">
        <Bell />
      </button>
      <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
    </div>
  </header>
);

interface DropdownProps {
  selected: string;
  setSelected: (s: string) => void;
  options: string[];
}

const SucursalDropdown: React.FC<DropdownProps> = ({ selected, setSelected, options }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} aria-label="Sucursal actual" className="flex items-center px-4 py-2 border rounded-lg bg-white dark:bg-slate-700">
        <MapPin className="w-4 h-4 mr-2" />
        {selected}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      {open && (
        <div className="absolute top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow border z-10">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-orange-500 hover:text-white"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topbar;