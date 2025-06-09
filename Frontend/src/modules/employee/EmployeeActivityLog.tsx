import React from 'react';
import { Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogEntry {
  id: number;
  author: string;
  action: string;
  date: string;
}

interface ActivityLogProps {
  entries: LogEntry[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ entries }) => {
  if (!entries.length) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No hay registros de actividad.</p>;
  }

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-l-4 border-orange-500 bg-white dark:bg-slate-800 p-4 rounded shadow"
        >
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {entry.author}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {entry.date}
            </span>
          </div>
          <p className="text-sm text-gray-800 dark:text-white">{entry.action}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityLog;
