import {
  getBusinesses,
  getCars,
  getDestinations,
  getEtcNames,
  getNames,
  getWorks,
} from "../api";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { removeItem } from "../api/removeItem";

// 관리자 데이터 조회용
export function useAdminData(
  activeTab: string,
  page: number,
  queryClient: QueryClient,
) {
  const queryFn = {
    username: getNames,
    destination: getDestinations,
    business: getBusinesses,
    work: getWorks,
    car: getCars,
    etcName: getEtcNames,
  }[activeTab];

  const { data } = useQuery({
    queryKey: [activeTab, page],
    queryFn,
  });

  const sortedData = data
    ? [...data].sort((a, b) => {
        const aValue = a[activeTab]; // activeTab에 따라 정렬할 필드를 설정
        const bValue = b[activeTab];

        // 숫자 혹은 문자열 정렬
        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue);
        }
        return 0; // 기본값 (정렬 기준 없음)
      })
    : [];

  return {
    data: sortedData,

    removeItem: (id: string) => removeItem(activeTab, id, queryClient),
  };
}
