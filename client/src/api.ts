import axiosApi from "./axios";

export const getNames = async () => {
  const res = await axiosApi.get("/getName");
  return res.data.allNames || [];
};
export const getDestinations = async () => {
  const res = await axiosApi.get("/getDestination");
  return res.data.allDestinations || [];
};
export const getBusinesses = async () => {
  const res = await axiosApi.get("/getBusiness");
  return res.data.allBusinesses || [];
};
export const getCars = async () => {
  const res = await axiosApi.get("/getCar");
  return res.data.allCars || [];
};
export const getStates = async () => {
  const res = await axiosApi.get("/getState");
  return res.data.allStates || [];
};

export const getInform = async (date: Date) => {
  const formatDate = date.toISOString().split("T")[0];
  const res = await axiosApi.get(`/getInform?date=${formatDate}`);

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
