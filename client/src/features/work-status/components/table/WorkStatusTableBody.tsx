import {
  Button,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import { FileText } from 'lucide-react';
import type { WorkStatus } from '../../../../types/work';
import {
  sortWorkStatus,
  getRowSpans,
  findNonEmptyCarInGroup,
  createStyleMap,
} from '../../utils/work-status';
import {
  CELL_STYLE,
  EMPTY_TABLE_CELL_STYLE,
  LAST_CELL_STYLE,
  REMARK_BUTTON_STYLE,
  TOOLTIP_STYLE,
} from '../../styles/workStatusTableStyles';
import ActionButtons from '../../../../components/common/ActionButtons';
import { useWorkStatusStore } from '../../stores/useWorkStatusStore';

interface Props {
  works: WorkStatus[];
}

export default function WorkStatusTableBody({ works }: Props) {
  const setEditId = useWorkStatusStore((state) => state.setEditId);

  const setDeleteId = useWorkStatusStore((state) => state.setDeleteId);

  if (!works?.length) {
    return (
      <MuiTableBody>
        <TableRow>
          <TableCell
            align='center'
            colSpan={7}
            className='text-center'
            sx={EMPTY_TABLE_CELL_STYLE}
          >
            등록된 정보가 없습니다
          </TableCell>
        </TableRow>
      </MuiTableBody>
    );
  }

  const styleMap = createStyleMap(works);
  const sortedData = sortWorkStatus(works);
  const rowSpans = getRowSpans(sortedData);

  return (
    <>
      <MuiTableBody>
        {sortedData.map((item, index) => (
          <TableRow
            key={item._id}
            className='w-[100%] sm:text-sm'
            sx={styleMap.get(`${item.destination}-${item.business}`)}
          >
            {rowSpans.get(`${index}-name`) !== 0 && (
              <TableCell
                align='center'
                rowSpan={rowSpans.get(`${index}-name`)}
                sx={{ ...CELL_STYLE, whiteSpace: 'nowrap' }}
              >
                {item.username}
              </TableCell>
            )}

            {rowSpans.get(`${index}-destination`) !== 0 && (
              <TableCell
                align='center'
                rowSpan={rowSpans.get(`${index}-destination`)}
                sx={{ ...CELL_STYLE, whiteSpace: 'nowrap' }}
              >
                {item.destination}
              </TableCell>
            )}

            {rowSpans.get(`${index}-business`) !== 0 && (
              <TableCell
                align='left'
                rowSpan={rowSpans.get(`${index}-business`)}
                sx={CELL_STYLE}
              >
                {item.business}
              </TableCell>
            )}

            {rowSpans.get(`${index}-work`) !== 0 && (
              <TableCell
                align='center'
                rowSpan={rowSpans.get(`${index}-work`)}
                sx={{ ...CELL_STYLE, whiteSpace: 'nowrap' }}
              >
                {item.work}
              </TableCell>
            )}

            {rowSpans.get(`${index}-car`) !== 0 && (
              <TableCell
                align='center'
                rowSpan={rowSpans.get(`${index}-car`)}
                sx={CELL_STYLE}
              >
                {item.car !== ''
                  ? item.car
                  : findNonEmptyCarInGroup(sortedData, index)}
              </TableCell>
            )}

            <TableCell align='center' sx={CELL_STYLE}>
              {item.remarks && (
                <Tooltip
                  title={item.remarks}
                  arrow
                  placement='left'
                  componentsProps={{
                    tooltip: {
                      onClick: (e) => e.stopPropagation(),
                      sx: TOOLTIP_STYLE,
                    },
                  }}
                >
                  <Button sx={REMARK_BUTTON_STYLE}>
                    <FileText size={22} color='#0D9488' />
                  </Button>
                </Tooltip>
              )}
            </TableCell>

            <TableCell sx={LAST_CELL_STYLE}>
              {item.isOwner && (
                <ActionButtons
                  onEdit={() => setEditId(item._id)}
                  onDelete={() => setDeleteId(item._id)}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </MuiTableBody>
    </>
  );
}
