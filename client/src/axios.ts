import axios, { AxiosError, AxiosResponse } from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
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
    alert(errMsg.error);
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

axiosApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleResponseInterceptor(error)
);

export default axiosApi;
