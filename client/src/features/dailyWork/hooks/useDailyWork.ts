import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addDailyWork,
  deleteDailyWork,
  editDailyWork,
  getDailyWorks,
} from '../api/dailWork';
import type { DailyWork, DailyWorkForm } from '../types/dailyWork';
import toast from 'react-hot-toast';
import { REFETCH_INTERVAL } from '../../../constants/constant';

export default function useDailyWork(date?: Date | null) {
  const queryClient = useQueryClient();
  const { data: dailyWorks } = useQuery<DailyWork[]>({
    queryKey: ['dailyWorks', date?.toISOString().split('T')[0]],
    queryFn: () => getDailyWorks(date || new Date()),
    refetchInterval: REFETCH_INTERVAL,
  });

  const { mutate: addItem } = useMutation({
    mutationFn: (form: DailyWorkForm) => addDailyWork(form),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dailyWorks'],
      });
      toast.success('일일 업무가 등록되었습니다.');
    },
    onError: () => {
      toast.error('일일 업무 등록에 실패했습니다.');
    },
  });

  const { mutate: editItem } = useMutation({
    mutationFn: ({ id, form }: { id: string; form: DailyWorkForm }) =>
      editDailyWork(id, form),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['dailyWorks'] });
      queryClient.invalidateQueries({ queryKey: ['dailyWork', id] });
      toast.success('일일 업무가 수정되었습니다.');
    },
    onError: () => {
      toast.error('일일 업무 수정에 실패했습니다.');
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (id: string) => deleteDailyWork(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyWorks'] });
      toast.success('일일 업무가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('일일 업무 삭제에 실패했습니다.');
    },
  });
  return { dailyWorks, addItem, editItem, deleteItem };
}
