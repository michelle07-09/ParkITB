import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useParkStore } from '../store/useParkStore';

const sideNavItems = [
  { name: 'Dashboard', path: '/developer/dashboard', icon: 'dashboard' },
  { name: 'Vehicles', path: '/developer/vehicles/live', icon: 'directions_car' },
  { name: 'Transactions', path: '/developer/vehicles/history', icon: 'receipt_long' },
  { name: 'Revenue', path: '/developer/revenue', icon: 'payments' },
  { name: 'Users', path: '/developer/users', icon: 'group' },
  { name: 'System', path: '/developer/system', icon: 'settings_input_component' },
  { name: 'Reports', path: '/developer/reports', icon: 'assessment' },
  { name: 'Settings', path: '/developer/settings', icon: 'settings' },
];

export function DeveloperLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useParkStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-100 border-r border-slate-200/50 flex flex-col p-4 gap-2 z-40">
        <div className="mb-8 px-2">
          <h1 className="text-lg font-bold text-blue-900 font-headline tracking-tighter">ParkITB</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-70">Developer Console</p>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {sideNavItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:translate-x-1 ${
                  isActive
                    ? 'bg-white text-blue-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/50'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'fill-icon' : ''}`}>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-slate-200/50 pt-4">
          <button className="w-full py-2.5 px-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-semibold shadow-lg text-sm hover:opacity-90 transition-opacity">
            Export System Logs
          </button>
          <div className="flex flex-col gap-1">
            <a className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-200/50 transition-all text-sm rounded-lg cursor-pointer" href="#">
              <span className="material-symbols-outlined text-sm">help</span>
              <span>Help Center</span>
            </a>
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-error hover:bg-error-container/20 transition-all text-sm rounded-lg cursor-pointer w-full text-left">
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 p-8 min-h-screen flex-1">
        <Outlet />
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-primary opacity-[0.02] blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed top-20 left-64 w-64 h-64 bg-secondary-container opacity-[0.03] blur-[100px] pointer-events-none -z-10"></div>
    </div>
  );
}
