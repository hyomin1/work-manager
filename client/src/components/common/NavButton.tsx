import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'blue' | 'green';
}

export default function NavButton({
  icon: Icon,
  label,
  onClick,
  variant,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center justify-center rounded-lg border py-2 md:gap-3 md:px-4 ${
        variant === 'blue'
          ? 'border-blue-100 bg-gradient-to-b from-blue-50/50 to-blue-100/50 hover:border-blue-200'
          : 'border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-emerald-100/50 hover:border-emerald-200'
      } transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:mr-0 sm:flex-1 md:mr-4`}
    >
      <div className='relative flex items-center justify-center md:gap-3'>
        <Icon
          className={`transition-all duration-200 group-hover:scale-105 sm:mr-1 sm:h-3 sm:w-3 md:h-5 md:w-5 ${
            variant === 'blue' ? 'text-blue-600' : 'text-emerald-600'
          } group-hover:${
            variant === 'blue' ? 'text-blue-700' : 'text-emerald-700'
          }`}
        />
        <span
          className={`relative whitespace-nowrap font-medium transition-all duration-200 ${
            variant === 'blue' ? 'text-blue-700' : 'text-emerald-700'
          } sm:text-xs`}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
