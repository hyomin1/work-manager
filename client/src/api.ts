import { axiosIP, axiosDomain } from './axios';
import { IDestStat, INameStat } from './interfaces/interface';

// 현재 URL 정보 get ex) http://localhost:3000/login -> http://localhost:3000
export const getBaseUrl = () => {
  return window.location.origin;
};

export const domainName = 'http://tech.bonc.co.kr';

export const axiosReq = getBaseUrl() === domainName ? axiosDomain : axiosIP;

// 이름 정보
export const getNames = async () => {
  const res = await axiosReq.get('/api/employee-inform/getName');
  return res.data.allNames || [];
};

// 방문지 정보
export const getDestinations = async () => {
  const res = await axiosReq.get('/api/employee-inform/getDestination');
  return res.data.allDestinations || [];
};

// 사업명 정보
export const getBusinesses = async () => {
  const res = await axiosReq.get('/api/employee-inform/getBusinesses');
  return res.data.allBusinesses || [];
};

export const getBusiness = async (business: string) => {
  const res = await axiosReq.get(
    `/api/employee-inform/getBusiness/${business}`
  );
  return res.data.business || '';
};

// 업무 정보
export const getWorks = async () => {
  const res = await axiosReq.get('/api/employee-inform/getWork');
  return res.data.allWorks || [];
};

// 차량 정보
export const getCars = async () => {
  const res = await axiosReq.get('/api/employee-inform/getCar');
  return res.data.allCars || [];
};

export const getEtcNames = async () => {
  const res = await axiosReq.get('/api/employee-inform/getEtcName');
  return res.data.allEtcNames || [];
};

// 입력된 인원 상태 정보
export const getEmployeeInform = async (date: Date) => {
  const res = await axiosReq.get(`/api/employee-inform/getInform?date=${date}`);
  return res.data.allInforms || [];
};

export const getDrivingInform = async (
  year: number,
  month: number,
  car: string
) => {
  if (car) {
    const res = await axiosReq.get(
      `/api/driving-inform/getInform?year=${year}&month=${month}&car=${car}&date=${new Date()}`
    );
    return res.data.allDrivingInforms || [];
  }
  return [];
};

const expandDataToDateRange = (
  data: (INameStat | IDestStat)[] | undefined,
  searchStart: Date, // 검색 시작일
  searchEnd: Date // 검색 종료일
): INameStat[] => {
  if (!data) return [];

  // 검색 범위 내의 데이터만 필터링
  return data
    .filter((item) => {
      if ('car' in item) {
        const itemDate = new Date(item.startDate);
        // 시간 정보를 제거하고 날짜만 비교
        const itemDateOnly = new Date(
          itemDate.getFullYear(),
          itemDate.getMonth(),
          itemDate.getDate()
        );
        const searchStartOnly = new Date(
          searchStart.getFullYear(),
          searchStart.getMonth(),
          searchStart.getDate()
        );
        const searchEndOnly = new Date(
          searchEnd.getFullYear(),
          searchEnd.getMonth(),
          searchEnd.getDate()
        );

        return itemDateOnly >= searchStartOnly && itemDateOnly <= searchEndOnly;
      }
      return false;
    })
    .map((item) => {
      if ('car' in item) {
        return {
          ...item,
          startDate: new Date(item.startDate), // 원본 날짜 유지
        };
      }
      throw new Error('Invalid item type');
    });
};
export const getUserStatistics = async (
  username: string,
  startDate: Date,
  endDate: Date
): Promise<INameStat[]> => {
  const res = await axiosReq.get(
    `/api/employee-inform/userStatistics?username=${username}&startDate=${startDate}&endDate=${endDate}`
  );

  const data = expandDataToDateRange(
    res.data.userStatistics,
    startDate,
    endDate
  );

  return data; // data는 INameStat[]임
};

export const getDestinationStatistics = async (destination: string) => {
  const res = await axiosReq.get(
    `/api/employee-inform/destinationStatistics?destination=${destination}`
  );
  return res.data.destinationStatistics || [];
};

export const checkAdminSession = async () => {
  const res = await axiosReq.get('/auth/checkAdminSession');
  return res.status;
};

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const dayOfWeek = daysOfWeek[today.getDay()];

export const formDate = `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;

export const calDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};

export const calYearMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return `${year}년 ${month}월`;
};

export const calYear = (date: Date) => {
  return date.getFullYear();
};

export const calMonth = (date: Date) => {
  return date.getMonth() + 1;
};

export const calCarDay = (date: Date) => {
  const carDate = new Date(date);
  const month = carDate.getMonth() + 1;
  const day = carDate.getDate();
  return `${month}/${day}`;
};

export const extractMonthAndDay = (date: Date) => {
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();
  return { month, day };
};

export const calStatDay = (date: Date) => {
  const localDate = new Date(date);
  const month = localDate.getMonth() + 1;
  const day = localDate.getDate();
  return `${month}/${day}`;
};
