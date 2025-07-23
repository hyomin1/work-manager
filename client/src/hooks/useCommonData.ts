import { useQuery } from '@tanstack/react-query';

import type {
  Business,
  Destination,
  Username,
  Work,
} from '../features/work-status/types/workStatus';
import type { Car, Etc } from '../features/vehicle-log/types/vehicleLog';
import { getCars } from '../features/vehicle-log/api/vehicleLog';
import {
  getBusinesses,
  getDepartments,
  getDestinations,
  getEtcNames,
  getNames,
  getWorks,
} from '../api/commonData';
import type { Department } from '../features/admin/types/admin';

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

  const { data: etcList, isLoading: etcListLoading } = useQuery<Etc[]>({
    queryKey: ['etcList'],
    queryFn: getEtcNames,
  });

  const { data: departments, isLoading: departmentsLoading } = useQuery<
    Department[]
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

  const isVehicleLoading = usernamesLoading || carsLoading || etcListLoading;

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
    etcList,
    etcListLoading,
    departments,
    departmentsLoading,
    isLoading,
    isVehicleLoading,
  };
}
