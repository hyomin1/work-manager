import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constant';
import { addVehicleLog } from '../api/vehicleLog';
import type { VehicleLogForm } from '../types/vehicleLog';

export default function useVehicleLog() {
  const navigate = useNavigate();
  const add = useMutation({
    mutationFn: (form: VehicleLogForm & { username: string }) =>
      addVehicleLog(form),
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

  return { add };
}
