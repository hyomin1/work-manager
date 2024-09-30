import {
  getBusinesses,
  getCars,
  getDestinations,
  getNames,
  getWorks,
} from "../api";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { removeItem } from "../api/removeItem";

export function useAdminData(
  activeTab: string,
  page: number,
  queryClient: QueryClient
) {
  const pageCount = 10;
  const queryFn = {
    name: getNames,
    destination: getDestinations,
    business: getBusinesses,
    work: getWorks,
    car: getCars,
  }[activeTab];

  const { data } = useQuery({
    queryKey: [activeTab, page],
    queryFn,
  });

  const totalPages = data ? Math.ceil(data.length / pageCount) : 0;
  const paginatedData =
    data?.slice((page - 1) * pageCount, page * pageCount) || [];

  return {
    data: paginatedData,
    totalPages,
    removeItem: (id: string) => removeItem(activeTab, id, queryClient),
  };
}
