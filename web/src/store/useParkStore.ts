import { create } from 'zustand';

export type GateStatus = 'ONLINE' | 'OFFLINE' | 'ERROR';
export type Severity = 'KRITIS' | 'PERINGATAN' | 'INFO' | 'SELESAI';

export interface Gate {
  id: string;
  name: string;
  status: GateStatus;
  uptime: number;
  lastPing: string;
  vehiclesToday: number;
  queue: number;
}

export interface Incident {
  id: string;
  gateId: string;
  time: string;
  type: string;
  severity: Severity;
  status: 'OPEN' | 'RESOLVED';
  duration?: string;
  notes?: string;
  petugas?: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  type: 'Mobil' | 'Motor';
  entryGate: string;
  entryTime: string;
  exitGate?: string;
  exitTime?: string;
  duration?: string;
  paymentMethod?: 'QRIS' | 'E-Money' | 'Saldo' | 'Tunai';
  paymentStatus: 'LUNAS' | 'BELUM BAYAR' | 'GRATIS/MEMBER';
  amount?: number;
}

export interface User {
  role: 'petugas' | 'developer' | null;
  name: string;
}

interface ParkStore {
  user: User;
  gates: Gate[];
  incidents: Incident[];
  vehicles: Vehicle[];
  login: (role: 'petugas' | 'developer') => void;
  logout: () => void;
  resolveIncident: (id: string, notes: string) => void;
  updateGateStatus: (id: string, status: GateStatus) => void;
}

export const useParkStore = create<ParkStore>((set) => ({
  user: { role: null, name: '' },
  gates: [
    { id: 'g1', name: 'Gate Barat', status: 'ONLINE', uptime: 99.8, lastPing: 'Baru saja', vehiclesToday: 342, queue: 2 },
    { id: 'g2', name: 'Gate Timur', status: 'ERROR', uptime: 98.5, lastPing: '2 mnt lalu', vehiclesToday: 412, queue: 7 },
    { id: 'g3', name: 'Gate Selatan', status: 'ONLINE', uptime: 99.9, lastPing: 'Baru saja', vehiclesToday: 137, queue: 0 },
    { id: 'g4', name: 'Gate Utara', status: 'OFFLINE', uptime: 95.0, lastPing: '10 mnt lalu', vehiclesToday: 0, queue: 0 },
  ],
  incidents: [
    { id: 'inc1', gateId: 'g2', time: '14:32:07', type: 'Palang gagal terbuka', severity: 'KRITIS', status: 'OPEN' },
    { id: 'inc2', gateId: 'g1', time: '14:25:00', type: 'Antrean panjang (>5 kendaraan)', severity: 'PERINGATAN', status: 'OPEN' },
    { id: 'inc3', gateId: 'g3', time: '13:10:00', type: 'Plat tidak terbaca', severity: 'PERINGATAN', status: 'RESOLVED', duration: '2m 10s', petugas: 'Budi' },
    { id: 'inc4', gateId: 'g4', time: '12:00:00', type: 'Koneksi IoT terputus', severity: 'INFO', status: 'RESOLVED', duration: '5m 00s', petugas: 'Budi' },
  ],
  vehicles: [
    { id: 'v1', plate: 'D 1234 ABC', type: 'Mobil', entryGate: 'Gate Barat', entryTime: '10:00', duration: '04:32:10', paymentStatus: 'BELUM BAYAR' },
    { id: 'v2', plate: 'B 9999 XYZ', type: 'Motor', entryGate: 'Gate Timur', entryTime: '08:15', exitGate: 'Gate Barat', exitTime: '14:00', duration: '05:45:00', paymentMethod: 'QRIS', paymentStatus: 'LUNAS', amount: 8000 },
    { id: 'v3', plate: 'F 5555 DEF', type: 'Mobil', entryGate: 'Gate Selatan', entryTime: '12:30', duration: '02:02:10', paymentStatus: 'GRATIS/MEMBER' },
  ],
  
  login: (role) => set({ user: { role, name: role === 'petugas' ? 'Budi Santoso' : 'Admin ITB' } }),
  logout: () => set({ user: { role: null, name: '' } }),
  
  resolveIncident: (id, notes) => set((state) => ({
    incidents: state.incidents.map((inc) => 
      inc.id === id ? { ...inc, status: 'RESOLVED', severity: 'SELESAI', notes, petugas: state.user.name, duration: '1m 30s' } : inc
    )
  })),
  
  updateGateStatus: (id, status) => set((state) => ({
    gates: state.gates.map((g) => g.id === id ? { ...g, status } : g)
  })),
}));
