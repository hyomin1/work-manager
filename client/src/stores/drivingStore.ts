import { create } from "zustand";

type State = {
  carId: string;
};

type Actions = {
  setCarId: (carId: string) => void;
};

const useDrivingStore = create<State & Actions>((set) => ({
  carId: "",
  setCarId: (carId) => set(() => ({ carId })),
}));

export default useDrivingStore;
