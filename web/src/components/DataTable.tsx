import React from 'react';
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
  return (
    <div className={cn("bg-surface border border-gray-200 rounded-lg shadow-card overflow-hidden flex flex-col", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col, idx) => (
                <th key={idx} className={cn("px-4 py-3 text-[12px] uppercase font-semibold text-text-muted tracking-wider", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-text-muted">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={cn("px-4 py-3 text-sm text-text-primary", col.className)}>
                      {col.cell ? col.cell(row, rowIdx) : col.accessorKey ? String(row[col.accessorKey]) : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-between mt-auto">
        <div className="text-sm text-text-muted">
          Menampilkan <span className="font-medium text-text-primary">1</span> hingga <span className="font-medium text-text-primary">{Math.min(data.length, 10)}</span> dari <span className="font-medium text-text-primary">{data.length}</span> hasil
        </div>
        <div className="flex gap-1">
          <button className="p-1 rounded border border-gray-200 text-text-muted disabled:opacity-50" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="px-2.5 py-1 text-sm rounded bg-primary text-white font-medium">1</button>
          <button className="px-2.5 py-1 text-sm rounded border border-gray-200 text-text-primary hover:bg-gray-50 font-medium">2</button>
          <button className="p-1 rounded border border-gray-200 text-text-primary hover:bg-gray-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
