import { useState } from 'react';
import Table, { type Column } from '../../components/Table';

export interface AuditEntry {
  id: number;
  user: string;
  action: 'create' | 'update' | 'delete';
  product: string;
  timestamp: string;
}

const initialLogs: AuditEntry[] = [
  {
    id: 1,
    user: 'admin',
    action: 'create',
    product: 'Laptop Pro 15"',
    timestamp: '2025-06-01 10:00',
  },
];

const AuditLog = () => {
  const [logs] = useState(initialLogs);

  const columns: Column<AuditEntry>[] = [
    { key: 'user', label: 'Usuario' },
    { key: 'action', label: 'Acción' },
    { key: 'product', label: 'Producto' },
    { key: 'timestamp', label: 'Fecha' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Bitácora</h2>
      <Table columns={columns} data={logs} />
    </div>
  );
};

export default AuditLog;