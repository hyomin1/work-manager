import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';
import { carServiceHeader } from '../../../constants/headers';
import { api, serviceDay } from '../../../api';
import { Edit, Trash2 } from 'lucide-react';
import ServiceEdit from './ServiceEdit';
import { useState } from 'react';
import type { ICarService } from '../../../interfaces/interface';

interface ITableBody {
  services: ICarService[];
  refetch: () => void;
}

const tableStyles = {
  tableContainer: {
    boxShadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    overflow: 'auto', // overflow: hidden에서 auto로 변경
    minWidth: '100%', // 최소 너비 설정
    maxHeight: 'calc(100vh - 300px)', // 최대 높이 설정
  },
  headerCell: {
    backgroundColor: '#f8fafc',
    color: '#475569',
    fontSize: '0.875rem',
    fontWeight: '600',
    padding: '16px',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #e2e8f0',
    minWidth: '100px', // 최소 너비 설정
    '&:first-of-type': {
      // 첫 번째 셀
      minWidth: '120px',
    },
    '&:last-child': {
      // 마지막 셀 (버튼 영역)
      minWidth: '160px',
    },
  },
  cell: {
    fontSize: '0.875rem',
    color: '#334155',
    padding: '16px',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #f1f5f9',
    minWidth: '100px', // 최소 너비 설정
    '&:first-of-type': {
      // 첫 번째 셀
      minWidth: '120px',
    },
    '&:last-child': {
      // 마지막 셀 (버튼 영역)
      minWidth: '160px',
    },
  },
  warningCell: {
    fontSize: '0.875rem',
    color: '#ef4444',
    fontWeight: '600',
    padding: '16px',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #f1f5f9',
    minWidth: '100px', // 최소 너비 설정
  },
};

function ServiceTable({ services, refetch }: ITableBody) {
  const [editingItemId, setEditingItemId] = useState('');

  const recentByType = services.reduce((acc, service) => {
    const { type, date } = service;
    if (
      !acc[type] ||
      new Date(date).getTime() > new Date(acc[type].date).getTime()
    ) {
      acc[type] = service;
    }
    return acc;
  }, {} as Record<string, ICarService>);

  const deleteService = async (id: string) => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      const res = await api.delete(`/api/driving-inform/removeService/${id}`);
      if (res.status === 200) {
        refetch();
      }
    }
  };

  return (
    <div className='rounded-2xl bg-white p-4 sm:p-6'>
      <div className='mb-4 flex items-center justify-between sm:mb-6'>
        <div className='flex items-center space-x-2'>
          <h2 className='text-lg font-bold text-gray-800'>정비 이력</h2>
          <div className='flex items-center space-x-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600'>
            <span>총 {services.length}건</span>
          </div>
        </div>
      </div>

      <div className='overflow-auto rounded-2xl border-gray-100'>
        <TableContainer sx={tableStyles.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {carServiceHeader.map((item, index) => (
                  <TableCell
                    align='center'
                    key={index}
                    sx={tableStyles.headerCell}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {services
                ?.sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' sx={tableStyles.cell}>
                      {serviceDay(item.date)}
                    </TableCell>
                    <TableCell align='center' sx={tableStyles.cell}>
                      {item.type}
                    </TableCell>
                    <TableCell align='center' sx={tableStyles.cell}>
                      {Number(item.mileage.base).toLocaleString()}km
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={
                        recentByType[item.type]?.date === item.date
                          ? tableStyles.warningCell
                          : tableStyles.cell
                      }
                    >
                      {item.mileage.next &&
                        Number(item.mileage.next).toLocaleString()}
                      {item.mileage.next && 'km'}
                    </TableCell>
                    <TableCell align='center' sx={tableStyles.cell}>
                      {item.note}
                    </TableCell>
                    <TableCell sx={tableStyles.cell}>
                      {item.isOwner && (
                        <div className='flex justify-end gap-2'>
                          <button
                            className='flex items-center rounded-lg px-2 py-1.5 text-blue-600 transition-all hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 sm:px-3'
                            onClick={() => setEditingItemId(item._id)}
                          >
                            <Edit className='h-4 w-4' strokeWidth={2} />
                            <span className='ml-1 text-sm font-medium sm:ml-1.5'>
                              수정
                            </span>
                          </button>
                          <button
                            className='flex items-center rounded-lg px-2 py-1.5 text-red-600 transition-all hover:bg-red-50 hover:shadow-sm active:bg-red-100 sm:px-3'
                            onClick={() => deleteService(item._id)}
                          >
                            <Trash2 className='h-4 w-4' strokeWidth={2} />
                            <span className='ml-1 text-sm font-medium sm:ml-1.5'>
                              삭제
                            </span>
                          </button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {editingItemId && (
        <ServiceEdit
          item={services.find((service) => service._id === editingItemId)!}
          setEditingItemId={setEditingItemId}
        />
      )}
    </div>
  );
}

export default ServiceTable;
