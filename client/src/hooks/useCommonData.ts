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
import type { IEtcNames, IDepartments } from '../interfaces/interface';
import type {
  Business,
  Car,
  Destination,
  Username,
  Work,
} from '../features/work-status/types/workStatus';

export function useCommonData() {
  const { data: usernames, isLoading: usernamesLoading } = useQuery<Username[]>(
    {
      queryKey: ['names'],
      queryFn: getNames,
    }
  );

  const { data: destinations, isLoading: destinationsLoading } = useQuery<
    Destination[]
  >({
    queryKey: ['destinations'],
    queryFn: getDestinations,
  });

  const { data: businesses, isLoading: businessesLoading } = useQuery<
    Business[]
  >({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
  });

  const { data: works, isLoading: worksLoading } = useQuery<Work[]>({
    queryKey: ['works'],
    queryFn: getWorks,
  });

  const { data: cars, isLoading: carsLoading } = useQuery<Car[]>({
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

  const isLoading =
    usernamesLoading ||
    destinationsLoading ||
    businessesLoading ||
    worksLoading ||
    carsLoading;

  return {
    usernames,
    usernamesLoading,
    destinations,
    destinationsLoading,
    businesses,
    businessesLoading,
    works,
    worksLoading,
    cars,
    carsLoading,
    etcNames,
    etcNamesLoading,
    departments,
    departmentsLoading,
    isLoading,
  };
}
