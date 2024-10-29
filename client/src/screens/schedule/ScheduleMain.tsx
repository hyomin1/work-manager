import React, { useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@tanstack/react-query';
import { IInform } from '../../interfaces/interface';
import { Trash2 } from 'lucide-react';
import {
  axiosReq,
  calDay,
  calDayOfWeek,
  calMonth,
  calYear,
  getSchedule,
} from '../../api';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

function ScheduleMain() {
  const [date, setDate] = useState(new Date());
  const { data: scheduleData, refetch } = useQuery<IInform[]>({
    queryKey: ['schedule'],
    queryFn: () => getSchedule(calYear(date), calMonth(date)),
  });

  const navigate = useNavigate();

  const [tooltip, setTooltip] = useState<{
    event: any;
    position: { x: number; y: number };
  } | null>(null);

  // 이벤트 클릭 핸들러 수정
  const handleEventClick = (clickInfo: any) => {
    // 이벤트 전파 중지
    clickInfo.jsEvent.preventDefault();
    clickInfo.jsEvent.stopPropagation();

    setTooltip({
      event: clickInfo.event,
      position: {
        x: clickInfo.jsEvent.pageX,
        y: clickInfo.jsEvent.pageY,
      },
    });
  };

  // 배경 클릭시 툴팁 닫기
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // 툴팁 영역 클릭시는 닫지 않음
    if (!(e.target as HTMLElement).closest('.tooltip')) {
      setTooltip(null);
    }
  };

  const onDeleteSchedule = async (id: string) => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      const res = await axiosReq.delete(
        `/api/employee-inform/removeInform/${id}`
      );
      if (res.status === 200) {
        setTooltip(null);

        refetch();
      }
    }
  };

  const events = useMemo(() => {
    if (!scheduleData) return [];

    return scheduleData.map((schedule) => ({
      title: `${schedule.destination}`,
      start: new Date(schedule.startDate).toISOString().split('T')[0],
      end: new Date(schedule.endDate).toISOString().split('T')[0],
      extendedProps: {
        _id: schedule._id,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        business: schedule.business,
        isDaily: schedule.isDaily,
        car: schedule.car,
        work: schedule.work,

        username: schedule.username,
      },
      backgroundColor: '#5B8FF9',
    }));
  }, [scheduleData]);

  return (
    <div
      className="flex flex-col w-full h-screen p-5 bg-gray-50"
      onClick={handleBackgroundClick}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        customButtons={{
          arrowBack: {
            text: '⬅ 뒤로가기',
            click: () => navigate(-1),
          },
        }}
        headerToolbar={{
          left: 'arrowBack',
          center: 'title',
          right: 'prev,next',
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        locale="ko"
        height="100vh"
        eventClick={handleEventClick}
        dayHeaderFormat={{ weekday: 'short' }} // 요일 표시 형식
        dayHeaders={true}
      />
      {tooltip && (
        <div
          className="absolute z-50 p-4 bg-[#f0f4f9] border border-gray-200 rounded-3xl shadow-lg tooltip"
          style={{
            top: `${tooltip.position.y + 10}px`,
            left: `${tooltip.position.x + 10}px`,
          }}
          onClick={(e) => e.stopPropagation()} // 툴팁 클릭시 이벤트 전파 중지
        >
          <div className="flex items-center justify-between mb-2 ">
            <h2 className="font-bold">{tooltip.event.title}</h2>
            <button
              className="hover:opacity-60"
              onClick={() => onDeleteSchedule(tooltip.event.extendedProps._id)}
            >
              <Trash2 />
            </button>
          </div>
          <p className="mb-2 text-xs">
            {calMonth(new Date(tooltip.event.extendedProps.startDate))}월{' '}
            {calDay(new Date(tooltip.event.extendedProps.startDate))}일 (
            {calDayOfWeek(new Date(tooltip.event.extendedProps.startDate))}요일)
            {tooltip.event.extendedProps.isDaily === 3 &&
              tooltip.event.extendedProps.startDate !==
                tooltip.event.extendedProps.endDate && (
                <>
                  {' '}
                  - {calMonth(
                    new Date(tooltip.event.extendedProps.endDate)
                  )}월 {calDay(new Date(tooltip.event.extendedProps.endDate))}일
                  ({calDayOfWeek(new Date(tooltip.event.extendedProps.endDate))}
                  요일)
                </>
              )}
          </p>
          <p className="mb-1 text-sm">{tooltip.event.extendedProps.business}</p>
          <p className="mb-1 text-sm">{tooltip.event.extendedProps.work}</p>
          {tooltip.event.extendedProps.car && (
            <p className="mb-1 text-sm">
              차량: {tooltip.event.extendedProps.car}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ScheduleMain;
