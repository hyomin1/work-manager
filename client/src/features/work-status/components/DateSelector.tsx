import { Calendar } from 'lucide-react';
import { useState } from 'react';
import useEscapeKey from '../hooks/useEscapeKey';

interface Props {
  isDatePickerOpen: boolean;
  onClose: () => void;
  currentDate: Date;
  handleDate: (date: Date) => void;
}

function DateInput({
  isDatePickerOpen,
  onClose,
  currentDate,
  handleDate,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEscapeKey(onClose);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      const newDate = new Date(date);
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
      }
    }
  };

  const handleApply = () => {
    if (selectedDate) handleDate(selectedDate);
    onClose();
  };

  if (!isDatePickerOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8'>
        <button
          className='absolute right-4 top-4 text-gray-400 hover:text-gray-600'
          onClick={onClose}
          aria-label='Close'
        >
          ✕
        </button>
        <div className='text-center'>
          <h2 className='mb-4 text-lg font-semibold text-gray-700'>
            날짜 선택
          </h2>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <Calendar className='h-6 w-6 text-blue-500' />
            </div>
            <input
              type='date'
              value={
                selectedDate
                  ? selectedDate.toISOString().split('T')[0]
                  : currentDate.toISOString().split('T')[0]
              }
              className='w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pl-12 text-sm text-gray-700 shadow focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='mt-6 flex justify-end gap-4'>
          <button
            className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200'
            onClick={onClose}
          >
            취소
          </button>
          <button
            className='rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300'
            onClick={handleApply}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateInput;
