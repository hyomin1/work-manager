import { axiosIP, axiosDomain } from "./axios";

// 현재 URL 정보 get ex) http://localhost:3000/login -> http://localhost:3000
export const getBaseUrl = () => {
  return window.location.origin;
};

export const domainName = "https://tech.bonc.co.kr";

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
    `/api/employee-inform/getBusiness/${business}`,
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
  car: string,
) => {
  if (car) {
    const res = await axiosReq.get(
      `/api/driving-inform/getInform?year=${year}&month=${month}&car=${car}&date=${new Date()}`,
    );
    return res.data.allDrivingInforms || [];
  }
  return [];
};

// 통계: 이름 검색
export const getUserStatistics = async (
  username: string,
  startDate: Date,
  endDate: Date,
) => {
  const res = await axiosReq.get(
    `/api/employee-inform/userStatistics?username=${username}&startDate=${startDate}&endDate=${endDate}`,
  );

  return res.data.userStatistics || [];
};

// 통계: 방문지 검색
export const getDestinationStatistics = async (
  destination: string,
  startDate: Date,
  endDate: Date,
) => {
  const res = await axiosReq.get(
    `/api/employee-inform/destinationStatistics?destination=${destination}&startDate=${startDate}&endDate=${endDate}`,
  );

  return res.data.destinationStatistics || [];
};

// 일정 fetch
export const getSchedule = async (year: number, month: number) => {
  const res = await axiosReq.get(
    `/api/schedule/getSchedule?year=${year}&month=${month}`,
  );

  return res.data.schedules || [];
};

// 차량 공지 사항
export const getNotification = async (carId: string) => {
  const response = await axiosReq.get(
    `/api/driving-inform/getNotification?id=${carId}`,
  );
  return response.data || "";
};

// 유저 목록 (승인된)
export const getUsers = async () => {
  const response = await axiosReq.get("/api/users");
  return response.data.users || "";
};

// 메인화면에서 관리 버튼 눌러서 들어간 경우 check, 접근 불가 메시지만 띄워줌
export const checkAdminSession = async () => {
  const res = await axiosReq.get("/auth/checkAdminSession");
  return res.status;
};

// /admin 경로로 접근시
export const directAdminSession = async () => {
  const res = await axiosReq.get("/auth/directAdminSession");
  return res.status;
};

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const dayOfWeek = daysOfWeek[today.getDay()];

export const formDate = `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;

export const calculateDate = (date: Date) => {
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

export const calDay = (date: Date) => {
  return date.getDate();
};

export const calDayOfWeek = (date: Date) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  return daysOfWeek[date.getDay()];
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
