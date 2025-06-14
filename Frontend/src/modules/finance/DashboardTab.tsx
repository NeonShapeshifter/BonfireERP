import { ArrowDown, ArrowUp, LineChart, PieChart } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { mockTransactions } from './mockFinance';
import {
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart as RBarChart,
  Bar,
} from 'recharts';

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
  const trendData = trend.map((v, i) => ({ mes: `M${i + 1}`, valor: v }));
  const catData = gastosPorCategoria.map(g => ({ name: g.categoria, monto: g.monto }));

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
          <ResponsiveContainer width="100%" height={160}>
            <RLineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#FF4F00" />
            </RLineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded shadow p-4">
          <h4 className="font-semibold mb-2">Gastos por categoría</h4>
          <ResponsiveContainer width="100%" height={160}>
            <RBarChart data={catData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="monto" fill="#FF4F00" />
            </RBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;