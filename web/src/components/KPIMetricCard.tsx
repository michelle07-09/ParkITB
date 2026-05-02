import { cn } from '../lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import React from 'react';

interface KPIMetricCardProps {
  title: string;
  value: string;
  trend?: number; // percentage, positive or negative
  icon: React.ReactNode;
  iconBgClass?: string;
  className?: string;
}

export function KPIMetricCard({ title, value, trend, icon, iconBgClass = 'bg-primary/10 text-primary', className }: KPIMetricCardProps) {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <div className={cn("bg-surface rounded-lg shadow-card p-5 border border-gray-200 flex flex-col justify-between min-w-[200px]", className)}>
      <div className="flex justify-between items-start mb-4">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", iconBgClass)}>
          {icon}
        </div>
        
        {trend !== undefined && (
          <div className={cn(
            "flex items-center text-xs font-semibold px-2 py-1 rounded-full",
            isPositive ? "bg-status-online/10 text-status-online" : isNegative ? "bg-status-error/10 text-status-error" : "bg-gray-100 text-text-muted"
          )}>
            {isPositive && <ArrowUpRight size={14} className="mr-0.5" />}
            {isNegative && <ArrowDownRight size={14} className="mr-0.5" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div>
        <div className="text-2xl font-bold text-text-primary">{value}</div>
        <div className="text-sm font-medium text-text-muted mt-1">{title}</div>
      </div>
    </div>
  );
}
