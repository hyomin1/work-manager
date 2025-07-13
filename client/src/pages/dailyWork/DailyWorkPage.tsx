import { useEffect, useState } from 'react';
import ArrowBack from '../../components/common/ArrowBack';
import Title from '../../components/layout/Title';
import Logout from '../../features/auth/components/LogoutButton';
import { calculateDate, getDailyWorks } from '../../api';
import DateInput from '../../features/work-status/components/DateSelector';
import NavigationButtons from './components/NavigationButtons';
import { useQuery } from '@tanstack/react-query';
import { REFETCH_INTERVAL } from '../../constants/constant';
import type { IDailyWork } from '../../interfaces/interface';
import { Paper, Table, TableContainer } from '@mui/material';
import TableHeader from './components/TableHeader';
import useEmployeeStore from '../../stores/employeeStore';
import TableContent from './components/TableContent';
import DailyWorkForm from './DailyWorkForm';
function DailyWorkPage() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { setDailyWork } = useEmployeeStore();
  const { data, refetch } = useQuery<IDailyWork[]>({
    queryKey: ['dailyWork'],
    queryFn: () => getDailyWorks(currentDate || new Date()),
    refetchInterval: REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (data) {
      setDailyWork(data);
    }
  }, [data, setDailyWork]);

  useEffect(() => {
    if (currentDate) {
      refetch();
    }
  }, [currentDate, refetch]);

  return (
    <div className='flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50 p-10 sm:p-2'>
      <div className='flex w-[90%] flex-col items-center sm:w-full'>
        <div className='mb-8 mt-2 flex w-full items-center justify-between sm:mt-4'>
          <ArrowBack type='not home' />
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

        <NavigationButtons refetch={refetch} setIsOpen={setIsOpen} />

        {isOpen && (
          <DailyWorkForm
            setIsOpen={setIsOpen}
            currentDate={currentDate}
            refetch={refetch}
          />
        )}

        <TableContainer
          component={Paper}
          sx={{
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          }}
          className='shadow-custom-shadow'
        >
          <Table>
            <TableHeader />
            <TableContent
              refetch={refetch}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              currentDate={currentDate}
            />
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default DailyWorkPage;
