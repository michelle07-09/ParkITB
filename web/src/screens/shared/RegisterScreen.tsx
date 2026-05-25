import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export function RegisterScreen() {
     const navigate = useNavigate();
     
     // Form state
     const [fullName, setFullName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     const [terms, setTerms] = useState(false);
     const [role, setRole] = useState<"petugas" | "developer">("petugas");

     // UI States
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
     const [loading, setLoading] = useState(false);
     
     // Custom Toast state
     const [toast, setToast] = useState<{ message: string; isSuccess: boolean; visible: boolean }>({
          message: "",
          isSuccess: true,
          visible: false,
     });

     const showToast = (message: string, isSuccess = true) => {
          setToast({ message, isSuccess, visible: true });
          setTimeout(() => {
               setToast((prev) => ({ ...prev, visible: false }));
          }, 4000);
     };

     const handleRegister = async (e: React.FormEvent) => {
          e.preventDefault();

          if (!fullName.trim()) {
               return showToast("Nama lengkap tidak boleh kosong", false);
          }

          // Verify email ending in itb.ac.id
          const isValidItbEmail = /^[^\s@]+@([^\s@]*\.)?itb\.ac\.id$/.test(email);
          if (!isValidItbEmail) {
               return showToast("Harap gunakan alamat email resmi ITB (@itb.ac.id atau subdomain mahasiswa)", false);
          }

          if (password.length < 8) {
               return showToast("Kata sandi minimal 8 karakter", false);
          }

          if (password !== confirmPassword) {
               return showToast("Konfirmasi kata sandi tidak cocok", false);
          }

          if (!terms) {
               return showToast("Anda harus menyetujui Syarat dan Ketentuan", false);
          }

          setLoading(true);

          try {
               const { error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                         data: {
                              nama: fullName,
                              role: role,
                         },
                    },
               });

               if (error) {
                    throw error;
               }

               showToast("Pendaftaran Berhasil! Silakan cek email Anda untuk aktivasi akun.", true);
               setFullName("");
               setEmail("");
               setPassword("");
               setConfirmPassword("");
               setTerms(false);

               // Redirect to Vite login screen after 3 seconds
               setTimeout(() => {
                    navigate("/login");
               }, 3000);
          } catch (err: any) {
               console.error(err);
               showToast(err.message || "Pendaftaran Gagal. Silakan coba kembali.", false);
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="bg-background min-h-screen flex items-center justify-center p-6 bg-login-gradient text-on-surface">
               {/* Toast Notification Banner */}
               <div
                    className={`fixed top-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/20 text-white font-medium max-w-sm ${
                         toast.visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
                    } ${toast.isSuccess ? "bg-emerald-600/90" : "bg-red-600/90"}`}
               >
                    <span className="material-symbols-outlined text-2xl">
                         {toast.isSuccess ? "check_circle" : "error"}
                    </span>
                    <span className="text-sm">{toast.message}</span>
               </div>

               <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden min-h-[700px]">
                    {/* Left Panel: Institutional Identity */}
                    <section className="hidden md:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
                         {/* Decorative Background Element */}
                         <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
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
                                   Integrated Campus <br />
                                   <span className="text-secondary-container">
                                        Mobility.
                                   </span>
                              </h1>
                              <p className="text-surface-container-high text-lg max-w-md leading-relaxed">
                                   Bergabunglah dengan sistem manajemen parkir terpusat untuk Institut Teknologi Bandung. Akses yang aman, cerdas, dan lancar untuk mahasiswa, staf, dan dosen.
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
                                             Petugas Satpam &amp; Admin ITB
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Right Panel: Registration Form */}
                    <section className="flex flex-col justify-center p-8 md:p-16 bg-surface-container-lowest">
                         <div className="max-w-md w-full mx-auto">
                              <header className="mb-6">
                                   <div className="md:hidden flex items-center gap-2 mb-8">
                                        <div className="w-10 h-10 bg-secondary-container rounded-lg flex items-center justify-center shadow-lg">
                                             <span className="material-symbols-outlined text-primary text-2xl fill-icon">
                                                  account_balance
                                             </span>
                                        </div>
                                        <span className="text-2xl font-black tracking-tighter text-primary">
                                             ParkITB
                                        </span>
                                   </div>
                                   <h2 className="text-3xl font-extrabold text-on-surface mb-2 font-headline tracking-tight">
                                        Daftar Akun Baru
                                   </h2>
                                   <p className="text-on-surface-variant font-medium">
                                        Lengkapi data diri Anda untuk bergabung dengan ParkITB.
                                   </p>
                              </header>

                              <form
                                   onSubmit={handleRegister}
                                   className="space-y-4"
                              >
                                   {/* Nama Lengkap */}
                                   <div className="space-y-2">
                                        <label
                                             className="text-sm font-bold text-on-surface-variant uppercase tracking-wider"
                                             htmlFor="fullName"
                                        >
                                             Nama Lengkap
                                        </label>
                                        <div className="relative group">
                                             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                                  badge
                                             </span>
                                             <input
                                                  className="w-full pl-12 pr-4 py-3 bg-surface rounded-xl border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface font-medium"
                                                  id="fullName"
                                                  placeholder="John Doe"
                                                  type="text"
                                                  value={fullName}
                                                  onChange={(e) => setFullName(e.target.value)}
                                                  disabled={loading}
                                                  required
                                             />
                                        </div>
                                   </div>

                                   {/* Email Institusi */}
                                   <div className="space-y-2">
                                        <label
                                             className="text-sm font-bold text-on-surface-variant uppercase tracking-wider"
                                             htmlFor="email"
                                        >
                                             Email Institusi
                                        </label>
                                        <div className="relative group">
                                             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                                  mail
                                             </span>
                                             <input
                                                  className="w-full pl-12 pr-4 py-3 bg-surface rounded-xl border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface font-medium"
                                                  id="email"
                                                  placeholder="username@itb.ac.id"
                                                  type="email"
                                                  value={email}
                                                  onChange={(e) => setEmail(e.target.value)}
                                                  disabled={loading}
                                                  required
                                             />
                                        </div>
                                   </div>

                                   {/* Kata Sandi */}
                                   <div className="space-y-2">
                                        <label
                                             className="text-sm font-bold text-on-surface-variant uppercase tracking-wider"
                                             htmlFor="password"
                                        >
                                             Kata Sandi
                                        </label>
                                        <div className="relative group">
                                             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                                  lock
                                             </span>
                                             <input
                                                  className="w-full pl-12 pr-12 py-3 bg-surface rounded-xl border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface font-medium"
                                                  id="password"
                                                  placeholder="••••••••"
                                                  type={showPassword ? "text" : "password"}
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  disabled={loading}
                                                  required
                                             />
                                             <button
                                                  onClick={() => setShowPassword(!showPassword)}
                                                  className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary transition-colors"
                                                  type="button"
                                             >
                                                  <span className="material-symbols-outlined">
                                                       {showPassword ? "visibility_off" : "visibility"}
                                                  </span>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Konfirmasi Kata Sandi */}
                                   <div className="space-y-2">
                                        <label
                                             className="text-sm font-bold text-on-surface-variant uppercase tracking-wider"
                                             htmlFor="confirmPassword"
                                        >
                                             Konfirmasi Kata Sandi
                                        </label>
                                        <div className="relative group">
                                             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                                  lock_reset
                                             </span>
                                             <input
                                                  className="w-full pl-12 pr-12 py-3 bg-surface rounded-xl border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface font-medium"
                                                  id="confirmPassword"
                                                  placeholder="••••••••"
                                                  type={showConfirmPassword ? "text" : "password"}
                                                  value={confirmPassword}
                                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                                  disabled={loading}
                                                  required
                                             />
                                             <button
                                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                  className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary transition-colors"
                                                  type="button"
                                             >
                                                  <span className="material-symbols-outlined">
                                                       {showConfirmPassword ? "visibility_off" : "visibility"}
                                                  </span>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Role Selection for UI completeness */}
                                   <div className="space-y-2 pt-2">
                                        <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                                             Daftar Sebagai
                                        </label>
                                        <div className="flex gap-4">
                                             <div
                                                  onClick={() => setRole("petugas")}
                                                  className={`flex-1 p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                                                       role === "petugas"
                                                            ? "bg-surface-container-high border-primary ring-1 ring-primary"
                                                            : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high"
                                                  }`}
                                             >
                                                  <span className="material-symbols-outlined text-primary text-xl">
                                                       security
                                                  </span>
                                                  <span className="text-[11px] font-extrabold text-primary uppercase tracking-tight">
                                                       Petugas
                                                  </span>
                                             </div>
                                             <div
                                                  onClick={() => setRole("developer")}
                                                  className={`flex-1 p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                                                       role === "developer"
                                                            ? "bg-surface-container-high border-primary ring-1 ring-primary"
                                                            : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high"
                                                  }`}
                                             >
                                                  <span className="material-symbols-outlined text-primary text-xl">
                                                       terminal
                                                  </span>
                                                  <span className="text-[11px] font-extrabold text-primary uppercase tracking-tight">
                                                       Developer
                                                  </span>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Terms Checkbox */}
                                   <div className="flex items-start py-2">
                                        <input
                                             className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary transition-all mt-0.5"
                                             id="terms"
                                             type="checkbox"
                                             checked={terms}
                                             onChange={(e) => setTerms(e.target.checked)}
                                             disabled={loading}
                                             required
                                        />
                                        <div className="ml-3">
                                             <label
                                                  className="text-sm font-medium text-on-surface-variant cursor-pointer"
                                                  htmlFor="terms"
                                             >
                                                  Saya menyetujui{" "}
                                                  <a
                                                       className="text-primary font-bold hover:text-primary-container transition-colors"
                                                       href="#"
                                                  >
                                                       Syarat dan Ketentuan
                                                  </a>{" "}
                                                  serta Kebijakan Privasi ParkITB.
                                             </label>
                                        </div>
                                    </div>

                                   {/* Submit Button */}
                                   <button
                                        id="submitBtn"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                                        type="submit"
                                   >
                                        {!loading ? (
                                             <span className="flex items-center gap-2">
                                                  Daftar Sekarang
                                                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                                       arrow_forward
                                                  </span>
                                             </span>
                                        ) : (
                                             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        )}
                                   </button>
                              </form>

                              <div className="text-center mt-4">
                                   <p className="text-sm text-on-surface-variant font-medium">
                                        Sudah punya akun?{" "}
                                        <Link
                                             className="text-primary font-bold hover:text-primary-container transition-colors"
                                             to="/login"
                                        >
                                             Masuk di sini
                                        </Link>
                                   </p>
                              </div>

                              <footer className="mt-8 pt-6 border-t border-outline-variant/20">
                                   <p className="text-center text-xs text-outline leading-relaxed">
                                        © 2026 ITB Directorate of Information Systems. <br />
                                        Keamanan Anda adalah prioritas utama kami.
                                   </p>
                              </footer>
                         </div>
                    </section>
               </main>

               {/* Contextual "Need Help" Floating Action Button */}
               <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary-container text-primary rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                    <span className="material-symbols-outlined fill-icon">help</span>
               </button>
          </div>
     );
}
