import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { calYearMonth } from '../../api';
import { calculateCost } from './utils/calculateCost';

import useDateManager from '../../hooks/useDateManager';
import useVehicleLog from './hooks/useVehicle';

import Title from '../../components/layout/Title';
import ArrowBack from '../../components/common/ArrowBack';
import LogoutButton from '../auth/components/LogoutButton';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import NavigationButtons from './components/NavigationButtons';
import DateSelector from './components/DateSelector';
import SelectBox from './components/SelectBox';
import VehicleLogTable from './components/table/VehicleLogTable';
import { useVehicleLogStore } from './stores/useVehicleLogStore';
import VehicleLogEditModal from './components/VehicleLogEditModal';
import DeleteBox from '../../components/common/DeleteBox';
import VehicleNoticeBanner from './components/notice/VehicleNoticeBanner';
import VehicleNoticeFormModal from './components/notice/VehicleNoticeFormModal';

function DrivePage() {
  const { state } = useLocation();

  const [showInput, setShowInput] = useState(false);
  const [carId, setCarId] = useState('');
  const editId = useVehicleLogStore((state) => state.editId);

  const deleteId = useVehicleLogStore((state) => state.deleteId);
  const setDeleteId = useVehicleLogStore((state) => state.setDeleteId);

  const { currentDate, setCurrentDate } = useDateManager();
  const {
    carsQuery: { data: cars },
    vehicleLogsQuery: { data: vehicleLogs, isLoading },
    notificationQuery: { data: notification },
    deleteLog,
  } = useVehicleLog(carId, currentDate);

  const cost = calculateCost(vehicleLogs);

  const editVehicleLog = vehicleLogs?.find((log) => log._id === editId);

  useEffect(() => {
    if (state) {
      setCarId(state.car);
    }
  }, [state]);

  const selectedCar = useMemo(() => {
    return cars?.find((car) => car._id === carId);
  }, [cars, carId]);
  const car = selectedCar?.car || '';

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const [year, month] = value.split('-');
    if (year && month) {
      const formattedMonth = month.padStart(2, '0');
      setCurrentDate(new Date(`${year}-${formattedMonth}-01`));
    }
  };

  const handleDelete = () => {
    deleteLog.mutate(deleteId, {
      onSuccess: () => setDeleteId(''),
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-between bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-2'>
      <div className='flex w-[90%] flex-col items-center sm:w-full'>
        <div className='mb-4 mt-4 flex w-full items-center justify-between sm:mt-4 print:justify-center'>
          <ArrowBack type='home' />
          <Title
            currentDate={currentDate || new Date()}
            setCurrentDate={setCurrentDate}
            setShowInput={setShowInput}
            calYearMonth={calYearMonth}
            category='driving'
          />
          <LogoutButton />
        </div>

        <div className='mb-2 flex w-full items-center justify-between'>
          {showInput && (
            <DateSelector
              onChange={handleDateChange}
              onBlur={() => setShowInput}
            />
          )}
        </div>
        <div className='h-full w-full'>
          {cars && (
            <SelectBox
              carId={carId}
              cars={cars}
              onChange={(e) => setCarId(e.target.value)}
            />
          )}

          <NavigationButtons
            vehicleLogs={vehicleLogs || []}
            car={car}
            carId={carId}
            currentDate={currentDate || new Date()}
            cost={cost}
          />

          {!!carId && (
            <VehicleNoticeBanner
              notification={notification?.notification || ''}
            />
          )}

          <VehicleLogTable vehicleLogs={vehicleLogs || []} cost={cost} />
        </div>
      </div>
      {editVehicleLog && (
        <VehicleLogEditModal editVehicleLog={editVehicleLog} />
      )}
      <DeleteBox
        open={!!deleteId}
        onClose={() => setDeleteId('')}
        onDelete={handleDelete}
      />
      <VehicleNoticeFormModal
        carId={carId}
        notification={notification?.notification}
      />
    </div>
  );
}

export default DrivePage;
