import { create } from 'zustand';

export interface User {
  name: string;
  studentId: string;
  balance: number;
  membershipActive: boolean;
  membershipExpiry: string;
  plates: string[];
}

export interface ActiveParking {
  isParking: boolean;
  entryTime: string | null;
  duration: number; // in seconds
  fee: number;
}

export interface SlotAvailability {
  west: number;
  east: number;
  south: number;
}

export interface StoreState {
  user: User;
  activeParking: ActiveParking;
  virtualKeyLocked: boolean;
  slotAvailability: SlotAvailability;
  
  // Actions
  topUp: (amount: number) => void;
  setVirtualKeyLocked: (locked: boolean) => void;
  startParking: (entryTime: string) => void;
  endParking: () => void;
  updateParkingDuration: (duration: number, fee: number) => void;
  payParking: (amount: number) => boolean; // returns true if successful
}

export const useStore = create<StoreState>((set, get) => ({
  user: {
    name: 'Michelle',
    studentId: '13521000',
    balance: 85000,
    membershipActive: true,
    membershipExpiry: '31 Juli 2025',
    plates: ['D 1234 ABC', 'B 9999 XYZ'],
  },
  activeParking: {
    isParking: false,
    entryTime: null,
    duration: 0,
    fee: 0,
  },
  virtualKeyLocked: true,
  slotAvailability: {
    west: 65, // percentage
    east: 35,
    south: 15,
  },

  topUp: (amount) => set((state) => ({
    user: { ...state.user, balance: state.user.balance + amount }
  })),

  setVirtualKeyLocked: (locked) => set({ virtualKeyLocked: locked }),

  startParking: (entryTime) => set({
    activeParking: { isParking: true, entryTime, duration: 0, fee: 0 }
  }),

  endParking: () => set({
    activeParking: { isParking: false, entryTime: null, duration: 0, fee: 0 }
  }),

  updateParkingDuration: (duration, fee) => set((state) => ({
    activeParking: { ...state.activeParking, duration, fee }
  })),

  payParking: (amount) => {
    const state = get();
    if (state.user.balance >= amount) {
      set((s) => ({
        user: { ...s.user, balance: s.user.balance - amount }
      }));
      return true;
    }
    return false;
  }
}));
