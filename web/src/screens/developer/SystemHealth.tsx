import { useParkStore } from '../../store/useParkStore';

export function SystemHealth() {
  const { gates } = useParkStore();

  const services = [
    { name: 'API Gateway', status: 'Operational', uptime: '99.9%', latency: '45ms', icon: 'dns', ok: true },
    { name: 'PostgreSQL Cluster', status: 'Operational', uptime: '99.7%', latency: '12ms', icon: 'storage', ok: true },
    { name: 'Redis Cache', status: 'Operational', uptime: '99.99%', latency: '2ms', icon: 'memory', ok: true },
    { name: 'CCTV Node E-2', status: 'Offline', uptime: '85.2%', latency: 'N/A', icon: 'videocam_off', ok: false },
    { name: 'Supabase Realtime', status: 'Operational', uptime: '99.5%', latency: '67ms', icon: 'cloud', ok: true },
    { name: 'ANPR Engine', status: 'Degraded', uptime: '97.3%', latency: '320ms', icon: 'camera_enhance', ok: false },
  ];

  return (
    <>
      <header className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-headline font-extrabold text-primary tracking-tight">System Health</h2>
          <p className="text-on-surface-variant font-medium">Infrastructure monitoring and service status overview.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">All Core Systems Operational</span>
        </div>
      </header>

      {/* Service Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map(s => (
          <div key={s.name} className={`bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] border-l-4 ${s.ok ? 'border-emerald-500' : 'border-error'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${s.ok ? 'bg-emerald-100 text-emerald-600' : 'bg-error-container text-error'} flex items-center justify-center`}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{s.name}</h4>
                  <p className={`text-xs font-bold ${s.ok ? 'text-emerald-600' : 'text-error'}`}>{s.status}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low/50 p-3 rounded-lg">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase block">Uptime</span>
                <span className="text-sm font-bold text-primary">{s.uptime}</span>
              </div>
              <div className="bg-surface-container-low/50 p-3 rounded-lg">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase block">Latency</span>
                <span className="text-sm font-bold text-primary">{s.latency}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Gate Hardware Status */}
      <section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)]">
        <h4 className="text-xl font-bold text-primary font-headline mb-6">Gate Hardware Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gates.map(g => (
            <div key={g.id} className={`p-4 rounded-xl ${g.status === 'ONLINE' ? 'bg-surface-container-low' : g.status === 'ERROR' ? 'bg-error-container/20 border border-error/20' : 'bg-surface-container-highest/50'} flex items-center gap-4`}>
              <div className={`w-3 h-3 rounded-full ${g.status === 'ONLINE' ? 'bg-emerald-500' : g.status === 'ERROR' ? 'bg-error animate-pulse' : 'bg-slate-400'}`}></div>
              <div>
                <h5 className="font-bold text-sm">{g.name}</h5>
                <p className="text-[10px] text-on-surface-variant">{g.uptime}% uptime · {g.lastPing}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent System Logs */}
      <section className="mt-8 bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)]">
        <h4 className="text-xl font-bold text-primary font-headline mb-6">Recent System Logs</h4>
        <div className="space-y-2 font-mono text-[11px]">
          {[
            { time: '15:22:15', msg: 'AUTH_SUCCESS [USR_492] → Gate North', type: 'ok' },
            { time: '15:20:01', msg: 'GATE_TIMEOUT [NODE_E2] → CCTV offline', type: 'error' },
            { time: '15:18:45', msg: 'DB_SYNC_COMPLETE → 12,482 records synced', type: 'ok' },
            { time: '15:15:30', msg: 'ANPR_DEGRADED → High latency on South Gate', type: 'warn' },
            { time: '15:10:12', msg: 'SYSTEM_HEARTBEAT → All core nodes responding', type: 'ok' },
          ].map((log, i) => (
            <div key={i} className={`p-3 rounded border-l-2 flex items-start gap-3 ${
              log.type === 'error' ? 'border-error bg-error-container/10 text-error' :
              log.type === 'warn' ? 'border-secondary bg-secondary-container/10 text-secondary' :
              'border-primary-container bg-surface text-primary'
            }`}>
              <span className="opacity-50">{log.time}</span>
              <span>{log.msg}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
