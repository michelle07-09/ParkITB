import type { Incident } from '../store/useParkStore';
import { cn } from '../lib/utils';
import { AlertCircle, AlertTriangle, Info, ArrowRight } from 'lucide-react';

interface AlertBannerProps {
  incident: Incident;
  onHandle?: () => void;
}

export function AlertBanner({ incident, onHandle }: AlertBannerProps) {
  const config = {
    KRITIS: {
      bg: 'bg-severity-kritis-bg',
      border: 'border-l-severity-kritis',
      icon: <AlertCircle className="text-severity-kritis shrink-0" size={24} />,
      btn: 'bg-severity-kritis text-white hover:bg-red-700',
    },
    PERINGATAN: {
      bg: 'bg-severity-peringatan-bg',
      border: 'border-l-severity-peringatan',
      icon: <AlertTriangle className="text-severity-peringatan shrink-0" size={24} />,
      btn: 'bg-severity-peringatan text-white hover:bg-amber-700',
    },
    INFO: {
      bg: 'bg-severity-info-bg',
      border: 'border-l-severity-info',
      icon: <Info className="text-severity-info shrink-0" size={24} />,
      btn: 'bg-severity-info text-white hover:bg-blue-700',
    },
    SELESAI: {
      bg: 'bg-severity-selesai-bg',
      border: 'border-l-severity-selesai',
      icon: <Info className="text-severity-selesai shrink-0" size={24} />,
      btn: 'hidden',
    }
  };

  const style = config[incident.severity] || config.INFO;

  return (
    <div className={cn("flex items-center justify-between p-4 mb-2 shadow-sm rounded-r-lg border-l-4 border-y border-r border-gray-200", style.bg, style.border)}>
      <div className="flex items-center gap-4">
        {style.icon}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-text-primary text-base">
              {incident.gateId === 'g1' ? 'Gate Barat' : incident.gateId === 'g2' ? 'Gate Timur' : incident.gateId === 'g3' ? 'Gate Selatan' : 'Gate Utara'}
            </span>
            <span className="text-text-muted">—</span>
            <span className="font-semibold text-text-primary">{incident.type}</span>
          </div>
          <div className="text-sm text-text-muted font-mono mt-1">
            {incident.time}
          </div>
        </div>
      </div>
      
      {incident.severity !== 'SELESAI' && (
        <button 
          onClick={onHandle}
          className={cn("px-4 py-2 rounded font-semibold text-sm flex items-center gap-2 transition-colors", style.btn)}
        >
          {incident.severity === 'KRITIS' ? 'Tangani' : 'Lihat'}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
