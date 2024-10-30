import React, { useState } from 'react';
import { IDrivingInform } from '../../interfaces/interface';
import { drivingHeaders } from '../../constants/headers';
import { axiosReq, calCarDay } from '../../api';
import { Edit, Trash2 } from 'lucide-react';
import EditDrivingInform from './EditDrivingInform';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import DrivePrint from './DrivePrint';

interface IDrivePCProps {
  drivingInform: IDrivingInform[];
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalDrivingKM: number;
  totalFuelCost: number;
  totalToll: number;
  totalEtcCost: number;
  grandTotal: number;
  refetch: () => void;
}

function DrivePC({
  drivingInform,
  indexOfFirstItem,
  indexOfLastItem,
  totalDrivingKM,
  totalFuelCost,
  totalToll,
  grandTotal,
  totalEtcCost,
  refetch,
}: IDrivePCProps) {
  const [editingItemId, setEditingItemId] = useState('');

  const deleteInform = async (id: string) => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      const res = await axiosReq.delete(
        `/api/driving-inform/removeInform/${id}`
      );
      if (res.status === 200) {
        alert(res.data.message);
        refetch();
      }
    }
  };

  return (
    <div className="w-full h-full">
      <TableContainer
        component={Paper}
        className="block print:hidden"
        sx={{ maxHeight: '77vh', overflowY: 'auto' }} // 높이 제한과 스크롤 추가
      >
        <Table stickyHeader aria-label="a dense table" size="small">
          <TableHead>
            <TableRow>
              {drivingHeaders.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: '800',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {drivingInform
              ?.sort((a, b) => {
                if (
                  new Date(a.driveDay).getTime() ===
                  new Date(b.driveDay).getTime()
                ) {
                  return a.startKM - b.startKM;
                }
                return (
                  new Date(a.driveDay).getTime() -
                  new Date(b.driveDay).getTime()
                );
              })
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .map((item, index) => (
                <TableRow
                  key={index}
                  className={`sm:text-sm w-[100%] ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                  }`}
                >
                  <TableCell className="border border-gray-300">
                    {calCarDay(item.driveDay)}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {item.username}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {item.drivingDestination}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {item.startKM.toLocaleString()}km
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {item.endKM.toLocaleString()}km
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {item.totalKM.toLocaleString()}km
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {item.fuelCost ? item.fuelCost.toLocaleString() : ''}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {item.toll ? item.toll.toLocaleString() : ''}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {item.etc.cost > 0 &&
                      `${item.etc.cost.toLocaleString()}(${item.etc.name})`}
                  </TableCell>
                  <TableCell align="right" className="border border-gray-300">
                    {item.isOwner && (
                      <div className="flex justify-end">
                        <button
                          className="flex items-center mr-4 hover:opacity-60"
                          onClick={() => setEditingItemId(item._id)}
                        >
                          <Edit strokeWidth={2.2} size={15} />
                          <span className="ml-1 font-semibold">수정</span>
                        </button>
                        <button
                          className="flex items-center hover:opacity-60"
                          onClick={() => deleteInform(item._id)}
                        >
                          <Trash2 strokeWidth={2.2} size={15} />
                          <span className="ml-1 font-semibold">삭제</span>
                        </button>
                        {editingItemId === item._id && (
                          <EditDrivingInform
                            item={item}
                            setEditingItemId={setEditingItemId}
                          />
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow
              style={{ position: 'sticky', bottom: 0, background: 'white' }}
            >
              <TableCell className="border border-gray-300" colSpan={5} />
              <TableCell className="border border-gray-300">
                {totalDrivingKM.toLocaleString()}km
              </TableCell>
              <TableCell className="border border-gray-300">
                {totalFuelCost.toLocaleString()}
              </TableCell>
              <TableCell className="border border-gray-300">
                {totalToll.toLocaleString()}
              </TableCell>
              <TableCell className="border border-gray-300">
                {totalEtcCost.toLocaleString()}
              </TableCell>
              <TableCell className="border border-gray-300" align="right">
                총계: {grandTotal.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <DrivePrint
        drivingInform={drivingInform}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
      />
    </div>
  );
}

export default DrivePC;
