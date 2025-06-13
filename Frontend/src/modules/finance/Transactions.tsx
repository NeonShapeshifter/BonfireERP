import { useState } from 'react';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Table, { type Column } from '../../components/Table';
import { mockTransactions, type Transaction } from './mockFinance';

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Partial<Transaction>>({ type: 'ingreso', estado: 'pagado' });

  const columns: Column<Transaction>[] = [
    { key: 'date', label: 'Fecha' },
    { key: 'type', label: 'Tipo' },
    { key: 'categoria', label: 'Categoría' },
    { key: 'monto', label: 'Monto' },
    { key: 'metodo', label: 'Método de pago' },
    { key: 'estado', label: 'Estado' },
  ];

  const openModal = () => {
    setForm({ type: 'ingreso', estado: 'pagado' });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!form.date || !form.categoria || !form.monto) return;
    const newEntry: Transaction = {
      id: Date.now(),
      date: form.date,
      type: form.type as 'ingreso' | 'gasto',
      categoria: form.categoria,
      monto: Number(form.monto),
      metodo: form.metodo || 'Efectivo',
      estado: form.estado as 'pendiente' | 'pagado',
      descripcion: form.descripcion || '',
      conciliado: false,
    };
    setTransactions(prev => [...prev, newEntry]);
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={openModal}>Añadir transacción</Button>
      <Table columns={columns} data={transactions} />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Registrar transacción"
        actions={<Button onClick={handleSave}>Guardar</Button>}
      >
        <div className="space-y-2">
          <Input
            id="date"
            label="Fecha"
            type="date"
            value={form.date || ''}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="type">Tipo</label>
            <select
              id="type"
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value as Transaction['type'] })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
          </div>
          <Input
            id="categoria"
            label="Categoría"
            value={form.categoria || ''}
            onChange={e => setForm({ ...form, categoria: e.target.value })}
          />
          <Input
            id="monto"
            label="Monto"
            type="number"
            value={form.monto?.toString() || ''}
            onChange={e => setForm({ ...form, monto: Number(e.target.value) })}
          />
          <Input
            id="descripcion"
            label="Descripción"
            value={form.descripcion || ''}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
          />
          <Input
            id="metodo"
            label="Método de pago"
            value={form.metodo || ''}
            onChange={e => setForm({ ...form, metodo: e.target.value })}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="estado">Estado</label>
            <select
              id="estado"
              value={form.estado}
              onChange={e => setForm({ ...form, estado: e.target.value as Transaction['estado'] })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="pagado">Pagado</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Transactions;