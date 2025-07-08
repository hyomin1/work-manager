import { useEffect, useState } from 'react';
import StatisticsTab from './StatisticsTab';
import { IDestStat, INameStat } from '../../interfaces/interface';
import { useQuery } from '@tanstack/react-query';
import {
  calculateDate,
  checkAdminSession,
  getDestinationStatistics,
  getUserStatistics,
} from '../../api';
import ArrowBack from '../../components/common/ArrowBack';

import { Calendar } from 'lucide-react';
import Logout from '../../features/auth/components/LogoutButton';
import StatisticsTable from './StatisticsTable';

// 통계 페이지
function StatisticsPage() {
  // 0: 이름 검색, 1: 방문지 검색
  const [value, setValue] = useState(0);

  const [username, setUserName] = useState('');
  const [destination, setDestination] = useState('');
  // 시작일은 해당 날짜의 시작(00:00:00)으로, 종료일은 해당 날짜의 끝(23:59:59)으로 설정
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

  // 날짜 변경 핸들러도 같은 방식으로 처리

  const { data: statisticsNameData, refetch: nameRefetch } = useQuery<
    INameStat[]
  >({
    queryKey: ['statistics', username, startDate],
    queryFn: () => getUserStatistics(username, startDate, endDate), // startDate ~ endDate 범위의 데이터 get
    enabled: false,
  });

  const { data: statisticsDestinationData, refetch: destinationRefetch } =
    useQuery<IDestStat[]>({
      queryKey: ['statistics', destination],
      queryFn: () => getDestinationStatistics(destination, startDate, endDate),
      enabled: false,
    });

  useEffect(() => {
    checkAdminSession();
  }, []);

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
        setValue={setValue}
        username={username}
        setUserName={setUserName}
        destination={destination}
        setDestination={setDestination}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        nameRefetch={nameRefetch}
        destinationRefetch={destinationRefetch}
      />
      <div className='w-[90%]'>
        <StatisticsTable
          statisticsNameData={statisticsNameData || []}
          statisticsDestinationData={statisticsDestinationData || []}
          value={value}
        />
      </div>
    </div>
  );
}

export default StatisticsPage;
