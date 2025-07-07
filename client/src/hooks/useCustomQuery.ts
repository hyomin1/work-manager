import { useQuery } from '@tanstack/react-query';
import {
  getNames,
  getDestinations,
  getBusinesses,
  getWorks,
  getCars,
  getEtcNames,
  getDepartments,
} from '../api';
import type {
  INames,
  IDestinations,
  IBusinesses,
  IWorks,
  ICars,
  IEtcNames,
  IDepartments,
} from '../interfaces/interface';

// 전체 데이터 조회용
export const useCustomQueries = () => {
  const { data: names, isLoading: namesLoading } = useQuery<INames[]>({
    queryKey: ['names'],
    queryFn: getNames,
  });

  const { data: destinationsData, isLoading: destinationsLoading } = useQuery<
    IDestinations[]
  >({
    queryKey: ['destinations'],
    queryFn: getDestinations,
  });

  const { data: businessesData, isLoading: businessesLoading } = useQuery<
    IBusinesses[]
  >({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
  });

  const { data: workData, isLoading: worksLoading } = useQuery<IWorks[]>({
    queryKey: ['works'],
    queryFn: getWorks,
  });

  const { data: cars, isLoading: carsLoading } = useQuery<ICars[]>({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  const { data: etcNames, isLoading: etcNamesLoading } = useQuery<IEtcNames[]>({
    queryKey: ['etcNames'],
    queryFn: getEtcNames,
  });

  const { data: departments, isLoading: departmentsLoading } = useQuery<
    IDepartments[]
  >({
    queryKey: ['departments'],
    queryFn: getDepartments,
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
    etcNames,
    etcNamesLoading,
    departments,
    departmentsLoading,
  };
};
