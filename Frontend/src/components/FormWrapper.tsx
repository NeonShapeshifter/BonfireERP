import React from 'react';

interface FormWrapperProps {
  title?: string;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, children }) => (
  <div className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
    {title && <h3 className="text-lg font-bold">{title}</h3>}
    <div className="space-y-4">{children}</div>
  </div>
);

export default FormWrapper;