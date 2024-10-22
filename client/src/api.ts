import { axiosIP, axiosDomain } from "./axios";

// 현재 URL 정보 get ex) http://localhost:3000/login -> http://localhost:3000
export const getBaseUrl = () => {
  return window.location.origin;
};

export const domainName = "http://tech.bonc.co.kr";

export const axiosReq = getBaseUrl() === domainName ? axiosDomain : axiosIP;

// 이름 정보
export const getNames = async () => {
  const res = await axiosReq.get("/api/employee-inform/getName");
  return res.data.allNames || [];
};

// 방문지 정보
export const getDestinations = async () => {
  const res = await axiosReq.get("/api/employee-inform/getDestination");
  return res.data.allDestinations || [];
};

// 사업명 정보
export const getBusinesses = async () => {
  const res = await axiosReq.get("/api/employee-inform/getBusinesses");

  return res.data.allBusinesses || [];
};

export const getBusiness = async (business: string) => {
  const res = await axiosReq.get(
    `/api/employee-inform/getBusiness/${business}`
  );

  return res.data.business || "";
};

// 업무 정보
export const getWorks = async () => {
  const res = await axiosReq.get("/api/employee-inform/getWork");
  return res.data.allWorks || [];
};

// 차량 정보
export const getCars = async () => {
  const res = await axiosReq.get("/api/employee-inform/getCar");
  return res.data.allCars || [];
};

export const getEtcNames = async () => {
  const res = await axiosReq.get("/api/employee-inform/getEtcName");
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

export const getUserStatistics = async (username: string, date: Date) => {
  const res = await axiosReq.get(
    `/api/employee-inform/userStatistics?username=${username}&date=${date}`
  );
  return res.data.userStatistics || [];
};

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const dayOfWeek = daysOfWeek[today.getDay()];

export const formDate = `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;

export const calDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
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
