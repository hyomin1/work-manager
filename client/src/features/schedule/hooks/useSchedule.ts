import { useQuery } from '@tanstack/react-query';
import { getSchedule } from '../api/schedule';
import { calMonth, calYear } from '../../../utils';
import type { WorkStatus } from '../../work-status/types/workStatus';

export default function useSchedule(date: Date, username?: string) {
  const { data: schedules } = useQuery<WorkStatus[]>({
    queryKey: ['employeeInform', calMonth(date)],
    queryFn: () => getSchedule(calYear(date), calMonth(date), username),
    enabled: !!username,
  });
  return { schedules };
}
