import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium" htmlFor={props.id}>{label}</label>
    <input
      {...props}
      id={props.id}
      className={clsx(
        'w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50',
        error && 'border-red-500',
        className,
      )}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default Input;