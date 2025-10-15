import { api } from '../../../utils';

export const getSchedule = async (
  year: number,
  month: number,
  username?: string
) => {
  const res = await api.get(
    `/api/schedule/getSchedule?year=${year}&month=${month}&username=${username}`
  );

  return res.data.schedules || [];
};
