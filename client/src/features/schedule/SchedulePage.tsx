import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {
  type DateClickArg,
} from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import { useCommonData } from '../../hooks/useCommonData';
import useSchedule from './hooks/useSchedule';
import WorkStatusEditModal from '../work-status/components/WorkStatusEditModal';
import AddScheduleForm from './AddScheduleForm';
import './style.css';
import { transformSchedulesToEvents } from './utils/transformEvents';
import useTooltip from './hooks/useTooltip';
import useCalendarStyle from './hooks/useCalendarSylte';
import CalendarTooltip from './components/CalendarTooltip';
import SearchComponent from './components/SearchComponent';
import type { EventClickArg } from '@fullcalendar/core/index.js';
import type { WorkStatus } from '../work-status/types/workStatus';

export default function SchedulePage() {
  const date = new Date();
  const [username, setUsername] = useState('');
  const { schedules } = useSchedule(date, username);
  const [editId, setEditId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [clickDate, setClickDate] = useState<Date | null>(null);
  const [searchButtonElement, setSearchButtonElement] =
    useState<Element | null>(null);
  const [searchMounted, setSearchMounted] = useState(false);

  const { usernames } = useCommonData();
  const navigate = useNavigate();
  const { tooltip, showTooltip, hideTooltip } = useTooltip();

  useCalendarStyle();

  const events = useMemo(
    () => transformSchedulesToEvents(schedules || []),
    [schedules]
  );

  const handleNameChange = (_: React.SyntheticEvent, name: string | null) => {
    if (name) setUsername(name);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo.jsEvent.preventDefault();
    clickInfo.jsEvent.stopPropagation();
    showTooltip(clickInfo);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.tooltip')) {
      hideTooltip();
    }
  };

  const onDeleteSchedule = async (id: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    const res = await fetch(`/api/employee-inform/removeInform/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) hideTooltip();
  };

  const handleDateClick = (arg: DateClickArg) => {
    setClickDate(arg.date);
    setIsOpen(true);
  };

  useEffect(() => {
    const searchButton = document.querySelector('.fc-search-button');
    if (searchButton) {
      searchButton.textContent = '';
      searchButton.classList.remove('fc-button', 'fc-button-primary');
      setSearchButtonElement(searchButton);
      setSearchMounted(true);
    }
    return () => {
      setSearchButtonElement(null);
      setSearchMounted(false);
    };
  }, []);

  const editWork = tooltip?.event.extendedProps;

  return (
    <div
      className='flex h-screen w-full flex-col bg-gradient-to-br from-blue-50 to-gray-100 px-4 pt-2'
      onClick={handleBackgroundClick}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        customButtons={{
          arrowBack: {
            text: '⬅ 뒤로가기',
            click: () => navigate(-1),
          },
          search: { text: '' },
        }}
        headerToolbar={{
          left: 'arrowBack',
          center: 'title',
          right: 'search,prev,next',
        }}
        selectable
        selectMirror
        dayMaxEvents
        locale='ko'
        height='100vh'
        eventClick={handleEventClick}
        dayHeaderFormat={{ weekday: 'short' }}
        dayHeaders
        dateClick={handleDateClick}
      />

      {searchMounted &&
        searchButtonElement &&
        createPortal(
          <SearchComponent
            names={usernames || []}
            username={username}
            handleNameChange={handleNameChange}
          />,
          searchButtonElement
        )}

      {tooltip && (
        <CalendarTooltip
          tooltip={tooltip}
          setEditId={setEditId}
          onDelete={onDeleteSchedule}
        />
      )}

      {editId && <WorkStatusEditModal editWork={editWork as WorkStatus} />}
      {isOpen && (
        <AddScheduleForm
          onClose={() => setIsOpen(false)}
          date={clickDate ?? new Date()}
        />
      )}
    </div>
  );
}
