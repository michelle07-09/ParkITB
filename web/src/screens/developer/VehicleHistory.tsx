export function VehicleHistory() {

  const mockHistory = [
    { plate: 'B 1234 SGW', type: 'directions_car', desc: 'Toyota Fortuner', gate: 'North Entrance', lane: 'Lane 02 (RFID)', entry: '25 Oct, 08:12', exit: '25 Oct, 16:45', duration: '8h 33m', status: 'COMPLETED', statusColor: 'bg-secondary-container text-on-secondary-container', fee: 'Rp 45.000' },
    { plate: 'D 9821 ZB', type: 'two_wheeler', desc: 'Honda Vario', gate: 'South Main', lane: 'Lane 04 (QRIS)', entry: '25 Oct, 10:30', exit: 'In Progress', duration: '6h 15m', status: 'ACTIVE', statusColor: 'bg-primary-fixed text-on-primary-fixed-variant', fee: '--' },
    { plate: 'F 4422 OP', type: 'directions_car', desc: 'Mitsubishi Pajero', gate: 'VIP West', lane: 'Manual (Admin)', entry: '25 Oct, 09:00', exit: '25 Oct, 14:20', duration: '5h 20m', status: 'COMPLETED', statusColor: 'bg-secondary-container text-on-secondary-container', fee: 'Rp 20.000' },
    { plate: 'Z 1199 KM', type: 'directions_car', desc: 'Unknown Model', gate: 'North Entrance', lane: 'Lane 01 (OCR Only)', entry: '25 Oct, 13:45', exit: '--', duration: '3h 00m', status: 'WARNING', statusColor: 'bg-error-container text-on-error-container', fee: '--', flagged: true },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Breadcrumbs */}
      <header className="flex justify-between items-end">
        <div>
          <nav className="flex gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2">
            <span>Vehicles</span>
            <span>/</span>
            <span className="text-primary">Historical Logs</span>
          </nav>
          <h1 className="text-4xl font-extrabold tracking-tighter text-primary font-headline">Vehicle History</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-surface-container-high text-on-primary-fixed-variant px-5 py-2.5 rounded-xl font-semibold hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined">download</span>
            <span>Download CSV</span>
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/10 active:scale-95 transition-all">
            <span className="material-symbols-outlined">refresh</span>
            <span>Sync Database</span>
          </button>
        </div>
      </header>

      {/* Summary Chips */}
      <section className="flex gap-4 overflow-x-auto pb-2">
        <div className="flex-none bg-surface-container-lowest border-l-4 border-primary-container p-4 rounded-xl min-w-[200px] shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total Entries</p>
          <p className="text-2xl font-black text-primary font-headline">12,482</p>
        </div>
        <div className="flex-none bg-surface-container-lowest border-l-4 border-secondary-container p-4 rounded-xl min-w-[200px] shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Active Now</p>
          <p className="text-2xl font-black text-on-surface font-headline">1,204</p>
        </div>
        <div className="flex-none bg-surface-container-lowest border-l-4 border-error p-4 rounded-xl min-w-[200px] shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Failed Reads</p>
          <p className="text-2xl font-black text-error font-headline">14</p>
        </div>
        <div className="flex-none bg-surface-container-lowest border-l-4 border-surface-tint p-4 rounded-xl min-w-[200px] shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Non-Member</p>
          <p className="text-2xl font-black text-on-surface font-headline">34%</p>
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="bg-surface-container-low p-6 rounded-xl flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[240px]">
          <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Search Vehicle / Plate</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-lowest border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary outline-none transition-all text-sm" placeholder="D 1234 ABC" type="text"/>
          </div>
        </div>
        <div className="w-48">
          <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Gate</label>
          <select className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary outline-none text-sm">
            <option>All Gates</option>
            <option>North Entrance</option>
            <option>South Main</option>
            <option>VIP West</option>
          </select>
        </div>
        <div className="w-48">
          <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Payment Method</label>
          <select className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary outline-none text-sm">
            <option>All Methods</option>
            <option>RFID Member</option>
            <option>E-Wallet</option>
            <option>QRIS</option>
          </select>
        </div>
        <div className="w-48">
          <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Date Range</label>
          <button className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest border-none ring-1 ring-outline-variant text-left text-sm flex justify-between items-center text-on-surface-variant">
            <span>Oct 24 - Oct 25</span>
            <span className="material-symbols-outlined text-sm">calendar_month</span>
          </button>
        </div>
        <button className="bg-primary text-white h-10 px-6 rounded-lg font-bold flex items-center justify-center hover:opacity-90 transition-opacity">
          Apply
        </button>
      </section>

      {/* Main History Table */}
      <section className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-container text-left border-b border-outline-variant/15">
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Plate Number</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Gate / Flow</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Entry Time</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Exit Time</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Total Fee</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {mockHistory.map((v, idx) => (
                <tr key={v.plate} className={`hover:bg-surface-container-low transition-colors cursor-pointer group ${idx % 2 === 0 && idx > 0 ? 'bg-surface-container-low/30' : ''}`}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                        <span className={`material-symbols-outlined ${v.flagged ? 'text-error' : 'text-primary'}`}>{v.type}</span>
                      </div>
                      <div>
                        <p className="font-bold text-primary">{v.plate}</p>
                        <p className="text-xs text-on-surface-variant">{v.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-semibold text-sm">{v.gate}</p>
                    <p className="text-xs text-on-surface-variant">{v.lane}</p>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium">{v.entry}</td>
                  <td className={`px-6 py-5 text-sm font-medium ${v.exit === 'In Progress' ? 'text-outline-variant italic' : ''}`}>{v.exit}</td>
                  <td className="px-6 py-5 text-sm font-medium">{v.duration}</td>
                  <td className="px-6 py-5">
                    <span className={`${v.statusColor} px-3 py-1 rounded-full text-xs font-bold`}>{v.status}</span>
                  </td>
                  <td className="px-6 py-5 font-bold text-primary">{v.fee}</td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 rounded-full hover:bg-white transition-colors">
                      <span className="material-symbols-outlined text-outline">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="p-4 border-t border-outline-variant/15 flex justify-between items-center mt-auto">
          <p className="text-sm text-on-surface-variant">Showing 1 to 4 of 12,482 entries</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold">1</button>
            <button className="w-10 h-10 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">2</button>
            <button className="w-10 h-10 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">3</button>
            <button className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
