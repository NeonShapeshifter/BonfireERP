import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ComponentType<{ className?: string }>;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-orange-500 text-white hover:bg-orange-600',
  secondary:
    'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon: Icon,
  fullWidth,
  className,
  children,
  ...props
}) => (
  <button
    className={clsx(
      'flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50',
      variantClasses[variant],
      fullWidth && 'w-full',
      className,
    )}
    {...props}
  >
    {Icon && <Icon className="w-5 h-5" />}
    {children}
  </button>
);

export default Button;