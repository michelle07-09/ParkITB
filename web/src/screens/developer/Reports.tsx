export function Reports() {
  return (
    <>
      <header className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-headline font-extrabold text-primary tracking-tight">Reports Center</h2>
          <p className="text-on-surface-variant font-medium">Generate, export, and schedule automated system reports.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">add</span>
          New Report
        </button>
      </header>

      {/* Report Templates */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { title: 'Daily Summary', desc: 'Vehicle counts, revenue, and incident summary for each day.', icon: 'summarize', color: 'bg-primary text-white' },
          { title: 'Monthly Revenue', desc: 'Comprehensive financial breakdown by gate and payment method.', icon: 'payments', color: 'bg-primary-container text-white' },
          { title: 'Incident Log', desc: 'Detailed timeline of all security and system incidents.', icon: 'emergency_home', color: 'bg-error text-white' },
          { title: 'User Activity', desc: 'Aggregated user parking patterns and frequency analysis.', icon: 'person_search', color: 'bg-surface-tint text-white' },
          { title: 'System Audit', desc: 'Infrastructure uptime, latency trends, and error rates.', icon: 'security', color: 'bg-tertiary text-white' },
          { title: 'Custom Export', desc: 'Build a custom report with flexible date ranges and filters.', icon: 'tune', color: 'bg-secondary text-white' },
        ].map(r => (
          <div key={r.title} className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] flex flex-col hover:shadow-md transition-shadow cursor-pointer group">
            <div className={`w-12 h-12 ${r.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined">{r.icon}</span>
            </div>
            <h4 className="font-bold text-on-surface text-lg mb-1">{r.title}</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed flex-1">{r.desc}</p>
            <button className="mt-4 text-sm font-bold text-primary flex items-center gap-1 hover:underline">
              Generate <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        ))}
      </section>

      {/* Recent Reports */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-surface-container">
          <h4 className="text-xl font-bold text-primary font-headline">Recent Reports</h4>
          <span className="text-xs text-on-surface-variant font-medium">Last 7 days</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Report</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Generated</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Type</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Size</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {[
              { name: 'Daily Summary — Oct 29', date: 'Oct 30, 08:00', type: 'PDF', size: '2.4 MB' },
              { name: 'Monthly Revenue — September', date: 'Oct 01, 00:00', type: 'XLSX', size: '8.1 MB' },
              { name: 'Incident Log — Week 43', date: 'Oct 28, 12:00', type: 'PDF', size: '1.2 MB' },
            ].map(r => (
              <tr key={r.name} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-5 text-sm font-semibold">{r.name}</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant">{r.date}</td>
                <td className="px-6 py-5"><span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold">{r.type}</span></td>
                <td className="px-6 py-5 text-sm text-on-surface-variant">{r.size}</td>
                <td className="px-6 py-5">
                  <button className="p-2 hover:bg-primary/10 rounded-full text-primary"><span className="material-symbols-outlined">download</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
