import { useState } from 'react';
import Button from '../../components/Button';
import Table, { type Column } from '../../components/Table';

const reportTypes = [
  { id: 'estado', label: 'Estado de Resultados' },
  { id: 'balance', label: 'Balance General' },
  { id: 'flujo', label: 'Flujo de Efectivo' },
  { id: 'libro', label: 'Libro Mayor' },
];

const data = [
  { concepto: 'Ventas', monto: 1500 },
  { concepto: 'Gastos', monto: -1100 },
];

const Reports = () => {
  const [active, setActive] = useState('estado');

  const columns: Column<(typeof data)[number]>[] = [
    { key: 'concepto', label: 'Concepto' },
    { key: 'monto', label: 'Monto' },
  ];

  const exportPDF = () => {
    console.log('Exportar PDF');
  };
  const exportExcel = () => {
    console.log('Exportar Excel');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 border-b">
        {reportTypes.map(r => (
          <button
            key={r.id}
            onClick={() => setActive(r.id)}
            className={`pb-1 border-b-2 ${
              active === r.id ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={exportPDF}>PDF</Button>
        <Button variant="secondary" onClick={exportExcel}>Excel</Button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Reports;