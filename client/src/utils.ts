import { axiosIP, axiosDomain } from './api/axios';

// 데이터 가져오는 함수 모음
// 현재 URL 정보 get ex) http://localhost:3000/login -> http://localhost:3000
export const getBaseUrl = () => {
  return window.location.origin;
};

export const domainName = 'https://tech.bonc.co.kr';

export const api = getBaseUrl() === domainName ? axiosDomain : axiosIP;

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
