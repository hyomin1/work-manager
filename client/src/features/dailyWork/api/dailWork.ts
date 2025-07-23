import { api } from '../../../api';
import type { DailyWork, DailyWorkForm } from '../types/dailyWork';

export async function addDailyWork(form: DailyWorkForm) {
  return await api.post('/api/employee-inform/dailyWork/add', form);
}

export const getDailyWorks = async (date: Date): Promise<DailyWork[]> => {
  const res = await api.get(`/api/employee-inform/dailyWork?date=${date}`);
  return res.data.allDailyWorks || [];
};
export async function getDailyWork(id?: string) {
  const { data } = await api.get(`/api/employee-inform/dailyWork/${id}`);
  return data.dailyWork;
}
export async function editDailyWork(id: string, form: DailyWorkForm) {
  return await api.put('/api/employee-inform/dailyWork/edit', {
    _id: id,
    ...form,
  });
}

export async function deleteDailyWork(id: string) {
  return await api.delete(`/api/employee-inform/dailyWork/remove/${id}`);
}
