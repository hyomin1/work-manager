import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { axiosReq } from "../../api";

function Logout() {
  const navigate = useNavigate();
  const goLogin = async () => {
    const isConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirm) {
      const res = await axiosReq.post("/auth/logout");
      if (res.status === 200) {
        navigate("/");
      }
    }
  };
  return (
    <button
      onClick={goLogin}
      className="px-2 sm:px-1 flex justify-center items-center border border-gray-300 hover:opacity-60 text-gray-600 py-2 rounded-3xl print-hidden whitespace-nowrap"
    >
      <span className="md:mr-1 sm:text-xs">로그아웃</span>
      <LogOut className="md:w-6 md:h-5 sm:hidden" />
    </button>
  );
}

export default Logout;
