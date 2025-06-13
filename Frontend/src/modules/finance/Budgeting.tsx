import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Table, { type Column } from '../../components/Table';
import { mockBudgets, type Budget } from './mockFinance';

const Budgeting = () => {
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [form, setForm] = useState<Budget>({ categoria: '', monto: 0, periodo: 'Mensual', gastoReal: 0 });

  const columns: Column<Budget>[] = [
    { key: 'categoria', label: 'Categoría' },
    { key: 'monto', label: 'Presupuesto' },
    { key: 'gastoReal', label: 'Gasto real' },
    { key: 'periodo', label: 'Periodo' },
  ];

  const addBudget = () => {
    if (!form.categoria || !form.monto) return;
    setBudgets(prev => [...prev, { ...form }]);
    setForm({ categoria: '', monto: 0, periodo: 'Mensual', gastoReal: 0 });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <Input
          id="cat"
          label="Categoría"
          value={form.categoria}
          onChange={e => setForm({ ...form, categoria: e.target.value })}
        />
        <Input
          id="mon"
          label="Monto"
          type="number"
          value={form.monto.toString()}
          onChange={e => setForm({ ...form, monto: Number(e.target.value) })}
        />
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="per">Periodo</label>
          <select
            id="per"
            value={form.periodo}
            onChange={e => setForm({ ...form, periodo: e.target.value as Budget['periodo'] })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Mensual">Mensual</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Anual">Anual</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button onClick={addBudget}>Guardar</Button>
        </div>
      </div>

      <Table columns={columns} data={budgets} />

      <div className="bg-white dark:bg-neutral-900 rounded shadow p-4">
        <h4 className="font-semibold mb-2">Comparación presupuesto vs gasto</h4>
        <svg viewBox="0 0 120 60" className="w-full h-40">
          {budgets.map((b, i) => (
            <g key={b.categoria}>
              <rect
                x={10 + i * 25}
                y={60 - (b.monto / 2000) * 50}
                width="8"
                height={(b.monto / 2000) * 50}
                fill="#94a3b8"
              />
              <rect
                x={18 + i * 25}
                y={60 - (b.gastoReal / 2000) * 50}
                width="8"
                height={(b.gastoReal / 2000) * 50}
                fill={b.gastoReal > b.monto ? '#ef4444' : '#f97316'}
              />
            </g>
          ))}
        </svg>
        <div className="flex justify-between text-xs mt-1">
          {budgets.map(b => (
            <span key={b.categoria}>{b.categoria}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budgeting;