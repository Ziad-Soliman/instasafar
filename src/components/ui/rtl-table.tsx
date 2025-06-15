
import React from 'react';
import { useRtlLayout } from '@/utils/rtl-layout-helpers';

interface RtlTableProps {
  children: React.ReactNode;
  className?: string;
}

export const RtlTable: React.FC<RtlTableProps> = ({ children, className = '' }) => {
  const { isRTL } = useRtlLayout();
  
  return (
    <div className={`relative w-full overflow-auto ${className}`}>
      <table className={`w-full caption-bottom text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
        {children}
      </table>
    </div>
  );
};

export const RtlTableHeader: React.FC<RtlTableProps> = ({ children, className = '' }) => {
  return (
    <thead className={`[&_tr]:border-b ${className}`}>
      {children}
    </thead>
  );
};

export const RtlTableBody: React.FC<RtlTableProps> = ({ children, className = '' }) => {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
      {children}
    </tbody>
  );
};

export const RtlTableRow: React.FC<RtlTableProps> = ({ children, className = '' }) => {
  return (
    <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
      {children}
    </tr>
  );
};

export const RtlTableHead: React.FC<RtlTableProps> = ({ children, className = '' }) => {
  const { getTextAlign } = useRtlLayout();
  
  return (
    <th className={`h-12 px-4 ${getTextAlign('left')} align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>
      {children}
    </th>
  );
};

export const RtlTableCell: React.FC<RtlTableProps> = ({ children, className = '' }) => {
  const { getTextAlign } = useRtlLayout();
  
  return (
    <td className={`p-4 align-middle ${getTextAlign('left')} [&:has([role=checkbox])]:pr-0 ${className}`}>
      {children}
    </td>
  );
};
