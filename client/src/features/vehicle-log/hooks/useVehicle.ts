import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constant';
import {
  addVehicleLog,
  addVehicleMaintenance,
  addVehicleNotice,
  deleteVehicleLog,
  deleteVehicleMaintenance,
  deleteVehicleNotice,
  editVehicleLog,
  editVehicleMaintenance,
  getCarMaintenances,
  getCars,
  getNotification,
  getVehicleLogs,
} from '../api/vehicleLog';
import {
  type Maintenance,
  type Car,
  type VehicleLog,
  type VehicleLogForm,
  type MaintenanceBase,
} from '../types/vehicleLog';

export default function useVehicleLog(carId?: string, currentDate?: Date) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ['vehicleLog'] });

      navigate(ROUTES.VEHICLES.LIST, {
        state: { car: variables.car },
      });
    },
    onError: () => {
      toast.error('운행 등록에 실패했습니다.');
    },
  });

  const edit = useMutation({
    mutationFn: (form: VehicleLog) => editVehicleLog(form),
    onSuccess: () => {
      toast.success('운행이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['vehicleLog'] });
    },
    onError: () => {
      toast.error('운행 수정에 실패했습니다.');
    },
  });

  const deleteLog = useMutation({
    mutationFn: (id: string) => deleteVehicleLog(id),
    onSuccess: () => {
      toast.success('운행기록이 삭제 되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['vehicleLog'] });
    },
    onError: () => {
      toast.error('운행 기록 삭제에 실패했습니다.');
    },
  });

  const addNotice = useMutation({
    mutationFn: ({
      carId,
      notification,
    }: {
      carId: string;
      notification: string | undefined;
    }) => addVehicleNotice(carId, notification || ''),
    onSuccess: (_, { carId }) => {
      toast.success('공지사항이 등록 되었습니다.');

      queryClient.invalidateQueries({ queryKey: ['notification', carId] });
    },
    onError: () => {
      toast.error('공지사항 등록에 실패했습니다.');
    },
  });

  const deleteNotice = useMutation({
    mutationFn: (carId: string) => deleteVehicleNotice(carId),
    onSuccess: () => {
      toast.success('공지사항이 삭제 되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['notification', carId] });
    },
    onError: () => {
      toast.error('공지사항 삭제에 실패했습니다.');
    },
  });

  const maintenancesQuery = useQuery<Maintenance[]>({
    queryKey: ['maintenance', carId],
    queryFn: () => getCarMaintenances(carId || ''),
    enabled: !!carId,
  });

  const addMaintenance = useMutation({
    mutationFn: ({ carId, form }: { carId: string; form: MaintenanceBase }) =>
      addVehicleMaintenance(carId, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      toast.success('정비내역이 등록되었습니다.');
    },
    onError: () => toast.error('정비내역 등록에 실패했습니다.'),
  });

  const deleteMaintenance = useMutation({
    mutationFn: (carId: string) => deleteVehicleMaintenance(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      toast.success('정비내역이 삭제 되었습니다.');
    },
    onError: () => toast.error('정비내역 삭제에 실패했습니다.'),
  });

  const editMaintenance = useMutation({
    mutationFn: (form: MaintenanceBase) => editVehicleMaintenance(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      toast.success('정비내역이 수정 되었습니다.');
    },
    onError: () => toast.error('정비내역 수정에 실패했습니다.'),
  });

  return {
    carsQuery,
    vehicleLogsQuery,
    notificationQuery,
    add,
    edit,
    deleteLog,
    addNotice,
    deleteNotice,
    addMaintenance,
    maintenancesQuery,
    deleteMaintenance,
    editMaintenance,
  };
}
