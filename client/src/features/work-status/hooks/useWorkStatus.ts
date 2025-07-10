import { useMutation, useQuery } from '@tanstack/react-query';
import { REFETCH_INTERVAL, ROUTES } from '../../../constants/constant';
import type { WorkStatus } from '../../../types/work';
import { addWork, deleteWork, getWorks } from '../api/workStatus';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { AddWork } from '../types/workStatus';

export default function useWorkStatus(date?: Date) {
  const navigate = useNavigate();
  const worksQuery = useQuery<WorkStatus[]>({
    queryKey: ['work', date?.toISOString().split('T')[0]],
    queryFn: () => getWorks(date || new Date()),
    refetchInterval: REFETCH_INTERVAL,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWork(id),
    onSuccess: (_, deletedId) => {
      worksQuery.refetch();
      // 여기에 추가 로직을 작성할 수 있습니다
      // 예: 성공 메시지 표시, 상태 업데이트 등
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

  return { worksQuery, deleteMutation, add };
}
