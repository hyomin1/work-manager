import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getNames,
  getDestinations,
  getBusinesses,
  getWorks,
  getEtcNames,
  getDepartments,
} from '../../../api/commonData';
import { getCars } from '../../vehicle-log/api/vehicleLog';
import toast from 'react-hot-toast';
import {
  createCommonItem,
  editCommonItem,
  removeCommonItem,
} from '../api/admin';
import type { Destination } from '../../work-status/types/workStatus';
import type { AdminType } from '../types/admin';

export function useAdmin(activeTab: AdminType, page?: number) {
  const queryClient = useQueryClient();

  const queryFn = {
    username: getNames,
    destination: getDestinations,
    business: getBusinesses,
    work: getWorks,
    car: getCars,
    etcName: getEtcNames,
    department: getDepartments,
  }[activeTab];

  const { data } = useQuery({
    queryKey: [activeTab, page],
    queryFn,
  });

  const sortedData = data
    ? [...data].sort((a, b) => {
        const aValue = a[activeTab];
        const bValue = b[activeTab];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        return 0;
      })
    : [];

  const { data: destinations } = useQuery<Destination[]>({
    queryKey: ['destinations'],
    queryFn: getDestinations,
    enabled: activeTab === 'business',
  });

  const { mutate: removeItem } = useMutation({
    mutationFn: (id: string) => removeCommonItem(activeTab, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activeTab] });
      toast.success('성공적으로 삭제하였습니다.');
    },
    onError: () => {
      toast.error('삭제에 실패했습니다.');
    },
  });

  const { mutate: addItem } = useMutation({
    mutationFn: ({
      inputValue,
      destination,
    }: {
      inputValue: string;
      destination?: string;
    }) => createCommonItem(activeTab, inputValue, destination),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activeTab] });
      toast.success('성공적으로 등록하였습니다.');
    },
    onError: () => {
      toast.error('등록에 실패했습니다.');
    },
  });

  const { mutate: editItem } = useMutation({
    mutationFn: ({
      inputValue,
      editId,
      destination,
    }: {
      inputValue: string;
      editId: string;
      destination?: string;
    }) => editCommonItem(activeTab, inputValue, editId, destination),
    onSuccess: () => {
      toast.success('성공적으로 수정하였습니다.');
      queryClient.invalidateQueries({ queryKey: [activeTab] });
    },
    onError: () => {
      toast.error('수정에 실패했습니다.');
    },
  });

  return {
    destinations,
    data: sortedData,
    removeItem,
    addItem,
    editItem,
  };
}
