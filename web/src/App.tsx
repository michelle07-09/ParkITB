import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useParkStore } from './store/useParkStore';

// Layouts
import { PetugasLayout } from './layouts/PetugasLayout';
import { DeveloperLayout } from './layouts/DeveloperLayout';

// Shared
import { LoginScreen } from './screens/shared/LoginScreen';
import { RegisterScreen } from './screens/shared/RegisterScreen';

// Petugas Screens
import { LiveMonitoring } from './screens/petugas/LiveMonitoring';
import { GateEmergencyPanel } from './screens/petugas/GateEmergencyPanel';
import { ActiveIncidents } from './screens/petugas/ActiveIncidents';
import { ManualOverride } from './screens/petugas/ManualOverride';
import { Notifications } from './screens/petugas/Notifications';

// Developer Screens
import { DashboardOverview } from './screens/developer/DashboardOverview';
import { VehicleMonitoringLive } from './screens/developer/VehicleMonitoringLive';
import { VehicleHistory } from './screens/developer/VehicleHistory';
import { RevenueDashboard } from './screens/developer/RevenueDashboard';
import { UserManagement } from './screens/developer/UserManagement';
import { SystemHealth } from './screens/developer/SystemHealth';
import { Reports } from './screens/developer/Reports';
import { Settings } from './screens/developer/Settings';

function ProtectedRoute({ role, children }: { role: 'petugas' | 'developer', children: React.ReactNode }) {
  const currentRole = useParkStore(state => state.user.role);
  if (currentRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        {/* PETUGAS ROUTES */}
        <Route path="/petugas" element={<ProtectedRoute role="petugas"><PetugasLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="monitoring" replace />} />
          <Route path="monitoring" element={<LiveMonitoring />} />
          <Route path="gate/:id" element={<GateEmergencyPanel />} />
          <Route path="incidents" element={<ActiveIncidents />} />
          <Route path="override" element={<ManualOverride />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* DEVELOPER ROUTES */}
        <Route path="/developer" element={<ProtectedRoute role="developer"><DeveloperLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="vehicles/live" element={<VehicleMonitoringLive />} />
          <Route path="vehicles/history" element={<VehicleHistory />} />
          <Route path="revenue" element={<RevenueDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="system" element={<SystemHealth />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
