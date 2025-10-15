import type { EventInput } from '@fullcalendar/core/index.js';
import type { WorkStatus } from '../../work-status/types/workStatus';

export function transformSchedulesToEvents(
  schedules: WorkStatus[]
): EventInput[] {
  return schedules.map((schedule) => {
    const endDate = new Date(schedule.endDate);
    endDate.setDate(endDate.getDate() + 1);

    return {
      title: schedule.destination || schedule.work,
      start: new Date(schedule.startDate).toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
      extendedProps: {
        ...schedule,
        endDate: endDate.setHours(23, 59, 59, 999),
      },
      backgroundColor: '#5B8FF9',
    };
  });
}
