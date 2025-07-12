import { LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export default function LogoutButton() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const { logout } = useAuth();
  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all hover:from-blue-600 hover:to-blue-700 active:scale-95 sm:px-2 sm:py-2 md:px-4 md:py-2.5 print:hidden'
      >
        <LogOut className='h-5 w-5' />
        <span className='whitespace-nowrap text-sm font-medium sm:text-[0.8rem]'>
          로그아웃
        </span>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>로그아웃 확인</DialogTitle>
        <DialogContent>
          <p className='text-gray-700'>로그아웃 하시겠습니까?</p>
        </DialogContent>
        <DialogActions>
          <Button className='hover:opacity-35' onClick={handleClose}>
            취소
          </Button>
          <Button
            onClick={handleLogout}
            variant='contained'
            className='hover:opacity-35'
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
