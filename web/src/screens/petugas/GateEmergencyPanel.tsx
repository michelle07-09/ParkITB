import { useParams } from 'react-router-dom';
import { useParkStore } from '../../store/useParkStore';

export function GateEmergencyPanel() {
  const { id } = useParams();
  const { gates } = useParkStore();
  const gate = gates.find(g => g.id === id) || gates[0];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-full">Gate Active</span>
            <span className="text-on-surface-variant font-medium text-sm">ID: {gate?.id || 'ITB-MAIN-001'}</span>
          </div>
          <h1 className="text-4xl font-extrabold font-headline text-on-primary-fixed tracking-tight">{gate?.name || 'Gerbang Utama'}</h1>
          <p className="text-on-surface-variant mt-1 text-lg">Detailed Control Panel & Emergency Response</p>
        </div>
        
        {/* Queue Counter Card */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-secondary-container flex items-center gap-6">
          <div className="bg-secondary-container/20 p-3 rounded-full">
            <span className="material-symbols-outlined text-secondary-fixed-dim text-3xl">departure_board</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-bold uppercase tracking-tighter">Current Queue</p>
            <p className="text-3xl font-black font-headline text-on-surface">3 <span className="text-sm font-medium">vehicles waiting</span></p>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Live Feed & Actions */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Live Camera Feed Placeholder */}
          <div className="relative aspect-video bg-inverse-surface rounded-xl overflow-hidden group shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full border-[1px] border-outline-variant/10 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <line stroke="currentColor" strokeWidth="1" x1="0" x2="100%" y1="0" y2="100%"></line>
                    <line stroke="currentColor" strokeWidth="1" x1="100%" x2="0" y1="0" y2="100%"></line>
                  </svg>
                </div>
                <div className="text-center z-10">
                  <span className="material-symbols-outlined text-6xl text-surface-dim/20 mb-4">videocam_off</span>
                  <p className="text-surface-dim font-headline font-bold text-lg">FEED_ESTABLISHING...</p>
                </div>
              </div>
            </div>
            
            {/* HUD Overlays */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="bg-error px-3 py-1 rounded flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-white text-[10px] font-black tracking-tighter uppercase">Live</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded text-white text-[10px] font-bold font-headline">
                CAM_01_NW
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="text-white/80 font-mono text-xs">
                <p>UTC+7 2026-04-30 14:32:01</p>
                <p>32.4 FPS | 4K STREAM</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all">
                  <span className="material-symbols-outlined">fullscreen</span>
                </button>
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all">
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="group relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl bg-gradient-to-br from-error to-[#8a1313] text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
              <span className="material-symbols-outlined text-4xl">lock_open</span>
              <span className="font-headline font-black text-sm tracking-tight text-center uppercase">Buka Paksa Palang</span>
              <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40">
                <span className="material-symbols-outlined text-6xl fill-icon">warning</span>
              </div>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl bg-primary text-white shadow-lg hover:bg-primary-container active:scale-95 transition-all">
              <span className="material-symbols-outlined text-4xl">lock</span>
              <span className="font-headline font-black text-sm tracking-tight text-center uppercase">Kunci Palang</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl bg-surface-container-high text-on-primary-fixed-variant shadow-sm border border-outline-variant/30 hover:bg-surface-container-highest active:scale-95 transition-all">
              <span className="material-symbols-outlined text-4xl">support_agent</span>
              <span className="font-headline font-black text-sm tracking-tight text-center uppercase">Hubungi Developer</span>
            </button>
          </div>

          {/* Incident Log Table */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
            <div className="p-6 flex items-center justify-between">
              <h3 className="font-headline font-extrabold text-on-surface text-lg">Incident Log</h3>
              <button className="text-primary-fixed-dim text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">filter_list</span> Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Timestamp</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Event Type</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Details</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 text-xs font-mono">14:30:12</td>
                    <td className="p-4"><span className="text-xs font-bold text-error flex items-center gap-1"><span className="material-symbols-outlined text-sm">error</span> Forced Entry</span></td>
                    <td className="p-4 text-xs text-on-surface-variant">Vehicle D-1234-AB attempted tailgating.</td>
                    <td className="p-4"><span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded">KRITIS</span></td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 text-xs font-mono">14:28:45</td>
                    <td className="p-4"><span className="text-xs font-bold text-on-primary-fixed-variant flex items-center gap-1"><span className="material-symbols-outlined text-sm">info</span> Manual Override</span></td>
                    <td className="p-4 text-xs text-on-surface-variant">Operator (Petugas_02) opened gate manually.</td>
                    <td className="p-4"><span className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded">LOGGED</span></td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 text-xs font-mono">14:15:22</td>
                    <td className="p-4"><span className="text-xs font-bold text-secondary flex items-center gap-1"><span className="material-symbols-outlined text-sm">report_problem</span> Card Failure</span></td>
                    <td className="p-4 text-xs text-on-surface-variant">User card #8892 expired/invalid.</td>
                    <td className="p-4"><span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded">RESOLVED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Notes & Metadata */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Notes Section */}
          <div className="bg-surface-container-low rounded-xl p-8 flex flex-col gap-6 shadow-inner">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">edit_note</span>
              <h3 className="font-headline font-extrabold text-on-surface text-lg">Shift Notes</h3>
            </div>
            <div className="flex flex-col gap-4">
              <textarea 
                className="w-full min-h-[200px] bg-white border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary-fixed-dim transition-all shadow-sm placeholder:text-on-surface-variant/50" 
                placeholder="Type incident notes or maintenance reports here..."
              ></textarea>
              <button className="w-full py-4 bg-primary text-white rounded-xl font-headline font-bold text-sm hover:bg-primary-container shadow-md transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">send</span>
                Submit Note
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-white/50 rounded-lg border border-white/20">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Recent Notes</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-1 h-8 bg-outline-variant rounded-full"></div>
                  <div className="text-xs">
                    <p className="font-bold">Petugas_01</p>
                    <p className="text-on-surface-variant italic">"Sensor #2 cleaned at 12:00."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gate Health/Status */}
          <div className="bg-surface-container-highest rounded-xl p-8">
            <h3 className="font-headline font-extrabold text-on-surface text-lg mb-6">Device Telemetry</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-on-surface-variant">Gate Motor Temp</span>
                <span className="text-sm font-bold text-on-surface">42°C</span>
              </div>
              <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[40%] rounded-full"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-on-surface-variant">Camera Latency</span>
                <span className="text-sm font-bold text-secondary">124ms</span>
              </div>
              <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container w-[75%] rounded-full"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-on-surface-variant">Storage (Cloud)</span>
                <span className="text-sm font-bold text-on-surface">88%</span>
              </div>
              <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[88%] rounded-full"></div>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-on-surface-variant/10">
              <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-fixed-dim">history_edu</span>
                <div className="text-xs">
                  <p className="font-bold text-primary">Last Inspection</p>
                  <p className="text-on-surface-variant">Oct 20, 2026 by Tech_Support_A</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
