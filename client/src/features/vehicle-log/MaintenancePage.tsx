import ArrowBack from '../../components/common/ArrowBack';
import { calculateDate } from '../../api';
import { Calendar } from 'lucide-react';
import LogoutButton from '../auth/components/LogoutButton';
import VehicleNoticeFormModal from './components/notice/VehicleNoticeFormModal';
import { useSearchParams } from 'react-router-dom';
import useVehicleLog from './hooks/useVehicle';
import VehicleNoticeBanner from './components/notice/VehicleNoticeBanner';
import useDateManager from '../../hooks/useDateManager';
import SelectBox from './components/SelectBox';
import { Button, type SelectChangeEvent } from '@mui/material';
import MaintenanceTable from './components/maintenance/MaintenanceTable';
import { useState } from 'react';
import MaintenanceAddForm from './components/maintenance/MaintenanceAddForm';
import MaintenanceEditForm from './components/maintenance/MaintenanceEditForm';

export default function MaintenancePage() {
  const { currentDate } = useDateManager();
  const [searchParams, setSearchParams] = useSearchParams();
  const carId = searchParams.get('carId') || '';
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState('');

  const handleCarChange = (e: SelectChangeEvent) => {
    const newCarId = e.target.value;
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('carId', newCarId);
    setSearchParams(updatedParams, { replace: true });
  };

  const {
    carsQuery: { data: cars },
    notificationQuery: { data: notification },
    maintenancesQuery: { data: maintenances },
  } = useVehicleLog(carId || '');

  const editItem = maintenances?.find(
    (maintenance) => maintenance._id === editId
  );

  return (
    <div className='flex h-screen w-full flex-col items-center justify-between bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-2'>
      <div className='flex w-[90%] flex-col items-center sm:w-full'>
        <div className='mb-4 mt-4 flex w-full items-center justify-between sm:mt-4 print:justify-center'>
          <ArrowBack type='not home' />
          <div className='flex items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 sm:px-6 sm:py-2 md:px-16 md:py-4'>
            <Calendar className='mr-2 h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700 sm:hidden' />
            <span className='whitespace-nowrap text-xl font-semibold text-gray-700 transition-colors sm:text-xs'>
              {calculateDate(currentDate)}
            </span>
          </div>
          <LogoutButton />
        </div>
      </div>
      {cars && (
        <>
          <SelectBox
            carId={carId || ''}
            cars={cars}
            onChange={handleCarChange}
          />
          <Button onClick={() => setModalOpen(true)}>등록</Button>
        </>
      )}
      {carId && notification && (
        <>
          <VehicleNoticeBanner notification={notification.notification} />
          <VehicleNoticeFormModal
            carId={carId}
            notification={notification.notification}
          />
        </>
      )}
      <MaintenanceTable services={maintenances || []} setEditId={setEditId} />

      {modalOpen && (
        <MaintenanceAddForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          carId={carId}
        />
      )}

      {editItem && (
        <MaintenanceEditForm item={editItem} setEditId={setEditId} />
      )}
    </div>
  );
}
