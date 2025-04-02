import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteWork, getWorks } from "../api/work";
import { REFETCH_INTERVAL } from "../constants/constant";
import { WorkStatus } from "../types/work";

export default function useWorks(date?: Date) {
  const worksQuery = useQuery<WorkStatus[]>({
    queryKey: [
      "work",
      date?.toISOString().split("T")[0] ||
        new Date().toISOString().split("T")[0],
    ],
    queryFn: () => getWorks(date),
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
    onError: (error) => {
      console.error(error);
    },
  });

  return { worksQuery, deleteMutation };
}
