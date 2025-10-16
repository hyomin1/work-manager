import { Paper, Table, TableContainer } from '@mui/material';
import WorkStatusTableBody from './WorkStatusTableBody';
import WorkStatusTableHeader from './WorkStatusTableHeader';
import type { WorkStatus } from '../../types/workStatus';
import { useMemo } from 'react';

interface Props {
  works: WorkStatus[];
}

export default function WorkStatusTable({ works }: Props) {
  const memoWorks = useMemo(() => works || [], [works]);
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow:
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      }}
      className='shadow-custom-shadow'
    >
      <Table>
        <WorkStatusTableHeader />
        <WorkStatusTableBody works={memoWorks} />
      </Table>
    </TableContainer>
  );
}
