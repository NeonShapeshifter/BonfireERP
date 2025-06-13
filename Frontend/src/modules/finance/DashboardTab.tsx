import { ArrowDown, ArrowUp, LineChart, PieChart } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { mockTransactions } from './mockFinance';

const DashboardTab = () => {
  const ingresos = mockTransactions
    .filter(t => t.type === 'ingreso')
    .reduce((sum, t) => sum + t.monto, 0);
  const gastos = mockTransactions
    .filter(t => t.type === 'gasto')
    .reduce((sum, t) => sum + t.monto, 0);
  const utilidad = ingresos - gastos;

  const categories = Array.from(
    new Set(mockTransactions.filter(t => t.type === 'gasto').map(t => t.categoria))
  );
  const gastosPorCategoria = categories.map(cat => ({
    categoria: cat,
    monto: mockTransactions
      .filter(t => t.type === 'gasto' && t.categoria === cat)
      .reduce((sum, t) => sum + t.monto, 0),
  }));

  // datos mock para tendencia de ventas
  const trend = [400, 500, 600, 550, 650, 700];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Ingresos" value={`$${ingresos}`} icon={ArrowUp} />
        <StatCard title="Gastos" value={`$${gastos}`} icon={ArrowDown} />
        <StatCard title="Utilidad" value={`$${utilidad}`} icon={LineChart} />
        <StatCard
          title="Transacciones"
          value={mockTransactions.length}
          icon={PieChart}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-neutral-900 rounded shadow p-4">
          <h4 className="font-semibold mb-2">Tendencia de ventas 6 meses</h4>
          <svg viewBox="0 0 120 60" className="w-full h-40">
            <polyline
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              points={trend
                .map((v, i) => `${(i / (trend.length - 1)) * 120},${60 - v / 15}`)
                .join(' ')}
            />
          </svg>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded shadow p-4">
          <h4 className="font-semibold mb-2">Gastos por categoría</h4>
          <svg viewBox="0 0 120 60" className="w-full h-40">
            {gastosPorCategoria.map((g, i) => (
              <rect
                key={g.categoria}
                x={(i * 25) + 10}
                y={60 - (g.monto / gastos) * 50}
                width="20"
                height={(g.monto / gastos) * 50}
                fill="#f97316"
              />
            ))}
          </svg>
          <div className="flex justify-between text-xs mt-1">
            {gastosPorCategoria.map(g => (
              <span key={g.categoria}>{g.categoria}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;