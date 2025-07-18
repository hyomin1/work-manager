import axios, { AxiosError, type AxiosResponse } from 'axios';
import { ROUTES } from '../constants/constant';
import toast from 'react-hot-toast';

const axiosIP = axios.create({
  baseURL: import.meta.env.VITE_API_LOCAL,
  withCredentials: true,
  timeout: 5000,
});

const axiosDomain = axios.create({
  baseURL: import.meta.env.VITE_API_PRODUCTION,
  withCredentials: true,
  timeout: 5000,
});

const handleResponseInterceptor = async (
  error: AxiosError
): Promise<AxiosResponse> => {
  const status = error.response?.status;
  const data = error.response?.data as { error?: string; type?: string };

  if (!status) return Promise.reject(error);

  switch (status) {
    case 401:
      // 인증 실패 (ex. 세션 만료)
      return Promise.reject(error);

    case 403:
      // 권한 없음 - 유저 or 관리자 접근 불가
      if (data.type === 'not User' || data.type === 'not admin') {
        window.location.href = ROUTES.AUTH.LOGIN;
      } else if (data.type === 'not granted admin') {
        toast.error(data.error || '');
      }
      // 관리자 권한 부족 같은 경우는 따로 처리할 수 있음
      return Promise.reject(error);

    case 409:
      // 중복 아이디 등 클라이언트 처리 가능한 에러
      return Promise.reject(error);

    case 500:
      // 서버 내부 오류
      return Promise.reject(error);

    default:
      // 기타 에러
      return Promise.reject(error);
  }
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
