import React, { useEffect, useState } from 'react';
import { REFETCH_INTERVAL } from '../../constants/constant';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { calDate, checkAdminSession, getEmployeeInform } from '../../api';
import { SlRefresh } from 'react-icons/sl';
import Title from '../../components/Title';
import ArrowBack from '../../components/ArrowBack';
import { Settings, Pencil, Truck, LineChart, Calendar } from 'lucide-react';
import Logout from '../auth/Logout';
import { Paper, Table, TableContainer } from '@mui/material';
import { ROUTES } from '../../constants/constant';
import { IInform } from '../../interfaces/interface';
import EmployeeTableBody from './EmployeeTableBody';
import EmployeeTableHead from './EmployeeTableHead';

function Main() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showInput, setShowInput] = useState(false);

  const { data: inform, refetch } = useQuery<IInform[]>({
    queryKey: ['employeeInform'],
    queryFn: () => getEmployeeInform(currentDate),
    refetchInterval: REFETCH_INTERVAL,
  });

  useEffect(() => {
    refetch();
  }, [currentDate, refetch]);

  const navigate = useNavigate();

  const onClickAdmin = async () => {
    const status = await checkAdminSession();
    if (status === 200) {
      navigate(ROUTES.ADMIN);
    }
  };

  const onClickStatistics = async () => {
    const status = await checkAdminSession();
    if (status === 200) {
      navigate(ROUTES.STATISTICS);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(new Date(e.target.value));
    setShowInput(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-10 sm:p-2 bg-gradient-to-br from-zinc-50 to-slate-100">
      <div className="sm:w-full w-[90%] flex flex-col items-center h-full">
        <div className="flex items-center justify-between w-full mt-2 mb-8 sm:mt-4">
          <ArrowBack type="home" />

          <Title
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            setShowInput={setShowInput}
            calDate={calDate}
            category="employee"
          />
          <Logout />
        </div>

        {showInput && (
          <div className="w-[21%] sm:w-[40%] flex justify-center">
            <input
              type="date"
              value={currentDate.toISOString().split('T')[0] || ''}
              className="sm:w-full w-[60%] my-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              onChange={handleDateChange}
            />
          </div>
        )}

        <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl bg-[#f8fafd]">
          <div className="flex items-center justify-between w-full md:p-4 sm:p-2">
            <div className="flex sm:flex-col">
              <button
                onClick={() => navigate(ROUTES.DRIVING_STATUS)}
                className="whitespace-nowrap bg-[#0EA5E9] rounded-lg
                 text-white md:py-2 sm:py-1 sm:text-sm px-4 hover:opacity-60 md:mr-4
                  sm:mr-2 button-effect flex justify-center items-center sm:mb-1"
              >
                <Truck className="sm:w-4 sm:h-4" />
                <span className="ml-1 sm:text-xs">차량</span>
              </button>
              <button
                className="whitespace-nowrap bg-[#10B981] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm sm:mb-1 px-4 button-effect mr-4 sm:mr-2 flex justify-center items-center"
                onClick={() => navigate(ROUTES.EMPLOYEE_INPUT)}
              >
                <Pencil className="sm:w-4 sm:h-4" />
                <span className="ml-1 sm:text-xs">입력</span>
              </button>
              <button
                className="whitespace-nowrap bg-[#0EA5E9] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 button-effect mr-4 sm:mr-2 flex justify-center items-center"
                onClick={() => navigate(ROUTES.SCHEDULE)}
              >
                <Calendar className="sm:w-4 sm:h-4" />
                <span className="ml-1 sm:text-xs">일정</span>
              </button>
            </div>

            <div className="flex sm:flex-col">
              <button
                className="whitespace-nowrap bg-[#0EA5E9] rounded-lg text-white md:py-2 sm:py-1 sm:mb-1 sm:text-sm px-4 hover:opacity-60 mr-4 sm:mr-2 button-effect flex justify-center items-center"
                onClick={onClickAdmin}
              >
                <Settings className="sm:w-4 sm:h-4" />
                <span className="ml-1 sm:text-xs">관리</span>
              </button>
              <button
                className="whitespace-nowrap bg-[#10B981] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 sm:mb-1 mr-4 sm:mr-2 button-effect  flex justify-center items-center"
                onClick={onClickStatistics}
              >
                <LineChart className="sm:w-4 sm:h-4" />
                <span className="ml-1 sm:text-xs">통계</span>
              </button>
              <div className="mx-4 border border-gray-300 md:h-10 sm:h-8 sm:hidden" />
              <button
                onClick={() => refetch()}
                className="sm:flex sm:justify-center"
              >
                <SlRefresh className="md:w-7 md:h-7 sm:w-6 sm:h-6 hover:opacity-60" />
              </button>
            </div>
          </div>
        </div>

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
            <EmployeeTableBody
              inform={inform || []}
              currentDate={currentDate}
              refetch={refetch}
            />
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Main;
