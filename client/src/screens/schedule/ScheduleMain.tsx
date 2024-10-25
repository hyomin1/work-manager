import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css'; //
import { useQuery } from '@tanstack/react-query';
import { IInform } from '../../interfaces/interface';
import { getSchedule } from '../../api';
function ScheduleMain() {
  const { data: scheduleData, refetch } = useQuery<IInform[]>({
    queryKey: ['schedule'],
    queryFn: getSchedule,
  });
  console.log(scheduleData);
  const handleDateSelect = () => {
    // 클릭 시 이벤트
    //const title = prompt('일정을 입력하세요:');
  };
  const handleEventClick = (clickInfo: any) => {
    // 삭제는 캘린더에서 x , 누르면 툴팁처럼 보이게 하기
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: '광주', date: '2024-10-01' },
        { title: '서울', date: '2024-10-22' },
      ]}
      headerToolbar={{
        left: 'today,prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
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
