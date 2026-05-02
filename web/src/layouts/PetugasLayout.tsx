import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useParkStore } from '../store/useParkStore';

export function PetugasLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useParkStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Monitoring', path: '/petugas/monitoring' },
    { name: 'Insiden', path: '/petugas/incidents' },
    { name: 'Manual Override', path: '/petugas/override' },
  ];

  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-8 h-16 bg-gradient-to-b from-slate-200/20 to-transparent">
        <div className="flex items-center gap-8">
          <span className="text-xl font-black tracking-tighter text-blue-900 font-headline">ParkITB</span>
          <div className="hidden md:flex items-center gap-6 font-['Manrope'] font-bold tracking-tight">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${isActive ? 'text-blue-900 border-b-2 border-amber-500 pb-1' : 'text-slate-500 font-medium hover:text-blue-700'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/petugas/notifications')} className="material-symbols-outlined text-slate-500 hover:text-blue-700 transition-transform scale-95 active:opacity-80">notifications</button>
          <button className="material-symbols-outlined text-slate-500 hover:text-blue-700 transition-transform scale-95 active:opacity-80">schedule</button>
          <button onClick={handleLogout} className="material-symbols-outlined text-blue-900 hover:text-blue-700 transition-transform scale-95 active:opacity-80" title="Logout">account_circle</button>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="pt-24 pb-12 px-8 max-w-[1600px] mx-auto w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}
