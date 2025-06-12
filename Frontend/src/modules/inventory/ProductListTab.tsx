import { useMemo, useState } from 'react';
import { mockProducts, type Product } from './mockInventory';
import MovementLog from './MovementLog';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

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

    mockProducts.push(newProduct);
    setProducts(prev => [...prev, newProduct]);
    setIsOpen(false);
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
                <p><strong>SKU:</strong> {selected.sku}</p>
                <p><strong>Categoría:</strong> {selected.category}</p>
                <p><strong>Stock:</strong> {selected.stock}</p>
                <p><strong>Mínimo:</strong> {selected.minStock} / <strong>Máximo:</strong> {selected.maxStock}</p>
                <p><strong>Ubicación:</strong> {selected.location}</p>
                {selected.batch && <p><strong>Lote:</strong> {selected.batch}</p>}
                {selected.expiryDate && <p><strong>Expira:</strong> {selected.expiryDate}</p>}
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
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <Button onClick={openModal}>Agregar producto</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">SKU</th>
                    <th className="px-4 py-2 text-left">Categoría</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map(prod => (
                    <tr
                      key={prod.id}
                      onClick={() => setSelectedId(prod.id)}
                      className="hover:bg-orange-100 cursor-pointer"
                    >
                      <td className="px-4 py-2">{prod.name}</td>
                      <td className="px-4 py-2">{prod.sku}</td>
                      <td className="px-4 py-2">{prod.category}</td>
                      <td className="px-4 py-2">{prod.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Nuevo producto"
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
                  <label className="text-sm font-medium" htmlFor="category">Categoría</label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border rounded"
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListTab;
