import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import StatisticsTab from './StatisticsTab';
import { IDestStat, INameStat } from '../../interfaces/interface';
import { useQuery } from '@tanstack/react-query';
import {
  calDate,
  calStatDay,
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
  const [date, setDate] = useState(new Date());

  const { data: statisticsNameData, refetch: nameRefetch } = useQuery<
    INameStat[]
  >({
    queryKey: ['statistics', username, date],
    queryFn: () => getUserStatistics(username, date),
    enabled: false,
  });

  const { data: statisticsDestinationData, refetch: destinationRefetch } =
    useQuery<IDestStat[]>({
      queryKey: ['statistics', destination],
      queryFn: () => getDestinationStatistics(destination),
      enabled: false,
    });

  console.log(statisticsDestinationData);

  return (
    <div className="flex flex-col items-center w-full h-screen p-10 sm:p-2 bg-gray-50 ">
      <div className="flex flex-col items-center w-full sm:w-full">
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
        date={date}
        setDate={setDate}
        nameRefetch={nameRefetch}
        destinationRefetch={destinationRefetch}
      />

      <TableContainer component={Paper} className="shadow-lg rounded-xl">
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
                      py: 3,
                      '&:first-of-type': {
                        paddingLeft: 4,
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
                ?.sort((a, b) => a.destination.localeCompare(b.destination))
                .map((item, index) => (
                  <TableRow
                    key={index}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <TableCell
                      className="whitespace-nowrap"
                      sx={{
                        paddingLeft: 4,
                        color: 'text.primary',
                        fontSize: '0.875rem',
                      }}
                    >
                      {item.username}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>
                      {item.destination}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>
                      {item.business}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>
                      {item.work}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>
                      {item.car}
                    </TableCell>
                  </TableRow>
                ))}
            {value === 1 &&
              statisticsDestinationData
                ?.sort((a, b) => {
                  const dateA = extractMonthAndDay(a.startDate);
                  const dateB = extractMonthAndDay(b.startDate);
                  // 1. month와 day를 먼저 비교
                  if (dateA.month !== dateB.month) {
                    return dateA.month - dateB.month; // month가 다르면 month로 정렬
                  }
                  if (dateA.day !== dateB.day) {
                    return dateA.day - dateB.day; // day가 다르면 day로 정렬
                  }
                  // 2. month와 day가 같으면 이름으로 정렬
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
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StatisticsMain;
