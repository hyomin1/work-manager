import { LogOut } from "lucide-react";

// 로그아웃 버튼
function Blank() {
  return (
    <button className="print-hidden button-effect flex items-center justify-center whitespace-nowrap rounded-lg text-white hover:opacity-60 sm:ml-1 sm:flex-1 sm:px-2 sm:py-1 md:mr-2 md:bg-[#0EA5E9] md:px-4 md:py-2">
      <LogOut className="sm:hidden md:h-6 md:w-6" />
      <span className="sm:hidden sm:text-xs md:ml-1">로그아웃</span>
    </button>
  );
}

export default Blank;
