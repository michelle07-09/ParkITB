export function VehicleMonitoringLive() {

  const mockLiveVehicles = [
    { plate: 'B 1234 ITB', type: 'directions_car', desc: 'Black Tesla Model 3', owner: 'Dr. Ahmad Faisal', ownerType: 'Faculty Staff', time: '08:42:15 AM', ago: '2 mins ago', gate: 'North Entrance', status: 'Parked', statusColor: 'bg-emerald-100 text-emerald-800' },
    { plate: 'D 8888 PL', type: 'motorcycle', desc: 'Honda Vario 160', owner: 'Siti Aminah', ownerType: 'Student', time: '08:40:02 AM', ago: '4 mins ago', gate: 'West Wing Gate', status: 'Parked', statusColor: 'bg-emerald-100 text-emerald-800' },
    { plate: 'B 9000 XYZ', type: 'local_shipping', desc: 'Logistics Truck', owner: 'Vendor: JNE Express', ownerType: 'Guest / Logistics', time: '08:35:44 AM', ago: '9 mins ago', gate: 'Loading Dock B', status: 'Exiting', statusColor: 'bg-secondary-container text-on-secondary-container' },
    { plate: 'F 4422 GHI', type: 'directions_car', desc: 'Silver Toyota Avanza', owner: 'Unknown', ownerType: 'No Registered RFID', time: '08:30:12 AM', ago: '14 mins ago', gate: 'South Gate', status: 'Flagged', statusColor: 'bg-error-container text-on-error-container', flagged: true },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <header className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary font-headline">Vehicle Monitoring</h1>
            <p className="text-on-surface-variant font-medium mt-1">Live tracking and access control management.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-surface-container-low px-6 py-3 rounded-xl flex items-center gap-4">
              <span className="flex items-center gap-2 text-primary font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE
              </span>
              <div className="h-4 w-[1px] bg-outline-variant/30"></div>
              <span className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">North Gate Active</span>
            </div>
          </div>
        </div>

        {/* Filters & Stats Bar */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-5 flex gap-3">
            <div className="flex-1 bg-primary text-white p-4 rounded-xl flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-widest opacity-70">Inside</span>
              <span className="text-3xl font-extrabold tracking-tighter">247</span>
            </div>
            <div className="flex-1 bg-surface-container-highest p-4 rounded-xl flex flex-col justify-between border-l-4 border-primary">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">In Today</span>
              <span className="text-3xl font-extrabold tracking-tighter text-primary">892</span>
            </div>
            <div className="flex-1 bg-secondary-container p-4 rounded-xl flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">Out Today</span>
              <span className="text-3xl font-extrabold tracking-tighter text-on-secondary-container">645</span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 bg-surface-container-low p-2 rounded-xl flex items-center gap-2">
            <div className="flex-grow relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full bg-surface-container-lowest border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Search plate number..." type="text"/>
            </div>
            <select className="bg-surface-container-lowest border-none rounded-lg px-4 py-2 text-sm font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/20 outline-none">
              <option>All Gates</option>
              <option>North Gate</option>
              <option>South Gate</option>
              <option>West Wing</option>
            </select>
            <select className="bg-surface-container-lowest border-none rounded-lg px-4 py-2 text-sm font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/20 outline-none">
              <option>Vehicle Type</option>
              <option>Car</option>
              <option>Motorcycle</option>
            </select>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              Today
            </button>
          </div>
        </div>
      </header>

      {/* Main Table Section */}
      <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Vehicle Details</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Owner</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Entry Time</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Gate</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {mockLiveVehicles.map((v, idx) => (
              <tr 
                key={v.plate} 
                className={`${idx % 2 !== 0 ? 'bg-surface-container-low/30' : ''} hover:bg-surface-container-low transition-colors cursor-pointer group ${v.flagged ? 'border-l-4 border-error' : ''}`}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className={`${v.flagged ? 'bg-error-container/20' : 'bg-primary-container/10'} p-2 rounded-lg`}>
                      <span className={`material-symbols-outlined ${v.flagged ? 'text-error' : 'text-primary'}`}>{v.type}</span>
                    </div>
                    <div>
                      <div className={`font-bold ${v.flagged ? 'text-error' : 'text-on-surface'}`}>{v.plate}</div>
                      <div className="text-xs text-on-surface-variant">{v.desc}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-semibold">{v.owner}</div>
                  <div className="text-xs text-on-surface-variant">{v.ownerType}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-medium">{v.time}</div>
                  <div className="text-xs text-on-surface-variant">{v.ago}</div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-medium">{v.gate}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full ${v.statusColor} text-xs font-bold uppercase tracking-wider`}>{v.status}</span>
                </td>
                <td className="px-6 py-5">
                  <button className={`p-2 rounded-full transition-colors ${v.flagged ? 'hover:bg-error/10 text-error' : 'hover:bg-primary/10 text-primary'}`}>
                    <span className="material-symbols-outlined">{v.flagged ? 'warning' : 'visibility'}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-surface-container-low/50 flex justify-between items-center">
          <span className="text-sm text-on-surface-variant font-medium">Showing 1-4 of 247 vehicles</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Status Indicators */}
      <div className="fixed bottom-8 left-[calc(16rem+2rem)] flex gap-4 z-30">
        <div className="bg-white/90 backdrop-blur-xl shadow-xl px-4 py-2 rounded-full border border-primary/10 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-primary uppercase tracking-tighter">System Health: Optimal</span>
        </div>
      </div>
    </div>
  );
}
