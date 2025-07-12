import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  handleDelete: () => void;
}
export default function DeleteBox({ open, onClose, handleDelete }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className='text-red-600'>삭제 확인</DialogTitle>
      <DialogContent>
        <p className='text-gray-600'>정말로 이 항목을 삭제하시겠습니까?</p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDelete}
          color='error'
          variant='contained'
          className='hover:opacity-35'
        >
          삭제
        </Button>
        <Button className='hover:opacity-35' onClick={onClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
