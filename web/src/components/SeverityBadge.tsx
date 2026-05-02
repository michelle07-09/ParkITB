import { cn } from '../lib/utils';
import type { Severity } from '../store/useParkStore';

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const config = {
    KRITIS: {
      bg: 'bg-severity-kritis-bg',
      text: 'text-severity-kritis',
      border: 'border-severity-kritis',
      icon: 'emergency_home',
    },
    PERINGATAN: {
      bg: 'bg-severity-peringatan-bg',
      text: 'text-severity-peringatan',
      border: 'border-severity-peringatan',
      icon: 'warning',
    },
    INFO: {
      bg: 'bg-severity-info-bg',
      text: 'text-severity-info',
      border: 'border-severity-info',
      icon: 'info',
    },
    SELESAI: {
      bg: 'bg-severity-selesai-bg',
      text: 'text-severity-selesai',
      border: 'border-severity-selesai',
      icon: 'check_circle',
    },
  };

  const style = config[severity];

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", style.bg, style.text, style.border, className)}>
      <span className={cn("material-symbols-outlined text-sm", style.text)}>{style.icon}</span>
      <span>{severity}</span>
    </div>
  );
}
