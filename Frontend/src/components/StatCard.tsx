import { motion } from 'framer-motion';
import React from 'react';

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="p-4 border rounded-lg bg-white dark:bg-slate-800 shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm text-gray-600 dark:text-gray-400">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="p-2 rounded bg-orange-500">
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  </motion.div>
);

export default StatCard;