import { useState } from 'react';
import { useParkStore } from '../../store/useParkStore';
import type { Incident } from '../../store/useParkStore';

export function ActiveIncidents() {
  const { incidents, gates, resolveIncident } = useParkStore();
  const [filter, setFilter] = useState<'Semua' | 'KRITIS' | 'PERINGATAN' | 'SELESAI'>('Semua');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const filteredIncidents = incidents.filter(inc => {
    if (filter === 'Semua') return true;
    if (filter === 'SELESAI') return inc.status === 'RESOLVED';
    return inc.severity === filter && inc.status === 'OPEN';
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'KRITIS': 
        return (
          <span className="bg-error-container text-error px-3 py-1 rounded-full text-[10px] font-black tracking-tighter flex items-center w-fit gap-1">
            <span className="material-symbols-outlined text-[10px] fill-icon">emergency_home</span>
            KRITIS
          </span>
        );
      case 'PERINGATAN': 
        return (
          <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-black tracking-tighter flex items-center w-fit gap-1">
            <span className="material-symbols-outlined text-[10px]">warning</span>
            PERINGATAN
          </span>
        );
      case 'SELESAI':
        return (
          <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-black tracking-tighter flex items-center w-fit gap-1 opacity-60">
            RESOLVED
          </span>
        );
      default: 
        return (
          <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-black tracking-tighter flex items-center w-fit gap-1">
            INFO
          </span>
        );
    }
  };

  const criticalCount = incidents.filter(i => i.severity === 'KRITIS' && i.status === 'OPEN').length;
  const warningCount = incidents.filter(i => i.severity === 'PERINGATAN' && i.status === 'OPEN').length;

  return (
    <>
      <div className="w-full min-h-screen bg-surface">
        {/* Editorial Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary font-headline">ACTIVE INCIDENTS</h1>
            <p className="text-on-surface-variant font-medium mt-2">Real-time gateway monitoring and security response.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-sm">download</span>
              Export System Logs
            </button>
          </div>
        </header>

        {/* Bento Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-error">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">KRITIS</p>
            <h2 className="text-3xl font-black text-on-surface font-headline">{criticalCount.toString().padStart(2, '0')}</h2>
            <p className="text-xs text-error font-semibold mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">priority_high</span> 
              Requires immediate action
            </p>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-secondary-container">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">PERINGATAN</p>
            <h2 className="text-3xl font-black text-on-surface font-headline">{warningCount.toString().padStart(2, '0')}</h2>
            <p className="text-xs text-secondary font-semibold mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">warning</span> 
              Active investigation
            </p>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">TOTAL SEMUA</p>
            <h2 className="text-3xl font-black text-on-surface font-headline">{incidents.length}</h2>
            <p className="text-xs text-on-surface-variant font-medium mt-2">Past 24 hours</p>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-end">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="relative z-10">
              <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">NETWORK HEALTH</p>
              <h2 className="text-3xl font-black text-on-surface font-headline">98%</h2>
              <p className="text-xs text-primary font-semibold mt-2">All nodes online</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-8 mb-6 border-b-0 overflow-x-auto">
          {['Semua', 'KRITIS', 'PERINGATAN', 'SELESAI'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`pb-3 font-bold text-sm tracking-wide transition-colors whitespace-nowrap ${
                filter === f ? 'text-primary border-b-2 border-secondary-container font-extrabold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Incident Table */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="py-4 px-6 text-xs font-black text-on-surface-variant uppercase tracking-widest">No.</th>
                  <th className="py-4 px-6 text-xs font-black text-on-surface-variant uppercase tracking-widest">Waktu</th>
                  <th className="py-4 px-6 text-xs font-black text-on-surface-variant uppercase tracking-widest">Gate</th>
                  <th className="py-4 px-6 text-xs font-black text-on-surface-variant uppercase tracking-widest">Jenis Insiden</th>
                  <th className="py-4 px-6 text-xs font-black text-on-surface-variant uppercase tracking-widest">Severity</th>
                  <th className="py-4 px-6 text-xs font-black text-on-surface-variant uppercase tracking-widest">Status</th>
                  <th className="py-4 px-6 text-xs font-black text-on-surface-variant uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y-0">
                {filteredIncidents.map((inc, idx) => {
                  const gate = gates.find(g => g.id === inc.gateId);
                  return (
                    <tr key={inc.id} className={`${idx % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/30'} hover:bg-surface-container-low transition-colors`}>
                      <td className="py-5 px-6 font-bold text-on-surface">{(idx + 1).toString().padStart(2, '0')}</td>
                      <td className="py-5 px-6 text-sm font-medium">{inc.time}</td>
                      <td className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-primary">{gate?.name}</span>
                          <span className="text-[10px] text-on-surface-variant font-bold">NODE-{gate?.id.toUpperCase()}</span>
                        </div>
                      </td>
                      <td className={`py-5 px-6 font-semibold ${inc.status === 'RESOLVED' ? 'text-on-surface-variant' : ''}`}>{inc.type}</td>
                      <td className={`py-5 px-6 ${inc.status === 'RESOLVED' ? 'opacity-40 grayscale' : ''}`}>
                        {getSeverityBadge(inc.status === 'RESOLVED' ? 'SELESAI' : inc.severity)}
                      </td>
                      <td className="py-5 px-6">
                        {inc.status === 'OPEN' ? (
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${inc.severity === 'KRITIS' ? 'bg-error animate-pulse' : 'bg-secondary-container'}`}></div>
                            <span className="text-xs font-bold text-on-surface uppercase">{inc.severity === 'KRITIS' ? 'UNRESOLVED' : 'IN PROGRESS'}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-on-surface-variant">
                            <span className="material-symbols-outlined text-sm text-green-600 fill-icon">check_circle</span>
                            <span className="text-xs font-bold">SOLVED</span>
                          </div>
                        )}
                      </td>
                      <td className="py-5 px-6 text-right">
                        {inc.status === 'OPEN' ? (
                          <button 
                            onClick={() => setSelectedIncident(inc)}
                            className="bg-primary-container text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary transition-all active:scale-95"
                          >
                            Tangani
                          </button>
                        ) : (
                          <button 
                            onClick={() => setSelectedIncident(inc)}
                            className="text-on-surface-variant px-4 py-2 rounded-lg text-xs font-bold border border-outline-variant hover:bg-surface-container-high transition-all"
                          >
                            Detail
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredIncidents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-on-surface-variant font-medium">Tidak ada insiden yang sesuai filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {filteredIncidents.length > 0 && (
              <div className="bg-surface-container-low p-4 flex justify-between items-center">
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Showing {filteredIncidents.length} incidents</p>
                <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                  <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded shadow-sm font-bold text-xs">1</button>
                  <button className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Veil Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setSelectedIncident(null)}></div>
          <div className="relative bg-surface-container-lowest w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px] z-10">
            
            <div className="w-full md:w-2/3 p-8 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className={`${selectedIncident.status === 'RESOLVED' ? 'bg-green-600' : 'bg-error'} text-white px-2 py-1 rounded text-[10px] font-black uppercase mb-2 inline-block`}>
                    INCIDENT REPORT
                  </span>
                  <h3 className="text-3xl font-black text-primary font-headline uppercase">{selectedIncident.type} - {gates.find(g => g.id === selectedIncident.gateId)?.name}</h3>
                  <p className="text-on-surface-variant font-medium">Detected at {selectedIncident.time}. {selectedIncident.status === 'RESOLVED' && `Resolved by ${selectedIncident.petugas}`}</p>
                </div>
                <button onClick={() => setSelectedIncident(null)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 flex-1">
                <div className="bg-surface-container-low p-4 rounded-xl flex flex-col">
                  <p className="text-[10px] font-black text-on-surface-variant tracking-widest mb-2 uppercase">Live View Cam 01</p>
                  <div className="flex-1 bg-black rounded relative overflow-hidden group min-h-[150px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/20 text-4xl">videocam_off</span>
                    </div>
                    {selectedIncident.status === 'OPEN' && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-error/80 px-2 py-0.5 rounded">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                        <span className="text-[8px] text-white font-bold">REC</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl flex flex-col">
                  <p className="text-[10px] font-black text-on-surface-variant tracking-widest mb-2 uppercase">Live View Cam 02 (ANPR)</p>
                  <div className="flex-1 bg-black rounded relative overflow-hidden min-h-[150px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 font-mono text-xs">NO SIGNAL</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-4 rounded-xl border-l-4 border-primary">
                <p className="text-xs font-bold mb-1">NOTES</p>
                <p className="text-sm text-on-surface-variant">
                  {selectedIncident.notes || "No notes available for this incident."}
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-surface-container-low p-8 border-t md:border-t-0 md:border-l border-outline-variant/20 flex flex-col">
              <h4 className="text-sm font-black mb-4 uppercase tracking-widest">GATE STATUS</h4>
              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant mb-1 uppercase">Motor Torque</p>
                  <div className="w-full bg-surface-dim h-2 rounded-full">
                    <div className={`${selectedIncident.status === 'RESOLVED' ? 'bg-primary' : 'bg-error'} h-full rounded-full w-[85%]`}></div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant mb-1 uppercase">Sensor Connectivity</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-bold">ACTIVE</span>
                  </div>
                </div>
              </div>
              
              {selectedIncident.status === 'OPEN' && (
                <div className="pt-8 space-y-3 mt-auto">
                  <button 
                    onClick={() => {
                      resolveIncident(selectedIncident.id, 'Diselesaikan secara remote.');
                      setSelectedIncident(null);
                    }}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-primary-container transition-colors"
                  >
                    RESOLVE INCIDENT
                  </button>
                  <button className="w-full bg-white border border-outline-variant text-on-surface py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-surface-container-lowest transition-colors">
                    FORCE RESET SYSTEM
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
