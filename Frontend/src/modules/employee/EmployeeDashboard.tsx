import { useState } from 'react';
import { Users, UserCheck, CalendarX2, FileText } from 'lucide-react';
import Table, { Column } from '../../components/Table';
import StatCard from '../../components/StatCard';
import { mockEmployees, Employee } from './mockEmployees';

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'empleados', label: 'Empleados' },
  { id: 'calendario', label: 'Calendario' },
];

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(e => e.active).length;
  const totalAbsences = mockEmployees.reduce((sum, e) => sum + e.absences, 0);
  const totalContracts = mockEmployees.filter(e => e.contractType).length;

  const columns: Column<Employee>[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'nationalId', label: 'Cédula' },
    { key: 'email', label: 'Correo' },
    { key: 'branch', label: 'Sucursal' },
    { key: 'role', label: 'Rol' },
    {
      key: 'id',
      label: 'Acciones',
      render: row => (
        <button
          className="text-orange-500 hover:underline"
          onClick={() => setSelectedId(row.id)}
        >
          Ver perfil
        </button>
      ),
    },
  ];

  const selected = mockEmployees.find(e => e.id === selectedId);

  return (
    <div className="p-6 space-y-6">
      <nav>
        <ul className="flex gap-4 border-b">
          {tabs.map(tab => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 -mb-px border-b-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-500 hover:text-orange-500'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total de empleados" value={totalEmployees} icon={Users} />
          <StatCard title="Empleados activos" value={activeEmployees} icon={UserCheck} />
          <StatCard title="Ausencias" value={totalAbsences} icon={CalendarX2} />
          <StatCard title="Contratos" value={totalContracts} icon={FileText} />
        </div>
      )}

      {activeTab === 'empleados' && (
        <Table columns={columns} data={mockEmployees} />
      )}

      {activeTab === 'calendario' && (
        <p className="text-gray-500">Vista de calendario próximamente...</p>
      )}

      {selected && (
        <div className="fixed inset-0 bg-white z-20 flex">
          <div className="w-64 border-r overflow-y-auto">
            {mockEmployees.map(emp => (
              <button
                key={emp.id}
                onClick={() => setSelectedId(emp.id)}
                className={`w-full text-left px-4 py-2 border-b hover:bg-gray-100 ${
                  emp.id === selected.id ? 'bg-orange-500 text-white' : ''
                }`}
              >
                {emp.name}
              </button>
            ))}
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <button className="mb-4 text-orange-500" onClick={() => setSelectedId(null)}>
              Cerrar
            </button>
            <h2 className="text-2xl font-bold mb-4">{selected.name}</h2>
            <div className="space-y-2">
              <p><strong>Cédula:</strong> {selected.nationalId}</p>
              <p><strong>Correo:</strong> {selected.email}</p>
              <p><strong>Sucursal:</strong> {selected.branch}</p>
              <p><strong>Puesto:</strong> {selected.position}</p>
              <p><strong>Rol:</strong> {selected.role}</p>
              <p><strong>Salario:</strong> ${selected.salary}</p>
              <p><strong>Contrato:</strong> {selected.contractType}</p>
              <p><strong>Ausencias:</strong> {selected.absences}</p>
              <p><strong>Activo:</strong> {selected.active ? 'Sí' : 'No'}</p>
              {selected.tags && (
                <p><strong>Etiquetas:</strong> {selected.tags.join(', ')}</p>
              )}
              <p><strong>Permisos:</strong> {selected.permissions.join(', ')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;