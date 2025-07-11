import { api } from '../../../api';
import type { EditWorkStatus } from '../../../types/work';
import type { AddWork } from '../types/workStatus';

export const getWorks = async (date: Date) => {
  const url = `/api/employee-inform/getInform?date=${date}`;
  // : '/api/employee-inform/getWork';
  const res = await api.get(url);
  return date ? res.data.allInforms || [] : res.data.allWorks || [];
};

export const deleteWork = async (id: string) => {
  await api.delete(`/api/employee-inform/removeInform/${id}`);
};

export async function addWork({
  selectedUsername: username,
  selectedDestinations: destArr,
  selectedBusinesses: businessArr,
  selectedWorks: workArr,
  selectedCar: car,
  isDaily,
  startDate,
  endDate,
  remarks,
}: AddWork) {
  const requests = destArr.map((_, index) =>
    api.post('/api/employee-inform/addInform', {
      username,
      destination: destArr[index],
      business: businessArr[index],
      work: workArr[index],
      car,
      startDate: isDaily === 1 ? new Date() : startDate,
      endDate: isDaily === 1 ? new Date() : endDate,
      isDaily,
      remarks,
    })
  );
  return await Promise.all(requests);
}

export async function editWork(work: EditWorkStatus) {
  await api.put('/api/employee-inform/editInform', work);
}
