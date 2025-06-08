import { useMemo, useState } from 'react';
import { Users, UserCheck, CalendarX2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Column } from '../../components/Table';
import StatCard from '../../components/StatCard';
import Button from '../../components/Button';
import PermissionEditor from './PermissionEditor';
import { mockEmployees, type Employee } from '../mockEmployees';

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'empleados', label: 'Empleados' },
  { id: 'calendario', label: 'Calendario' },
];

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [permEditorOpen, setPermEditorOpen] = useState(false);
  const [editingPerms, setEditingPerms] = useState<string[]>([]);
  const [infoTab, setInfoTab] = useState<'documentos' | 'reportes'>('documentos');

  const branches = useMemo(
    () => Array.from(new Set(employees.map(e => e.branch))),
    [employees]
  );
  const roles = useMemo(
    () => Array.from(new Set(employees.map(e => e.role))),
    [employees]
  );

  const filtered = employees.filter(
    e =>
      e.name.toLowerCase().includes(search.toLowerCase()) &&
      (!branchFilter || e.branch === branchFilter) &&
      (!roleFilter || e.role === roleFilter)
  );

  const sidebarFiltered = employees.filter(e =>
    e.name.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.active).length;
  const totalAbsences = employees.reduce((sum, e) => sum + e.absences, 0);
  const totalContracts = employees.filter(e => e.contractType).length;

  const columns: Column<Employee>[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'nationalId', label: 'Cédula' },
    { key: 'position', label: 'Puesto' },
    { key: 'role', label: 'Rol' },
    { key: 'branch', label: 'Sucursal' },
  ];

  const selected = employees.find(e => e.id === selectedId);

  const isEndingSoon = (date?: string) => {
    if (!date) return false;
    const end = new Date(date);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return diff > 0 && diff < 1000 * 60 * 60 * 24 * 30;
  };

  const updatePerms = (perms: string[]) => {
    if (selectedId !== null) {
      setEmployees(emps =>
        emps.map(emp => (emp.id === selectedId ? { ...emp, permissions: perms } : emp))
      );
    }
    setPermEditorOpen(false);
  };

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
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-3 py-2 border rounded"
            />
            <select
              value={branchFilter}
              onChange={e => setBranchFilter(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="">Todas las sucursales</option>
              {branches.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="">Todos los roles</option>
              {roles.map(r => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 mt-4">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(col => (
                    <th key={String(col.key)} className="px-4 py-2 text-left">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.map(emp => (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedId(emp.id)}
                    className="hover:bg-orange-100 cursor-pointer"
                  >
                    <td className="px-4 py-2">{emp.name}</td>
                    <td className="px-4 py-2">{emp.nationalId}</td>
                    <td className="px-4 py-2">{emp.position}</td>
                    <td className="px-4 py-2">{emp.role}</td>
                    <td className="px-4 py-2">{emp.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'calendario' && (
        <p className="text-gray-500">Vista de calendario próximamente...</p>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-white z-20 flex"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-1/4 border-r p-4 space-y-2">
              <input
                type="text"
                placeholder="Buscar..."
                value={sidebarSearch}
                onChange={e => setSidebarSearch(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
              <div className="overflow-y-auto max-h-[70vh] space-y-1">
                {sidebarFiltered.map(emp => (
                  <button
                    key={emp.id}
                    onClick={() => setSelectedId(emp.id)}
                    className={`block w-full text-left px-2 py-1 rounded hover:bg-orange-100 ${
                      selectedId === emp.id ? 'bg-orange-500 text-white' : ''
                    }`}
                  >
                    {emp.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-3/4 p-6 overflow-y-auto space-y-2">
              <button className="text-orange-500" onClick={() => setSelectedId(null)}>
                Volver
              </button>
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <p><strong>Cédula:</strong> {selected.nationalId}</p>
              <p><strong>Correo:</strong> {selected.email}</p>
              <p><strong>Puesto:</strong> {selected.position}</p>
              <p><strong>Rol:</strong> {selected.role}</p>
              <p><strong>Sucursal:</strong> {selected.branch}</p>
              <p><strong>Salario:</strong> ${selected.salary}</p>
              <div className="border-t pt-2 space-y-1">
                <h4 className="font-semibold">Contrato</h4>
                <p>Inicio: {selected.contractStart}</p>
                {selected.contractEnd && (
                  <p>
                    Fin: {selected.contractEnd}{' '}
                    {isEndingSoon(selected.contractEnd) && (
                      <span className="text-red-500">(Próximo a vencer)</span>
                    )}
                  </p>
                )}
              </div>
              <div className="border-t pt-2 space-y-1">
                <h4 className="font-semibold">Actividad</h4>
                <p>Último ingreso: {selected.lastLogin}</p>
                <ul className="list-disc ml-5">
                  {selected.actions.map((a, i) => (
                    <li key={i} className="text-sm">
                      {a.date}: {a.action}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t pt-2 space-y-1">
                <h4 className="font-semibold">Calendario individual</h4>
                <p>{selected.schedule}</p>
                <p>
                  Vacaciones:{' '}
                  {selected.vacations.length
                    ? selected.vacations.map(v => `${v.start}–${v.end}`).join(', ')
                    : 'Ninguna'}
                </p>
                <p>
                  Incapacidades:{' '}
                  {selected.sickLeaves.length
                    ? selected.sickLeaves.map(s => `${s.start}–${s.end}`).join(', ')
                    : 'Ninguna'}
                </p>
              </div>
              <div className="border-t pt-2 space-y-1">
                <h4 className="font-semibold">Estadísticas</h4>
                <p>Puntualidad: {selected.stats.punctuality}%</p>
                <p>Días trabajados: {selected.stats.workedDays}</p>
                <p>Atrasos: {selected.stats.lateArrivals}</p>
              </div>
              <div className="border-t pt-2">
                <div className="border-b mb-2 flex gap-4">
                  <button
                    className={`pb-1 ${infoTab === 'documentos' ? 'border-b-2 border-orange-500' : ''}`}
                    onClick={() => setInfoTab('documentos')}
                  >
                    Documentos
                  </button>
                  <button
                    className={`pb-1 ${infoTab === 'reportes' ? 'border-b-2 border-orange-500' : ''}`}
                    onClick={() => setInfoTab('reportes')}
                  >
                    Reportes
                  </button>
                </div>
                {infoTab === 'documentos' ? (
                  <div className="space-y-1">
                    {selected.documents.length ? (
                      <ul className="list-disc ml-5">
                        {selected.documents.map((d, i) => (
                          <li key={i} className="text-sm">
                            {d.name} ({d.size})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">Sin documentos.</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selected.reports.length ? (
                      selected.reports.map((r, i) => (
                        <div key={i} className="border p-2 rounded">
                          <h5 className="font-semibold">{r.subject}</h5>
                          <p className="text-xs text-gray-500">
                            {r.date} - {r.submittedBy}
                          </p>
                          {r.classification && (
                            <p className="text-xs">Clasificación: {r.classification}</p>
                          )}
                          <p className="text-sm">{r.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">Sin reportes.</p>
                    )}
                  </div>
                )}
              </div>
              <div className="border-t pt-2 space-y-1">
                <h4 className="font-semibold">Permisos</h4>
                <p className="text-sm">{selected.permissions.join(', ')}</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditingPerms(selected.permissions);
                    setPermEditorOpen(true);
                  }}
                >
                  Editar permisos
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PermissionEditor
        open={permEditorOpen}
        initial={editingPerms}
        onSave={updatePerms}
        onClose={() => setPermEditorOpen(false)}
      />
    </div>
  );
};

export default EmployeeDashboard;