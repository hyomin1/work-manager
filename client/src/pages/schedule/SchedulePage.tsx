import React, { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@tanstack/react-query";
import { IInform } from "../../interfaces/interface";
import { Edit, Trash2 } from "lucide-react";
import {
  axiosReq,
  calDay,
  calDayOfWeek,
  calMonth,
  calYear,
  getSchedule,
} from "../../api";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";
import EmployeeEdit from "../employee/EmployeeEdit";

function SchedulePage() {
  const date = new Date();

  const { data: scheduleData, refetch } = useQuery<IInform[]>({
    queryKey: ["employeeInform"],
    queryFn: () => getSchedule(calYear(date), calMonth(date)),
  });
  const [editingItemId, setEditingItemId] = useState("");

  const navigate = useNavigate();

  const [tooltip, setTooltip] = useState<{
    event: any;
    position: { x: number; y: number };
  } | null>(null);

  const handleEventClick = (clickInfo: any) => {
    clickInfo.jsEvent.preventDefault();
    clickInfo.jsEvent.stopPropagation();

    setTooltip({
      event: clickInfo.event,
      position: {
        x: clickInfo.jsEvent.pageX - 200,
        y: clickInfo.jsEvent.pageY,
      },
    });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".tooltip")) {
      setTooltip(null);
    }
  };

  const onDeleteSchedule = async (id: string) => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }

    const res = await axiosReq.delete(
      `/api/employee-inform/removeInform/${id}`,
    );
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
        start: new Date(schedule.startDate).toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
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
        backgroundColor: "#5B8FF9",
      };
    });
  }, [scheduleData]);

  return (
    <div
      className="flex h-screen w-full flex-col bg-gradient-to-br from-blue-50 to-gray-100 p-5"
      onClick={handleBackgroundClick}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        customButtons={{
          arrowBack: {
            text: "⬅ 뒤로가기",
            click: () => navigate(-1),
          },
        }}
        headerToolbar={{
          left: "arrowBack",
          center: "title",
          right: "prev,next",
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        locale="ko"
        height="100vh"
        eventClick={handleEventClick}
        dayHeaderFormat={{ weekday: "short" }} // 요일 표시 형식
        dayHeaders={true}
      />
      {tooltip && (
        <div
          className="tooltip absolute z-10 rounded-3xl border border-gray-200 bg-[#f0f4f9] p-4 shadow-lg"
          style={{
            top: `${tooltip.position.y + 10}px`,
            left: `${tooltip.position.x + 10}px`,
          }}
          onClick={(e) => e.stopPropagation()} // 툴팁 클릭시 이벤트 전파 중지
        >
          <div className="mb-2 flex w-full items-center justify-between">
            <h2 className="mr-2 whitespace-nowrap font-bold">
              {tooltip.event.title}
            </h2>
            <div className="flex justify-start">
              <button
                onClick={() =>
                  setEditingItemId(tooltip.event.extendedProps._id)
                }
                className="hover:opacity-60"
              >
                <Edit strokeWidth={2.2} className="mr-2" />
              </button>
              <button
                onClick={() =>
                  onDeleteSchedule(tooltip.event.extendedProps._id)
                }
                className="hover:opacity-60"
              >
                <Trash2 strokeWidth={2.2} />
              </button>
              {editingItemId && (
                <EmployeeEdit
                  currentDate={tooltip.event.extendedProps.startDate}
                  item={tooltip.event.extendedProps}
                  setEditingItemId={setEditingItemId}
                />
              )}
            </div>
          </div>
          <p className="mb-2 text-xs">
            {calMonth(new Date(tooltip.event.extendedProps.startDate))}월{" "}
            {calDay(new Date(tooltip.event.extendedProps.startDate))}일 (
            {calDayOfWeek(new Date(tooltip.event.extendedProps.startDate))}요일)
            {tooltip.event.extendedProps.isDaily === 3 &&
              tooltip.event.extendedProps.startDate !==
                tooltip.event.extendedProps.endDate && (
                <>
                  {" "}
                  - {calMonth(
                    new Date(tooltip.event.extendedProps.endDate),
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
          <p className="mb-1 text-sm">{tooltip.event.extendedProps.remarks}</p>
        </div>
      )}
    </div>
  );
}

export default SchedulePage;
