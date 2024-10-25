import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css'; //
import { useQuery } from '@tanstack/react-query';
import { IInform } from '../../interfaces/interface';
import { calMonth, calYear, getSchedule } from '../../api';
import { useMemo, useState } from 'react';
function ScheduleMain() {
  const [date, setDate] = useState(new Date());
  const { data: scheduleData, refetch } = useQuery<IInform[]>({
    queryKey: ['schedule'],
    queryFn: () => getSchedule(calYear(date), calMonth(date)),
  });

  const handleDateSelect = () => {
    // 클릭 시 이벤트
    //const title = prompt('일정을 입력하세요:');
  };
  const handleEventClick = (clickInfo: any) => {
    // 삭제는 캘린더에서 x , 누르면 툴팁처럼 보이게 하기
  };
  const events = useMemo(() => {
    if (!scheduleData) return [];

    return scheduleData.map((schedule) => ({
      title: `${schedule.destination} - ${schedule.work}`, // 목적지와 업무를 함께 표시
      start: new Date(schedule.startDate).toISOString().split('T')[0], // YYYY-MM-DD 형식으로 변환
      end: new Date(schedule.endDate).toISOString().split('T')[0],
      extendedProps: {
        // 추가 정보 저장
        business: schedule.business,
        car: schedule.car,
        isDaily: schedule.isDaily,
        username: schedule.username,
      },
      backgroundColor: schedule.isDaily === 2 ? '#4CAF50' : '#2196F3', // isDaily에 따른 색상 구분
    }));
  }, [scheduleData]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      headerToolbar={{
        left: '',
        center: 'title',
        right: '',
      }}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      locale="ko"
      select={handleDateSelect}
      eventClick={handleEventClick}
    />
  );
}

export default ScheduleMain;
