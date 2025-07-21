import { api } from '../../../api';

// 통계: 이름 검색
export const getUserStatistics = async (
  username: string,
  startDate: Date,
  endDate: Date
) => {
  const res = await api.get(
    `/api/employee-inform/userStatistics?username=${username}&startDate=${startDate}&endDate=${endDate}`
  );

  return res.data.userStatistics || [];
};

// 통계: 방문지 검색
export const getDestinationStatistics = async (
  destination: string,
  startDate: Date,
  endDate: Date
) => {
  const res = await api.get(
    `/api/employee-inform/destinationStatistics?destination=${destination}&startDate=${startDate}&endDate=${endDate}`
  );

  return res.data.destinationStatistics || [];
};
