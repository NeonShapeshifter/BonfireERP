import { useState, useMemo } from 'react';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Table, { type Column } from '../../components/Table';
import { mockProducts } from './mockInventory';
import { mockReturns, type ReturnEntry } from './mockReturns';

const ReturnManagement = () => {
  const [entries, setEntries] = useState<ReturnEntry[]>(mockReturns);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState<number>(mockProducts[0]?.id ?? 0);
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');
  const [user, setUser] = useState('');
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filtered = entries.filter(e => {
    const prod = mockProducts.find(p => p.id === e.productId);
    return (
      !search || prod?.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const entriesWithNames = useMemo(
    () =>
      filtered.map(e => ({
        ...e,
        productName: mockProducts.find(p => p.id === e.productId)?.name || '',
      })),
    [filtered]
  );

  const columns: Column<(typeof entriesWithNames)[number]>[] = [
    { key: 'productName', label: 'Producto' },
    { key: 'quantity', label: 'Cantidad' },
    { key: 'reason', label: 'Razón' },
    { key: 'user', label: 'Usuario' },
    { key: 'date', label: 'Fecha' },
    { key: 'status', label: 'Estado' },
  ];

  const openModal = () => {
    setProductId(mockProducts[0]?.id ?? 0);
    setQuantity(1);
    setReason('');
    setUser('');
    setStatus('pending');
    setErrors({});
    setIsOpen(true);
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!productId) errs.product = 'Producto requerido';
    if (!quantity || quantity <= 0) errs.quantity = 'Cantidad inválida';
    if (!reason) errs.reason = 'Requerido';
    if (!user) errs.user = 'Requerido';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const newEntry: ReturnEntry = {
      id: Date.now(),
      productId,
      quantity,
      reason,
      user,
      date: new Date().toISOString().split('T')[0],
      status,
    };

    setEntries(prev => [...prev, newEntry]);
    if (status === 'approved') {
      const prod = mockProducts.find(p => p.id === productId);
      if (prod) prod.stock += quantity;
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-end">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <Button onClick={openModal}>Nueva devolución</Button>
      </div>

      <Table columns={columns} data={entriesWithNames} />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Registrar devolución"
        actions={
          <Button onClick={handleSubmit}>Guardar</Button>
        }
      >
        <div className="space-y-2">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="product">Producto</label>
            <select
              id="product"
              value={productId}
              onChange={e => setProductId(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded"
            >
              {mockProducts.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.product && <p className="text-xs text-red-500">{errors.product}</p>}
          </div>
          <Input
            id="quantity"
            label="Cantidad"
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            error={errors.quantity}
          />
          <Input
            id="reason"
            label="Razón"
            value={reason}
            onChange={e => setReason(e.target.value)}
            error={errors.reason}
          />
          <Input
            id="user"
            label="Usuario"
            value={user}
            onChange={e => setUser(e.target.value)}
            error={errors.user}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="status">Estado</label>
            <select
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value as ReturnEntry['status'])}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="pending">Pendiente</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReturnManagement;