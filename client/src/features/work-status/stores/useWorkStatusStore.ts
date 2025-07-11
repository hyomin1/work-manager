import { create } from 'zustand';

interface WorkStore {
  editId: string;
  setEditId: (editId: string) => void;
  deleteId: string;
  setDeleteId: (deleteId: string) => void;
}

export const useWorkStatusStore = create<WorkStore>((set) => ({
  editId: '',
  setEditId: (editId) => set({ editId }),
  deleteId: '',
  setDeleteId: (deleteId) => set({ deleteId }),
}));
