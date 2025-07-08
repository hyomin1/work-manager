import { LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';

export default function LogoutButton() {
  const { logout } = useAuth();
  const handleLogout = () => {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');
    if (confirmed) logout.mutate();
  };

  return (
    <button
      onClick={handleLogout}
      className='flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all hover:from-blue-600 hover:to-blue-700 active:scale-95 sm:px-2 sm:py-2 md:px-4 md:py-2.5 print:hidden'
    >
      <LogOut className='h-5 w-5 sm:hidden' />
      <span className='whitespace-nowrap text-sm font-medium sm:text-[0.8rem]'>
        로그아웃
      </span>
    </button>
  );
}
