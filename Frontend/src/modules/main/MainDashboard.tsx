import { useEffect, useState } from 'react';
import { Users, DollarSign, FileText, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import StatCard from '../../components/StatCard';

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
    gastosMes: 52300
  },
  facturacion: {
    facturasMes: 130,
    ventasHoy: 45
  }
};

const modules = [
  { id: 'inventario', name: 'Inventario', icon: Package, color: 'bg-orange-500' },
  { id: 'empleados', name: 'Empleados', icon: Users, color: 'bg-orange-500' },
  { id: 'finanzas', name: 'Finanzas', icon: DollarSign, color: 'bg-orange-500' },
  { id: 'facturacion', name: 'Facturación', icon: FileText, color: 'bg-orange-500' }
];

const MainDashboard = () => {
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
    <Layout
      darkMode={darkMode}
      sidebar={
        <Sidebar
          modules={modules}
          permissions={mockUser.permissions}
          activeModule={activeModule}
          onSelect={setActiveModule}
        />
      }
      topbar={
        <Topbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          selectedSucursal={selectedSucursal}
          setSelectedSucursal={setSelectedSucursal}
          sucursales={mockUser.sucursales}
          avatar={mockUser.avatar}
        />
      }
    >
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
    </Layout>
  );
};


interface ModuleCardProps {
  module: { id: string; name: string; icon: React.ComponentType<{ className?: string }> };
  data: Record<string, string | number>;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, data }) => (
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

export default MainDashboard;