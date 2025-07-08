import React, { useEffect, useState } from 'react';
import {
  calMonth,
  calYear,
  calYearMonth,
  checkCarSession,
  getCars,
  getDrivingInform,
  getNotification,
} from '../../api';
import { useQuery } from '@tanstack/react-query';
import type { ICars, IDrivingInform } from '../../interfaces/interface';
import Title from '../../components/layout/Title';
import { useLocation, useNavigate } from 'react-router-dom';
import Page from '../../components/common/Page';
import { useMediaQuery } from 'react-responsive';
import ArrowBack from './../../components/common/ArrowBack';
import Logout from '../../features/auth/components/Logout';
import DriveMobile from './DriveMobile';
import DrivePC from './DriveDesktop';
import { ROUTES } from '../../constants/constant';
import useDrivingStore from '../../stores/drivingStore';
import NavigationButtons from './components/NavigationButtons';
import DriveAlert from './components/DriveAlert';

function DrivePage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 540px)' });
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [car, setCar] = useState('');
  const { carId, setCarId } = useDrivingStore();

  const { data: drivingInform, refetch } = useQuery<IDrivingInform[]>({
    queryKey: ['drivingInform'],
    queryFn: () =>
      getDrivingInform(
        calYear(currentDate || new Date()),
        calMonth(currentDate || new Date()),
        carId
      ),
    refetchInterval: 300_000,
    enabled: carId.length > 0,
  });

  const { data: notification } = useQuery<ICars>({
    queryKey: ['notification', carId],
    queryFn: () => getNotification(carId),
    enabled: carId.length > 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 10 : 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = drivingInform
    ? Math.ceil(drivingInform.length / itemsPerPage)
    : 0;

  // const checkSession = async () => {
  //   const response = await axiosReq.get("/auth/checkSession");
  // };

  useEffect(() => {
    refetch();
  }, [carId, refetch, currentDate]);

  // useEffect(() => {
  //   checkSession();
  // }, []);

  useEffect(() => {
    if (location.state) {
      setCarId(location.state.car);
    }
  }, [location, setCarId]);

  const [showInput, setShowInput] = useState(false);

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ['car', 1],
    queryFn: getCars,
  });

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const selectedCar = cars?.find((car) => car._id === carId);

    if (selectedCar) {
      setCar(selectedCar.car);
    }
  }, [cars, carId]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const [year, month] = inputValue.split('-');
    if (month && year) {
      const formattedMonth = month.padStart(2, '0');
      setCurrentDate(new Date(`${year}-${formattedMonth}-01`));
    }

    setCurrentPage(1);
  };

  const checkNotification = async () => {
    const response = await checkCarSession();
    if (response.isUser) {
      navigate(ROUTES.VEHICLES.SERVICE, {
        state: {
          car: carId,
        },
      });
      return;
    }
    alert('권한이 없습니다.');
  };

  const totalFuelCost =
    drivingInform?.reduce((acc, item) => acc + item.fuelCost, 0) || 0;
  const totalToll =
    drivingInform?.reduce((acc, item) => acc + item.toll, 0) || 0;
  const totalEtcCost =
    drivingInform?.reduce((acc, item) => acc + item.etc.cost, 0) || 0;
  const totalDrivingKM =
    drivingInform?.reduce((acc, item) => acc + item.totalKM, 0) || 0;
  const grandTotal = totalFuelCost + totalToll + totalEtcCost;

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
            <div className='flex w-full justify-center hover:opacity-60'>
              <input
                type='month'
                onChange={handleDateChange}
                onBlur={() => setShowInput(false)}
                className='my-4 w-[33%] rounded-lg border border-gray-300 p-2 shadow-sm transition duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-[70%]'
              />
            </div>
          )}
        </div>
        <div className='h-full w-full'>
          <div className='mb-4 hidden w-full font-bold print:flex'>
            <span>{car}</span>
          </div>

          <NavigationButtons
            refetch={refetch}
            drivingInform={drivingInform || []}
            setCar={setCar}
            cars={cars || []}
            car={car}
            setCurrentPage={setCurrentPage}
            currentDate={currentDate || new Date()}
            totalFuelCost={totalFuelCost}
            totalToll={totalToll}
            totalEtcCost={totalEtcCost}
            totalDrivingKM={totalDrivingKM}
            grandTotal={grandTotal}
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

          {isMobile ? (
            <div className='overflow-y-auto sm:h-[60%]'>
              <DriveMobile
                drivingInform={drivingInform || []}
                grandTotal={grandTotal}
                totalDrivingKM={totalDrivingKM}
                totalEtcCost={totalEtcCost}
                totalFuelCost={totalFuelCost}
                totalToll={totalToll}
                indexOfFirstItem={indexOfFirstItem}
                indexOfLastItem={indexOfLastItem}
              />
            </div>
          ) : (
            <div className='h-[75%] overflow-y-auto'>
              <DrivePC
                drivingInform={drivingInform || []}
                totalDrivingKM={totalDrivingKM}
                totalEtcCost={totalEtcCost}
                totalFuelCost={totalFuelCost}
                totalToll={totalToll}
                grandTotal={grandTotal}
                indexOfFirstItem={indexOfFirstItem}
                indexOfLastItem={indexOfLastItem}
                refetch={refetch}
              />
            </div>
          )}
        </div>
      </div>
      {isMobile && (
        <Page
          totalPage={totalPages}
          page={currentPage}
          onPageChange={handleClick}
        />
      )}
    </div>
  );
}

export default DrivePage;
