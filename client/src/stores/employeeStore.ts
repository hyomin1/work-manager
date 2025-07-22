// src/stores/employeeStore.ts
import { create } from 'zustand';
import type { IDailyWork } from '../interfaces/interface';
import type { WorkStatus } from '../features/work-status/types/workStatus';

type State = {
  inform: WorkStatus[];
  currentDate: Date;
  dailyWork: IDailyWork[];
};

type Actions = {
  setInform: (inform: WorkStatus[]) => void;
  setCurrentDate: (date: Date) => void;
  setDailyWork: (dailyWork: IDailyWork[]) => void;
};
// 근무 현황 데이터 전역 상태 관리(사용 X)

// DailyWork 쪽에서 사용중, 리팩토링 후 제거
const useEmployeeStore = create<State & Actions>((set) => ({
  inform: [],
  dailyWork: [],
  currentDate: new Date(),
  setInform: (inform) => set(() => ({ inform })),
  setCurrentDate: (date) => set(() => ({ currentDate: date })),
  setDailyWork: (dailyWork) => set(() => ({ dailyWork })),
}));

export default useEmployeeStore;
