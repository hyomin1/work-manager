import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/constant";

interface NavProps {
  refetch: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavigationButtons({ refetch, setIsOpen }: NavProps) {
  const navigate = useNavigate();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      refetch();
      setIsRefreshing(false);
    }, 110);
  };
  return (
    <div
      className={`flex w-[100%] items-center justify-between rounded-t-2xl border border-t-gray-300 bg-[#f8fafd] ${
        isRefreshing
          ? "opacity-0 transition-opacity duration-500"
          : "opacity-100"
      }`}
    >
      <div className="w-full p-4 sm:p-3">
        <div className="flex items-center justify-between sm:flex-col">
          <div className="flex sm:mb-2 sm:w-full sm:gap-2">
            <button
              className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#10B981] px-4 py-2 text-white sm:mr-0 sm:flex-1 md:mr-4"
              onClick={() => setIsOpen(true)}
            >
              <Pencil className="sm:h-4 sm:w-4" />
              <span className="ml-1 sm:text-xs">작성</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationButtons;
