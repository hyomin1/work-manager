import { axiosIP, axiosDomain } from './api/axios';

// 데이터 가져오는 함수 모음
// 현재 URL 정보 get ex) http://localhost:3000/login -> http://localhost:3000
export const getBaseUrl = () => {
  return window.location.origin;
};

export const domainName = 'https://tech.bonc.co.kr';

export const api = getBaseUrl() === domainName ? axiosDomain : axiosIP;

// 일정 fetch
export const getSchedule = async (
  year: number,
  month: number,
  username: string | null
) => {
  const res = await api.get(
    `/api/schedule/getSchedule?year=${year}&month=${month}&username=${username}`
  );

  return res.data.schedules || [];
};

// 메인화면에서 관리 버튼 눌러서 들어간 경우 check, 접근 불가 메시지만 띄워줌

// /admin 경로로 접근시
export const directAdminSession = async () => {
  const res = await api.get('/auth/directAdminSession');
  return res.status;
};

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const dayOfWeek = daysOfWeek[today.getDay()];

export const formDate = `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;

export const calculateDate = (date: Date) => {
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

export const calDay = (date: Date) => {
  return date.getDate();
};

export const calDayOfWeek = (date: Date) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  return daysOfWeek[date.getDay()];
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

export const dailyWorkDay = (newDate: Date) => {
  const date = new Date(newDate);
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}. ${month}. ${day}. (${dayOfWeek})`;
};
