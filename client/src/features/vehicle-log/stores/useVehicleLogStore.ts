import { create } from 'zustand';

interface VehicleLogStore {
  editId: string;
  setEditId: (editId: string) => void;
  deleteId: string;
  setDeleteId: (deleteId: string) => void;
}

export const useVehicleLogStore = create<VehicleLogStore>((set) => ({
  editId: '',
  setEditId: (editId) => set({ editId }),
  deleteId: '',
  setDeleteId: (deleteId) => set({ deleteId }),
}));
