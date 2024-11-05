import { useState } from 'react';
import { Button, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import EditInform from '../EmployeeEdit';
import { Edit, Trash2 } from 'lucide-react';
import { axiosReq } from '../../../api';
import useEmployeeStore from '../../../stores/employeeStore';

interface EmployeeTableBodyProps {
  refetch: () => void;
}

function EmployeeTableBody({ refetch }: EmployeeTableBodyProps) {
  const { inform, currentDate } = useEmployeeStore();
  const [editingItemId, setEditingItemId] = useState('');

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
        refetch();
      }
    }
  };
  return (
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
            className={`sm:text-sm w-[100%]  ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
            }`}
          >
            <TableCell sx={{ fontSize: 'large', whiteSpace: 'nowrap' }}>
              {item.username}
            </TableCell>
            <TableCell sx={{ fontSize: 'large' }}>{item.destination}</TableCell>
            <TableCell sx={{ fontSize: 'large' }}>{item.business}</TableCell>
            <TableCell sx={{ fontSize: 'large' }}>{item.work}</TableCell>
            <TableCell sx={{ fontSize: 'large' }}>{item.car}</TableCell>
            <TableCell
              sx={{
                fontSize: 'large',
              }}
            >
              {item.remarks && (
                <Tooltip
                  title={item.remarks}
                  arrow
                  placement="left"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        maxWidth: '500px',
                        fontSize: '16px',
                        padding: '8px 16px',
                      },
                    },
                  }}
                >
                  <Button
                    sx={{
                      minWidth: 'auto',
                      justifyContent: 'flex-start',
                      padding: '0px',
                    }}
                  >
                    확인
                  </Button>
                </Tooltip>
              )}
            </TableCell>

            <TableCell>
              {item.isOwner && (
                <div className="flex items-center gap-2 justify-evenly">
                  <button
                    className="flex items-center hover:opacity-60"
                    onClick={() => editInform(item._id)}
                  >
                    <Edit strokeWidth={2.2} />
                    <span className="ml-1 font-semibold">수정</span>
                  </button>
                  <button
                    className="flex items-center hover:opacity-60 "
                    onClick={() => deleteInform(item._id)}
                  >
                    <Trash2 strokeWidth={2.2} />
                    <span className="ml-1 font-semibold">삭제</span>
                  </button>

                  {editingItemId === item._id && (
                    <EditInform
                      currentDate={currentDate}
                      item={item}
                      setEditingItemId={setEditingItemId}
                    />
                  )}
                </div>
              )}
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
  );
}

export default EmployeeTableBody;
