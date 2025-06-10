import { useState } from 'react';
import EmployeeModule from './modules/employee/EmployeeModule';
import InventoryModule from './modules/inventory/InventoryModule'; // ✅ Nuevo módulo
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import { Users, CalendarDays, Boxes } from 'lucide-react'; // ✅ Icono para inventario
import { mockEmployees } from './modules/employee/mockEmployees';

const modules = [
  { id: 'empleados', name: 'Empleados', icon: Users },
  { id: 'calendario', name: 'Calendario', icon: CalendarDays },
  { id: 'inventario', name: 'Inventario', icon: Boxes }, // ✅ Agregado inventario
];

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeModule, setActiveModule] = useState('empleados');
  const [sucursal, setSucursal] = useState('Sucursal 1');

  return (
    <Layout
      darkMode={darkMode}
      sidebar={
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          onSelect={setActiveModule}
          permissions={['empleados', 'calendario', 'inventario']} // ✅ Asegúrate de incluir el permiso
        />
      }
      topbar={
        <Topbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          selectedSucursal={sucursal}
          setSelectedSucursal={setSucursal}
          sucursales={['Sucursal 1', 'Sucursal 2', 'Sucursal 3']}
          avatar="https://ui-avatars.com/api/?name=Bonfire"
        />
      }
    >
      {activeModule === 'empleados' && <EmployeeModule employees={mockEmployees} />}
      {activeModule === 'inventario' && <InventoryModule />} {/* ✅ Módulo de inventario visible */}
      {/* Puedes agregar más módulos aquí */}
    </Layout>
  );
};

export default App;
