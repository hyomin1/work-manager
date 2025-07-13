import { Pencil, Settings, Sheet, Users, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constant';
import NavButton from '../../../components/common/NavButton';
import { authApi } from '../../auth/api/auth';
import type { Cost, VehicleLog } from '../types/vehicleLog';
import { checkUserPermission } from '../utils/checkPermission';
import toast from 'react-hot-toast';

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
  const onClickAdmin = async () => {
    const { status } = await authApi.checkAdminSession();
    if (status === 200) {
      navigate(ROUTES.ADMIN.SETTINGS);
    }
  };

  const checkUser = async () => {
    checkUserPermission(navigate, ROUTES.WORKS.LIST);
  };

  const checkCarService = () =>
    checkUserPermission(navigate, ROUTES.VEHICLES.SERVICE);

  const checkUserInput = async () => {
    checkUserPermission(navigate, ROUTES.VEHICLES.CREATE);
  };

  const handleExcelDownload = async () => {
    try {
      const module = await import('../utils/downloadExcel');
      const downloadExcel = module.default;

      downloadExcel(vehicleLogs || [], currentDate || null, car, cost);
    } catch {
      toast.error('엑셀 다운로드 중 오류 발생:');
    }
  };

  return (
    <div className='print-hidden mb-8 flex w-full items-center rounded-lg bg-white/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all duration-500 sm:h-auto sm:flex-col md:justify-between'>
      <div className='flex flex-1 items-center justify-between sm:w-full sm:flex-col sm:gap-2 sm:p-2 md:w-[50%] md:p-4'>
        <div className='flex w-full items-center justify-between sm:mb-2 sm:w-full sm:flex-col sm:gap-2'>
          <div className='flex sm:w-full'>
            <NavButton
              icon={Pencil}
              label='입력'
              onClick={checkUserInput}
              variant='blue'
            />
            <NavButton
              icon={Users}
              label='근무'
              onClick={checkUser}
              variant='green'
            />
          </div>
          <div className='flex sm:w-full'>
            {!!carId && (
              <NavButton
                icon={Sheet}
                label='엑셀'
                onClick={handleExcelDownload}
                variant='green'
              />
            )}
            <NavButton
              icon={Wrench}
              label='점검'
              onClick={checkCarService}
              variant='blue'
            />
            <NavButton
              icon={Settings}
              label='설정'
              onClick={onClickAdmin}
              variant='green'
            />
          </div>
        </div>

        <div className='flex items-center sm:hidden sm:w-full sm:justify-center'>
          <div className='mx-4 border border-gray-300 md:h-10' />
        </div>
      </div>
    </div>
  );
}
