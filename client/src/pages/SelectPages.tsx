import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Truck,
  Activity,
  ClipboardList,
  CalendarRange,
  Wrench,
} from "lucide-react";
import { ROUTES } from "../constants/constant";
import { checkCarSession } from "../api";

interface SubMenu {
  icon: React.ReactNode;
  title: string;
  onClick: () => void; // 클릭 핸들러 추가
}

interface MenuCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  subMenus: SubMenu[];
}

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="fixed inset-0 -z-10">
        <div className="animate-blob absolute -left-4 top-0 h-72 w-72 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-xl filter" />
        <div className="animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-xl filter" />
        <div className="animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-xl filter" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-white/80 px-5 py-2 shadow-sm backdrop-blur-sm">
            <Activity className="mr-2 h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-800">메뉴 선택</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            원하시는 메뉴를 선택해주세요
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <MenuCard
            title="근무 현황"
            description="근무 현황 기록 및 관리"
            icon={<Users size={24} strokeWidth={2} />}
            onClick={checkUser}
            subMenus={[
              {
                icon: <ClipboardList className="h-5 w-5" />,
                title: "일일 업무 작성",
                onClick: () => navigate(ROUTES.EMPLOYEES.DAILY_WORK),
              },
              {
                icon: <CalendarRange className="h-5 w-5" />,
                title: "일정 관리",
                onClick: () => navigate(ROUTES.SCHEDULE),
              },
            ]}
          />
          <MenuCard
            title="차량 운행 일지"
            description="차량 운행 기록 및 관리"
            icon={<Truck size={24} strokeWidth={2} />}
            onClick={() => navigate(ROUTES.VEHICLES.LIST)}
            subMenus={[
              {
                icon: <Wrench className="h-5 w-5" />,
                title: "차량 정비내역",
                onClick: () => navigate(ROUTES.VEHICLES.SERVICE),
              },
              {
                icon: <div className="h-5 w-5" />,
                title: "",
                onClick: () => navigate(ROUTES.VEHICLES.LIST),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const MenuCard = ({
  title,
  description,
  icon,
  onClick,
  subMenus,
}: MenuCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative w-full flex-1">
        <div className="flex items-center gap-6">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-blue-600">
            {icon}
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>

          <div className="rounded-full p-2 text-gray-400 transition-colors duration-300 group-hover:bg-blue-50 group-hover:text-blue-600">
            →
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 border-t pt-6">
          {subMenus
            .filter((menu) => menu.title)
            .map((menu, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  menu.onClick();
                }}
                className="flex items-center gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-blue-50/50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100/50 text-blue-600">
                  {menu.icon}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {menu.title}
                </span>
              </div>
            ))}
        </div>
      </div>
    </button>
  );
};

export default SelectPages;
