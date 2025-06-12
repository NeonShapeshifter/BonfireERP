import { useMemo, useState, useEffect } from 'react';
import { mockProducts, type Product } from './mockInventory';
import MovementLog from './MovementLog';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

// Define Movement type
interface Movement {
  date: string;
  type: 'entry' | 'exit' | 'adjust';
  quantity: number;
  user: string;
  note?: string;
}

const ProductListTab = () => {
  const [products, setProducts] = useState<Product[]>([...mockProducts]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: '',
    cost: 0,
    price: 0,
    stock: 0,
    minStock: 0,
    expiryDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    sku: '',
    category: '',
    stock: 0,
    minStock: 0,
    location: '',
    batch: '',
    expiryDate: '',
  });
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const [moveOpen, setMoveOpen] = useState(false);
  const [moveForm, setMoveForm] = useState({
    type: 'entry',
    quantity: 0,
    note: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('bonfire_products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved) as Product[]);
      } catch {
        // ignore malformed data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bonfire_products', JSON.stringify(products));
  }, [products]);

  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))),
    [products]
  );

  const filtered = products.filter(
    p =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())) &&
      (!category || p.category === category)
  );

  const selected = products.find(p => p.id === selectedId);

  const openModal = () => {
    setForm({
      name: '',
      sku: '',
      category: categories[0] ?? '',
      cost: 0,
      price: 0,
      stock: 0,
      minStock: 0,
      expiryDate: '',
    });
    setErrors({});
    setIsOpen(true);
  };

  const handleSave = () => {
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = 'Requerido';
    if (!form.sku) errs.sku = 'Requerido';
    if (!form.cost && form.cost !== 0) errs.cost = 'Requerido';
    if (!form.price && form.price !== 0) errs.price = 'Requerido';
    if (!form.stock && form.stock !== 0) errs.stock = 'Requerido';
    if (!form.minStock && form.minStock !== 0) errs.minStock = 'Requerido';
    if (products.some(p => p.sku === form.sku)) errs.sku = 'SKU ya existe';
    if (form.minStock > form.stock) errs.minStock = 'Debe ser <= stock';
    if (form.stock < 0) errs.stock = 'Debe ser >= 0';
    if (form.minStock < 0) errs.minStock = 'Debe ser >= 0';
    if (form.cost < 0) errs.cost = 'Debe ser >= 0';
    if (form.price < 0) errs.price = 'Debe ser >= 0';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      sku: form.sku,
      name: form.name,
      description: '',
      category: form.category,
      brand: '',
      stock: Number(form.stock),
      minStock: Number(form.minStock),
      maxStock: Number(form.stock),
      location: '',
      movements: [],
      cost: Number(form.cost),
      price: Number(form.price),
      expiryDate: form.expiryDate || undefined,
    };

    setProducts(prev => [...prev, newProduct]);
    setIsOpen(false);
  };

  const startEdit = () => {
    if (!selected) return;
    setEditForm({
      sku: selected.sku,
      category: selected.category,
      stock: selected.stock,
      minStock: selected.minStock,
      location: selected.location,
      batch: selected.batch ?? '',
      expiryDate: selected.expiryDate ?? '',
    });
    setEditErrors({});
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const saveEdit = () => {
    if (!selected) return;
    const errs: Record<string, string> = {};
    if (!editForm.sku) errs.sku = 'Requerido';
    if (products.some(p => p.sku === editForm.sku && p.id !== selected.id))
      errs.sku = 'SKU ya existe';
    if (editForm.stock < 0) errs.stock = 'Debe ser >= 0';
    if (editForm.minStock < 0) errs.minStock = 'Debe ser >= 0';
    if (editForm.minStock > editForm.stock) errs.minStock = 'Debe ser <= stock';
    if (Object.keys(errs).length) {
      setEditErrors(errs);
      return;
    }
    const updated: Product = {
      ...selected,
      sku: editForm.sku,
      category: editForm.category,
      stock: editForm.stock,
      minStock: editForm.minStock,
      location: editForm.location,
      batch: editForm.batch || undefined,
      expiryDate: editForm.expiryDate || undefined,
    };
    setProducts(prev => prev.map(p => (p.id === selected.id ? updated : p)));
    setEditing(false);
  };

  const deleteProduct = () => {
    if (!selected) return;
    if (window.confirm('¿Eliminar producto?')) {
      setProducts(prev => prev.filter(p => p.id !== selected.id));
      setSelectedId(null);
    }
  };

  const saveMovement = () => {
    if (!selected) return;
    if (moveForm.quantity <= 0) return;
    const now = new Date().toISOString().split('T')[0];
    const movement: Movement = {
      date: now,
      type: moveForm.type as Movement['type'],
      quantity: moveForm.quantity,
      user: 'admin',
      note: moveForm.note || undefined,
    };
    let newStock = selected.stock;
    if (moveForm.type === 'entry') newStock += moveForm.quantity;
    else if (moveForm.type === 'exit') newStock -= moveForm.quantity;
    else newStock = moveForm.quantity;
    const updated: Product = {
      ...selected,
      stock: newStock,
      movements: [...selected.movements, movement],
    };
    setProducts(prev => prev.map(p => (p.id === selected.id ? updated : p)));
    setMoveOpen(false);
    setMoveForm({ type: 'entry', quantity: 0, note: '' });
  };

  return (
    <div>
      <header className="fixed top-0 inset-x-0 bg-white shadow z-10 p-4">
        <h1 className="text-lg font-bold">Inventario</h1>
      </header>
      <div className="pt-20 p-4 space-y-4">
        {selected ? (
          <>
            <h2 className="text-2xl font-bold">Detalle de producto</h2>
            <div className="flex gap-4 mt-4">
              <aside className="w-1/4 border-r pr-4 space-y-2">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="overflow-y-auto max-h-[60vh] space-y-1">
                  {filtered.map(prod => (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedId(prod.id)}
                      className={`block w-full text-left px-2 py-1 rounded hover:bg-orange-100 ${
                        selectedId === prod.id ? 'bg-orange-100' : ''
                      }`}
                    >
                      {prod.name}
                    </button>
                  ))}
                </div>
              </aside>
              <div className="w-3/4 space-y-2">
                {editing ? (
                  <>
                    <Input
                      label="SKU"
                      value={editForm.sku}
                      onChange={e =>
                        setEditForm(f => ({ ...f, sku: e.target.value }))
                      }
                      error={editErrors.sku}
                    />
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Categoría</label>
                      <select
                        className="w-full px-3 py-2 border rounded"
                        value={editForm.category}
                        onChange={e =>
                          setEditForm(f => ({ ...f, category: e.target.value }))
                        }
                      >
                        {categories.map(c => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Stock"
                      type="number"
                      value={editForm.stock}
                      onChange={e =>
                        setEditForm(f => ({ ...f, stock: Number(e.target.value) }))
                      }
                      error={editErrors.stock}
                    />
                    <Input
                      label="Mínimo"
                      type="number"
                      value={editForm.minStock}
                      onChange={e =>
                        setEditForm(f => ({
                          ...f,
                          minStock: Number(e.target.value),
                        }))
                      }
                      error={editErrors.minStock}
                    />
                    <Input
                      label="Ubicación"
                      value={editForm.location}
                      onChange={e =>
                        setEditForm(f => ({ ...f, location: e.target.value }))
                      }
                    />
                    <Input
                      label="Lote"
                      value={editForm.batch}
                      onChange={e =>
                        setEditForm(f => ({ ...f, batch: e.target.value }))
                      }
                    />
                    <Input
                      label="Expira"
                      type="date"
                      value={editForm.expiryDate}
                      onChange={e =>
                        setEditForm(f => ({ ...f, expiryDate: e.target.value }))
                      }
                    />
                    <div className="flex gap-2">
                      <Button onClick={saveEdit}>Guardar</Button>
                      <Button variant="secondary" onClick={cancelEdit}>
                        Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>SKU:</strong> {selected.sku}
                    </p>
                    <p>
                      <strong>Categoría:</strong> {selected.category}
                    </p>
                    <p>
                      <strong>Stock:</strong> {selected.stock}
                    </p>
                    <p>
                      <strong>Mínimo:</strong> {selected.minStock} /{' '}
                      <strong>Máximo:</strong> {selected.maxStock}
                    </p>
                    <p>
                      <strong>Ubicación:</strong> {selected.location}
                    </p>
                    {selected.batch && (
                      <p>
                        <strong>Lote:</strong> {selected.batch}
                      </p>
                    )}
                    {selected.expiryDate && (
                      <p>
                        <strong>Expira:</strong> {selected.expiryDate}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button onClick={startEdit} variant="secondary">
                        Editar
                      </Button>
                      <Button variant="danger" onClick={deleteProduct}>
                        Eliminar producto
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setMoveOpen(true)}
                      >
                        Registrar movimiento
                      </Button>
                    </div>
                  </>
                )}
                <div className="border-t pt-2 space-y-2">
                  <h4 className="font-semibold">Movimientos</h4>
                  <MovementLog entries={selected.movements} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">Productos</h2>
            <div className="flex flex-wrap gap-2 items-end">
              <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-2 border rounded"
              />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="">Todas las categorías</option>
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Button onClick={openModal}>Agregar producto</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(product => (
                <div
                  key={product.id}
                  className="border rounded p-4 hover:shadow-md cursor-pointer"
                  onClick={() => setSelectedId(product.id)}
                >
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.sku}</p>
                  <p className="text-sm">Stock: {product.stock}</p>
                  <p className="text-sm">Categoría: {product.category}</p>
                </div>
              ))}
            </div>
            
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Agregar producto"
              actions={<Button onClick={handleSave}>Guardar</Button>}
            >
              <div className="space-y-2">
                <Input
                  label="Nombre"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  error={errors.name}
                />
                <Input
                  label="SKU"
                  value={form.sku}
                  onChange={e => setForm(f => ({ ...f, sku: e.target.value }))}
                  error={errors.sku}
                />
                <div className="space-y-1">
                  <label className="text-sm font-medium">Categoría</label>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Costo"
                  type="number"
                  value={form.cost}
                  onChange={e => setForm(f => ({ ...f, cost: Number(e.target.value) }))}
                  error={errors.cost}
                />
                <Input
                  label="Precio"
                  type="number"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                  error={errors.price}
                />
                <Input
                  label="Stock"
                  type="number"
                  value={form.stock}
                  onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))}
                  error={errors.stock}
                />
                <Input
                  label="Mínimo"
                  type="number"
                  value={form.minStock}
                  onChange={e => setForm(f => ({ ...f, minStock: Number(e.target.value) }))}
                  error={errors.minStock}
                />
                <Input
                  label="Expira"
                  type="date"
                  value={form.expiryDate}
                  onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))}
                />
              </div>
            </Modal>

            <Modal
              isOpen={moveOpen}
              onClose={() => setMoveOpen(false)}
              title="Registrar movimiento"
              actions={<Button onClick={saveMovement}>Guardar</Button>}
            >
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="type">
                    Tipo de movimiento
                  </label>
                  <select
                    id="type"
                    className="w-full px-3 py-2 border rounded"
                    value={moveForm.type}
                    onChange={e =>
                      setMoveForm(f => ({ ...f, type: e.target.value }))
                    }
                  >
                    <option value="entry">entrada</option>
                    <option value="exit">salida</option>
                    <option value="adjust">ajuste</option>
                  </select>
                </div>
                <Input
                  label="Cantidad"
                  type="number"
                  value={moveForm.quantity}
                  onChange={e =>
                    setMoveForm(f => ({ ...f, quantity: Number(e.target.value) }))
                  }
                />
                <Input
                  label="Motivo"
                  value={moveForm.note}
                  onChange={e =>
                    setMoveForm(f => ({ ...f, note: e.target.value }))
                  }
                />
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListTab;