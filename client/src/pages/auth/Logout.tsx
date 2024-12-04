import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { axiosReq } from "../../api";
import { ROUTES } from "../../constants/constant";

// 로그아웃 로직
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
      className="print-hidden button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#0EA5E9] text-white hover:opacity-60 sm:ml-1 sm:flex-1 sm:px-2 sm:py-1 md:mr-2 md:px-4 md:py-2"
    >
      <LogOut className="sm:hidden md:h-6 md:w-6" />
      <span className="sm:text-xs md:ml-1">로그아웃</span>
    </button>
  );
}

export default Logout;
