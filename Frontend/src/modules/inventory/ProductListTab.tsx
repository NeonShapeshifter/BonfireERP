import { useMemo, useState, useEffect } from 'react';
import { mockProducts, type Product,} from './mockInventory';
import MovementLog from './MovementLog';
import ProductHistory from './ProductHistory';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import { getLowStockProducts, getExpiringSoon, getNoRecentMovements,} from './inventoryUtils';

// Define ActionLogEntry type since it's missing from mockInventory
interface ActionLogEntry {
  id: number;
  date: string;
  user: string;
  action: string;
  description: string;
}

// Define Movement type
interface Movement {
  date: string;
  type: 'entry' | 'exit' | 'adjust';
  quantity: number;
  user: string;
  note?: string;
}

// Extended Product type with missing properties
interface ExtendedProduct extends Product {
  history: ActionLogEntry[];
  archived: boolean;
  cost: number;
  price: number;
  expiryDate?: string;
  batch?: string;
}

const ProductListTab = () => {
  const [products, setProducts] = useState<ExtendedProduct[]>([...mockProducts as ExtendedProduct[]]);
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
  const [showLowStock, setShowLowStock] = useState(false);
  const [showExpiring, setShowExpiring] = useState(false);
  const [showNoMove, setShowNoMove] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkStocks, setBulkStocks] = useState<Record<number, number>>({});

  const addHistory = (
    productId: number,
    action: string,
    description: string,
    user = 'admin',
  ) => {
    const entry: ActionLogEntry = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      user,
      action,
      description,
    };
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, history: [...p.history, entry] } : p,
      ),
    );
  };

  const openBulk = () => {
    const map: Record<number, number> = {};
    products.forEach(p => {
      map[p.id] = p.stock;
    });
    setBulkStocks(map);
    setBulkOpen(true);
  };

  const saveBulk = () => {
    setProducts(prev =>
      prev.map(p =>
        bulkStocks[p.id] !== undefined ? { ...p, stock: bulkStocks[p.id] } : p,
      ),
    );
    Object.keys(bulkStocks).forEach(id =>
      addHistory(Number(id), 'adjust', 'Ajuste masivo'),
    );
    setBulkOpen(false);
  };

  const handleCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      text.split(/\r?\n/).forEach(line => {
        const [sku, qty] = line.split(',');
        if (!sku || !qty) return;
        const prod = products.find(p => p.sku === sku.trim());
        if (prod)
          setBulkStocks(b => ({ ...b, [prod.id]: Number(qty) }));
      });
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const saved = localStorage.getItem('bonfire_products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved) as ExtendedProduct[]);
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

  let temp = products;
  if (!showArchived) temp = temp.filter(p => !p.archived);
  if (showLowStock) temp = getLowStockProducts(temp);
  if (showExpiring) temp = getExpiringSoon(temp);
  if (showNoMove) temp = getNoRecentMovements(temp);
  const filtered = temp.filter(
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
    if (products.some(p => p.sku === form.sku && !p.archived))
      errs.sku = 'SKU ya existe';
    if (form.minStock > form.stock) errs.minStock = 'Debe ser <= stock';
    if (form.stock < 0) errs.stock = 'Debe ser >= 0';
    if (form.minStock < 0) errs.minStock = 'Debe ser >= 0';
    if (form.cost < 0) errs.cost = 'Debe ser >= 0';
    if (form.price < 0) errs.price = 'Debe ser >= 0';
    if (form.price < form.cost) errs.price = 'Debe ser >= costo';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const newProduct: ExtendedProduct = {
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
      archived: false,
      history: [],
      cost: Number(form.cost),
      price: Number(form.price),
      expiryDate: form.expiryDate || undefined,
    };

    setProducts(prev => [...prev, newProduct]);
    addHistory(newProduct.id, 'create', 'Creación de producto');
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
    if (
      products.some(p => p.sku === editForm.sku && p.id !== selected.id && !p.archived)
    )
      errs.sku = 'SKU ya existe';
    if (editForm.stock < 0) errs.stock = 'Debe ser >= 0';
    if (editForm.minStock < 0) errs.minStock = 'Debe ser >= 0';
    if (editForm.minStock > editForm.stock) errs.minStock = 'Debe ser <= stock';
    if (Object.keys(errs).length) {
      setEditErrors(errs);
      return;
    }
    const updated: ExtendedProduct = {
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
    addHistory(selected.id, 'update', 'Edición de producto');
    setEditing(false);
  };

  const deleteProduct = () => {
    if (!selected) return;
    if (window.confirm('¿Eliminar producto?')) {
      setProducts(prev => prev.filter(p => p.id !== selected.id));
      addHistory(selected.id, 'delete', 'Eliminación de producto');
      setSelectedId(null);
    }
  };

  const toggleArchive = () => {
    if (!selected) return;
    const updated: ExtendedProduct = { ...selected, archived: !selected.archived };
    setProducts(prev => prev.map(p => (p.id === selected.id ? updated : p)));
    addHistory(
      selected.id,
      'archive',
      updated.archived ? 'Archivado' : 'Reactivado',
    );
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
    if (newStock < 0) {
      window.alert('Stock negativo no permitido');
      return;
    }
    const updated: ExtendedProduct = {
      ...selected,
      stock: newStock,
      movements: [...selected.movements, movement],
    };
    setProducts(prev => prev.map(p => (p.id === selected.id ? updated : p)));
    addHistory(selected.id, 'movement', `${movement.type} ${movement.quantity}`);
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
                      className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                        prod.id === selectedId ? 'bg-blue-100' : ''
                      }`}
                    >
                      <div className="font-medium">{prod.name}</div>
                      <div className="text-sm text-gray-600">{prod.sku}</div>
                    </button>
                  ))}
                </div>
              </aside>
              <div className="flex-1">
                {editing ? (
                  <>
                    <div className="space-y-4">
                      <Input
                        label="SKU"
                        value={editForm.sku}
                        onChange={e => setEditForm(f => ({ ...f, sku: e.target.value }))}
                        error={editErrors.sku}
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Categoría
                        </label>
                        <select
                          value={editForm.category}
                          onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                        onChange={e => setEditForm(f => ({ ...f, stock: Number(e.target.value) }))}
                        error={editErrors.stock}
                      />
                      <Input
                        label="Stock mínimo"
                        type="number"
                        value={editForm.minStock}
                        onChange={e => setEditForm(f => ({ ...f, minStock: Number(e.target.value) }))}
                        error={editErrors.minStock}
                      />
                      <Input
                        label="Ubicación"
                        value={editForm.location}
                        onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
                      />
                      <Input
                        label="Lote"
                        value={editForm.batch}
                        onChange={e => setEditForm(f => ({ ...f, batch: e.target.value }))}
                      />
                      <Input
                        label="Fecha de expiración"
                        type="date"
                        value={editForm.expiryDate}
                        onChange={e => setEditForm(f => ({ ...f, expiryDate: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <Button onClick={saveEdit}>Guardar</Button>
                        <Button variant="secondary" onClick={cancelEdit}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-4">{selected.name}</h3>
                    <p>
                      <strong>SKU:</strong> {selected.sku}
                    </p>
                    <p>
                      <strong>Descripción:</strong> {selected.description}
                    </p>
                    <p>
                      <strong>Categoría:</strong> {selected.category}
                    </p>
                    <p>
                      <strong>Marca:</strong> {selected.brand}
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
                        onClick={toggleArchive}
                      >
                        {selected.archived ? 'Activar producto' : 'Archivar producto'}
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
                <div className="border-t pt-2 space-y-2">
                  <h4 className="font-semibold">Historial</h4>
                  <ProductHistory entries={selected.history} />
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
              <label className="text-sm flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={showLowStock}
                  onChange={e => setShowLowStock(e.target.checked)}
                />
                Stock bajo
              </label>
              <label className="text-sm flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={showExpiring}
                  onChange={e => setShowExpiring(e.target.checked)}
                />
                Próximos a expirar
              </label>
              <label className="text-sm flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={showNoMove}
                  onChange={e => setShowNoMove(e.target.checked)}
                />
                Sin movimiento
              </label>
              <label className="text-sm flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={showArchived}
                  onChange={e => setShowArchived(e.target.checked)}
                />
                Ver archivados
              </label>
              <Button onClick={openModal}>Agregar producto</Button>
              <Button variant="secondary" onClick={openBulk}>Ajuste rápido</Button>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  step="0.01"
                  value={form.cost}
                  onChange={e => setForm(f => ({ ...f, cost: Number(e.target.value) }))}
                  error={errors.cost}
                />
                <Input
                  label="Precio"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                  error={errors.price}
                />
                <Input
                  label="Stock inicial"
                  type="number"
                  value={form.stock}
                  onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))}
                  error={errors.stock}
                />
                <Input
                  label="Stock mínimo"
                  type="number"
                  value={form.minStock}
                  onChange={e => setForm(f => ({ ...f, minStock: Number(e.target.value) }))}
                  error={errors.minStock}
                />
                <Input
                  label="Fecha de expiración"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo
                  </label>
                  <select
                    value={moveForm.type}
                    onChange={e =>
                      setMoveForm(f => ({ ...f, type: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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

            <Modal
              isOpen={bulkOpen}
              onClose={() => setBulkOpen(false)}
              title="Ajuste rápido"
              actions={<Button onClick={saveBulk}>Guardar</Button>}
            >
              <div className="space-y-2">
                <input type="file" accept=".csv" onChange={handleCsv} />
                {products.map(p => (
                  <div key={p.id} className="flex items-center gap-2">
                    <span className="w-32 text-sm">{p.name}</span>
                    <input
                      type="number"
                      value={bulkStocks[p.id] ?? p.stock}
                      onChange={e =>
                        setBulkStocks(b => ({
                          ...b,
                          [p.id]: Number(e.target.value),
                        }))
                      }
                      className="px-2 py-1 border rounded w-24"
                    />
                  </div>
                ))}
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListTab;