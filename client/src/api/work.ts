import { api } from '../api';

export const getWorks = async (date?: Date) => {
  const url = date
    ? `/api/employee-inform/getInform?date=${date}`
    : '/api/employee-inform/getWork';
  const res = await api.get(url);
  return date ? res.data.allInforms || [] : res.data.allWorks || [];
};

export const deleteWork = async (id: string) => {
  await api.delete(`/api/employee-inform/removeInform/${id}`);
};
