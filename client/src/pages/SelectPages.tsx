import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Truck, ChevronRight } from "lucide-react";
import { ROUTES } from "../constants/constant";
import { checkCarSession } from "../api";

interface SelectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

// 로그인 후 근무 현황, 차량 운행일지 선택 화면
const SelectPages = () => {
  const navigate = useNavigate();

  const checkUser = async () => {
    const response = await checkCarSession();
    if (response.isUser) {
      navigate(ROUTES.EMPLOYEES.LIST);
      return;
    }
    alert("권한이 없습니다.");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100">
      {/* 배경 장식 요소 */}
      <div className="absolute left-0 top-0 h-64 w-full bg-gradient-to-b from-blue-100/50 to-transparent" />
      <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-blue-200 opacity-20 blur-3xl" />
      <div className="absolute right-20 top-20 h-40 w-40 rounded-full bg-green-200 opacity-20 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8">
        {/* 상단 장식 패턴 */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="h-2 rounded-full bg-blue-200/50" />
          <div className="h-2 rounded-full bg-green-200/50" />
          <div className="h-2 rounded-full bg-blue-200/50" />
        </div>

        {/* 웰컴 메시지 또는 장식적 타이틀 */}
        <div className="mb-8 flex items-center justify-center">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-blue-200" />
          <div className="px-6 text-3xl font-light text-gray-400">메뉴</div>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-blue-200" />
        </div>

        {/* 메인 메뉴 카드 */}
        <div className="grid w-full gap-6 md:grid-cols-2">
          <SelectionCard
            title="근무 현황"
            description="근무 현황 확인"
            icon={<Users className="text-blue-600" size={32} />}
            onClick={checkUser}
          />
          <SelectionCard
            title="차량 운행 일지"
            description="차량 운행 기록 및 관리"
            icon={<Truck className="text-blue-600" size={32} />}
            onClick={() => navigate(ROUTES.VEHICLES.LIST)}
          />
        </div>

        {/* 하단 장식 패턴 */}
        <div className="mt-8 grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full bg-gradient-to-r from-blue-100 to-green-100"
            />
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
    className="group relative flex w-full flex-col items-center rounded-2xl border-2 border-transparent bg-white p-8 text-center shadow-lg transition-all duration-300 hover:border-blue-500 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    onClick={onClick}
  >
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h2 className="mb-3 text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
      {title}
    </h2>
    <p className="text-gray-600">{description}</p>
    <ChevronRight
      className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100"
      size={24}
    />
  </button>
);

export default SelectPages;
