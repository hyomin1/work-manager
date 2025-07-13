import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  calDate?: (arg0: Date) => string;
  calYearMonth?: (arg0: Date) => string;
}

function Title({
  calDate,
  calYearMonth,
  category,
  currentDate,
  setCurrentDate,
  setShowInput,
}: Props) {
  const previous = () => {
    const prevDate = new Date(currentDate);
    if (category === 'employee') {
      prevDate.setDate(prevDate.getDate() - 1);
    } else if (category === 'driving') {
      prevDate.setMonth(prevDate.getMonth() - 1);
    }
    setCurrentDate(prevDate);
    setShowInput(false);
  };

  const next = () => {
    const prevDate = new Date(currentDate);
    if (category === 'employee') {
      prevDate.setDate(prevDate.getDate() + 1);
    } else if (category === 'driving') {
      prevDate.setMonth(prevDate.getMonth() + 1);
    }
    setCurrentDate(prevDate);
  };

  const selectDate = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <div className='rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5'>
      <div className='flex items-center justify-center gap-1'>
        <button
          onClick={previous}
          className='rounded-lg text-gray-600 transition-all hover:bg-gray-100 active:scale-95 md:p-2 print:hidden'
        >
          <ChevronLeft className='h-6 w-6' />
        </button>

        <button
          onClick={selectDate}
          className='group flex w-full items-center gap-3 rounded-lg transition-all hover:bg-gray-100 md:px-4 md:py-2'
        >
          <Calendar className='h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700 sm:hidden' />
          <span className='whitespace-nowrap text-xl font-semibold text-gray-700 transition-colors group-hover:text-blue-600 sm:text-xs'>
            {category === 'driving' && (
              <>
                {calYearMonth?.(currentDate)}
                <span className='whitespace-nowrap text-xl font-semibold text-gray-700 transition-colors group-hover:text-blue-600 sm:text-xs'>
                  {' '}
                  차량운행일지
                </span>
              </>
            )}
            {category === 'employee' && calDate && calDate(currentDate)}
          </span>
        </button>

        <button
          onClick={next}
          className='rounded-lg text-gray-600 transition-all hover:bg-gray-100 active:scale-95 md:p-2 print:hidden'
        >
          <ChevronRight className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
}

export default Title;
