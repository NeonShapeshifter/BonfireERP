import React from 'react';
import clsx from 'clsx';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

function Table<T>({ columns, data, page, pageSize, onPageChange }: TableProps<T>) {
  const start = page && pageSize ? (page - 1) * pageSize : 0;
  const paginated = page && pageSize ? data.slice(start, start + pageSize) : data;
  const totalPages = pageSize ? Math.ceil(data.length / pageSize) : 1;

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              {columns.map(col => (
                <th key={String(col.key)} className="px-4 py-2 text-left font-semibold">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
            {paginated.map((row, i) => (
              <tr key={i} className="hover:bg-gray-100 dark:hover:bg-slate-700">
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-2">
                    {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {page && pageSize && onPageChange && totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={clsx(
              'px-3 py-1 rounded border text-sm',
              'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600',
              'disabled:opacity-50'
            )}
          >
            Anterior
          </button>
          <span className="text-sm">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className={clsx(
              'px-3 py-1 rounded border text-sm',
              'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600',
              'disabled:opacity-50'
            )}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
