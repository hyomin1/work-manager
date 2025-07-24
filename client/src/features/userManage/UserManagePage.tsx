import { useEffect, useState } from 'react';
import { calculateDate } from '../../utils';
import ArrowBack from '../../components/common/ArrowBack';
import UserManageTab from './components/UserManageTab';
import UserManageTable from './components/UserManageTable';
import { Calendar } from 'lucide-react';
import { authApi } from '../auth/api/auth';
import LogoutButton from '../auth/components/LogoutButton';
import useUserManage from './hooks/useUserManage';
import DeleteBox from '../../components/common/DeleteBox';

function UserManagePage() {
  const [value, setValue] = useState(0);
  const [deleteId, setDeleteId] = useState('');

  // value 0 -> 승인 value 1 -> 승인 x
  const {
    userQuery: { data: users },
    deleteMutation,
    approve,
    reject,
    change,
  } = useUserManage(value);

  useEffect(() => {
    authApi.checkAdminSession();
  }, []);

  const handleDelete = () => {
    deleteMutation.mutate(deleteId, {
      onSuccess: () => setDeleteId(''),
    });
  };

  const handleApprove = (userId: string) => {
    if (!window.confirm('승인하시겠습니까?')) {
      return;
    }
    approve.mutate(userId);
  };

  const handleReject = (userId: string) => {
    if (!window.confirm('거절하시겠습니까?')) {
      return;
    }
    reject.mutate(userId);
  };

  const handleChangeRole = (userId: string, role: number) =>
    change.mutate({ userId, role });
  return (
    <div className='flex h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50 p-10 sm:p-2'>
      <div className='flex w-[90%] flex-col items-center sm:w-full'>
        <div className='mb-8 mt-2 flex w-full items-center justify-between sm:mt-4'>
          <ArrowBack type='not home' />
          <div className='flex items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 sm:px-6 sm:py-2 md:px-16 md:py-4'>
            <Calendar className='mr-2 h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700 sm:hidden' />
            <span className='whitespace-nowrap text-xl font-semibold text-gray-700 transition-colors sm:text-xs'>
              {calculateDate(new Date())}
            </span>
          </div>
          <LogoutButton />
        </div>
      </div>

      <UserManageTab value={value} setValue={setValue} />

      <UserManageTable
        users={users || []}
        value={value}
        setDeleteId={setDeleteId}
        onApprove={handleApprove}
        onReject={handleReject}
        onChangeRole={handleChangeRole}
      />

      <DeleteBox
        open={!!deleteId}
        onClose={() => setDeleteId('')}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default UserManagePage;
