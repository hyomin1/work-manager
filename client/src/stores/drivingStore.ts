import { create } from "zustand";

// 차량 Id 전역 변수 관리
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
