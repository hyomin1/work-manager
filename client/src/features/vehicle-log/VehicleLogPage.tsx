import React, { useEffect, useState, useMemo } from 'react';
import { calYearMonth } from '../../api';
import Title from '../../components/layout/Title';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBack from '../../components/common/ArrowBack';
import Logout from '../auth/components/LogoutButton';
import { ROUTES } from '../../constants/constant';
import NavigationButtons from './components/NavigationButtons';
import DriveAlert from '../../pages/driving/components/DriveAlert';
import useVehicleLog from './hooks/useVehicleLog';
import useDateManager from '../../hooks/useDateManager';
import { calculateCost } from './utils/calculateCost';
import { checkUserPermission } from './utils/checkPermission';
import DateSelector from './components/DateSelector';
import SelectBox from './components/SelectBox';
import VehicleLogTable from './components/table/VehicleLogTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function DrivePage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [showInput, setShowInput] = useState(false);
  const [carId, setCarId] = useState('');

  const { currentDate, setCurrentDate } = useDateManager();

  const {
    carsQuery: { data: cars },
    vehicleLogsQuery: { data: vehicleLogs, isLoading },
    notificationQuery: { data: notification },
  } = useVehicleLog(carId, currentDate);

  const cost = calculateCost(vehicleLogs);

  useEffect(() => {
    if (state) {
      setCarId(state.car);
    }
  }, [state, setCarId]);

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

  const checkNotification = () => {
    checkUserPermission(navigate, ROUTES.VEHICLES.SERVICE, '권한이 없습니다.');
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
          <Logout />
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
          <div className='print-hidden border'>
            {carId.length > 0 && (
              <DriveAlert
                notification={notification?.notification || ''}
                onClick={checkNotification}
                type=''
              />
            )}
          </div>

          <VehicleLogTable vehicleLogs={vehicleLogs || []} cost={cost} />
        </div>
      </div>
    </div>
  );
}

export default DrivePage;
