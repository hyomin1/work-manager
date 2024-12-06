// src/stores/employeeStore.ts
import { create } from "zustand";
import type { IDailyWork, IInform } from "../interfaces/interface";

type State = {
  inform: IInform[];
  currentDate: Date;
  dailyWork: IDailyWork[];
};

type Actions = {
  setInform: (inform: IInform[]) => void;
  setCurrentDate: (date: Date) => void;
  setDailyWork: (dailyWork: IDailyWork[]) => void;
};
// 근무 현황 데이터 전역 상태 관리(사용 X)
const useEmployeeStore = create<State & Actions>((set) => ({
  inform: [],
  dailyWork: [],
  currentDate: new Date(),
  setInform: (inform) => set(() => ({ inform })),
  setCurrentDate: (date) => set(() => ({ currentDate: date })),
  setDailyWork: (dailyWork) => set(() => ({ dailyWork })),
}));

export default useEmployeeStore;
