import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  approveUser,
  changeRole,
  deleteUser,
  getUsers,
  rejectUser,
} from '../api/userManage';
import type { User } from '../types/userManage';
import toast from 'react-hot-toast';

export default function useUserManage(value: number) {
  const queryClient = useQueryClient();
  const filterUsersByApprovalStatus = (data: User[], value: number) =>
    data.filter((user) => {
      const isRolePositive = user.role > 0;
      const shouldIncludePositive = value === 0;
      return isRolePositive === shouldIncludePositive;
    });
  const userQuery = useQuery<User[]>({
    queryKey: ['users', value],
    queryFn: getUsers,
    select: (data) => filterUsersByApprovalStatus(data, value),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success('유저가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['users', value] });
    },
    onError: () => toast.error('유저 삭제에 실패했습니다.'),
  });

  const approve = useMutation({
    mutationFn: (id: string) => approveUser(id),
    onSuccess: () => {
      toast.success('유저가 승인되었습니다.');

      queryClient.invalidateQueries({ queryKey: ['users', value] });
    },
    onError: () => toast.error('유저 승인에 실패했습니다.'),
  });

  const reject = useMutation({
    mutationFn: (id: string) => rejectUser(id),
    onSuccess: () => {
      toast.success('유저가 거절되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['users', value] });

      queryClient.invalidateQueries();
    },
    onError: () => toast.error('유저 거절에 실패했습니다.'),
  });

  const change = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: number }) =>
      changeRole(userId, role),
    onSuccess: () => {
      toast.success('유저 권한이 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['users', value] });
    },
    onError: () => toast.error('유저 권한 변경에 실패했습니다.'),
  });

  return { userQuery, deleteMutation, approve, reject, change };
}
