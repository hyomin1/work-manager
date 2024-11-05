import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Paper, Table, TableContainer } from '@mui/material';

import { REFETCH_INTERVAL } from '../../constants/constant';
import { calDate, getEmployeeInform } from '../../api';

import { IInform } from '../../interfaces/interface';

import useEmployeeStore from '../../stores/employeeStore';

import ArrowBack from '../../components/common/ArrowBack';
import Title from '../../components/layout/Title';
import Logout from '../auth/Logout';

import EmployeeTableBody from './components/TableBody';
import EmployeeTableHead from './components/TableHead';
import DateInput from './components/DateInput';
import NavigationButtons from './components/NavigationButtons';

function EmployeePage() {
  const { setInform, currentDate } = useEmployeeStore();
  const [showInput, setShowInput] = useState(false);

  const { data, refetch } = useQuery<IInform[]>({
    queryKey: ['employeeInform'],
    queryFn: () => getEmployeeInform(currentDate),
    refetchInterval: REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (data) {
      setInform(data);
    }
  }, [data, setInform]);

  useEffect(() => {
    if (currentDate) {
      refetch();
    }
  }, [currentDate, refetch]);

  return (
    <div className="flex flex-col items-center w-full h-screen p-10 sm:p-2 bg-gradient-to-br from-zinc-50 to-slate-100">
      <div className="sm:w-full w-[90%] flex flex-col items-center h-full">
        <div className="flex items-center justify-between w-full mt-2 mb-8 sm:mt-4">
          <ArrowBack type="home" />
          <Title
            setShowInput={setShowInput}
            calDate={calDate}
            category="employee"
          />
          <Logout />
        </div>

        <DateInput showInput={showInput} onClose={() => setShowInput(false)} />

        <NavigationButtons refetch={refetch} />

        <TableContainer
          component={Paper}
          sx={{
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          }}
          className="shadow-custom-shadow"
        >
          <Table stickyHeader>
            <EmployeeTableHead />
            <EmployeeTableBody refetch={refetch} />
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EmployeePage;
