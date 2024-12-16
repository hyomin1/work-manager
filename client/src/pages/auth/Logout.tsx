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
      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all hover:from-blue-600 hover:to-blue-700 active:scale-95 sm:px-2 sm:py-2 md:px-4 md:py-2.5 print:hidden"
    >
      <LogOut className="h-5 w-5 sm:hidden" />
      <span className="whitespace-nowrap text-sm font-medium sm:text-[0.8rem]">
        로그아웃
      </span>
    </button>
  );
}

export default Logout;
