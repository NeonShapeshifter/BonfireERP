import { mockProducts } from './mockInventory';

const WarehouseOptimizer = () => {
  const suggestions = mockProducts.map(p => ({
    name: p.name,
    zone: p.movements.length > 5 ? 'Zona A' : 'Zona C',
  }));

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Sugerencias de ubicación</h2>
      <ul className="list-disc ml-6">
        {suggestions.map(s => (
          <li key={s.name}>{s.name} → {s.zone}</li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseOptimizer;