import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constant';
import NavButton from '../../../components/common/NavButton';
import { authApi } from '../../auth/api/auth';
import type { Cost, VehicleLog } from '../types/vehicleLog';
import { checkUserPermission } from '../utils/checkPermission';
import toast from 'react-hot-toast';
import { NAV_ITEMS } from '../constants/vehicleLog';

interface Props {
  vehicleLogs: VehicleLog[];
  currentDate: Date;
  car: string;
  carId: string;
  cost: Cost;
}

export default function NavigationButtons({
  car,
  carId,
  vehicleLogs,
  currentDate,
  cost,
}: Props) {
  const navigate = useNavigate();

  const onClickHandler = {
    user: (route?: string) => {
      if (!route) return;
      checkUserPermission(() => navigate(route));
    },
    excel: async () => {
      try {
        const module = await import('../utils/downloadExcel');
        const downloadExcel = module.default;
        downloadExcel(vehicleLogs || [], currentDate || null, car, cost);
      } catch {
        toast.error('엑셀 다운로드 중 오류 발생:');
      }
    },
    admin: async () => {
      const { status } = await authApi.checkAdminSession();
      if (status === 200) {
        navigate(ROUTES.ADMIN.SETTINGS);
      }
    },
  };

  return (
    <div
      className={`mb-8 w-full rounded-lg border-0 bg-white/90 p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all duration-500 sm:p-3`}
    >
      <div className='w-full'>
        <div className='flex items-center justify-between gap-6 sm:flex-col sm:gap-3'>
          <div className='flex flex-1 sm:mb-2 sm:w-full sm:gap-2'>
            {NAV_ITEMS.filter((item) => item.condition(carId)).map((item) => (
              <NavButton
                key={item.label}
                icon={item.icon}
                label={item.label}
                variant={item.variant}
                onClick={() => {
                  if (item.onClickType === 'excel') onClickHandler.excel();
                  else if (item.onClickType === 'admin') onClickHandler.admin();
                  else onClickHandler.user(item.route);
                }}
              />
            ))}
          </div>
        </div>

        <div className='flex items-center sm:hidden sm:w-full sm:justify-center'>
          <div className='mx-4 border border-gray-300 md:h-10' />
        </div>
      </div>
    </div>
  );
}
