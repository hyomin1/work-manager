import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/constant";

interface IArrowProps {
  type: string;
}

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
      className="print-hidden flex items-center justify-center whitespace-nowrap rounded-3xl border border-gray-300 px-2 py-2 text-gray-600 hover:opacity-60"
    >
      <ArrowLeft className="sm:hidden md:h-5 md:w-6" />
      <span className="sm:text-xs md:ml-1">뒤로가기</span>
    </button>
  );
}

export default ArrowBack;
