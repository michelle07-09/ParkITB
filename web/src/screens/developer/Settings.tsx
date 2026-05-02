export function Settings() {
  return (
    <>
      <header className="mb-10">
        <h2 className="text-4xl font-headline font-extrabold text-primary tracking-tight">Settings</h2>
        <p className="text-on-surface-variant font-medium">System configuration and preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* General */}
          <section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)]">
            <h4 className="text-xl font-bold text-primary font-headline mb-6">General</h4>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">System Name</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" defaultValue="ParkITB — Institut Teknologi Bandung"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Admin Email</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" defaultValue="admin@itb.ac.id"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Timezone</label>
                <select className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none">
                  <option>Asia/Jakarta (WIB, UTC+7)</option>
                  <option>Asia/Makassar (WITA, UTC+8)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)]">
            <h4 className="text-xl font-bold text-primary font-headline mb-6">Pricing Rules</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Car - Base Fee</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" defaultValue="Rp 5.000"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Car - Per Hour</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" defaultValue="Rp 5.000"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Motorcycle - Base Fee</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" defaultValue="Rp 2.000"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Motorcycle - Per Hour</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" defaultValue="Rp 2.000"/>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)]">
            <h4 className="text-xl font-bold text-primary font-headline mb-6">Notifications</h4>
            <div className="space-y-4">
              {[
                { label: 'Critical Incident Alerts', desc: 'Receive alerts for KRITIS-level incidents', defaultChecked: true },
                { label: 'Gate Offline Warnings', desc: 'Notify when a gate goes offline for >2 minutes', defaultChecked: true },
                { label: 'Daily Summary Email', desc: 'Receive a daily report at 00:00 WIB', defaultChecked: false },
                { label: 'Revenue Threshold Alert', desc: 'Alert when daily revenue drops below Rp 10M', defaultChecked: true },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-xl">
                  <div>
                    <h5 className="font-bold text-sm text-on-surface">{n.label}</h5>
                    <p className="text-xs text-on-surface-variant">{n.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={n.defaultChecked} className="sr-only peer"/>
                    <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Side Info */}
        <div className="space-y-8">
          <div className="bg-primary-container text-white p-8 rounded-xl">
            <span className="material-symbols-outlined text-4xl text-on-primary-container mb-4 block">info</span>
            <h4 className="text-xl font-bold mb-2">System Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="opacity-70">Version</span><span className="font-bold">v2.4.0-ACADEMIC</span></div>
              <div className="flex justify-between"><span className="opacity-70">Server</span><span className="font-bold">NODE-JS-BDO-01</span></div>
              <div className="flex justify-between"><span className="opacity-70">Database</span><span className="font-bold">Supabase PostgreSQL</span></div>
              <div className="flex justify-between"><span className="opacity-70">Last Deploy</span><span className="font-bold">Oct 28, 2026</span></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)]">
            <h4 className="font-bold text-primary font-headline mb-4">Danger Zone</h4>
            <div className="space-y-3">
              <button className="w-full py-3 bg-error/10 text-error rounded-xl font-bold text-sm hover:bg-error/20 transition-colors">Reset All Gate Configs</button>
              <button className="w-full py-3 bg-error/10 text-error rounded-xl font-bold text-sm hover:bg-error/20 transition-colors">Purge Transaction Logs</button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2">
          <span className="material-symbols-outlined">save</span>
          Save All Changes
        </button>
      </div>
    </>
  );
}
