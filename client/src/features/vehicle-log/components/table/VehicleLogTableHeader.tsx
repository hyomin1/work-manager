import { TableCell, TableHead, TableRow } from '@mui/material';

const HEADERS = [
  '날짜',
  '운전자',
  '행선지',
  '출발',
  '도착',
  '주행거리',
  '주유비',
  '하이패스',
  '기타',
];

export default function VehicleLogTableHeader() {
  return (
    <TableHead sx={{ display: { xs: 'none', md: 'table-header-group' } }}>
      <TableRow>
        {HEADERS.map((header, i) => (
          <TableCell
            key={i}
            align='center'
            sx={{
              fontWeight: 700,
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
              backgroundColor: '#f8fafc',
            }}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
