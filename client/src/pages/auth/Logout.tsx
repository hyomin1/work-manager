import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { axiosReq } from "../../api";
import { ROUTES } from "../../constants/constant";

function Logout() {
  const navigate = useNavigate();
  const goLogin = async () => {
    const isConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirm) {
      const res = await axiosReq.post("/auth/logout");
      if (res.status === 200) {
        navigate(ROUTES.AUTH.LOGIN);
      }
    }
  };
  return (
    <button
      onClick={goLogin}
      className="print-hidden flex items-center justify-center whitespace-nowrap rounded-3xl border border-gray-300 px-2 py-2 text-gray-600 hover:opacity-60 sm:px-1"
    >
      <span className="sm:text-xs md:mr-1">로그아웃</span>
      <LogOut className="sm:hidden md:h-5 md:w-6" />
    </button>
  );
}

export default Logout;
