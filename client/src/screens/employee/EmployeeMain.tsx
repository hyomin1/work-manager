import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  axiosReq,
  calDate,
  checkAdminSession,
  getEmployeeInform,
} from '../../api';
import { SlRefresh } from 'react-icons/sl';
import TabHeader from '../../components/TabHeader';
import Page from '../../components/Page';
import { employeeHeaders } from '../../constants/headers';
import Title from '../../components/Title';
import ArrowBack from '../../components/ArrowBack';
import { Edit, X, Settings, Pencil, Truck, LineChart } from 'lucide-react';
import Logout from '../auth/Logout';
import EditInform from './EditEmployeeInform';
import { IInform } from '../../interfaces/interface';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function Main() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: inform, refetch } = useQuery<IInform[]>({
    queryKey: ['employeeInform'],
    queryFn: () => getEmployeeInform(currentDate),
    refetchInterval: 300_000, // 5분마다 refetch
  });

  const [showInput, setShowInput] = useState(false);
  const [editingItemId, setEditingItemId] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  //const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const totalPages = inform ? Math.ceil(inform.length / itemsPerPage) : 0;

  const navigate = useNavigate();

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const onClickInputInform = () => {
    navigate('/employee-input');
  };

  const onClickAdmin = async () => {
    const status = await checkAdminSession();
    if (status === 200) {
      navigate('/admin');
    }
  };

  const onClickStatistics = async () => {
    const status = await checkAdminSession();
    if (status === 200) {
      navigate('/statistics');
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(new Date(e.target.value));
    setShowInput(false);
    setCurrentPage(1);
  };

  const editInform = async (id: string) => {
    setEditingItemId(id);
  };

  const deleteInform = async (id: string) => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      const res = await axiosReq.delete(
        `/api/employee-inform/removeInform/${id}`
      );
      if (res.status === 200) {
        alert(res.data.message);
        refetch();
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [currentDate, refetch]);

  return (
    <div className="flex flex-col items-center w-full h-screen p-10 sm:p-2 bg-gray-50 ">
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

        <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl">
          <span className="ml-4 font-bold md:text-xl">목록</span>
          <div className="p-4 items-center flex w-[50%] justify-end">
            <button
              onClick={() => navigate('/driving-status')}
              className="whitespace-nowrap bg-[#007BFF] rounded-lg text-white py-2  sm:text-sm px-4 hover:opacity-60 mr-4 sm:mr-2 button-effect flex justify-center items-center"
            >
              <Truck className="sm:w-4 sm:h-4" />
              <span className="ml-1 sm:text-xs">차량</span>
            </button>
            <button
              className="whitespace-nowrap bg-[#00ab39] rounded-lg text-white py-2 sm:text-sm px-4 button-effect mr-4 sm:mr-2 flex justify-center items-center"
              onClick={onClickInputInform}
            >
              <Pencil className="sm:w-4 sm:h-4" />
              <span className="ml-1 sm:text-xs">입력</span>
            </button>
            <button
              className="whitespace-nowrap bg-[#007BFF] rounded-lg text-white py-2 sm:text-sm px-4 hover:opacity-60 mr-4 button-effect flex justify-center items-center"
              onClick={onClickAdmin}
            >
              <Settings className="sm:w-4 sm:h-4" />
              <span className="ml-1 sm:text-xs">관리</span>
            </button>
            <button
              className="whitespace-nowrap bg-[#00ab39] rounded-lg text-white py-2 sm:text-sm px-4 button-effect  flex justify-center items-center"
              onClick={onClickStatistics}
            >
              <LineChart className="sm:w-4 sm:h-4" />
              <span className="ml-1 sm:text-xs">통계</span>
            </button>
            <div className="mx-4 border border-gray-300 md:h-10 sm:h-8" />
            <button onClick={() => refetch()}>
              <SlRefresh className="md:w-7 md:h-7 sm:w-5 sm:h-5 hover:opacity-60" />
            </button>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell
                  sx={{
                    fontWeight: '800',
                    whiteSpace: 'nowrap',
                    fontSize: 'large',
                  }}
                >
                  이름
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: '800',
                    whiteSpace: 'nowrap',
                    fontSize: 'large',
                  }}
                >
                  방문지
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: '800',
                    whiteSpace: 'nowrap',
                    fontSize: 'large',
                  }}
                >
                  사업명
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: '800',
                    whiteSpace: 'nowrap',
                    fontSize: 'large',
                  }}
                >
                  업무
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: '800',
                    whiteSpace: 'nowrap',
                    fontSize: 'large',
                  }}
                >
                  차량
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {inform
                ?.sort((a, b) => {
                  if (a.destination === b.destination) {
                    return a.username.localeCompare(b.username);
                  }
                  return a.destination.localeCompare(b.destination);
                })
                .map((item, index) => (
                  <TableRow
                    key={index}
                    className={`sm:text-sm w-[100%] ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                    }`}
                  >
                    <TableCell
                      sx={{ fontSize: 'medium', whiteSpace: 'nowrap' }}
                    >
                      {item.username}
                    </TableCell>
                    <TableCell sx={{ fontSize: 'medium' }}>
                      {item.destination}
                    </TableCell>
                    <TableCell sx={{ fontSize: 'medium' }}>
                      {item.business}
                    </TableCell>
                    <TableCell sx={{ fontSize: 'medium' }}>
                      {item.work}
                    </TableCell>
                    <TableCell sx={{ fontSize: 'medium' }}>
                      {item.car}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Edit
                          className="hover:opacity-60"
                          onClick={() => editInform(item._id)}
                        />
                        <X
                          className="hover:opacity-60"
                          onClick={() => deleteInform(item._id)}
                        />
                        {editingItemId === item._id && (
                          <EditInform
                            item={item}
                            setEditingItemId={setEditingItemId}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              {inform && inform.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400">
                    등록된 정보가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Main;
