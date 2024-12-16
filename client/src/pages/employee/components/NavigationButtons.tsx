import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  LineChart,
  Pencil,
  Settings,
  Truck,
  Users,
  RefreshCw,
} from "lucide-react";
import { ROUTES } from "../../../constants/constant";
import { checkAdminSession } from "../../../api";

type Category = "STATISTICS" | "SETTINGS" | "MANAGE";

interface NavProps {
  refetch: () => void;
}

const NavigationButtons = ({ refetch }: NavProps) => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleAdminAction = async (category: Category) => {
    const status = await checkAdminSession();
    if (status === 200) {
      navigate(`${ROUTES.ADMIN[category]}`);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      refetch();
      setIsRefreshing(false);
    }, 110);
  };

  const NavButton = ({
    icon: Icon,
    label,
    onClick,
    variant = "blue",
  }: {
    icon: any;
    label: string;
    onClick: () => void;
    variant?: "blue" | "green";
  }) => (
    <button
      onClick={onClick}
      className={`group relative flex items-center justify-center rounded-lg border py-2 md:gap-3 md:px-4 ${
        variant === "blue"
          ? "border-blue-100 bg-gradient-to-b from-blue-50/50 to-blue-100/50 hover:border-blue-200"
          : "border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-emerald-100/50 hover:border-emerald-200"
      } transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:mr-0 sm:flex-1 md:mr-4`}
    >
      <div className="relative flex items-center justify-center md:gap-3">
        <Icon
          className={`transition-all duration-200 group-hover:scale-105 sm:mr-1 sm:h-3 sm:w-3 md:h-5 md:w-5 ${variant === "blue" ? "text-blue-600" : "text-emerald-600"} group-hover:${variant === "blue" ? "text-blue-700" : "text-emerald-700"}`}
        />
        <span
          className={`relative whitespace-nowrap font-medium transition-all duration-200 ${variant === "blue" ? "text-blue-700" : "text-emerald-700"} sm:text-xs`}
        >
          {label}
        </span>
      </div>
    </button>
  );

  return (
    <div
      className={`mb-8 w-full rounded-lg border-0 bg-white/90 p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all duration-500 ${isRefreshing ? "opacity-0" : "opacity-100"} sm:p-3`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between gap-6 sm:flex-col sm:gap-3">
          <div className="flex flex-1 sm:mb-2 sm:w-full sm:gap-2">
            <NavButton
              icon={Truck}
              label="차량"
              onClick={() => navigate(ROUTES.VEHICLES.LIST)}
              variant="blue"
            />
            <NavButton
              icon={Pencil}
              label="입력"
              onClick={() => navigate(ROUTES.EMPLOYEES.CREATE)}
              variant="green"
            />
            <NavButton
              icon={Calendar}
              label="일정"
              onClick={() => navigate(ROUTES.SCHEDULE)}
              variant="blue"
            />
            <NavButton
              icon={FileText}
              label="업무"
              onClick={() => navigate(ROUTES.EMPLOYEES.DAILY_WORK)}
              variant="green"
            />
          </div>

          <div className="flex justify-end sm:w-full sm:gap-2">
            <NavButton
              icon={Users}
              label="관리"
              onClick={() => handleAdminAction("MANAGE")}
              variant="blue"
            />
            <NavButton
              icon={Settings}
              label="설정"
              onClick={() => handleAdminAction("SETTINGS")}
              variant="green"
            />
            <NavButton
              icon={LineChart}
              label="통계"
              onClick={() => handleAdminAction("STATISTICS")}
              variant="blue"
            />
            <button className="flex items-center">
              <div className="mx-4 h-10 w-px bg-slate-200" />
              <RefreshCw
                onClick={handleRefresh}
                className={`text-slate-600 transition-all duration-200 hover:text-slate-800 sm:h-4 sm:w-4 md:h-6 md:w-6 ${isRefreshing ? "animate-spin" : ""} hover:opacity-80`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationButtons;
