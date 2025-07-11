import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50 p-10 sm:p-4'>
      <div className='flex w-[90%] flex-col items-center sm:w-full'>
        {children}
      </div>
    </div>
  );
}
