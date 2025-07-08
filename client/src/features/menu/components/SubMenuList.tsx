import type { SubMenu } from '../types/menu';

interface Props {
  subMenus: SubMenu[];
}

export default function SubMenuList({ subMenus }: Props) {
  return (
    <div className='mt-6 grid grid-cols-1 gap-3 border-t pt-6'>
      {subMenus.map(({ icon, title, onClick }) => (
        <div
          key={title}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className='flex items-center gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-blue-50/50'
        >
          {icon && (
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100/50 text-blue-600'>
              {icon}
            </div>
          )}

          <span className='text-sm font-medium text-gray-600'>{title}</span>
        </div>
      ))}
    </div>
  );
}
