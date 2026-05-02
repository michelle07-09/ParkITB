import { useMemo } from 'react';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const colors = ['bg-blue-50', 'bg-blue-100', 'bg-blue-300', 'bg-blue-600', 'bg-blue-900'];

function generateHeatmapRow() {
  return Array.from({ length: 24 }, () => colors[Math.floor(Math.random() * 5)]);
}

export function RevenueDashboard() {
  const heatmapData = useMemo(() => days.map(() => generateHeatmapRow()), []);

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-end mb-10">
        <div>
          <span className="text-secondary font-bold text-xs tracking-widest uppercase">Institutional Intelligence</span>
          <h2 className="text-4xl font-black tracking-tight text-primary font-headline mt-1">Revenue Dashboard</h2>
          <p className="text-on-surface-variant mt-1">Detailed financial performance and gate traffic analysis.</p>
        </div>
        <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-xl">
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-lg shadow-sm">
            <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
            <span className="text-sm font-medium">Oct 01, 2026 - Oct 31, 2026</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container-highest transition-colors rounded-lg text-sm font-semibold">
            <span className="material-symbols-outlined text-primary">filter_list</span>
            Custom Range
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] flex flex-col justify-between">
          <div>
            <span className="text-on-surface-variant text-xs font-bold tracking-widest uppercase mb-2 block">Total Revenue</span>
            <h3 className="text-2xl font-black text-primary font-headline">Rp 482.5M</h3>
          </div>
          <div className="mt-4 flex items-center gap-1 text-green-600 text-xs font-bold">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>12.4% vs last month</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] flex flex-col justify-between">
          <div>
            <span className="text-on-surface-variant text-xs font-bold tracking-widest uppercase mb-2 block">Avg. Daily Revenue</span>
            <h3 className="text-2xl font-black text-primary font-headline">Rp 15.6M</h3>
          </div>
          <div className="mt-4 flex items-center gap-1 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>Consistent flow</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] flex flex-col justify-between">
          <div>
            <span className="text-on-surface-variant text-xs font-bold tracking-widest uppercase mb-2 block">Busiest Hour</span>
            <h3 className="text-2xl font-black text-primary font-headline">08:00 — 10:00</h3>
          </div>
          <div className="mt-4">
            <span className="bg-on-secondary-container/10 text-secondary-container px-2 py-0.5 rounded-full text-[10px] font-bold">PEAK TRAFFIC</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] flex flex-col justify-between">
          <div>
            <span className="text-on-surface-variant text-xs font-bold tracking-widest uppercase mb-2 block">Top Method</span>
            <h3 className="text-2xl font-black text-primary font-headline">QRIS (64%)</h3>
          </div>
          <div className="mt-4 flex items-center gap-1 text-primary-container text-xs font-bold">
            <span className="material-symbols-outlined text-sm">qr_code_2</span>
            <span>Digital preferred</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] flex flex-col justify-between">
          <div>
            <span className="text-on-surface-variant text-xs font-bold tracking-widest uppercase mb-2 block">Active Members</span>
            <h3 className="text-2xl font-black text-primary font-headline">1,240</h3>
          </div>
          <div className="mt-4 flex items-center gap-1 text-secondary font-bold text-xs">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>+48 new this week</span>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold text-primary font-headline">Revenue Trend</h4>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full">DAILY</span>
              <span className="px-3 py-1 bg-surface-container text-primary text-[10px] font-bold rounded-full">WEEKLY</span>
            </div>
          </div>
          <div className="h-64 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#002a58" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#002a58" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,180 Q100,160 200,140 T400,100 T600,130 T800,70 T1000,90 V200 H0 Z" fill="url(#gradient-area)"></path>
              <path d="M0,180 Q100,160 200,140 T400,100 T600,130 T800,70 T1000,90" fill="none" stroke="#002a58" strokeLinecap="round" strokeWidth="4"></path>
            </svg>
            <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-[10px] text-on-surface-variant font-bold">
              <span>20M</span><span>15M</span><span>10M</span><span>5M</span><span>0</span>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-on-surface-variant font-bold px-8">
            <span>OCT 01</span><span>OCT 07</span><span>OCT 14</span><span>OCT 21</span><span>OCT 31</span>
          </div>
        </div>

        {/* Payment Methods Donut */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] flex flex-col">
          <h4 className="text-xl font-bold text-primary font-headline mb-8">Payment Methods</h4>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 rounded-full border-[16px] border-primary-container/10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[16px] border-primary border-r-transparent border-b-transparent rotate-45"></div>
              <div className="text-center">
                <span className="text-3xl font-black text-primary">64%</span>
                <span className="block text-[10px] text-on-surface-variant font-bold tracking-widest">QRIS</span>
              </div>
            </div>
            <div className="mt-8 w-full space-y-3">
              {[
                { color: 'bg-primary', label: 'QRIS (Gopay/OVO)', value: 'Rp 308.8M' },
                { color: 'bg-secondary-container', label: 'E-Money (Mandiri/BNI)', value: 'Rp 125.4M' },
                { color: 'bg-surface-dim', label: 'Cash / Manual', value: 'Rp 48.3M' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Heatmap & Gate Performance */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Heatmap */}
        <div className="xl:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-primary font-headline">Revenue Density (7×24)</h4>
            <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant">
              <span>Min</span>
              <div className="flex gap-1">
                {colors.map((c, i) => <div key={i} className={`w-3 h-3 ${c} rounded-sm`}></div>)}
              </div>
              <span>Max</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="flex mb-2">
                <div className="w-8"></div>
                <div className="flex-1 flex justify-between px-2 text-[9px] font-bold text-on-surface-variant">
                  {['00','02','04','06','08','10','12','14','16','18','20','22'].map(h => <span key={h}>{h}</span>)}
                </div>
              </div>
              <div className="space-y-1">
                {days.map((day, di) => (
                  <div key={day} className="flex items-center gap-2">
                    <span className="w-8 text-[10px] font-bold text-on-surface-variant">{day}</span>
                    <div className="flex-1 grid grid-cols-[repeat(24,minmax(0,1fr))] gap-1">
                      {heatmapData[di].map((color, ci) => (
                        <div key={ci} className={`h-6 w-full ${color} rounded-sm opacity-80`}></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gate Performance */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)]">
          <h4 className="text-xl font-bold text-primary font-headline mb-6">Gate Performance</h4>
          <div className="space-y-4">
            {[
              { name: 'Main Gate A', entries: '8,245', revenue: 'Rp 212M', weight: '44%', active: true },
              { name: 'North Gate B', entries: '5,120', revenue: 'Rp 148M', weight: '31%', active: false },
              { name: 'South Gate C', entries: '3,980', revenue: 'Rp 92M', weight: '19%', active: true },
              { name: 'Staff Entry D', entries: '1,120', revenue: 'Rp 30.5M', weight: '6%', active: false },
            ].map((g, i) => (
              <div key={g.name} className={`p-4 ${i % 2 === 0 ? 'bg-surface-container-low' : ''} rounded-lg flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${g.active ? 'bg-primary-container text-white' : 'bg-surface-container-highest text-primary'} flex items-center justify-center rounded-lg`}>
                    <span className="material-symbols-outlined">gate</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-primary">{g.name}</h5>
                    <span className="text-[10px] text-on-surface-variant font-medium">{g.entries} Entries</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-primary">{g.revenue}</div>
                  <div className={`text-[9px] font-bold ${g.active ? 'text-green-600' : 'text-on-surface-variant'}`}>{g.weight} Weight</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
