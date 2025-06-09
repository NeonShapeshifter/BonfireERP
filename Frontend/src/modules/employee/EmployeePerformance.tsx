import React from 'react';
import { BarChart3, Award, Smile } from 'lucide-react';

interface PerformanceEntry {
  title: string;
  value: number;
  description?: string;
}

interface Props {
  data: PerformanceEntry[];
}

const PerformanceCard: React.FC<PerformanceEntry> = ({ title, value, description }) => {
  const color = value >= 80 ? 'text-green-500' : value >= 60 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="border p-4 rounded-lg bg-white dark:bg-slate-800 shadow space-y-1">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">{title}</h4>
        <span className={`text-lg font-bold ${color}`}>{value}%</span>
      </div>
      {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
  );
};

const EmployeePerformance: React.FC<Props> = ({ data }) => {
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold">Métricas de Desempeño</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((entry, i) => (
          <PerformanceCard key={i} {...entry} />
        ))}
      </div>
    </section>
  );
};

export default EmployeePerformance;
