import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { REFETCH_INTERVAL, ROUTES } from '../../../constants/constant';
import type { EditWorkStatus, WorkStatus } from '../../../types/work';
import { addWork, deleteWork, editWork, getWorks } from '../api/workStatus';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { AddWork } from '../types/workStatus';

export default function useWorkStatus(date?: Date) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const worksQuery = useQuery<WorkStatus[]>({
    queryKey: ['workStatus', date?.toISOString().split('T')[0]],
    queryFn: () => getWorks(date || new Date()),
    refetchInterval: REFETCH_INTERVAL,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWork(id),
    onSuccess: () => {
      toast.success('성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['workStatus'] });
    },
    onError: () => {
      toast.error('삭제에 실패했습니다.');
    },
  });

  const add = useMutation({
    mutationFn: (work: AddWork) => addWork(work),
    onSuccess: () => {
      toast.success('업무가 등록되었습니다.');
      navigate(ROUTES.WORKS.LIST);
    },
    onError: () => {
      toast.error('업무 등록에 실패했습니다.');
    },
  });

  //수정

  const edit = useMutation({
    mutationFn: (work: EditWorkStatus) => editWork(work),
    onSuccess: () => {
      toast.success('업무가 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['workStatus'] });
    },
    onError: () => {
      toast.error('업무 수정에 실패했습니다.');
    },
  });

  return { worksQuery, deleteMutation, add, edit };
}
