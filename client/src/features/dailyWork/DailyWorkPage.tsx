import { useState } from 'react';
import ArrowBack from '../../components/common/ArrowBack';
import Title from '../../components/layout/Title';
import Logout from '../auth/components/LogoutButton';
import { calculateDate } from '../../utils';
import DateInput from '../work-status/components/DateSelector';
import NavigationButtons from './components/NavigationButtons';
import { Paper, Table, TableContainer } from '@mui/material';
import TableHeader from './components/TableHeader';
import TableContent from './components/TableContent';
import DailyWorkAddForm from './components/DailyWorkAddForm';
import useDailyWork from './hooks/useDailyWork';
import DailyWorkView from './components/DailyWorkView';
import DailyWorkEditForm from './components/DailyWorkEditForm';
import DeleteBox from '../../components/common/DeleteBox';
function DailyWorkPage() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [viewId, setViewId] = useState('');
  const [editId, setEditId] = useState('');
  const [deleteId, setDeleteId] = useState('');

  const { dailyWorks, deleteItem } = useDailyWork(currentDate);
  const item = dailyWorks?.find(
    (dailyWork) => dailyWork._id === viewId || dailyWork._id === editId
  );

  const handleDelete = () => {
    deleteItem(deleteId, {
      onSuccess: () => setDeleteId(''),
    });
  };

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
          handleDate={setCurrentDate}
        />

        <NavigationButtons onOpen={() => setIsOpen(true)} />

        {isOpen && (
          <DailyWorkAddForm
            onClose={() => setIsOpen(false)}
            currentDate={currentDate}
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
              dailyWorks={dailyWorks || []}
              isOpen={isOpen}
              setIsOpen={() => setIsOpen}
              setViewId={setViewId}
              editId={editId}
              setEditId={setEditId}
              setDeleteId={setDeleteId}
            />
          </Table>
        </TableContainer>
      </div>
      {viewId && item && (
        <DailyWorkView
          dailyWork={item}
          id={viewId}
          onClose={() => setViewId('')}
          currentDate={currentDate}
          onCloseEdit={() => setOpenEdit(false)}
          onChangeOpenEdit={() => setOpenEdit((prev) => !prev)}
          openEdit={openEdit}
        />
      )}
      {editId && item && (
        <DailyWorkEditForm
          onClose={() => setEditId('')}
          currentDate={currentDate}
          dailyWork={item}
          id={editId}
        />
      )}
      <DeleteBox
        open={!!deleteId}
        onClose={() => setDeleteId('')}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default DailyWorkPage;
