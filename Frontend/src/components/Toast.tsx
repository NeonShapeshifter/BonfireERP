import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type ToastVariant = 'success' | 'error';

interface ToastMessage {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  addToast: (message: string, variant: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const remove = useCallback((id: number) => {
    setToasts(t => t.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, variant: ToastVariant) => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, variant }]);
    setTimeout(() => remove(id), 3000);
  }, [remove]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
              className={`px-4 py-2 rounded shadow text-white cursor-pointer ${t.variant === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
              onClick={() => remove(t.id)}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};