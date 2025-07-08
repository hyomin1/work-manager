import { Activity } from 'lucide-react';
import MenuCard from './components/MenuCard';
import BackgroundBlob from '../../components/common/BackgroundBlob';
import useMenuData from './hooks/useMenuData';

export default function MenuPage() {
  const { menuData } = useMenuData();

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      <BackgroundBlob />

      <div className='mx-auto max-w-6xl px-4 py-16'>
        <div className='mb-16 text-center'>
          <div className='mb-4 inline-flex items-center rounded-full bg-white/80 px-5 py-2 shadow-sm backdrop-blur-sm'>
            <Activity className='mr-2 h-5 w-5 text-blue-600' />
            <span className='text-sm font-medium text-gray-800'>메뉴 선택</span>
          </div>
          <h1 className='text-3xl font-bold text-gray-900'>
            원하시는 메뉴를 선택해주세요
          </h1>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {menuData.map(
            ({ id, title, description, icon, onClick, subMenus }) => (
              <MenuCard
                key={id}
                title={title}
                description={description}
                icon={icon}
                onClick={onClick}
                subMenus={subMenus}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
