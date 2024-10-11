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
    <div className="w-[15%] flex justify-end">
      <LogOut
        onClick={goLogin}
        className=" md:w-12 md:h-8 hover:opacity-60 print-hidden"
      />
    </div>
  );
}

export default Logout;
