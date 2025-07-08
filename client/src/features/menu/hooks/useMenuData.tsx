import {
  CalendarRange,
  ClipboardList,
  Truck,
  Users,
  Wrench,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constant';
import useAuth from '../../auth/hooks/useAuth';

export default function useMenuData() {
  const navigate = useNavigate();
  const { checkUserPermission } = useAuth();
  const menuData = [
    {
      id: 'work-status',
      title: '근무 현황',
      description: '근무 현황 기록 및 관리',
      icon: <Users size={24} strokeWidth={2} />,
      onClick: checkUserPermission,
      subMenus: [
        {
          icon: <ClipboardList className='h-5 w-5' />,
          title: '일일 업무 작성',
          onClick: () => navigate(ROUTES.WORKS.DAILY_WORK),
        },
        {
          icon: <CalendarRange className='h-5 w-5' />,
          title: '일정 관리',
          onClick: () => navigate(ROUTES.SCHEDULE),
        },
      ],
    },
    {
      id: 'vehicle-log',
      title: '차량 운행 일지',
      description: '차량 운행 기록 및 관리',
      icon: <Truck size={24} strokeWidth={2} />,
      onClick: () => navigate(ROUTES.VEHICLES.LIST),
      subMenus: [
        {
          icon: <Wrench className='h-5 w-5' />,
          title: '차량 정비내역',
          onClick: () => navigate(ROUTES.VEHICLES.SERVICE),
        },
        {
          icon: null,
          title: '',
          onClick: () => navigate(ROUTES.VEHICLES.LIST),
        },
      ],
    },
  ];

  return { menuData };
}
