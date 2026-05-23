import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParkStore } from "../../store/useParkStore";

export function LoginScreen() {
     const navigate = useNavigate();
     const login = useParkStore((state) => state.login);
     const [role, setRole] = useState<"petugas" | "developer">("petugas");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const handleLogin = async (e: React.FormEvent) => {
          e.preventDefault();
          login(role);
          if (role === "petugas") {
               navigate("/petugas");
          } else {
               navigate("/developer");
          }
     };

     return (
          <div className="bg-background min-h-screen flex items-center justify-center p-6 bg-login-gradient">
               <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden min-h-[700px]">
                    {/* Left: Branding & Visuals */}
                    <section className="hidden md:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                              {/* The image is removed for brevity, or we can use a placeholder gradient */}
                              <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                         </div>
                         <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-12">
                                   <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center shadow-lg">
                                        <span className="material-symbols-outlined text-primary text-3xl fill-icon">
                                             account_balance
                                        </span>
                                   </div>
                                   <span className="text-3xl font-extrabold tracking-tighter text-white font-headline">
                                        ParkITB
                                   </span>
                              </div>
                              <h1 className="text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                                   Institutional <br />
                                   <span className="text-secondary-container">
                                        Intelligence.
                                   </span>
                              </h1>
                              <p className="text-surface-container-high text-lg max-w-md leading-relaxed">
                                   Sistem manajemen parkir terpadu untuk
                                   integritas civitas akademika Institut
                                   Teknologi Bandung. Pantau, kelola, dan
                                   amankan setiap akses gerbang secara
                                   real-time.
                              </p>
                         </div>
                         <div className="relative z-10 mt-auto">
                              <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-container/30 backdrop-blur-md border border-white/10">
                                   <div className="flex -space-x-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-primary bg-white flex items-center justify-center text-primary font-bold">
                                             P1
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-high flex items-center justify-center text-primary font-bold">
                                             A1
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-primary bg-secondary-container flex items-center justify-center text-primary font-bold">
                                             D1
                                        </div>
                                   </div>
                                   <div className="text-sm">
                                        <p className="text-white font-bold">
                                             12+ Aktif Sekarang
                                        </p>
                                        <p className="text-on-primary-container text-xs">
                                             Petugas Keamanan & Admin ITB
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Right: Login Form */}
                    <section className="flex flex-col justify-center p-8 md:p-16 bg-surface-container-lowest">
                         <div className="max-w-md w-full mx-auto">
                              <header className="mb-10">
                                   <div className="md:hidden flex items-center gap-2 mb-8">
                                        <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                                             <span className="material-symbols-outlined text-white text-2xl">
                                                  account_balance
                                             </span>
                                        </div>
                                        <span className="text-2xl font-black tracking-tighter text-primary">
                                             ParkITB
                                        </span>
                                   </div>
                                   <h2 className="text-3xl font-extrabold text-on-surface mb-2 font-headline tracking-tight">
                                        Selamat Datang
                                   </h2>
                                   <p className="text-on-surface-variant font-medium">
                                        Silakan masuk ke konsol kendali Anda.
                                   </p>
                              </header>

                              <form
                                   className="space-y-6"
                                   onSubmit={handleLogin}
                              >
                                   <div className="space-y-2">
                                        <label
                                             className="text-sm font-bold text-on-surface-variant uppercase tracking-wider"
                                             htmlFor="email"
                                        >
                                             Alamat Email
                                        </label>
                                        <div className="relative group">
                                             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                                  mail
                                             </span>
                                             <input
                                                  id="email"
                                                  type="email"
                                                  required
                                                  value={email}
                                                  onChange={(e) =>
                                                       setEmail(e.target.value)
                                                  }
                                                  placeholder="nama@itb.ac.id"
                                                  className="w-full pl-12 pr-4 py-4 bg-surface rounded-xl border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface font-medium"
                                             />
                                        </div>
                                   </div>

                                   <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                             <label
                                                  className="text-sm font-bold text-on-surface-variant uppercase tracking-wider"
                                                  htmlFor="password"
                                             >
                                                  Kata Sandi
                                             </label>
                                             <a
                                                  className="text-xs font-bold text-primary hover:text-primary-container transition-colors"
                                                  href="#"
                                             >
                                                  Lupa sandi?
                                             </a>
                                        </div>
                                        <div className="relative group">
                                             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                                  lock
                                             </span>
                                             <input
                                                  id="password"
                                                  type="password"
                                                  required
                                                  value={password}
                                                  onChange={(e) =>
                                                       setPassword(
                                                            e.target.value,
                                                       )
                                                  }
                                                  placeholder="••••••••"
                                                  className="w-full pl-12 pr-4 py-4 bg-surface rounded-xl border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface font-medium"
                                             />
                                             <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline cursor-pointer hover:text-primary transition-colors">
                                                  visibility
                                             </span>
                                        </div>
                                   </div>

                                   <div className="flex items-center gap-3 py-2">
                                        <input
                                             id="remember"
                                             type="checkbox"
                                             className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary transition-all"
                                        />
                                        <label
                                             className="text-sm font-medium text-on-surface-variant"
                                             htmlFor="remember"
                                        >
                                             Tetap masuk selama 30 hari
                                        </label>
                                   </div>

                                   <button
                                        type="submit"
                                        className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                                   >
                                        Masuk ke Dashboard
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                             arrow_forward
                                        </span>
                                   </button>
                              </form>

                              <footer className="mt-12 pt-8 border-t border-outline-variant/20">
                                   <div className="flex flex-col items-center gap-4">
                                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                             Masuk sebagai:
                                        </p>
                                        <div className="flex gap-4 w-full">
                                             <div
                                                  onClick={() =>
                                                       setRole("petugas")
                                                  }
                                                  className={`flex-1 p-3 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-colors ${role === "petugas" ? "bg-surface-container-high border-primary ring-1 ring-primary" : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high"}`}
                                             >
                                                  <span className="material-symbols-outlined text-primary">
                                                       security
                                                  </span>
                                                  <span className="text-[10px] font-extrabold text-primary uppercase tracking-tight">
                                                       Petugas
                                                  </span>
                                             </div>
                                             <div
                                                  onClick={() =>
                                                       setRole("developer")
                                                  }
                                                  className={`flex-1 p-3 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-colors ${role === "developer" ? "bg-surface-container-high border-primary ring-1 ring-primary" : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high"}`}
                                             >
                                                  <span className="material-symbols-outlined text-primary">
                                                       terminal
                                                  </span>
                                                  <span className="text-[10px] font-extrabold text-primary uppercase tracking-tight">
                                                       Developer
                                                  </span>
                                             </div>
                                        </div>
                                   </div>
                                   <p className="text-center text-xs text-outline mt-8 leading-relaxed">
                                        © 2024 ITB Directorate of Information
                                        Systems. <br />
                                        Keamanan Anda adalah prioritas utama
                                        kami.
                                   </p>
                              </footer>
                         </div>
                    </section>
               </main>

               <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary-container text-primary rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                    <span className="material-symbols-outlined fill-icon">
                         help
                    </span>
               </button>
          </div>
     );
}
