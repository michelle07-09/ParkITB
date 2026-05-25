import { create } from 'zustand';

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: 'car' | 'motorcycle';
  isPrimary: boolean;
  isVerified: boolean;
  lastUsed: string;
}

export interface PaymentMethod {
  id: string;
  type: 'bank' | 'card' | 'qris' | 'ewallet';
  name: string;
  lastFour: string;
  brandColor: string;
  isDefault: boolean;
}

export interface User {
  name: string;
  studentId: string;
  balance: number;
  membershipActive: boolean;
  membershipExpiry: string;
  plates: string[];
  vehicle: Vehicle | null;
  paymentMethods: PaymentMethod[];
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
  setUser: (user: Partial<User>) => void;
  addPlate: (plate: string) => void;
  topUp: (amount: number) => void;
  setVirtualKeyLocked: (locked: boolean) => void;
  startParking: (entryTime: string) => void;
  endParking: () => void;
  updateParkingDuration: (duration: number, fee: number) => void;
  payParking: (amount: number) => boolean; // returns true if successful

  // Vehicle actions
  setVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  clearVehicle: () => void;

  // Payment method actions
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  user: {
    name: 'Michelle',
    studentId: '13521000',
    balance: 450000,
    membershipActive: true,
    membershipExpiry: '31 Juli 2025',
    plates: [],
    vehicle: null,
    paymentMethods: [],
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

  setUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  })),

  addPlate: (plate) => set((state) => ({
    user: { ...state.user, plates: [...state.user.plates, plate] }
  })),

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
  },

  // Vehicle actions
  setVehicle: (vehicle) => set((state) => {
    const id = 'v' + Date.now();
    const newVehicle: Vehicle = { ...vehicle, id };
    return {
      user: {
        ...state.user,
        vehicle: newVehicle,
        plates: [vehicle.plate],
      },
    };
  }),

  clearVehicle: () => set((state) => ({
    user: {
      ...state.user,
      vehicle: null,
      plates: [],
    },
  })),

  // Payment method actions
  addPaymentMethod: (method) => set((state) => {
    const id = 'pm' + Date.now();
    const newMethod: PaymentMethod = { ...method, id };
    return {
      user: {
        ...state.user,
        paymentMethods: [...state.user.paymentMethods, newMethod],
      },
    };
  }),

  removePaymentMethod: (id) => set((state) => ({
    user: {
      ...state.user,
      paymentMethods: state.user.paymentMethods.filter((m) => m.id !== id),
    },
  })),

  setDefaultPaymentMethod: (id) => set((state) => ({
    user: {
      ...state.user,
      paymentMethods: state.user.paymentMethods.map((m) => ({
        ...m,
        isDefault: m.id === id,
      })),
    },
  })),
}));
