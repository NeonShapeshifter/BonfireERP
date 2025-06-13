import { useState } from 'react';
import Button from '../../components/Button';
import Table, { type Column } from '../../components/Table';
import { mockTransactions, mockBank, type BankEntry } from './mockFinance';

interface MatchRow {
  local?: typeof mockTransactions[number];
  bank?: BankEntry;
  conciliado: boolean;
}

const BankReconciliation = () => {
  const [matches, setMatches] = useState<MatchRow[]>(() => {
    return mockTransactions.map(t => ({ local: t, conciliado: !!t.conciliado }));
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // placeholder para procesamiento de CSV
    console.log('Archivo cargado', e.target.files?.[0]);
  };

  const manualMatch = (index: number) => {
    setMatches(prev => prev.map((m, i) => (i === index ? { ...m, conciliado: true } : m)));
  };

  const columns: Column<MatchRow>[] = [
  {
    key: 'local',
    label: 'Local',
    render: row => (
      <div className="space-y-1">
        <p>{row.local?.date} - {row.local?.categoria}</p>
        <p className="text-sm text-gray-500">${row.local?.monto}</p>
      </div>
    ),
  },
  {
    key: 'bank',
    label: 'Banco',
    render: row => (
      row.bank ? (
        <div className="space-y-1">
          <p>{row.bank.date} - {row.bank.descripcion}</p>
          <p className="text-sm text-gray-500">${row.bank.monto}</p>
        </div>
      ) : <span className="text-xs text-gray-500">Pendiente</span>
    ),
  },
  {
    key: 'conciliado',
    label: 'Estado',
    render: (row) => {
      const index = matches.findIndex(m => m.local?.id === row.local?.id);
      return row.conciliado ? (
        <span className="text-green-500">✅ Conciliado</span>
      ) : (
        <Button variant="secondary" onClick={() => manualMatch(index)}>Marcar</Button>
      );
    }
  }
];


  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded p-4 text-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="hidden"
          id="csv-upload"
        />
        <label htmlFor="csv-upload" className="cursor-pointer">Subir estado bancario CSV</label>
      </div>
      <Table columns={columns} data={matches} />
    </div>
  );
};

export default BankReconciliation;