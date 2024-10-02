import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Truck } from "lucide-react";

interface SelectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const SelectPages = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-blue-500 to-green-500 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <SelectionCard
          title="근무 현황"
          description="근무 현황 확인"
          icon={<Users size={40} />}
          color="bg-[#00ab39]"
          onClick={() => navigate("/employee-status")}
        />
        <SelectionCard
          title="차량 운행 일지"
          description="차량 운행 기록 및 관리"
          icon={<Truck size={40} />}
          color="bg-[#007BFF]"
          onClick={() => navigate("/driving-status")}
        />
      </div>
    </div>
  );
};

const SelectionCard = ({
  title,
  description,
  icon,
  color,
  onClick,
}: SelectionCardProps) => (
  <button
    className={`${color} hover:opacity-90 transition-all duration-300 rounded-lg p-6 flex flex-col items-center justify-center text-white shadow-lg transform hover:scale-105`}
    onClick={onClick}
  >
    <div className="mb-4">{icon}</div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-sm opacity-80">{description}</p>
  </button>
);

export default SelectPages;
