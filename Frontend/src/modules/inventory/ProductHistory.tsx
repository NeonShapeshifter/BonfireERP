import Table, { type Column } from '../../components/Table';
import type { ActionLogEntry } from './mockInventory';

interface Props {
  entries: ActionLogEntry[];
}

const ProductHistory: React.FC<Props> = ({ entries }) => {
  const columns: Column<ActionLogEntry>[] = [
    { key: 'date', label: 'Fecha' },
    { key: 'user', label: 'Usuario' },
    { key: 'action', label: 'Acción' },
    { key: 'description', label: 'Descripción' },
  ];

  return <Table columns={columns} data={entries} />;
};

export default ProductHistory;