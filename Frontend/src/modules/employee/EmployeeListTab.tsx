import { useMemo, useState } from 'react';
import { mockEmployees } from '../mockEmployees';import PermissionEditor from './PermissionEditor';

const EmployeeTool = () => {
  const viewerRole = 'admin';
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('');
  const [role, setRole] = useState('');
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [permEditorOpen, setPermEditorOpen] = useState(false);
  const [editingPerms, setEditingPerms] = useState<string[]>([]);
  const [tab, setTab] = useState<'documentos' | 'reportes'>('documentos');

  const branches = useMemo(() => Array.from(new Set(mockEmployees.map(e => e.branch))), []);
  const roles = useMemo(() => Array.from(new Set(mockEmployees.map(e => e.role))), []);

  const filtered = mockEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) &&
    (!branch || e.branch === branch) &&
    (!role || e.role === role)
  );

  const sidebarFiltered = mockEmployees.filter(e =>
    e.name.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const selected = mockEmployees.find(e => e.id === selectedId);

  return (
    <div>
      <header className="fixed top-0 inset-x-0 bg-white shadow z-10 p-4">
        <h1 className="text-lg font-bold">Bonfire ERP</h1>
      </header>
      <div className="pt-20 p-4 space-y-4">
        {selected ? (
          <>
            <h2 className="text-2xl font-bold">Perfil de empleado</h2>
            <div className="flex gap-4 mt-4">
              <aside className="w-1/4 border-r pr-4 space-y-2">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={sidebarSearch}
                  onChange={e => setSidebarSearch(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="overflow-y-auto max-h-[60vh] space-y-1">
                  {sidebarFiltered.map(emp => (
                    <button
                      key={emp.id}
                      onClick={() => setSelectedId(emp.id)}
                      className={`block w-full text-left px-2 py-1 rounded hover:bg-orange-100 ${
                        emp.id === selected.id ? 'bg-orange-500 text-white' : ''
                      }`}
                    >
                      {emp.name}
                    </button>
                  ))}
                </div>
              </aside>
              <div className="flex-1 space-y-2">
                <button className="text-orange-500" onClick={() => setSelectedId(null)}>
                  Volver
                </button>
                <h3 className="text-xl font-bold">{selected.name}</h3>
                <p><strong>Cédula:</strong> {selected.nationalId}</p>
                <p><strong>Puesto:</strong> {selected.position}</p>
                <p><strong>Rol:</strong> {selected.role}</p>
                <p><strong>Sucursal:</strong> {selected.branch}</p>
                <p><strong>Contrato:</strong> {selected.contractType}</p>
                <p><strong>Salario:</strong> ${selected.salary}</p>
                <p><strong>Ausencias:</strong> {selected.absences}</p>
                {selected.tags && (
                  <p><strong>Etiquetas:</strong> {selected.tags.join(', ')}</p>
                )}
                <p><strong>Permisos:</strong> {selected.permissions.join(', ')}</p>
                <button
                  className="text-orange-500 underline"
                  onClick={() => {
                    setEditingPerms(selected.permissions);
                    setPermEditorOpen(true);
                  }}
                >
                  Editar permisos
                </button>
                <div className="border-t pt-2 space-y-2">
                  <h4 className="font-semibold">Contrato</h4>
                  <p>Inicio: {selected.contractStart}</p>
                  {selected.contractEnd && (
                    <p>
                      Fin: {selected.contractEnd}{' '}
                      {new Date(selected.contractEnd) < new Date() && (
                        <span className="text-red-500">(Vencido)</span>
                      )}
                    </p>
                  )}
                </div>
                {['rrhh', 'admin'].includes(viewerRole) && (
                  <div className="border-t pt-2 space-y-2">
                    <h4 className="font-semibold">Actividad</h4>
                    <p>Último ingreso: {selected.lastLogin}</p>
                    <ul className="list-disc ml-5">
                      {selected.actions.map(a => (
                        <li key={a.date} className="text-sm">
                          {a.date}: {a.action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="border-t pt-2">
                  <h4 className="font-semibold mb-2">Calendario individual</h4>
                  <p>{selected.schedule}</p>
                  <p>
                    Vacaciones:{' '}
                    {selected.vacations.length
                      ? selected.vacations
                          .map(v => `${v.start}–${v.end}`)
                          .join(', ')
                      : 'Ninguna'}
                  </p>
                  <p>
                    Incapacidades:{' '}
                    {selected.sickLeaves.length
                      ? selected.sickLeaves
                          .map(s => `${s.start}–${s.end}`)
                          .join(', ')
                      : 'Ninguna'}
                  </p>
                </div>
                <div className="border-t pt-2 space-y-1">
                  <h4 className="font-semibold">Estadísticas individuales</h4>
                  <p>Puntualidad: {selected.stats.punctuality}%</p>
                  <p>Días trabajados: {selected.stats.workedDays}</p>
                  <p>Atrasos: {selected.stats.lateArrivals}</p>
                </div>
                <div className="mt-4">
                  <div className="border-b mb-2 flex gap-4">
                    <button
                      className={`pb-1 ${tab === 'documentos' ? 'border-b-2 border-orange-500' : ''}`}
                      onClick={() => setTab('documentos')}
                    >
                      Documentos
                    </button>
                    <button
                      className={`pb-1 ${tab === 'reportes' ? 'border-b-2 border-orange-500' : ''}`}
                      onClick={() => setTab('reportes')}
                    >
                      Reportes
                    </button>
                  </div>
                  {tab === 'documentos' ? (
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
                      <button className="mt-2 px-2 py-1 text-sm bg-orange-500 text-white rounded">
                        Subir
                      </button>
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
              </div>
            </div>
            <PermissionEditor
              open={permEditorOpen}
              initial={editingPerms}
              onSave={perms => {
                if (selected) {
                  selected.permissions = perms;
                }
                setPermEditorOpen(false);
              }}
              onClose={() => setPermEditorOpen(false)}
            />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">Tabla de empleados</h2>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-2 border rounded"
              />
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="">Todas las sucursales</option>
                {branches.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="">Todos los roles</option>
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Cédula</th>
                    <th className="px-4 py-2 text-left">Puesto</th>
                    <th className="px-4 py-2 text-left">Rol</th>
                    <th className="px-4 py-2 text-left">Sucursal</th>
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
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeTool;