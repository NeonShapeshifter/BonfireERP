import React, { useState } from 'react';
import EmployeeModule from './modules/employee/EmployeeModule';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import { Users, CalendarDays, BarChart3 } from 'lucide-react';
import Layout from './components/Layout';
import { mockEmployees } from './modules/mockEmployees';

const modules = [
  { id: 'empleados', name: 'Empleados', icon: Users },
  { id: 'calendario', name: 'Calendario', icon: CalendarDays },
];

const App: React.FC = () => {
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
          permissions={['empleados', 'calendario']}
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
      {/* Aquí puedes agregar otros módulos en el futuro */}
    </Layout>
  );
};

export default App;
