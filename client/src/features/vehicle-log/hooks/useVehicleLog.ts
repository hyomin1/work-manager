import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constant';
import {
  addVehicleLog,
  getCars,
  getNotification,
  getVehicleLogs,
} from '../api/vehicleLog';
import type { Car, VehicleLog, VehicleLogForm } from '../types/vehicleLog';

export default function useVehicleLog(carId?: string, currentDate?: Date) {
  const navigate = useNavigate();

  // 전체 차량정보조회
  const carsQuery = useQuery<Car[]>({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  // 해당 차량 운행일지 조회
  const vehicleLogsQuery = useQuery<VehicleLog[]>({
    queryKey: ['vehicleLog', currentDate, carId],
    queryFn: () => {
      if (!carId || !currentDate) {
        throw new Error('carId와 currentDate가 모두 필요합니다.');
      }
      return getVehicleLogs(currentDate, carId);
    },
    enabled: !!carId && !!currentDate,
    refetchInterval: 300_000,
  });

  // 해당 차량 공지 사항 조회

  const notificationQuery = useQuery<Car>({
    queryKey: ['notification', carId],

    queryFn: () => {
      if (!carId) {
        throw new Error('carId와 currentDate가 모두 필요합니다.');
      }
      return getNotification(carId);
    },
    enabled: !!carId,
  });

  const add = useMutation({
    mutationFn: (form: VehicleLogForm) => addVehicleLog(form),
    onSuccess: (_, variables) => {
      toast.success('운행이 등록되었습니다.');
      navigate(ROUTES.VEHICLES.LIST, {
        state: { car: variables.car },
      });
    },
    onError: () => {
      toast.error('운행 등록에 실패했습니다.');
    },
  });

  return { carsQuery, vehicleLogsQuery, notificationQuery, add };
}
