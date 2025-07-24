import { calculateDate } from '../../utils';
import ArrowBack from '../../components/common/ArrowBack';
import Title from '../../components/layout/Title';
import Logout from '../auth/components/LogoutButton';
import DateInput from './components/DateSelector';
import NavigationButtons from './components/NavigationButtons';
import useWorkStatus from './hooks/useWorkStatus';
import useDateManager from '../../hooks/useDateManager';
import PageLayout from '../../components/layout/PageLayout';
import WorkStatusTable from './components/table/WorkStatusTable';
import { useWorkStatusStore } from './stores/useWorkStatusStore';
import WorkStatusEditModal from './components/WorkStatusEditModal';
import DeleteBox from '../../components/common/DeleteBox';

function EmployeePage() {
  const { currentDate, setCurrentDate, isOpen, setIsOpen } = useDateManager();
  const {
    worksQuery: { data: works, refetch },
    deleteMutation,
  } = useWorkStatus(currentDate);

  const editId = useWorkStatusStore((state) => state.editId);
  const editWork = works?.find((item) => item._id === editId);

  const deleteId = useWorkStatusStore((state) => state.deleteId);
  const setDeleteId = useWorkStatusStore((state) => state.setDeleteId);

  const handleDelete = () => {
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId('');
      },
    });
  };

  return (
    <PageLayout>
      <div className='relative mb-8 flex w-full items-center justify-between sm:mb-6'>
        <ArrowBack type='home' />
        <Title
          setShowInput={setIsOpen}
          calDate={calculateDate}
          category='employee'
          currentDate={currentDate || new Date()}
          setCurrentDate={setCurrentDate}
        />
        <Logout />
      </div>

      <DateInput
        isDatePickerOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentDate={currentDate}
        handleDate={setCurrentDate}
      />

      <NavigationButtons refetch={refetch} />

      <WorkStatusTable works={works || []} />

      {editWork && <WorkStatusEditModal editWork={editWork} />}
      <DeleteBox
        open={!!deleteId}
        onClose={() => setDeleteId('')}
        onDelete={handleDelete}
      />
    </PageLayout>
  );
}

export default EmployeePage;
