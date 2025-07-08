import React, { useState, useMemo } from 'react';
import { api } from '../../../api';
import useEmployeeStore from '../../../stores/employeeStore';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import DailyWorkEdit from '../DailyWorkEdit';
import DailyWorkView from '../DailyWorkView';
import DeleteBox from '../../../components/common/DeleteBox';

const cellStyle = {
  fontSize: '1rem',
  whiteSpace: 'nowrap',
};

interface EmployeeTableBodyProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentDate: Date | null;
  refetch: () => void;
}

function TableContent({
  setIsOpen,
  currentDate,
  isOpen,
  refetch,
}: EmployeeTableBodyProps) {
  const { dailyWork } = useEmployeeStore();
  const [viewId, setViewId] = useState('');
  const [editingItemId, setEditingItemId] = useState('');
  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const contentLength = 100;

  const groupedData = useMemo(() => {
    if (!dailyWork?.length) return [];

    const grouped = dailyWork.reduce((acc, item) => {
      if (!acc[item.department]) {
        acc[item.department] = [];
      }
      acc[item.department].push(item);
      return acc;
    }, {} as Record<string, typeof dailyWork>);

    Object.keys(grouped).forEach((dept) => {
      grouped[dept].sort((a, b) => a.username.localeCompare(b.username));
    });

    return Object.entries(grouped)
      .sort(([deptA], [deptB]) => deptA.localeCompare(deptB))
      .map(([dept, items]) => ({
        department: dept,
        items,
      }));
  }, [dailyWork]);

  const deleteDailyWork = async (id: string) => {
    const response = await api.delete(
      `/api/employee-inform/dailyWork/remove/${id}`
    );
    if (response.status === 200) {
      refetch();
      setOpen(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setViewId('');
    setEditingItemId(id);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpen(true);
    setDeletedId(id);
  };

  const handleCellClick = (id: string) => {
    if (!editingItemId) {
      setViewId(id);
    }
  };

  if (!dailyWork?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            align='left'
            colSpan={7}
            className='text-center text-base text-gray-400'
          >
            등록된 정보가 없습니다
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <>
      <TableBody>
        {groupedData.map(({ department, items }) =>
          items.map((item, index) => (
            <TableRow
              key={item._id}
              className='group w-[100%] border-b border-gray-200'
            >
              {index === 0 && (
                <TableCell
                  align='center'
                  rowSpan={items.length}
                  className='border-r border-gray-200 bg-gray-50 text-base font-medium text-gray-700'
                  sx={{ ...cellStyle, width: '5%' }}
                >
                  {department}
                </TableCell>
              )}

              <TableCell
                align='center'
                onClick={() => handleCellClick(item._id)}
                className='peer cursor-pointer border-r border-gray-200 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 group-hover:[&:not(:hover)]:bg-gray-100'
                sx={{ ...cellStyle, width: '5%' }}
              >
                {item.username}
              </TableCell>

              <TableCell
                sx={cellStyle}
                align='left'
                onClick={() => handleCellClick(item._id)}
                className='peer cursor-pointer border-r border-gray-200 text-base text-gray-700 transition-colors hover:bg-gray-100 peer-hover:bg-gray-100'
              >
                <div className='truncate'>
                  {item.content.slice(0, contentLength)}
                  {item.content.length > contentLength && '...'}
                </div>
              </TableCell>

              <TableCell
                align='right'
                onClick={(e) => e.stopPropagation()}
                sx={{ width: '5%' }}
              >
                {item.isOwner && (
                  <div className='flex items-center justify-between gap-2 whitespace-nowrap'>
                    <button
                      className='flex items-center rounded px-2 py-1 text-base font-medium text-blue-600 transition-colors hover:bg-blue-50'
                      onClick={(e) => handleEditClick(e, item._id)}
                    >
                      <Edit
                        className='mr-1 sm:h-4 sm:w-4 md:h-5 md:w-5'
                        strokeWidth={2}
                      />
                      수정
                    </button>
                    <button
                      className='flex items-center rounded px-2 py-1 text-base font-medium text-red-600 transition-colors hover:bg-red-50'
                      onClick={(e) => handleDeleteClick(e, item._id)}
                    >
                      <Trash2
                        className='mr-1 sm:h-4 sm:w-4 md:h-5 md:w-5'
                        strokeWidth={2}
                      />
                      삭제
                    </button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>

      {viewId && !editingItemId && (
        <DailyWorkView
          id={viewId}
          setViewId={setViewId}
          currentDate={currentDate}
          refetch={refetch}
        />
      )}
      {editingItemId && (
        <DailyWorkEdit
          setEditingItemId={setEditingItemId}
          refetch={refetch}
          currentDate={currentDate}
          id={editingItemId}
        />
      )}
      <DeleteBox
        open={open}
        setOpen={setOpen}
        handleDelete={() => deleteDailyWork(deletedId)}
      />
    </>
  );
}

export default TableContent;
