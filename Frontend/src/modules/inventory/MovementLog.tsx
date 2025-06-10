import React from 'react';
import { Clock, User, ArrowDown, ArrowUp, Move, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Movement } from './mockInventory';

interface Props {
  entries: Movement[];
}

const iconForType = (type: Movement['type']) => {
  switch (type) {
    case 'entry':
      return ArrowDown;
    case 'exit':
      return ArrowUp;
    case 'transfer':
      return Move;
    case 'adjust':
      return Edit;
    default:
      return ArrowDown;
  }
};

const MovementLog: React.FC<Props> = ({ entries }) => {
  if (!entries.length) {
    return <p className="text-sm text-gray-500">Sin movimientos.</p>;
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, idx) => {
        const Icon = iconForType(entry.type);
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="border-l-4 border-orange-500 bg-white p-4 rounded shadow"
          >
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {entry.user}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {entry.date}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon className="w-4 h-4" />
              <span className="capitalize">{entry.type}</span> - Cantidad: {entry.quantity}
              {entry.note && <span className="ml-2">({entry.note})</span>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MovementLog;