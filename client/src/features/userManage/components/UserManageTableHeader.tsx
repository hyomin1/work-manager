import { TableCell, TableHead, TableRow } from '@mui/material';

export default function UserManageTableHeader({ value }: { value: number }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          className='border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm'
          sx={{
            py: 3.5,
            pl: 6,
          }}
        >
          <span className='text-[0.925rem] font-semibold text-gray-600'>
            계정 정보
          </span>
        </TableCell>
        {value === 0 && (
          <TableCell
            className='border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm'
            sx={{
              py: 3.5,
              width: '30%',
            }}
          >
            <span className='text-[0.925rem] font-semibold text-gray-600'>
              권한 설정
            </span>
          </TableCell>
        )}
        <TableCell className='border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm' />
      </TableRow>
    </TableHead>
  );
}
