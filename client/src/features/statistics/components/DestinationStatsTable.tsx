import {
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from '@mui/material';
import { STATS_DESTINATION_HEADER } from '../constants/statistics';
import type { StatByDestination } from '../types/statistics';
import TooltipButton from './TooltipButton';
import { commonCellStyles, remarksCellStyles } from '../style/style';
import { calStatDay, extractMonthAndDay } from '../utils/formatDate';

interface Props {
  destinationStatistics: StatByDestination[];
}

export default function DestinationStatsTable({
  destinationStatistics,
}: Props) {
  const sorted = destinationStatistics?.sort((a, b) => {
    const dateA = extractMonthAndDay(a.specificDate);
    const dateB = extractMonthAndDay(b.specificDate);

    if (dateA.month !== dateB.month) {
      return dateA.month - dateB.month;
    }
    if (dateA.day !== dateB.day) {
      return dateA.day - dateB.day;
    }

    return a.username.localeCompare(b.username);
  });
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {STATS_DESTINATION_HEADER.map((header, index) => (
            <TableCell
              align='center'
              key={index}
              sx={{
                backgroundColor: '#f8fafc',
                borderBottom: '2px solid #e2e8f0',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1e293b',
                padding: '16px',
                whiteSpace: 'nowrap',
                height: '60px',
              }}
            >
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {sorted.map((item) => (
          <TableRow
            key={`${item.username}-${item.destination}-${item.specificDate}`}
            sx={{
              '&:hover': {
                backgroundColor: '#f8fafc',
              },
            }}
          >
            <TableCell align='center' sx={commonCellStyles}>
              {calStatDay(item.specificDate)}
            </TableCell>
            <TableCell align='center' sx={commonCellStyles}>
              {item.username}
            </TableCell>
            <TableCell align='center' sx={commonCellStyles}>
              {item.destination}
            </TableCell>
            <TableCell align='center' sx={commonCellStyles}>
              {item.business}
            </TableCell>
            <TableCell align='center' sx={commonCellStyles}>
              {item.work}
            </TableCell>
            <TableCell align='center' sx={remarksCellStyles}>
              <TooltipButton remarks={item.remarks} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
