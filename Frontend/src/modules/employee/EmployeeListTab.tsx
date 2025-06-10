import React, { useState, useMemo } from 'react';
import { mockEmployees } from './mockEmployees';
import Table from '../../components/Table';
import { type Column } from '../../components/Table';
import Button from '../../components/Button';
import EmployeeProfilePanel from './EmployeeProfilePanel';

const EmployeeListTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('');
  const [role, setRole] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const branches = useMemo(() => Array.from(new Set(mockEmployees.map(e => e.branch))), []);
  const roles = useMemo(() => Array.from(new Set(mockEmployees.map(e => e.role))), []);

  const filtered = mockEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) &&
    (!branch || e.branch === branch) &&
    (!role || e.role === role)
  );

  const selected = mockEmployees.find(e => e.id === selectedId);

  const columns: Column<(typeof mockEmployees)[number]>[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'nationalId', label: 'Cédula' },
    { key: 'position', label: 'Puesto' },
    { key: 'role', label: 'Rol' },
    { key: 'branch', label: 'Sucursal' },
  ];

  return (
    <div className="space-y-4">
      {!selected ? (
        <>
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
              {branches.map(b => <option key={b}>{b}</option>)}
            </select>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="">Todos los roles</option>
              {roles.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <Table columns={columns} data={filtered} />
        </>
      ) : (
        <EmployeeProfilePanel employee={selected} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
};

export default EmployeeListTab;
