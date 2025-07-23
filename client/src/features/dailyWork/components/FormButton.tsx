import { Button } from '@mui/material';
import {
  dailyWorkCancelButtonStyle,
  dailyWorkCheckButtonStyle,
} from '../../../styles/style';
interface Props {
  onSubmit: () => void;
  onClose: () => void;
}

export default function FormButton({ onSubmit, onClose }: Props) {
  return (
    <div className='mt-5 flex justify-end space-x-3'>
      <Button
        variant='contained'
        onClick={onSubmit}
        className='h-9 px-4 text-sm font-medium'
        sx={dailyWorkCheckButtonStyle}
      >
        완료
      </Button>
      <Button
        variant='outlined'
        onClick={onClose}
        className='h-9 px-4 text-sm font-medium'
        sx={dailyWorkCancelButtonStyle}
      >
        취소
      </Button>
    </div>
  );
}
