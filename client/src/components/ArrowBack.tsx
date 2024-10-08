import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IArrowProps {
  type: string;
}

function ArrowBack({ type }: IArrowProps) {
  const navigate = useNavigate();

  const goBack = () => {
    if (type === "home") {
      navigate("/home");
      return;
    }
    navigate(-1);
  };
  return (
    <div className="w-[15%]">
      <ArrowLeft
        onClick={goBack}
        className=" md:w-12 md:h-8 hover:opacity-60 print-hidden"
      />
    </div>
  );
}

export default ArrowBack;
