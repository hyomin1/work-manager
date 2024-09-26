import axiosApi from "./axios";

// 이름 정보
export const getNames = async () => {
  const res = await axiosApi.get("/api/employee-inform/getName");
  return res.data.allNames || [];
};

// 방문지 정보
export const getDestinations = async () => {
  const res = await axiosApi.get("/api/employee-inform/getDestination");
  return res.data.allDestinations || [];
};

// 사업명 정보
export const getBusinesses = async () => {
  const res = await axiosApi.get("/api/employee-inform/getBusiness");
  return res.data.allBusinesses || [];
};

// 업무 정보
export const getWorks = async () => {
  const res = await axiosApi.get("/api/employee-inform/getWork");
  return res.data.allWorks || [];
};

// 차량 정보
export const getCars = async () => {
  const res = await axiosApi.get("/api/employee-inform/getCar");
  return res.data.allCars || [];
};

// 입력된 인원 상태 정보
export const getEmployeeInform = async (date: Date) => {
  const res = await axiosApi.get(`/api/employee-inform/getInform?date=${date}`);

  return res.data.allInforms || [];
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
