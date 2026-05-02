import { useParkStore } from '../../store/useParkStore';

export function DashboardOverview() {
  const { vehicles, incidents } = useParkStore();
  const activeIncidents = incidents.filter(i => i.status === 'OPEN').length;

  return (
    <>
      {/* Top Bar / Dashboard Header */}
      <header className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-headline font-extrabold text-primary tracking-tight">Analytics Overview</h2>
          <p className="text-on-surface-variant font-medium">Real-time system health and performance monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/10">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">System Live</span>
          </div>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] border-l-4 border-primary">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Total Vehicles</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-headline font-bold text-on-surface">12,842</h3>
            <span className="text-xs font-bold text-emerald-600">+12%</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] border-l-4 border-primary-container">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Success Trans.</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-headline font-bold text-on-surface">99.8%</h3>
            <span className="text-xs font-bold text-emerald-600">Stable</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] border-l-4 border-secondary-container">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Revenue</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-headline font-bold text-on-surface">Rp 42.5jt</h3>
            <span className="text-xs font-bold text-emerald-600">+5.4%</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] border-l-4 border-surface-tint">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Slot %</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-headline font-bold text-on-surface">78.2%</h3>
            <span className="text-xs font-bold text-secondary">High</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] border-l-4 border-error">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Active Incidents</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-headline font-bold text-on-surface">{activeIncidents}</h3>
            <span className="text-xs font-bold text-error">Critical</span>
          </div>
        </div>
      </section>

      {/* Charts Layout */}
      <section className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Revenue Line Chart (70%) */}
        <div className="w-full lg:w-[70%] bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-xl font-headline font-bold text-primary">Revenue Streams</h4>
              <p className="text-xs font-medium text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">sync</span>
                Labeled 'Supabase Realtime' • Live update every 5s
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-bold rounded-full bg-surface-container text-primary">Day</button>
              <button className="px-3 py-1 text-xs font-bold rounded-full bg-primary text-white">Week</button>
              <button className="px-3 py-1 text-xs font-bold rounded-full bg-surface-container text-primary">Month</button>
            </div>
          </div>
          {/* Chart Visualization Mockup */}
          <div className="h-64 w-full relative flex items-end justify-between px-2 gap-1">
            <div className="absolute inset-0 flex flex-col justify-between opacity-5">
              <div className="border-b border-on-surface w-full h-0"></div>
              <div className="border-b border-on-surface w-full h-0"></div>
              <div className="border-b border-on-surface w-full h-0"></div>
              <div className="border-b border-on-surface w-full h-0"></div>
            </div>
            <div className="flex-1 flex items-end justify-between relative z-10 h-full py-4">
              <div className="h-[40%] w-2 bg-primary rounded-full opacity-20"></div>
              <div className="h-[55%] w-2 bg-primary rounded-full opacity-30"></div>
              <div className="h-[45%] w-2 bg-primary rounded-full opacity-40"></div>
              <div className="h-[75%] w-2 bg-primary rounded-full opacity-50"></div>
              <div className="h-[65%] w-2 bg-primary rounded-full opacity-60"></div>
              <div className="h-[85%] w-2 bg-primary rounded-full opacity-70"></div>
              <div className="h-[95%] w-2 bg-primary rounded-full"></div>
            </div>
            <svg className="absolute inset-0 w-full h-64 pointer-events-none" preserveAspectRatio="none">
              <path className="text-primary" d="M0,200 Q150,150 300,180 T600,100 T900,50" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
              <circle className="text-primary" cx="900" cy="50" fill="white" r="4" stroke="currentColor" strokeWidth="2"></circle>
            </svg>
          </div>
        </div>

        {/* Traffic Volume (30%) */}
        <div className="w-full lg:w-[30%] bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)]">
          <h4 className="text-xl font-headline font-bold text-primary mb-6">Traffic Volume</h4>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                <span>Inbound</span>
                <span>842 vehicles</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[75%] rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                <span>Outbound</span>
                <span>612 vehicles</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container w-[55%] rounded-full"></div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-surface-container-low rounded-xl">
              <p className="text-xs font-medium text-on-surface-variant italic leading-relaxed">
                "Morning peak hour detected. Automated gate calibration in progress."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lower Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] overflow-hidden">
          <div className="p-8 pb-4">
            <h4 className="text-xl font-headline font-bold text-primary">Recent Transactions</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface text-on-surface-variant uppercase text-[10px] font-bold tracking-[0.1em]">
                <tr>
                  <th className="px-8 py-4">Vehicle ID</th>
                  <th className="px-8 py-4">Entry Point</th>
                  <th className="px-8 py-4">Duration</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface">
                {vehicles.slice(0, 3).map((v, idx) => (
                  <tr key={v.id} className={`${idx % 2 !== 0 ? 'bg-surface-container-low/30' : ''} hover:bg-surface-container-low transition-colors`}>
                    <td className="px-8 py-5 text-sm font-semibold">{v.plate}</td>
                    <td className="px-8 py-5 text-sm text-on-surface-variant">{v.entryGate}</td>
                    <td className="px-8 py-5 text-sm text-on-surface-variant">{v.duration || '-'}</td>
                    <td className="px-8 py-5 text-sm font-bold">{v.amount ? `Rp ${v.amount.toLocaleString()}` : '-'}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        v.paymentStatus === 'LUNAS' ? 'bg-emerald-100 text-emerald-700' :
                        v.paymentStatus === 'BELUM BAYAR' ? 'bg-amber-100 text-amber-700' :
                        'bg-surface-container-high text-on-surface-variant'
                      }`}>
                        {v.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health Mini-Panel */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] flex flex-col gap-6">
          <h4 className="text-xl font-headline font-bold text-primary">System Health</h4>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">dns</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold">API Gateway</span>
                  <span className="text-[10px] font-bold text-emerald-600">99.9%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full">
                  <div className="h-full bg-emerald-500 w-[99.9%] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">storage</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold">PostgreSQL Cluster</span>
                  <span className="text-[10px] font-bold text-emerald-600">Active</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full">
                  <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-error-container/10 flex items-center justify-center text-error">
                <span className="material-symbols-outlined">videocam_off</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold">CCTV Node E-2</span>
                  <span className="text-[10px] font-bold text-error">Offline</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full">
                  <div className="h-full bg-error w-[15%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto border-t border-surface pt-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Recent Logs</p>
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-mono bg-surface p-2 rounded border-l-2 border-primary-container text-primary flex items-start gap-2">
                <span className="opacity-50">14:22:15</span>
                <span>AUTH_SUCCESS [USR_492]</span>
              </div>
              <div className="text-[11px] font-mono bg-surface p-2 rounded border-l-2 border-error text-error flex items-start gap-2">
                <span className="opacity-50">14:20:01</span>
                <span>GATE_TIMEOUT [NODE_E2]</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
