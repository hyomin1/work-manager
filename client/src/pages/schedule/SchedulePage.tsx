import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@tanstack/react-query';
import type { IInform } from '../../interfaces/interface';
import { Edit, Trash2 } from 'lucide-react';
import {
  api,
  calDay,
  calDayOfWeek,
  calMonth,
  calYear,
  getSchedule,
} from '../../api';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';
import EmployeeEdit from '../workStatus/EmployeeEdit';
import { useCustomQueries } from '../../hooks/useCustomQuery';
import { Autocomplete, TextField } from '@mui/material';
import ScheduleAdd from './ScheduleAdd';

const SearchComponent = ({
  names,
  username,
  handleNameChange,
}: {
  names: any[];
  username: string | null;
  handleNameChange: (event: React.SyntheticEvent, value: string | null) => void;
}) => {
  return (
    <div className='mr-4 w-[150px]'>
      <Autocomplete
        size='small'
        options={
          names
            ?.sort((a, b) => a.username.localeCompare(b.username))
            ?.map((item) => item.username) || []
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label='이름 검색'
            size='small'
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'white',
                borderRadius: '4px',
                height: '36px',
              },
            }}
          />
        )}
        onChange={handleNameChange}
        value={username}
      />
    </div>
  );
};

function SchedulePage() {
  const date = new Date();
  const [username, setUsername] = useState<string | null>(null);
  const { data: scheduleData, refetch } = useQuery<IInform[]>({
    queryKey: ['employeeInform'],
    queryFn: () => getSchedule(calYear(date), calMonth(date), username),
  });
  const [editingItemId, setEditingItemId] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchMounted, setSearchMounted] = useState(false);
  const [clickDate, setClickDate] = useState<Date | null>(null);
  const [searchButtonElement, setSearchButtonElement] =
    useState<Element | null>(null);

  const { names } = useCustomQueries();
  const navigate = useNavigate();

  const [tooltip, setTooltip] = useState<{
    event: any;
    position: { x: number; y: number };
  } | null>(null);

  const handleNameChange = (
    event: React.SyntheticEvent,
    username: string | null
  ) => {
    setUsername(username);
  };

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  const handleEventClick = (clickInfo: any) => {
    clickInfo.jsEvent.preventDefault();
    clickInfo.jsEvent.stopPropagation();

    const eventEl = clickInfo.el;
    const rect = eventEl.getBoundingClientRect();

    setTooltip({
      event: clickInfo.event,
      position: {
        x: Math.max(20, rect.left - 320),
        y: rect.top + window.scrollY,
      },
    });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.tooltip')) {
      setTooltip(null);
    }
  };

  const onDeleteSchedule = async (id: string) => {
    if (!window.confirm('삭제하시겠습니까?')) {
      return;
    }

    const res = await api.delete(`/api/employee-inform/removeInform/${id}`);
    if (res.status === 200) {
      setTooltip(null);
      refetch();
    }
  };

  const events = useMemo(() => {
    if (!scheduleData) return [];

    return scheduleData.map((schedule) => {
      const endDate = new Date(schedule.endDate);
      endDate.setDate(endDate.getDate() + 1);

      return {
        title: `${schedule.destination || schedule.work}`,
        start: new Date(schedule.startDate).toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
        extendedProps: {
          _id: schedule._id,
          startDate: schedule.startDate,
          endDate: new Date(schedule.endDate).setHours(23, 59, 59, 999),
          destination: schedule.destination,
          business: schedule.business,
          isDaily: schedule.isDaily,
          car: schedule.car,
          work: schedule.work,
          username: schedule.username,
          remarks: schedule.remarks,
        },
        backgroundColor: '#5B8FF9',
      };
    });
  }, [scheduleData]);

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

  const handleDateClick = (arg: any) => {
    setClickDate(arg.date);
    setShowAddForm(true);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .fc .fc-toolbar.fc-header-toolbar {
        display: grid;
        grid-template-columns: minmax(auto, 1fr) minmax(auto, 2fr) minmax(auto, 1fr);
      }
      .fc .fc-toolbar-chunk {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .fc .fc-toolbar-chunk:nth-child(2) {
        justify-content: center;
      }
      .fc .fc-toolbar-chunk:last-child {
        justify-content: flex-end;
        gap: 4px;
      }
    `;
    document.head.appendChild(style);

    const styleElement = style;
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

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
          search: {
            text: '',
          },
        }}
        headerToolbar={{
          left: 'arrowBack',
          center: 'title',
          right: 'search,prev,next',
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        locale='ko'
        height='100vh'
        eventClick={handleEventClick}
        dayHeaderFormat={{ weekday: 'short' }}
        dayHeaders={true}
        dateClick={handleDateClick}
      />

      {searchMounted &&
        searchButtonElement &&
        createPortal(
          <SearchComponent
            names={names || []}
            username={username}
            handleNameChange={handleNameChange}
          />,
          searchButtonElement
        )}

      {tooltip && (
        <div
          className='tooltip fixed z-10 rounded-lg border border-[#FFE4D6] bg-gradient-to-br from-[#FFF5F0] to-white p-5 shadow-lg'
          style={{
            top: `${tooltip.position.y}px`,
            left: `${tooltip.position.x}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='mb-3 flex w-full items-start justify-between'>
            <h2 className='mr-2 whitespace-nowrap text-lg font-bold text-[#E67547]'>
              {tooltip.event.title}
            </h2>
            <div className='flex justify-start space-x-1'>
              <button
                onClick={() =>
                  setEditingItemId(tooltip.event.extendedProps._id)
                }
                className='rounded-full p-1.5 text-[#FF9671] transition-all hover:bg-[#FFE4D6] hover:text-[#E67547]'
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() =>
                  onDeleteSchedule(tooltip.event.extendedProps._id)
                }
                className='rounded-full p-1.5 text-[#FF9671] transition-all hover:bg-[#FFE4D6] hover:text-[#E67547]'
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className='mb-3 flex items-center space-x-2 rounded-md bg-white/80 px-3 py-2'>
            <div className='text-xs font-medium text-[#E67547]'>
              {calMonth(new Date(tooltip.event.extendedProps.startDate))}월{' '}
              {calDay(new Date(tooltip.event.extendedProps.startDate))}일 (
              {calDayOfWeek(new Date(tooltip.event.extendedProps.startDate))}
              요일)
              {tooltip.event.extendedProps.isDaily === 3 &&
                tooltip.event.extendedProps.startDate !==
                  tooltip.event.extendedProps.endDate && (
                  <>
                    {' '}
                    - {calMonth(new Date(tooltip.event.extendedProps.endDate))}
                    월 {calDay(new Date(tooltip.event.extendedProps.endDate))}일
                    (
                    {calDayOfWeek(
                      new Date(tooltip.event.extendedProps.endDate)
                    )}
                    요일)
                  </>
                )}
            </div>
          </div>

          <div className='space-y-2'>
            {tooltip.event.extendedProps.business && (
              <div className='rounded-md bg-white/80 px-3 py-2'>
                <p className='text-sm text-gray-600'>
                  <span className='mb-1 block whitespace-nowrap text-xs font-medium text-[#E67547]'>
                    사업명
                  </span>
                  {tooltip.event.extendedProps.business}
                </p>
              </div>
            )}

            {tooltip.event.extendedProps.work && (
              <div className='rounded-md bg-white/80 px-3 py-2'>
                <p className='text-sm text-gray-600'>
                  <span className='mb-1 block text-xs font-medium text-[#E67547]'>
                    업무
                  </span>
                  {tooltip.event.extendedProps.work}
                </p>
              </div>
            )}

            {tooltip.event.extendedProps.car && (
              <div className='rounded-md bg-white/80 px-3 py-2'>
                <p className='text-sm text-gray-600'>
                  <span className='mb-1 block text-xs font-medium text-[#E67547]'>
                    차량
                  </span>
                  {tooltip.event.extendedProps.car}
                </p>
              </div>
            )}

            {tooltip.event.extendedProps.remarks && (
              <div className='rounded-md bg-white/80 px-3 py-2'>
                <p className='text-sm text-gray-600'>
                  <span className='mb-1 block text-xs font-medium text-[#E67547]'>
                    비고
                  </span>
                  {tooltip.event.extendedProps.remarks}
                </p>
              </div>
            )}
          </div>

          {editingItemId && (
            <EmployeeEdit
              currentDate={tooltip.event.extendedProps.startDate}
              item={tooltip.event.extendedProps}
              setEditingItemId={setEditingItemId}
              onUpdate={(updatedData) => {
                setTooltip((prev) =>
                  prev
                    ? {
                        ...prev,
                        event: {
                          ...prev.event,
                          title: updatedData.destination || updatedData.work,
                          extendedProps: {
                            ...prev.event.extendedProps,
                            ...updatedData,
                          },
                        },
                      }
                    : null
                );
              }}
            />
          )}
        </div>
      )}

      {showAddForm && (
        <ScheduleAdd
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          refetch={refetch}
          date={clickDate ?? new Date()}
        />
      )}
    </div>
  );
}

export default SchedulePage;
