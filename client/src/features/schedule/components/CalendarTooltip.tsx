import { Edit, Trash2 } from 'lucide-react';
import { calDay, calDayOfWeek, calMonth } from '../../../utils';
import type { EventClickArg } from '@fullcalendar/core/index.js';

interface CalendarTooltipProps {
  tooltip: {
    event: EventClickArg['event'];
    position: { x: number; y: number };
  };
  setEditId: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CalendarTooltip({
  tooltip,
  setEditId,
  onDelete,
}: CalendarTooltipProps) {
  const { event, position } = tooltip;
  const data = event.extendedProps;
  const isMultiDay = data.isDaily === 3 && data.startDate !== data.endDate;

  return (
    <div
      className='tooltip fixed z-10 rounded-lg border border-[#FFE4D6] bg-gradient-to-br from-[#FFF5F0] to-white p-5 shadow-lg'
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='mb-3 flex w-full items-start justify-between'>
        <h2 className='mr-2 whitespace-nowrap text-lg font-bold text-[#E67547]'>
          {event.title}
        </h2>
        <div className='flex justify-start space-x-1'>
          <button
            onClick={() => setEditId(data._id)}
            className='rounded-full p-1.5 text-[#FF9671] transition-all hover:bg-[#FFE4D6] hover:text-[#E67547]'
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(data._id)}
            className='rounded-full p-1.5 text-[#FF9671] transition-all hover:bg-[#FFE4D6] hover:text-[#E67547]'
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className='mb-3 flex items-center space-x-2 rounded-md bg-white/80 px-3 py-2'>
        <div className='text-xs font-medium text-[#E67547]'>
          {calMonth(new Date(data.startDate))}월{' '}
          {calDay(new Date(data.startDate))}일 (
          {calDayOfWeek(new Date(data.startDate))}요일)
          {isMultiDay && (
            <>
              {' '}
              - {calMonth(new Date(data.endDate))}월{' '}
              {calDay(new Date(data.endDate))}일 (
              {calDayOfWeek(new Date(data.endDate))}요일)
            </>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        {data.business && <TooltipItem label='사업명' value={data.business} />}
        {data.work && <TooltipItem label='업무' value={data.work} />}
        {data.car && <TooltipItem label='차량' value={data.car} />}
        {data.remarks && <TooltipItem label='비고' value={data.remarks} />}
      </div>
    </div>
  );
}

function TooltipItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-md bg-white/80 px-3 py-2'>
      <p className='text-sm text-gray-600'>
        <span className='mb-1 block text-xs font-medium text-[#E67547]'>
          {label}
        </span>
        {value}
      </p>
    </div>
  );
}
