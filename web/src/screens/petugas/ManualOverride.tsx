import { useState } from 'react';
import { useParkStore } from '../../store/useParkStore';

export function ManualOverride() {
  const { gates } = useParkStore();
  const [vehicleType, setVehicleType] = useState('Mobil');
  const [flow, setFlow] = useState('Masuk');
  
  return (
    <>
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-sm">shield</span>
          <span className="text-xs font-bold uppercase tracking-widest">Security Protocol (Petugas)</span>
        </div>
        <h1 className="text-4xl font-extrabold text-primary font-headline tracking-tight">Manual Vehicle Override</h1>
        <p className="text-on-surface-variant max-w-2xl mt-2 font-medium">Lakukan pengisian data manual apabila sistem ANPR gagal membaca plat nomor atau untuk kategori tamu institusi.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Manual Entry Form Card */}
        <section className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Plate Number Entry (Large) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Nomor Plat Kendaraan</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-xl px-6 py-6 text-4xl font-black font-headline text-primary focus:ring-2 focus:ring-primary-container placeholder:text-surface-dim transition-all uppercase outline-none" 
                    placeholder="B 1234 ABC" 
                    type="text"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-on-surface-variant opacity-30">
                    <span className="material-symbols-outlined text-4xl fill-icon">camera_enhance</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Type Selector */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Tipe Kendaraan</label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input 
                      checked={vehicleType === 'Mobil'} 
                      onChange={() => setVehicleType('Mobil')} 
                      className="hidden peer" 
                      type="radio" 
                    />
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-low text-on-surface-variant peer-checked:bg-primary peer-checked:text-white transition-all">
                      <span className="material-symbols-outlined mb-1">directions_car</span>
                      <span className="text-sm font-bold">Mobil</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input 
                      checked={vehicleType === 'Motor'} 
                      onChange={() => setVehicleType('Motor')} 
                      className="hidden peer" 
                      type="radio" 
                    />
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-low text-on-surface-variant peer-checked:bg-primary peer-checked:text-white transition-all">
                      <span className="material-symbols-outlined mb-1">two_wheeler</span>
                      <span className="text-sm font-bold">Motor</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Entry/Exit Selector */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Arah Pergerakan</label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input 
                      checked={flow === 'Masuk'} 
                      onChange={() => setFlow('Masuk')} 
                      className="hidden peer" 
                      type="radio" 
                    />
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-low text-on-surface-variant peer-checked:bg-secondary-container peer-checked:text-on-secondary-container transition-all">
                      <span className="material-symbols-outlined mb-1">login</span>
                      <span className="text-sm font-bold">Masuk</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input 
                      checked={flow === 'Keluar'} 
                      onChange={() => setFlow('Keluar')} 
                      className="hidden peer" 
                      type="radio" 
                    />
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-low text-on-surface-variant peer-checked:bg-primary-container peer-checked:text-white transition-all">
                      <span className="material-symbols-outlined mb-1">logout</span>
                      <span className="text-sm font-bold">Keluar</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Gate Selection */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Pilih Gerbang</label>
                <select className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 font-medium focus:ring-2 focus:ring-primary-container appearance-none outline-none">
                  {gates.map(g => (
                    <option key={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              {/* Reason Selection */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Alasan Override</label>
                <select className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 font-medium focus:ring-2 focus:ring-primary-container appearance-none outline-none">
                  <option>Plat nomor tidak terbaca</option>
                  <option>Tamu Rektorat / VIP</option>
                  <option>Kendaraan Operasional ITB</option>
                  <option>Darurat / Emergency</option>
                  <option>Masalah Teknis Hardware</option>
                </select>
              </div>

              {/* Notes Area */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Catatan Tambahan (Opsional)</label>
                <textarea 
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 font-medium focus:ring-2 focus:ring-primary-container outline-none" 
                  placeholder="Informasi tambahan terkait kendaraan..." 
                  rows={3}
                ></textarea>
              </div>
            </div>

            {/* Submit CTA */}
            <button className="w-full mt-10 bg-gradient-to-r from-primary to-primary-container text-white py-5 rounded-xl font-bold font-headline text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined fill-icon">check_circle</span>
              Izinkan Masuk/Keluar
            </button>
          </div>
        </section>

        {/* Sidebar Info & History */}
        <aside className="lg:col-span-5 space-y-8">
          {/* Live Gate Preview */}
          <div className="bg-surface-container-low rounded-xl overflow-hidden">
            <div className="relative h-48 bg-slate-900">
              <img 
                className="w-full h-full object-cover opacity-60" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA__ZrQvn-tJ-ZEbxHWX9dwT1u88yeNhlcrHp5x2eQMHaM-mVFsNfAbD9z3tseltc5IUcqN0yQhaHvzKMcINnPwarReuntJfAQjUs3DqiLsD4Kh9S16tk19VmuqniNxZFD39hW9JStv3OLmEBjsXE0NN-K4OtHsf8jdzsZ2fXCaVsE7a9pka-efdIKv0_abmVo1giMybD-gio0p_YlGKNazy5FGrjPetH_7Ibi3gRAQ5Q1S-sq8anzIB53bYnqOJ_qYEmcRd9cr_iM"
                alt="Gate Live Feed"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex justify-between items-center">
                  <span className="bg-error px-2 py-1 rounded text-[10px] font-bold text-white flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE: GATE MAIN 01
                  </span>
                  <span className="text-white text-[10px] font-mono">2026-04-30 14:32:01</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-4xl">car_repair</span>
                  <div>
                    <p className="text-[10px] font-bold opacity-70 uppercase">Status Radar</p>
                    <p className="font-headline font-bold">KENDARAAN TERDETEKSI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Overrides Table */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] overflow-hidden">
            <div className="p-6 border-b border-surface-container">
              <h3 className="text-lg font-bold text-primary font-headline">Recent Overrides</h3>
              <p className="text-xs text-on-surface-variant font-medium">5 Aktivitas manual terakhir</p>
            </div>
            <div className="divide-y divide-surface-container-low">
              {[
                { plate: 'D 1920 AB', time: '14:28', icon: 'login', color: 'secondary-container', text: 'secondary', details: 'Gate Ganesa • Plat Tidak Terbaca' },
                { plate: 'B 888 VIP', time: '14:15', icon: 'logout', color: 'primary-container', text: 'primary-container', details: 'Gate Sabuga • Tamu VIP' },
                { plate: 'D 311 SH', time: '13:55', icon: 'login', color: 'secondary-container', text: 'secondary', details: 'Gate Sipil • Technical Issue' },
                { plate: 'Z 4422 MN', time: '13:42', icon: 'logout', color: 'primary-container', text: 'primary-container', details: 'Gate Ganesa • Manual Entry' },
                { plate: 'E 99 CC', time: '13:30', icon: 'login', color: 'secondary-container', text: 'secondary', details: 'Gate Sabuga • Tamu Dinas' },
              ].map((item, index) => (
                <div key={index} className="p-4 hover:bg-surface-container-low/30 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full bg-${item.color}/10 flex items-center justify-center text-${item.text}`}>
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold font-headline text-primary">{item.plate}</p>
                      <p className="text-[10px] text-on-surface-variant font-medium">{item.details}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant">{item.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full p-4 text-sm font-bold text-primary-container bg-surface-container-low/50 hover:bg-surface-container-high transition-colors">
              Lihat Semua Riwayat
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
