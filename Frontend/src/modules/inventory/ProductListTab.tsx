import { useMemo, useState } from 'react';
import { mockProducts } from './mockInventory';
import MovementLog from './MovementLog';

const ProductListTab = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = useMemo(
    () => Array.from(new Set(mockProducts.map(p => p.category))),
    []
  );

  const filtered = mockProducts.filter(
    p =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())) &&
      (!category || p.category === category)
  );

  const selected = mockProducts.find(p => p.id === selectedId);

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
                        prod.id === selected.id ? 'bg-orange-500 text-white' : ''
                      }`}
                    >
                      {prod.name}
                    </button>
                  ))}
                </div>
              </aside>
              <div className="flex-1 space-y-2">
                <button className="text-orange-500" onClick={() => setSelectedId(null)}>
                  Volver
                </button>
                <h3 className="text-xl font-bold">{selected.name}</h3>
                <p>
                  <strong>SKU:</strong> {selected.sku}
                </p>
                {selected.barcode && (
                  <p>
                    <strong>Barcode:</strong> {selected.barcode}
                  </p>
                )}
                <p>
                  <strong>Categoría:</strong> {selected.category}
                </p>
                <p>
                  <strong>Marca:</strong> {selected.brand}
                </p>
                {selected.size && (
                  <p>
                    <strong>Tamaño:</strong> {selected.size}
                  </p>
                )}
                {selected.color && (
                  <p>
                    <strong>Color:</strong> {selected.color}
                  </p>
                )}
                {selected.weight && (
                  <p>
                    <strong>Peso:</strong> {selected.weight}kg
                  </p>
                )}
                <p>
                  <strong>Stock actual:</strong> {selected.stock}
                </p>
                <p>
                  <strong>Mínimo:</strong> {selected.minStock} / <strong>Máximo:</strong> {selected.maxStock}
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
            <div className="flex flex-wrap gap-2">
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListTab;