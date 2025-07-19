import {
  FormControl,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from '@mui/material';
import type { User } from '../types/userManage';
import { getRoleInfo } from '../utils/userManage';
import { CheckCircle, Trash2, XCircle } from 'lucide-react';

interface Props {
  user: User;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
  onChangeRole: (userId: string, role: number) => void;
  setDeleteId: (userId: string) => void;
}

const roleOptions = [
  { label: '관리자', value: 3 },
  { label: '일반', value: 2 },
  { label: '차량 전용', value: 1 },
];

export default function UserManageTableRow({
  user,
  onApprove,
  onReject,
  onChangeRole,
  setDeleteId,
}: Props) {
  const roleInfo = getRoleInfo(user.role);
  const RoleIcon = roleInfo.icon;
  return (
    <TableRow className='group transition-colors duration-200'>
      <TableCell
        className='border-b border-gray-100 group-last:border-0'
        sx={{ py: 4, pl: 6 }}
      >
        <div className='flex items-center gap-4'>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${roleInfo.color.replace(
              'border-',
              ''
            )}`}
          >
            <RoleIcon className='h-5 w-5' />
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-medium text-gray-900'>{user.userId}</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${roleInfo.color} w-[68px] justify-center`}
            >
              {roleInfo.label}
            </span>
          </div>
        </div>
      </TableCell>

      {user.role > 0 && (
        <TableCell
          className='border-b border-gray-100 group-last:border-0'
          sx={{ py: 4 }}
        >
          <FormControl className='w-full sm:w-[160px] md:w-[180px]'>
            <Select
              className='rounded-lg bg-white'
              value={user.role}
              onChange={(e) => onChangeRole(user._id, Number(e.target.value))}
              sx={{
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#f1f5f9',
                  borderWidth: '2px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e2e8f0',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#93c5fd',
                  borderWidth: '2px',
                },
                '& .MuiSelect-select': {
                  py: 1.5,
                  px: 2,
                },
              }}
            >
              {roleOptions.map(({ value, label }) => (
                <MenuItem value={value} key={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
      )}

      <TableCell
        align='right'
        className='border-b border-gray-100 group-last:border-0'
        sx={{ py: 4, pr: 5 }}
      >
        {user.role > 0 ? (
          <button
            onClick={() => setDeleteId(user._id)}
            className='inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600'
          >
            <Trash2 className='sm:h-4 sm:w-4 md:h-6 md:w-6' />
          </button>
        ) : (
          <div className='flex items-center justify-end gap-2'>
            <button
              onClick={() => onApprove(user._id)}
              className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            >
              <CheckCircle className='h-4 w-4' />
            </button>
            <button
              onClick={() => onReject(user._id)}
              className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100'
            >
              <XCircle className='h-4 w-4' />
            </button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
