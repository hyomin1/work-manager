import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IArrowProps {
  type: string;
}

function ArrowBack({ type }: IArrowProps) {
  const navigate = useNavigate();

  const goBack = () => {
    if (type === 'home') {
      navigate('/home');
      return;
    }
    navigate(-1);
  };
  return (
    <button
      onClick={goBack}
      className="flex items-center justify-center px-2 py-2 text-gray-600 border border-gray-300 hover:opacity-60 rounded-3xl print-hidden whitespace-nowrap"
    >
      <ArrowLeft className=" md:w-6 md:h-5 sm:hidden" />
      <span className="md:ml-1 sm:text-xs">뒤로가기</span>
    </button>
  );
}

export default ArrowBack;
