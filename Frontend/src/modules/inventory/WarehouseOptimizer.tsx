import { mockProducts } from './mockInventory';

const WarehouseOptimizer = () => {
  const suggestions = mockProducts.map(p => ({
    name: p.name,
    zone: p.movements.length > 5 ? 'Zona A' : 'Zona C',
  }));

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Sugerencias de ubicación</h2>
      <div className="flex flex-wrap gap-2">
        {suggestions.map(s => (
          <span
            key={s.name}
            className="px-3 py-1 rounded-md bg-light dark:bg-slate-700 shadow-md text-sm"
          >
            {s.name} → {s.zone}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WarehouseOptimizer;