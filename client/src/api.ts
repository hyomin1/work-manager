import axiosApi from "./axios";

export const getNames = async () => {
  const res = await axiosApi.get("/api/inform/getName");
  return res.data.allNames || [];
};
export const getDestinations = async () => {
  const res = await axiosApi.get("/api/inform/getDestination");
  return res.data.allDestinations || [];
};
export const getBusinesses = async () => {
  const res = await axiosApi.get("/api/inform/getBusiness");
  return res.data.allBusinesses || [];
};
export const getCars = async () => {
  const res = await axiosApi.get("/api/inform/getCar");
  return res.data.allCars || [];
};
export const getWorks = async () => {
  const res = await axiosApi.get("/api/inform/getWork");
  return res.data.allWorks || [];
};

export const getInform = async (date: Date) => {
  const res = await axiosApi.get(`/api/inform/getInform?date=${date}`);

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
