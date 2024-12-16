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
      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all hover:from-blue-600 hover:to-blue-700 active:scale-95 sm:px-2 sm:py-2 md:px-4 md:py-2.5 print:hidden"
    >
      <ArrowLeft className="h-5 w-5 sm:hidden" />
      <span className="whitespace-nowrap text-sm font-medium sm:text-[0.8rem]">
        뒤로가기
      </span>
    </button>
  );
}

export default ArrowBack;
