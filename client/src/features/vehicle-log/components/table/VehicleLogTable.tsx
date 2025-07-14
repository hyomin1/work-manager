import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import type { Cost, VehicleLog } from '../../types/vehicleLog';
import { calCarDay } from '../../utils/formatDate';
import VehicleLogTableHeader from './VehicleLogTableHeader';
import { Edit, Trash2 } from 'lucide-react';
import { useVehicleLogStore } from '../../stores/useVehicleLogStore';

interface Props {
  vehicleLogs: VehicleLog[];
  cost: Cost;
}

export default function VehicleLogTable({ vehicleLogs, cost }: Props) {
  const { totalDrivingKM, totalFuelCost, totalToll, totalEtcCost, grandTotal } =
    cost;

  const setEditId = useVehicleLogStore((state) => state.setEditId);
  const setDeleteId = useVehicleLogStore((state) => state.setDeleteId);

  const sortedLogs = [...vehicleLogs].sort((a, b) => {
    if (new Date(a.driveDay).getTime() === new Date(b.driveDay).getTime()) {
      return a.startKM - b.startKM;
    }
    return new Date(a.driveDay).getTime() - new Date(b.driveDay).getTime();
  });
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <Table>
          <VehicleLogTableHeader />

          <TableBody>
            {sortedLogs.map((item, i) => (
              <TableRow
                key={i}
                sx={{
                  display: {
                    xs: 'block',
                    md: 'table-row',
                  },
                  borderBottom: '1px solid #e2e8f0',
                  padding: { xs: 1, md: 0 },
                }}
              >
                {[
                  ['날짜', calCarDay(item.driveDay)],
                  ['운전자', item.username.join(', ')],
                  ['행선지', item.drivingDestination],
                  ['출발', `${item.startKM.toLocaleString()} km`],
                  ['도착', `${item.endKM.toLocaleString()} km`],
                  ['주행거리', `${item.totalKM.toLocaleString()} km`],
                  ['주유비', `${item.fuelCost.toLocaleString()} 원`],
                  ['하이패스', `${item.toll.toLocaleString()} 원`],
                  [
                    '기타',
                    item.etc.cost > 0
                      ? `${item.etc.cost.toLocaleString()} (${item.etc.name})`
                      : '-',
                  ],
                ].map(([label, value], index) => (
                  <TableCell
                    key={index}
                    align='center'
                    sx={{
                      display: { xs: 'block', md: 'table-cell' },
                      px: 2,
                      py: 1.5,
                      fontSize: '0.875rem',
                      textAlign: { xs: 'left', md: 'center' },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Typography
                      component='span'
                      sx={{
                        display: { xs: 'inline-block', md: 'none' },
                        fontWeight: 600,
                        color: '#64748b',
                        minWidth: '80px',
                        mr: 1,
                      }}
                    >
                      {label}:
                    </Typography>
                    {value}
                  </TableCell>
                ))}
                <TableCell
                  align='right'
                  sx={{
                    display: { xs: 'block', md: 'table-cell' },
                    px: 2,
                    py: 1.5,
                    whiteSpace: 'nowrap',
                    textAlign: 'right',
                  }}
                >
                  {item.isOwner && (
                    <div className='flex justify-end gap-2'>
                      <button
                        onClick={() => setEditId(item._id)}
                        className='flex items-center rounded-md px-2 py-1 text-sm font-medium text-blue-600 transition-all hover:bg-slate-100'
                      >
                        <Edit strokeWidth={2} size={14} className='mr-1' />
                        수정
                      </button>
                      <button
                        onClick={() => setDeleteId(item._id)}
                        className='flex items-center rounded-md px-2 py-1 text-sm font-medium text-red-600 transition-all hover:bg-red-50'
                      >
                        <Trash2 strokeWidth={2} size={14} className='mr-1' />
                        삭제
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {vehicleLogs.length > 0 && (
        <Box
          display='flex'
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={2}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', md: 'center' }}
          mt={2}
          px={2}
          py={2}
          bgcolor='#f8fafc'
          borderRadius={2}
          boxShadow={1}
          fontSize='0.875rem'
        >
          <span>총 주행거리: {totalDrivingKM.toLocaleString()} km</span>
          <span>총 주유비: {totalFuelCost.toLocaleString()} 원</span>
          <span>총 하이패스: {totalToll.toLocaleString()} 원</span>
          <span>총 기타: {totalEtcCost.toLocaleString()} 원</span>
          <Typography fontWeight={700}>
            총합: {grandTotal.toLocaleString()} 원
          </Typography>
        </Box>
      )}
    </Box>
  );
}
