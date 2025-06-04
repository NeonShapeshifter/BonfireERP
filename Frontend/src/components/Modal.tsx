import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, actions, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className="relative bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6 z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <button onClick={onClose} aria-label="Cerrar" className="text-gray-500 hover:text-orange-500">×</button>
          </div>
          <div className="mb-4">{children}</div>
          {actions && <div className="flex justify-end gap-2">{actions}</div>}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;