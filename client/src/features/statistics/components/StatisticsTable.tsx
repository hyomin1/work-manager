import { Paper, TableContainer } from '@mui/material';
import type { StatByDestination, StatByName } from '../types/statistics';
import NameStatsTable from './NameStatsTable';
import DestinationStatsTable from './DestinationStatsTable';

interface Props {
  userStatistics: StatByName[];
  destinationStatistics: StatByDestination[];
  value: number;
}

export default function StatisticsTable({
  userStatistics,
  destinationStatistics,
  value,
}: Props) {
  return (
    <TableContainer
      component={Paper}
      className='rounded-xlk mt-4 overflow-hidden shadow-lg'
      sx={{
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f5f9',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#cbd5e1',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: '#94a3b8',
          },
        },
      }}
    >
      {value === 0 ? (
        <NameStatsTable userStatistics={userStatistics} />
      ) : (
        <DestinationStatsTable destinationStatistics={destinationStatistics} />
      )}
    </TableContainer>
  );
}
