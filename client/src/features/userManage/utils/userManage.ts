import { ShieldCheck, UserCircle, Car, Clock } from 'lucide-react';

export const getRoleInfo = (role: number) => {
  switch (role) {
    case 3:
      return {
        icon: ShieldCheck,
        color: 'bg-violet-50 text-violet-600 border-violet-100',
        label: '관리자',
      };
    case 2:
      return {
        icon: UserCircle,
        color: 'bg-blue-50 text-blue-600 border-blue-100',
        label: '일반',
      };
    case 1:
      return {
        icon: Car,
        color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        label: '차량 전용',
      };
    default:
      return {
        icon: Clock,
        color: 'bg-amber-50 text-amber-600 border-amber-100',
        label: '승인 대기',
      };
  }
};
