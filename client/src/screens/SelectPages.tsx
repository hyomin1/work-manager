import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Truck } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-[#0EA5E9] to-[#10B981]">
      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        <SelectionCard
          title="근무 현황"
          description="근무 현황 확인"
          icon={<Users size={40} />}
          color="bg-[#10B981]"
          onClick={() => navigate('/employee-status')}
        />
        <SelectionCard
          title="차량 운행 일지"
          description="차량 운행 기록 및 관리"
          icon={<Truck size={40} />}
          color="bg-[#0EA5E9]"
          onClick={() => navigate('/driving-status')}
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
    <h2 className="mb-2 text-2xl font-bold">{title}</h2>
    <p className="text-sm opacity-80">{description}</p>
  </button>
);

export default SelectPages;
