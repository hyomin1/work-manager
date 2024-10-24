import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import StatisticsTab from './StatisticsTab';
import { IDestStat, INameStat } from '../../interfaces/interface';
import { useQuery } from '@tanstack/react-query';
import {
  calDate,
  calStatDay,
  checkAdminSession,
  extractMonthAndDay,
  getDestinationStatistics,
  getUserStatistics,
} from '../../api';
import ArrowBack from '../../components/ArrowBack';
import Blank from '../../components/Blank';
import {
  statisticsDestinationHeader,
  statisticsNameHeader,
} from '../../constants/headers';

function StatisticsMain() {
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
    <div className="flex flex-col items-center w-full h-screen p-10 sm:p-2 bg-gray-50 ">
      <div className="flex flex-col items-center w-[85%] sm:w-full">
        <div className="flex items-center justify-between w-full mt-2 mb-8 sm:mt-4">
          <ArrowBack type="not home" />
          <span className="font-bold sm:text-sm md:text-3xl md:mx-8 sm:mx-1 whitespace-nowrap">
            {calDate(new Date())}
          </span>
          <Blank />
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

      <TableContainer
        sx={{ width: '85%', marginTop: 4 }}
        component={Paper}
        className="shadow-lg rounded-xl"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow className="bg-blue-50">
              {value === 0 &&
                statisticsNameData &&
                statisticsNameData.length > 0 &&
                statisticsNameHeader.map((item, index) => (
                  <TableCell
                    key={index}
                    className="font-semibold text-gray-700 bg-blue-50"
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      py: 2,
                      '&:first-of-type': {
                        paddingLeft: 2,
                      },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              {value === 1 &&
                statisticsDestinationData &&
                statisticsDestinationData.length > 0 &&
                statisticsDestinationHeader.map((item, index) => (
                  <TableCell key={index}>{item}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {value === 0 &&
              statisticsNameData
                ?.sort((a, b) => {
                  const dateA = extractMonthAndDay(a.specificDate);
                  const dateB = extractMonthAndDay(b.specificDate);

                  if (dateA.month !== dateB.month) {
                    return dateA.month - dateB.month;
                  }
                  if (dateA.day !== dateB.day) {
                    return dateA.day - dateB.day;
                  }

                  return a.destination.localeCompare(b.destination);
                })
                ?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{calStatDay(item.specificDate)}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.destination}</TableCell>
                    <TableCell>{item.business}</TableCell>
                    <TableCell>{item.work}</TableCell>
                    <TableCell>{item.car}</TableCell>
                  </TableRow>
                ))}
            {value === 1 &&
              statisticsDestinationData
                ?.sort((a, b) => {
                  const dateA = extractMonthAndDay(a.startDate);
                  const dateB = extractMonthAndDay(b.startDate);

                  if (dateA.month !== dateB.month) {
                    return dateA.month - dateB.month;
                  }
                  if (dateA.day !== dateB.day) {
                    return dateA.day - dateB.day;
                  }

                  return a.username.localeCompare(b.username);
                })
                ?.map((item, index) => (
                  <TableRow
                    key={index}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <TableCell>{calStatDay(item.startDate)}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.destination}</TableCell>
                    <TableCell>{item.business}</TableCell>
                    <TableCell>{item.work}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StatisticsMain;
