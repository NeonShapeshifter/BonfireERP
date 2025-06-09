import React from 'react';
import { Clock } from 'lucide-react';

export interface ContractChange {
  date: string;
  changedBy: string;
  previous: {
    type: string;
    salary: number;
    start?: string;
    end?: string;
  };
  current: {
    type: string;
    salary: number;
    start?: string;
    end?: string;
  };
}

interface Props {
  changes: ContractChange[];
}

const ContractHistoryCard: React.FC<Props> = ({ changes }) => {
  if (!changes.length) {
    return <p className="text-sm text-gray-500">No hay historial de contrato.</p>;
  }

  return (
    <div className="space-y-3">
      {changes.map((c, i) => (
        <div key={i} className="border p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-orange-500 flex items-center gap-1">
              <Clock className="w-4 h-4" /> {c.date}
            </h4>
            <p className="text-xs text-gray-500">Modificado por: {c.changedBy}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold mb-1">Antes:</p>
              <p>Tipo: {c.previous.type}</p>
              <p>Salario: ${c.previous.salary}</p>
              {c.previous.start && <p>Inicio: {c.previous.start}</p>}
              {c.previous.end && <p>Fin: {c.previous.end}</p>}
            </div>
            <div>
              <p className="font-semibold mb-1">Después:</p>
              <p>Tipo: {c.current.type}</p>
              <p>Salario: ${c.current.salary}</p>
              {c.current.start && <p>Inicio: {c.current.start}</p>}
              {c.current.end && <p>Fin: {c.current.end}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContractHistoryCard;
