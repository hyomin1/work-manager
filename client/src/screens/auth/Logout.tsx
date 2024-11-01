import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { axiosReq } from '../../api';
import { ROUTES } from '../../constants/constant';

function Logout() {
  const navigate = useNavigate();
  const goLogin = async () => {
    const isConfirm = window.confirm('로그아웃 하시겠습니까?');
    if (isConfirm) {
      const res = await axiosReq.post('/auth/logout');
      if (res.status === 200) {
        navigate(ROUTES.LOGIN);
      }
    }
  };
  return (
    <button
      onClick={goLogin}
      className="flex items-center justify-center px-2 py-2 text-gray-600 border border-gray-300 sm:px-1 hover:opacity-60 rounded-3xl print-hidden whitespace-nowrap"
    >
      <span className="md:mr-1 sm:text-xs">로그아웃</span>
      <LogOut className="md:w-6 md:h-5 sm:hidden" />
    </button>
  );
}

export default Logout;
