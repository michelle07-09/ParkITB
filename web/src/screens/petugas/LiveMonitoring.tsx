import { useParkStore } from '../../store/useParkStore';
import { useNavigate } from 'react-router-dom';

export function LiveMonitoring() {
  const navigate = useNavigate();
  const { gates, incidents } = useParkStore();
  const activeIncidents = incidents.filter(i => i.status === 'OPEN');

  return (
    <div className="space-y-8">
      {/* Alert Banner Area */}
      {activeIncidents.length > 0 && (
        <section className="w-full bg-surface-container-highest rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-error">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-error fill-icon">warning</span>
            <div>
              <p className="font-headline font-bold text-on-surface">Peringatan Keamanan Aktif</p>
              <p className="text-sm text-on-surface-variant">
                {activeIncidents.length} insiden aktif yang memerlukan perhatian. Insiden terbaru: {activeIncidents[0]?.type}.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-error text-on-error rounded-full text-xs font-bold tracking-widest">KRITIS</span>
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest">PERINGATAN</span>
            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-bold tracking-widest">INFO</span>
          </div>
        </section>
      )}

      {/* Status Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gates.map((gate) => (
          <div 
            key={gate.id} 
            className={`bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-between h-48 ${gate.status === 'ERROR' ? 'border-2 border-error/20' : ''}`}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-headline font-bold text-lg">{gate.name}</h3>
              {gate.status === 'ONLINE' && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">ONLINE</span>}
              {gate.status === 'OFFLINE' && <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">OFFLINE</span>}
              {gate.status === 'ERROR' && <span className="px-2 py-0.5 bg-error-container text-error rounded-full text-[10px] font-bold uppercase tracking-wider">ERROR</span>}
            </div>
            <div className="space-y-1">
              <p className={`text-2xl font-black font-headline ${gate.status === 'ERROR' ? 'text-error' : 'text-primary'}`}>
                {gate.vehiclesToday} <span className="text-xs font-normal text-on-surface-variant">Vehicles</span>
              </p>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${gate.status === 'ERROR' ? 'text-error' : 'text-on-surface-variant font-normal'}`}>
                {gate.status === 'ERROR' ? 'Action Required' : `Last: ${gate.lastPing}`}
              </p>
            </div>
            {gate.status === 'ERROR' ? (
              <button 
                onClick={() => navigate(`/petugas/gate/${gate.id}`)}
                className="w-full py-2 btn-gradient text-white rounded-xl font-semibold text-sm active:scale-95 transition-transform"
              >
                Emergency Open
              </button>
            ) : (
              <button 
                onClick={() => navigate(`/petugas/gate/${gate.id}`)}
                className="w-full py-2 bg-surface-container-high text-on-primary-fixed-variant rounded-xl font-semibold text-sm hover:bg-surface-container-highest transition-colors"
              >
                Manual Override
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Main Dashboard Content */}
      <section className="flex flex-col lg:flex-row gap-8">
        {/* Live Incident Feed (60%) */}
        <div className="w-full lg:w-[60%] bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-headline font-extrabold text-primary uppercase tracking-tight">Live Incident Feed</h2>
              <p className="text-sm text-on-surface-variant">Real-time surveillance monitoring and gateway events.</p>
            </div>
            <button 
              onClick={() => navigate('/petugas/incidents')}
              className="text-sm font-bold text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Timestamp</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Gate</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Incident</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Severity</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-0">
                {incidents.slice(0, 5).map((inc, index) => {
                  const gateName = gates.find(g => g.id === inc.gateId)?.name;
                  const isEven = index % 2 === 0;
                  return (
                    <tr key={inc.id} className={`${isEven ? 'bg-surface-container-lowest' : 'bg-surface-container-low/30'} hover:bg-surface-container-low transition-colors`}>
                      <td className="px-6 py-5 text-sm font-medium">{inc.time}</td>
                      <td className="px-6 py-5 text-sm">{gateName}</td>
                      <td className="px-6 py-5 text-sm">{inc.type}</td>
                      <td className="px-6 py-5">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                          inc.severity === 'KRITIS' ? 'bg-error-container text-error' :
                          inc.severity === 'PERINGATAN' ? 'bg-secondary-container text-on-secondary-container' :
                          'bg-surface-container-high text-on-surface-variant'
                        }`}>
                          {inc.severity}
                        </span>
                      </td>
                      <td className={`px-6 py-5 text-sm font-semibold ${inc.status === 'OPEN' ? 'text-on-surface-variant italic' : 'text-primary'}`}>
                        {inc.status === 'OPEN' ? 'Investigating...' : 'Resolved'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Zone Map (40%) */}
        <div className="w-full lg:w-[40%] bg-surface-container-low rounded-xl p-8 relative overflow-hidden flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-headline font-extrabold text-primary uppercase tracking-tight">Zone Availability</h2>
            <p className="text-sm text-on-surface-variant">Real-time occupancy heat map.</p>
          </div>
          
          <div className="flex-grow grid grid-cols-6 grid-rows-8 gap-2 bg-white/40 p-4 rounded-xl relative backdrop-blur-md">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAIYOoBOfeJQ4P5tNQ_E0nQBQVjse3NbeSZKKcG0pQMZppCI_l0uoDadwPkzroxXncCQg7i3uOjgwy2-_pIRGjDPggzFVCAskgv7CXU7nJIOSrw9C-ijS1ALbW5-VvkzaeYGGEvzoiYLf2MoGsbN4ha9ia_RZxGFkb1RVNu9JHy5pY3eb08epodCb1aFEhcjEREsG6flS_MLqV8nJUFGz2Qcet57_pdrBQ-4bj_txp4wzek-QTGJBmN3Sk9m2Uq8I9vYUrkvCtDWs')" }}></div>
            {/* Grid Mockup from 2.html */}
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="col-span-6 h-8 flex items-center justify-center text-[10px] font-bold text-primary/40 uppercase tracking-widest italic">Main Driveway</div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-yellow-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-green-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            <div className="bg-red-500/80 rounded-sm z-10 border border-white/20"></div>
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between bg-white/80 backdrop-blur-lg rounded-lg p-3 shadow-lg z-20 border border-white">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-on-surface uppercase">Full</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-on-surface uppercase">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-on-surface uppercase">Free</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center bg-primary p-4 rounded-xl text-white">
            <div>
              <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">Total Occupancy</p>
              <p className="text-xl font-headline font-black">84.2%</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">Peak Expected</p>
              <p className="text-xl font-headline font-black">15:30</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
