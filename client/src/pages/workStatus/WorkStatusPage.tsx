import React, { useEffect, useState } from 'react';
import { Paper, Table, TableContainer } from '@mui/material';
import { calculateDate } from '../../api';
import ArrowBack from '../../components/common/ArrowBack';
import Title from '../../components/layout/Title';
import Logout from '../../features/auth/components/Logout';
import EmployeeTableBody from './components/TableBody';
import EmployeeTableHeader from './components/TableHeader';
import DateInput from './components/DateInput';
import NavigationButtons from './components/NavigationButtons';
import useWorks from '../../hooks/useWorks';

function EmployeePage() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());

  const {
    worksQuery: { data, refetch },
  } = useWorks(currentDate || new Date());

  useEffect(() => {
    if (currentDate) {
      refetch();
    }
  }, [currentDate, refetch]);

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timeoutId = setTimeout(() => {
      setCurrentDate(new Date());
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, [currentDate]);

  return (
    <div className='flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50 p-10 sm:p-4'>
      <div className='flex w-[90%] flex-col items-center sm:w-full'>
        <div className='relative mb-8 flex w-full items-center justify-between sm:mb-6'>
          <ArrowBack type='home' />
          <Title
            setShowInput={setIsDatePickerOpen}
            calDate={calculateDate}
            category='employee'
            currentDate={currentDate || new Date()}
            setCurrentDate={setCurrentDate}
          />
          <Logout />
        </div>

        <DateInput
          isDatePickerOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          currentDate={currentDate || new Date()}
          setCurrentDate={setCurrentDate}
        />

        <NavigationButtons refetch={refetch} />

        <TableContainer
          component={Paper}
          sx={{
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          }}
          className='shadow-custom-shadow'
        >
          <Table>
            <EmployeeTableHeader />
            <EmployeeTableBody works={data || []} />
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EmployeePage;
