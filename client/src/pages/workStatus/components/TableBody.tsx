import { useState } from 'react';
import {
  Button,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import EmployeeEdit from '../EmployeeEdit';
import { FileText } from 'lucide-react';
import useEmployeeStore from '../../../stores/employeeStore';
import DeleteBox from '../../../components/common/DeleteBox';
import type { WorkStatus } from '../../../types/work';
import {
  sortWorkStatus,
  getRowSpans,
  findNonEmptyCarInGroup,
  createStyleMap,
} from '../../../utils/work-status';
import useWorks from '../../../hooks/useWorks';
import {
  CELL_STYLE,
  EMPTY_TABLE_CELL_STYLE,
  LAST_CELL_STYLE,
  REMARK_BUTTON_STYLE,
  TOOLTIP_STYLE,
} from '../../../styles/workStatusTableStyles';
import ActionButtons from '../../../components/common/ActionButtons';

type Props = {
  works: WorkStatus[];
};

export default function TableBody({ works }: Props) {
  const { currentDate } = useEmployeeStore();
  const [editingItemId, setEditingItemId] = useState('');
  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const { deleteMutation } = useWorks();

  const handleDelete = (id: string) => {
    setDeletedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(deletedId, {
      onSuccess: () => {
        setOpen(false);
        setDeletedId('');
      },
    });
  };

  const renderEmptyTable = () => (
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

  if (!works?.length) {
    return renderEmptyTable();
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
                  onEdit={() => setEditingItemId(item._id)}
                  onDelete={() => handleDelete(item._id)}
                  onOpen={() => setOpen(true)}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </MuiTableBody>
      <DeleteBox
        open={open}
        setOpen={setOpen}
        handleDelete={handleConfirmDelete}
      />
      {editingItemId && (
        <EmployeeEdit
          item={works.find((item) => item._id === editingItemId) || works[0]}
          currentDate={currentDate || new Date()}
          setEditingItemId={setEditingItemId}
        />
      )}
    </>
  );
}
