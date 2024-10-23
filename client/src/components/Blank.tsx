import { LogOut } from 'lucide-react';

function Blank() {
  return (
    <div className="flex items-center justify-center px-2 py-2 text-white sm:px-1 hover:opacity-60 rounded-3xl print-hidden whitespace-nowrap">
      <span className="md:mr-1 sm:text-xs">로그아웃</span>
      <LogOut className="md:w-6 md:h-5 sm:hidden" />
    </div>
  );
}

export default Blank;
