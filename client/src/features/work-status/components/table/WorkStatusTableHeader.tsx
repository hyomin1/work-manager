import { TableCell, TableHead, TableRow } from '@mui/material';
import { TABLE_HEADER } from '../../constants/workStatus';

export default function WorkStatusTableHeader() {
  return (
    <TableHead>
      <TableRow>
        {TABLE_HEADER.map((item, index) => (
          <TableCell
            key={index}
            sx={{
              padding: '16px 20px',
              background: 'white',
              borderBottom: '2px solid #E2E8F0',
              fontWeight: 600,
              fontSize: {
                xs: '14px',
                sm: '15px',
                md: '16px',
              },
              letterSpacing: '0.025em',
              color: '#334155',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              '&:first-of-type': {
                borderTopLeftRadius: '12px',
              },
              '&:last-child': {
                borderTopRightRadius: '12px',
              },
            }}
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
