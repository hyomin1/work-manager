import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import type { Maintenance } from '../../types/vehicleLog';
import useVehicleLog from './../../hooks/useVehicle';
import { maintenanceTableStyles } from '../../../../styles/style';
import { serviceDay } from '../../utils/formatDate';
import { MAINTENANCE_HEADER } from '../../constants/vehicleLog';

interface Props {
  services: Maintenance[];
  setEditId: (editId: string) => void;
}

export default function MaintenanceTable({ services, setEditId }: Props) {
  const recentByType = services.reduce((acc, service) => {
    const { type, date } = service;

    const currentDate = date ? new Date(date).getTime() : 0;
    const savedDate = acc[type]?.date ? new Date(acc[type].date).getTime() : 0;

    if (!acc[type] || currentDate > savedDate) {
      acc[type] = service;
    }
    return acc;
  }, {} as Record<string, Maintenance>);
  const { deleteMaintenance } = useVehicleLog();

  const deleteService = async (id: string) => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      deleteMaintenance.mutate(id);
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
        <TableContainer sx={maintenanceTableStyles.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {MAINTENANCE_HEADER.map((item, index) => (
                  <TableCell
                    align='center'
                    key={index}
                    sx={maintenanceTableStyles.headerCell}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {services
                ?.sort((a, b) => {
                  const aTime = a.date ? new Date(a.date).getTime() : -Infinity;
                  const bTime = b.date ? new Date(b.date).getTime() : -Infinity;
                  return bTime - aTime;
                })
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' sx={maintenanceTableStyles.cell}>
                      {serviceDay(item.date)}
                    </TableCell>
                    <TableCell align='center' sx={maintenanceTableStyles.cell}>
                      {item.type}
                    </TableCell>
                    <TableCell align='center' sx={maintenanceTableStyles.cell}>
                      {Number(item.mileage.base).toLocaleString()}km
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={
                        recentByType[item.type]?.date === item.date
                          ? maintenanceTableStyles.warningCell
                          : maintenanceTableStyles.cell
                      }
                    >
                      {item.mileage.next &&
                        Number(item.mileage.next).toLocaleString()}
                      {item.mileage.next && 'km'}
                    </TableCell>
                    <TableCell align='center' sx={maintenanceTableStyles.cell}>
                      {item.note}
                    </TableCell>
                    <TableCell sx={maintenanceTableStyles.cell}>
                      {item.isOwner && (
                        <div className='flex justify-end gap-2'>
                          <button
                            className='flex items-center rounded-lg px-2 py-1.5 text-blue-600 transition-all hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 sm:px-3'
                            onClick={() => setEditId(item._id)}
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
    </div>
  );
}
