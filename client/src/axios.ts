import axios, { AxiosError, AxiosResponse } from "axios";

const axiosIP = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  timeout: 5000,
});

const axiosDomain = axios.create({
  baseURL: "http://tech.bonc.co.kr",
  withCredentials: true,
  timeout: 5000,
});

const handleResponseInterceptor = async (
  error: AxiosError
): Promise<AxiosResponse> => {
  if (error.response?.status === 400) {
    const errMsg = error.response.data as { error: string };
    alert(errMsg.error);
  } else if (error.response?.status === 401) {
    const errMsg = error.response.data as { error: string };
    alert(errMsg.error);
    return new Promise(() => {});
  } else if (error.response?.status === 403) {
    const errMsg = error.response.data as { error: string };
    const errType = error.response.data as { type: string };

    alert(errMsg.error);

    // 유저 아닌 경우
    if (errType.type === "not User") {
      window.location.href = "/";
    } else if (errType.type === "not admin") {
      // /admin직접 url redirect해서 들어온 경우
      window.location.href = "/";
    } else if (errType.type === "not granted admin") {
    }

    //window.location.href = "/";
    return new Promise(() => {});
  } else if (error.response?.status === 404) {
    const errMsg = error.response.data as { error: string };
    alert(errMsg.error);
  } else if (error.response?.status === 500) {
    const errMsg = error.response.data as { error: string };
    alert(errMsg.error);
    return new Promise(() => {});
  }
  return new Promise(() => {});
};
axiosIP.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleResponseInterceptor(error)
);

axiosDomain.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleResponseInterceptor(error)
);

export { axiosIP, axiosDomain };
