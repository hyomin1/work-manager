import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import type { User } from '../types/userManage';
import UserManageTableHeader from './UserManageTableHeader';
import UserManageTableRow from './UserManageTableRow';

interface Props {
  users: User[];
  value: number;
  setDeleteId: (deleteId: string) => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
  onChangeRole: (userId: string, role: number) => void;
}

export default function UserManageTable({
  users,
  value,
  setDeleteId,
  onApprove,
  onReject,
  onChangeRole,
}: Props) {
  const sortedUsers = [...users].sort((a, b) => {
    if (a.role !== b.role) return b.role - a.role;
    return a.userId.localeCompare(b.userId);
  });

  return (
    <TableContainer
      sx={{ width: '90%', marginTop: 4, overflowY: 'auto' }}
      component={Paper}
      className='overflow-hidden rounded-xl border border-gray-100 shadow-lg'
    >
      <Table stickyHeader>
        <UserManageTableHeader value={value} />
        <TableBody>
          {sortedUsers.map((user) => (
            <UserManageTableRow
              key={user._id}
              user={user}
              onApprove={onApprove}
              onReject={onReject}
              onChangeRole={onChangeRole}
              setDeleteId={setDeleteId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
