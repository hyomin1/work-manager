import { useEffect, useState } from 'react';
import { calculateDate, checkAdminSession, getUsers } from '../../api';
import ArrowBack from '../../components/common/ArrowBack';
import UserManageTab from './UserManageTab';
import { useQuery } from '@tanstack/react-query';
import { Users } from '../../interfaces/interface';
import UserManageTable from './UserManageTable';
import { Calendar } from 'lucide-react';
import Logout from '../../features/auth/components/LogoutButton';

function UserManagePage() {
  const [value, setValue] = useState(0);
  // value 0 -> 승인 value 1 -> 승인 x
  const filterUsersByApprovalStatus = (data: Users[], value: number) =>
    data.filter((user) => {
      const isRolePositive = user.role > 0;
      const shouldIncludePositive = value === 0;
      return isRolePositive === shouldIncludePositive;
    });

  const { data: users, refetch } = useQuery<Users[]>({
    queryKey: ['users', value],
    queryFn: getUsers,
    select: (data) => filterUsersByApprovalStatus(data, value),
  });

  useEffect(() => {
    checkAdminSession();
  }, []);

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
          <Logout />
        </div>
      </div>

      <UserManageTab value={value} setValue={setValue} />

      <UserManageTable users={users || []} refetch={refetch} value={value} />
    </div>
  );
}

export default UserManagePage;
