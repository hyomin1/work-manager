import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/constant";

interface IArrowProps {
  type: string;
}

// 뒤로가기 버튼
function ArrowBack({ type }: IArrowProps) {
  const navigate = useNavigate();

  const goBack = () => {
    if (type === "home") {
      navigate(ROUTES.DASHBOARD);
      return;
    }
    navigate(-1);
  };
  return (
    <button
      onClick={goBack}
      className="print-hidden button-effect ml-2 flex items-center justify-center whitespace-nowrap rounded-lg bg-[#0EA5E9] px-4 py-2 text-white hover:opacity-60 sm:mr-0 sm:flex-1 md:mr-4"
    >
      <ArrowLeft className="sm:hidden md:mr-1 md:h-6 md:w-6" />
      <span className="sm:text-xs md:ml-1">뒤로가기</span>
    </button>
  );
}

export default ArrowBack;
