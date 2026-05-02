export function Notifications() {
  return (
    <>
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Pusat Notifikasi</h1>
          <p className="text-on-surface-variant font-medium mt-1">Kelola peringatan sistem dan aktivitas gerbang masuk.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md">
          <span className="material-symbols-outlined">done_all</span>
          Tandai semua selesai
        </button>
      </header>

      {/* Notifications Feed */}
      <div className="space-y-12">
        {/* Today Section */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Hari ini</h3>
            <div className="h-px flex-1 bg-outline-variant opacity-15"></div>
          </div>
          <div className="space-y-4">
            
            {/* Critical Alert Card */}
            <div className="group relative flex items-start gap-6 p-6 bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-error rounded-l-xl"></div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-error fill-icon">warning</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-error mb-1 block">Kritis — Gate 04</span>
                    <h4 className="text-lg font-bold text-on-surface leading-tight">Percobaan Akses Paksa</h4>
                  </div>
                  <span className="text-sm font-medium text-on-surface-variant">09:42</span>
                </div>
                <p className="mt-2 text-on-surface-variant leading-relaxed">Kendaraan dengan plat nomor <strong>B 1234 ABC</strong> mencoba melewati palang tanpa otentikasi RFID yang valid. Sistem mengunci otomatis.</p>
                <div className="mt-4 flex gap-3">
                  <button className="bg-primary px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-primary-container transition-colors">Tandai selesai</button>
                  <button className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-bold text-on-primary-fixed-variant hover:bg-surface-container-highest transition-colors">Lihat CCTV</button>
                </div>
              </div>
            </div>
            
            {/* Warning Alert Card */}
            <div className="group relative flex items-start gap-6 p-6 bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-l-xl"></div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary fill-icon">emergency_home</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary mb-1 block">Peringatan — Gate 01</span>
                    <h4 className="text-lg font-bold text-on-surface leading-tight">Kapasitas Mendekati Penuh</h4>
                  </div>
                  <span className="text-sm font-medium text-on-surface-variant">08:15</span>
                </div>
                <p className="mt-2 text-on-surface-variant leading-relaxed">Area Parkir Timur hanya menyisakan 5 slot kosong. Mohon persiapkan pengalihan arus ke Area Parkir Barat.</p>
                <div className="mt-4 flex gap-3">
                  <button className="bg-primary px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-primary-container transition-colors">Tandai selesai</button>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Yesterday Section */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Kemarin</h3>
            <div className="h-px flex-1 bg-outline-variant opacity-15"></div>
          </div>
          <div className="space-y-4">
            
            {/* Info Alert Card */}
            <div className="group relative flex items-start gap-6 p-6 bg-surface-container-low/50 rounded-xl transition-all">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary fill-icon">info</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 block">Info — System</span>
                    <h4 className="text-lg font-bold text-on-surface leading-tight opacity-60">Pembaruan Database Selesai</h4>
                  </div>
                  <span className="text-sm font-medium text-on-surface-variant">Kemarin, 22:00</span>
                </div>
                <p className="mt-2 text-on-surface-variant leading-relaxed opacity-60">Pemeliharaan rutin mingguan untuk database transaksi gerbang telah berhasil diselesaikan tanpa kendala.</p>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-fixed-dim">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Selesai oleh Admin
                  </span>
                </div>
              </div>
            </div>
            
            {/* Technical Card */}
            <div className="group relative flex items-start gap-6 p-6 bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">settings_input_component</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">Teknis — Gate 03</span>
                    <h4 className="text-lg font-bold text-on-surface leading-tight">Sensor LPR Tidak Responsif</h4>
                  </div>
                  <span className="text-sm font-medium text-on-surface-variant">Kemarin, 14:30</span>
                </div>
                <p className="mt-2 text-on-surface-variant leading-relaxed">Kamera pengenal plat nomor pada gerbang keluar 03 mengalami gangguan koneksi intermiten. Teknisi telah dijadwalkan.</p>
                <div className="mt-4 flex gap-3">
                  <button className="bg-primary px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-primary-container transition-colors">Tandai selesai</button>
                </div>
              </div>
            </div>
            
          </div>
        </section>
      </div>

      {/* Dashboard Visual Insight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="col-span-1 md:col-span-2 bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-headline text-2xl font-bold mb-4">Analisis Keamanan</h3>
            <p className="text-on-surface-variant max-w-md mb-6">Tren peringatan menurun sebesar 12% dibandingkan minggu lalu. Sistem otomatisasi gerbang bekerja secara optimal.</p>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-xl flex-1 shadow-sm">
                <span className="text-xs font-bold text-on-surface-variant uppercase">Peringatan Hari Ini</span>
                <div className="text-3xl font-black text-primary mt-1">14</div>
              </div>
              <div className="bg-white p-4 rounded-xl flex-1 shadow-sm">
                <span className="text-xs font-bold text-on-surface-variant uppercase">Waktu Respon Rata-rata</span>
                <div className="text-3xl font-black text-primary mt-1">2.4m</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="bg-primary-container rounded-xl p-8 text-white flex flex-col justify-between">
          <div className="material-symbols-outlined text-4xl text-on-primary-container">shield_person</div>
          <div>
            <h3 className="text-xl font-bold mb-2">Protokol Keamanan</h3>
            <p className="text-sm text-on-primary-container">Pastikan setiap tindakan "Selesai" disertai dengan verifikasi visual melalui live feed CCTV terdekat.</p>
          </div>
        </div>
      </div>
    </>
  );
}
