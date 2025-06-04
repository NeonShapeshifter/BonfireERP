
import React, { useEffect, useState } from 'react';
import {
  BarChart3, Users, DollarSign, FileText, Package, Settings, LogOut,
  ChevronDown, TrendingUp, TrendingDown, MapPin, Bell, Search, Moon, Sun
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const mockUser = {
  name: "Alexander",
  role: "admin",
  permissions: ["inventario", "empleados", "finanzas", "facturacion"],
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
  sucursales: ["Sucursal Centro", "Sucursal Norte", "Sucursal Sur"]
};

const mockData = {
  inventario: {
    totalProductos: 1247,
    stockBajo: 23,
    valorTotal: 125000,
    movimientos: 45
  },
  empleados: {
    totalEmpleados: 48,
    activos: 45,
    nuevosEsteMes: 3,
    ausencias: 2
  },
  finanzas: {
    ingresosMes: 89500,
    gastosMes: 52300,
    utilidad: 37200,
    cuentasPorCobrar: 15600
  },
  facturacion: {
    facturasMes: 156,
    montoTotal: 89500,
    pendientes: 12,
    vencidas: 3
  }
};

const modules = [
  { id: 'inventario', name: 'Inventario', icon: Package, color: 'bg-orange-500' },
  { id: 'empleados', name: 'Empleados', icon: Users, color: 'bg-orange-500' },
  { id: 'finanzas', name: 'Finanzas', icon: DollarSign, color: 'bg-orange-500' },
  { id: 'facturacion', name: 'Facturación', icon: FileText, color: 'bg-orange-500' }
];

const DashboardPrincipal = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedSucursal, setSelectedSucursal] = useState(mockUser.sucursales[0]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bonfire_dark_mode");
    if (saved) setDarkMode(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("bonfire_dark_mode", darkMode.toString());
  }, [darkMode]);

  const currentData = (id: string) => mockData[id as keyof typeof mockData];

  return (
    <div className={clsx({ dark: darkMode })}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 text-black dark:text-white">
        {/* Sidebar */}
        <aside className="w-64 hidden sm:block border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold">Bonfire ERP</span>
          </div>
          <nav className="space-y-2">
            <SidebarButton label="Dashboard" icon={BarChart3} active={activeModule === 'dashboard'} onClick={() => setActiveModule('dashboard')} />
            {modules.filter(m => mockUser.permissions.includes(m.id)).map(m => (
              <SidebarButton key={m.id} label={m.name} icon={m.icon} active={activeModule === m.id} onClick={() => setActiveModule(m.id)} />
            ))}
          </nav>
        </aside>

        {/* Main Section */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
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
              <SucursalDropdown selected={selectedSucursal} setSelected={setSelectedSucursal} options={mockUser.sucursales} />
            </div>

            <div className="flex items-center gap-4 ml-4">
              <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode" className="p-2 rounded hover:bg-orange-500 hover:text-white">
                {darkMode ? <Sun /> : <Moon />}
              </button>
              <button aria-label="Notificaciones" className="p-2 rounded hover:bg-orange-500 hover:text-white">
                <Bell />
              </button>
              <img src={mockUser.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            </div>
          </header>

          {/* Content */}
          <main className="p-6 space-y-6">
            {activeModule === 'dashboard' ? (
              <>
                <motion.div layout className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                  <h1 className="text-2xl font-bold mb-1">Bienvenido, {mockUser.name}!</h1>
                  <p>¿Qué quieres hacer hoy?</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard title="Productos" value={mockData.inventario.totalProductos} icon={Package} />
                  <StatCard title="Empleados" value={mockData.empleados.totalEmpleados} icon={Users} />
                  <StatCard title="Ingresos" value={`$${mockData.finanzas.ingresosMes.toLocaleString()}`} icon={DollarSign} />
                  <StatCard title="Facturas" value={mockData.facturacion.facturasMes} icon={FileText} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {modules.filter(m => mockUser.permissions.includes(m.id)).map(module => (
                    <ModuleCard key={module.id} module={module} data={currentData(module.id)} />
                  ))}
                </div>
              </>
            ) : (
              <motion.div layout>
                <h2 className="text-2xl font-bold mb-4">{modules.find(m => m.id === activeModule)?.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Contenido detallado próximamente...</p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const SidebarButton = ({ label, icon: Icon, active, onClick }) => (
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

const SucursalDropdown = ({ selected, setSelected, options }) => {
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

const StatCard = ({ title, value, icon: Icon }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="p-4 border rounded-lg bg-white dark:bg-slate-800 shadow">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm text-gray-600 dark:text-gray-400">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="p-2 rounded bg-orange-500">
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  </motion.div>
);

const ModuleCard = ({ module, data }) => (
  <motion.div whileHover={{ scale: 1.01 }} className="p-4 border rounded-lg bg-white dark:bg-slate-800 shadow cursor-pointer">
    <div className="flex items-center mb-2">
      <div className="p-2 rounded bg-orange-500">
        <module.icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="ml-3 text-lg font-bold">{module.name}</h3>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <p className="text-xs text-gray-500 dark:text-gray-400">{key.replace(/([A-Z])/g, ' $1')}</p>
          <p className="font-semibold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default DashboardPrincipal;
