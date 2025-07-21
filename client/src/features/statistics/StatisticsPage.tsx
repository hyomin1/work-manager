import React, { useEffect, useState } from 'react';
import StatisticsTab from './components/StatisticsTab';
import { calculateDate } from '../../api';
import ArrowBack from '../../components/common/ArrowBack';
import { Calendar } from 'lucide-react';
import Logout from '../auth/components/LogoutButton';
import StatisticsTable from './components/StatisticsTable';
import useStatistics from './hooks/useStatistics';
import toast from 'react-hot-toast';
import { authApi } from '../auth/api/auth';

export default function StatisticsPage() {
  // 0: 이름 검색, 1: 방문지 검색
  const [value, setValue] = useState(0);
  const [username, setUserName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });

  const { userStatistics, destinationStatistics } = useStatistics(
    username,
    destination,
    startDate,
    endDate
  );

  useEffect(() => {
    authApi.checkAdminSession();
  }, []);

  const handleChangeValue = (_: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const handleChange =
    (setter: (value: string) => void) =>
    (_: React.SyntheticEvent, value: string | null) => {
      if (value) setter(value);
    };

  const handleSearch = () => {
    if (value === 0) {
      if (!username) {
        toast.error('이름을 선택해주세요');
        return;
      }
    } else if (!destination) {
      toast.error('방문지를 선택해주세요');
      return;
    }
  };

  return (
    <div className='flex h-screen w-full flex-col items-center overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50 p-10 sm:p-2'>
      <div className='flex w-[90%] flex-col items-center sm:w-full'>
        <div className='mb-8 mt-2 flex w-full items-center justify-between sm:mt-4'>
          <ArrowBack type='not home' />
          <div className='flex items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 sm:px-6 sm:py-2 md:px-16 md:py-4'>
            <Calendar className='mr-2 h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700 sm:hidden' />
            <span className='whitespace-nowrap text-xl font-semibold text-gray-700 transition-colors sm:text-xs'>
              {calculateDate(new Date())}
            </span>
          </div>
          <Logout />
        </div>
      </div>

      <StatisticsTab
        value={value}
        onChangeValue={handleChangeValue}
        username={username}
        onChangeUsername={handleChange(setUserName)}
        onChangeDestination={handleChange(setDestination)}
        destination={destination}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onSearch={handleSearch}
      />
      <div className='w-[90%]'>
        <StatisticsTable
          userStatistics={userStatistics || []}
          destinationStatistics={destinationStatistics || []}
          value={value}
        />
      </div>
    </div>
  );
}
