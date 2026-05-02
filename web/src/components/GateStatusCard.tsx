import type { Gate } from '../store/useParkStore';
import { cn } from '../lib/utils';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GateStatusCardProps {
  gate: Gate;
  className?: string;
}

export function GateStatusCard({ gate, className }: GateStatusCardProps) {
  const navigate = useNavigate();
  const isError = gate.status === 'ERROR';

  const statusConfig = {
    ONLINE: { text: 'text-status-online', bg: 'bg-status-online/10', dot: 'bg-status-online', label: 'ONLINE' },
    OFFLINE: { text: 'text-status-offline', bg: 'bg-status-offline/10', dot: 'bg-status-offline', label: 'OFFLINE' },
    ERROR: { text: 'text-status-error', bg: 'bg-status-error/10', dot: 'bg-status-error animate-pulse-error', label: 'ERROR' },
  };

  const style = statusConfig[gate.status];

  return (
    <div className={cn(
      "bg-surface rounded-lg shadow-card p-5 border flex flex-col min-w-[280px]",
      isError ? "border-status-error" : "border-gray-200",
      className
    )}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-base font-semibold text-text-primary">{gate.name}</h2>
          {isError && (
            <div className="flex items-center text-status-error mt-1 text-sm font-medium">
              <AlertTriangle size={14} className="mr-1" />
              Perlu Perhatian
            </div>
          )}
        </div>
        <div className={cn("px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5", style.bg, style.text)}>
          <div className={cn("w-2 h-2 rounded-full", style.dot)} />
          {style.label}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mb-6 bg-background rounded p-3 text-center">
        <div>
          <div className="text-text-muted text-xs mb-1">Hari Ini</div>
          <div className="font-semibold text-text-primary text-sm">{gate.vehiclesToday}</div>
        </div>
        <div className="border-x border-gray-200">
          <div className="text-text-muted text-xs mb-1">Antrean</div>
          <div className={cn("font-semibold text-sm", gate.queue > 5 ? "text-accent" : "text-text-primary")}>
            {gate.queue}
          </div>
        </div>
        <div>
          <div className="text-text-muted text-xs mb-1">Uptime</div>
          <div className={cn("font-semibold text-sm", gate.uptime < 98 ? "text-status-error" : "text-text-primary")}>
            {gate.uptime}%
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2">
        <button className={cn(
          "flex-1 py-2 px-3 rounded text-sm font-semibold transition-colors",
          "bg-status-error text-white hover:bg-red-700"
        )}>
          Buka Paksa
        </button>
        <button 
          onClick={() => navigate(`/petugas/gate/${gate.id}`)}
          className="flex-1 py-2 px-3 rounded text-sm font-semibold border border-primary text-primary hover:bg-primary/5 transition-colors"
        >
          Detail
        </button>
      </div>
    </div>
  );
}
