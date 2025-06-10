import { useMemo, useState } from 'react';
import { mockProducts, type Product } from './mockInventory';
import Table, { type Column } from '../../components/Table';
import Button from '../../components/Button';

const ReportView = () => {
  const [category, setCategory] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [movementType, setMovementType] = useState('');
  const [inactivity, setInactivity] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  const categories = useMemo(
    () => Array.from(new Set(mockProducts.map(p => p.category))),
    []
  );

  const columns: Column<Product>[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'sku', label: 'SKU' },
    { key: 'category', label: 'Categoría' },
    { key: 'stock', label: 'Stock' },
  ];

  const generate = () => {
    let filtered = [...mockProducts];
    if (category) filtered = filtered.filter(p => p.category === category);

    if (movementType || from || to) {
      filtered = filtered.filter(p =>
        p.movements.some(m => {
          if (movementType && m.type !== movementType) return false;
          const date = new Date(m.date);
          if (from && date < new Date(from)) return false;
          if (to && date > new Date(to)) return false;
          return true;
        })
      );
    }

    if (inactivity) {
      const past = new Date();
      past.setDate(past.getDate() - 30);
      filtered = filtered.filter(p => {
        const last = p.movements[p.movements.length - 1];
        return !last || new Date(last.date) <= past;
      });
    }

    setResults(filtered);
  };

  const exportCSV = () => {
  if (!results.length) return;

  const header = ['Nombre', 'SKU', 'Categoría', 'Stock'];
  const rows = results.map(r => [r.name, r.sku, r.category, String(r.stock)]);
  const csvContent = [header, ...rows].map(row => row.join(';')).join('\n');
  
  const bom = '\uFEFF'; 
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'reporte.csv';
  link.click();
  URL.revokeObjectURL(url);
};

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">Todas las categorías</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <input
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <select
          value={movementType}
          onChange={e => setMovementType(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">Todos los movimientos</option>
          <option value="entry">Entrada</option>
          <option value="exit">Salida</option>
          <option value="transfer">Transferencia</option>
          <option value="adjust">Ajuste</option>
        </select>
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={inactivity}
            onChange={e => setInactivity(e.target.checked)}
          />
          Inactivos 30 días
        </label>
        <Button onClick={generate}>Generar reporte</Button>
        {results.length > 0 && (
          <Button variant="secondary" onClick={exportCSV}>Exportar CSV</Button>
        )}
      </div>

      {results.length > 0 && <Table columns={columns} data={results} />}
    </div>
  );
};

export default ReportView;