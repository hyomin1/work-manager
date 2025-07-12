import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  FileText,
  LineChart,
  Pencil,
  Settings,
  Truck,
  Users,
  RefreshCw,
} from 'lucide-react';
import { ROUTES } from '../../../constants/constant';
import NavButton from '../../../components/common/NavButton';
import { authApi } from '../../auth/api/auth';

const navItems = [
  { icon: Truck, label: '차량', route: ROUTES.VEHICLES.LIST, variant: 'blue' },
  { icon: Pencil, label: '입력', route: ROUTES.WORKS.CREATE, variant: 'green' },
  { icon: Calendar, label: '일정', route: ROUTES.SCHEDULE, variant: 'blue' },
  {
    icon: FileText,
    label: '업무',
    route: ROUTES.WORKS.DAILY_WORK,
    variant: 'green',
  },
] as const;

const adminItems = [
  { icon: Users, label: '관리', route: ROUTES.ADMIN.MANAGE, variant: 'blue' },
  {
    icon: Settings,
    label: '설정',
    route: ROUTES.ADMIN.SETTINGS,
    variant: 'green',
  },
  {
    icon: LineChart,
    label: '통계',
    route: ROUTES.ADMIN.STATISTICS,
    variant: 'blue',
  },
] as const;

interface Props {
  refetch: () => void;
}

const NavigationButtons = ({ refetch }: Props) => {
  const navigate = useNavigate();

  const handleAdminAction = async (route: string) => {
    const { status } = await authApi.checkAdminSession();
    if (status === 200) {
      navigate(route);
    }
  };

  return (
    <div
      className={`mb-8 w-full rounded-lg border-0 bg-white/90 p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all duration-500 sm:p-3`}
    >
      <div className='w-full'>
        <div className='flex items-center justify-between gap-6 sm:flex-col sm:gap-3'>
          <div className='flex flex-1 sm:mb-2 sm:w-full sm:gap-2'>
            {navItems.map(({ icon, label, route, variant }) => (
              <NavButton
                key={route}
                icon={icon}
                label={label}
                onClick={() => navigate(route)}
                variant={variant}
              />
            ))}
          </div>

          <div className='flex justify-end sm:w-full sm:gap-2'>
            {adminItems.map(({ icon, label, route, variant }) => (
              <NavButton
                key={route}
                icon={icon}
                label={label}
                onClick={() => handleAdminAction(route)}
                variant={variant}
              />
            ))}

            <button className='flex items-center'>
              <div className='mx-4 h-10 w-px bg-slate-200' />
              <RefreshCw
                onClick={refetch}
                className={`text-slate-600 transition-all duration-200 hover:text-slate-800 sm:h-4 sm:w-4 md:h-6 md:w-6  hover:opacity-80`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationButtons;
