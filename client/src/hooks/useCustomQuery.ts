// src/hooks/useCustomQuery.ts
import { useQuery } from "@tanstack/react-query";
import {
  getNames,
  getDestinations,
  getBusinesses,
  getWorks,
  getCars,
} from "../api";
import {
  INames,
  IDestinations,
  IBusinesses,
  IWorks,
  ICars,
} from "../interfaces/interface"; // 타입 경로에 맞게 수정

export const useCustomQueries = () => {
  const { data: names, isLoading: namesLoading } = useQuery<INames[]>({
    queryKey: ["names"],
    queryFn: getNames,
  });

  const { data: destinationsData, isLoading: destinationsLoading } = useQuery<
    IDestinations[]
  >({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  const { data: businessesData, isLoading: businessesLoading } = useQuery<
    IBusinesses[]
  >({
    queryKey: ["businesses"],
    queryFn: getBusinesses,
  });

  const { data: workData, isLoading: worksLoading } = useQuery<IWorks[]>({
    queryKey: ["works"],
    queryFn: getWorks,
  });

  const { data: cars, isLoading: carsLoading } = useQuery<ICars[]>({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  return {
    names,
    namesLoading,
    destinationsData,
    destinationsLoading,
    businessesData,
    businessesLoading,
    workData,
    worksLoading,
    cars,
    carsLoading,
  };
};
