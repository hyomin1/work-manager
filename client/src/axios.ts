import axios, { AxiosError, AxiosResponse } from "axios";
import { ROUTES } from "./constants/constant";

// 서버 통신 관련 로직
const axiosIP = axios.create({
  baseURL: process.env.REACT_APP_IP,
  withCredentials: true,
  timeout: 5000,
});

const axiosDomain = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
  withCredentials: true,
  timeout: 5000,
});

const handleResponseInterceptor = async (
  error: AxiosError,
): Promise<AxiosResponse> => {
  if (error.response?.status === 401) {
    const errMsg = error.response.data as { error: string };
    //alert(errMsg.error);
    return Promise.reject(error);
  } else if (error.response?.status === 403) {
    const errMsg = error.response.data as { error: string };
    const errType = error.response.data as { type: string };
    //const url = error.response.data as { url: string };
    //alert(errMsg.error);

    // 유저 아닌 경우
    if (errType.type === "not User") {
      window.location.href = ROUTES.AUTH.LOGIN;
    } else if (errType.type === "not admin") {
      window.location.href = ROUTES.AUTH.LOGIN;
    } else if (errType.type === "not granted admin") {
    }
    return new Promise(() => {});
  } else if (error.response?.status === 500) {
    const errMsg = error.response.data as { error: string };
    return new Promise(() => {});
  }
  return new Promise(() => {});
};
axiosIP.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleResponseInterceptor(error),
);

axiosDomain.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleResponseInterceptor(error),
);

export { axiosIP, axiosDomain };
