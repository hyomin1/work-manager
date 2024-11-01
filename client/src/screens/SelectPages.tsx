import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Truck, ChevronRight } from 'lucide-react';
import { ROUTES } from '../constants/constant';

interface SelectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SelectPages = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100">
      {/* 배경 장식 요소 */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100/50 to-transparent" />
      <div className="absolute w-32 h-32 bg-blue-200 rounded-full top-10 left-10 blur-3xl opacity-20" />
      <div className="absolute w-40 h-40 bg-green-200 rounded-full top-20 right-20 blur-3xl opacity-20" />

      <div className="relative flex flex-col w-full max-w-6xl gap-8 px-6 py-8 mx-auto">
        {/* 상단 장식 패턴 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="h-2 rounded-full bg-blue-200/50"></div>
          <div className="h-2 rounded-full bg-green-200/50"></div>
          <div className="h-2 rounded-full bg-blue-200/50"></div>
        </div>

        {/* 웰컴 메시지 또는 장식적 타이틀 */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-blue-200"></div>
          <div className="px-6 text-3xl font-light text-gray-400">메뉴</div>
          <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-blue-200"></div>
        </div>

        {/* 메인 메뉴 카드 */}
        <div className="grid w-full gap-6 md:grid-cols-2">
          <SelectionCard
            title="근무 현황"
            description="근무 현황 확인"
            icon={<Users className="text-blue-600" size={32} />}
            onClick={() => navigate(ROUTES.EMPLOYEE_STATUS)}
          />
          <SelectionCard
            title="차량 운행 일지"
            description="차량 운행 기록 및 관리"
            icon={<Truck className="text-blue-600" size={32} />}
            onClick={() => navigate(ROUTES.DRIVING_STATUS)}
          />
        </div>

        {/* 하단 장식 패턴 */}
        <div className="grid grid-cols-5 gap-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full bg-gradient-to-r from-blue-100 to-green-100"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SelectionCard = ({
  title,
  description,
  icon,
  onClick,
}: SelectionCardProps) => (
  <button
    className="relative flex flex-col items-center w-full p-8 text-center transition-all duration-300 bg-white border-2 border-transparent shadow-lg group rounded-2xl hover:border-blue-500 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    onClick={onClick}
  >
    <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform duration-300 rounded-full bg-blue-50 group-hover:scale-110">
      {icon}
    </div>
    <h2 className="mb-3 text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
      {title}
    </h2>
    <p className="text-gray-600">{description}</p>
    <ChevronRight
      className="absolute text-blue-600 transition-all duration-300 -translate-y-1/2 opacity-0 right-6 top-1/2 group-hover:opacity-100 group-hover:translate-x-2"
      size={24}
    />
  </button>
);

export default SelectPages;
