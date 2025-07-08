import React from 'react';
import SubMenuList from './SubMenuList';
import type { SubMenu } from '../types/menu';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  subMenus: SubMenu[];
}

export default function MenuCard({
  title,
  description,
  icon,
  onClick,
  subMenus,
}: Props) {
  return (
    <button
      onClick={onClick}
      className='group relative flex flex-col overflow-hidden rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
    >
      <div className='relative w-full flex-1'>
        <div className='flex items-center gap-6'>
          <div className='relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-blue-600'>
            {icon}
          </div>

          <div className='flex-1'>
            <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
            <p className='mt-1 text-sm text-gray-600'>{description}</p>
          </div>

          <div className='rounded-full p-2 text-gray-400 transition-colors duration-300 group-hover:bg-blue-50 group-hover:text-blue-600'>
            →
          </div>
        </div>

        <SubMenuList subMenus={subMenus} />
      </div>
    </button>
  );
}
