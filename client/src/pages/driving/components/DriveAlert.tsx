import React, { type SetStateAction } from 'react';

interface Props {
  notification: string;
  onClick?: () => void;
  setIsAdding?: React.Dispatch<SetStateAction<boolean>>;
  type: string;
}

const DriveAlert = ({ notification, onClick, type, setIsAdding }: Props) => {
  return (
    <div
      onClick={
        type === 'carService' && setIsAdding ? () => setIsAdding(true) : onClick
      }
      className='group relative mb-4 cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm transition-all duration-300 hover:shadow-md'
    >
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500 transition-colors duration-300 group-hover:bg-blue-200'>
          <svg
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <div className='flex-1'>
          <p className='font-medium text-gray-800 transition-colors duration-300 group-hover:text-gray-900 sm:text-sm'>
            {notification || '공지사항을 등록해주세요'}
          </p>
        </div>
        <div className='flex-shrink-0'>
          <svg
            className='h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </div>
      </div>
      <div className='absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 transition-transform duration-300 group-hover:scale-100' />
    </div>
  );
};

export default DriveAlert;
