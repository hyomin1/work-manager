import { LogOut } from "lucide-react";

// 로그아웃 버튼
function Blank() {
  return (
    <div className="print-hidden flex items-center justify-center whitespace-nowrap rounded-3xl px-2 py-2 text-white hover:opacity-60 sm:px-1">
      <span className="sm:text-xs md:mr-1">로그아웃</span>
      <LogOut className="sm:hidden md:h-5 md:w-6" />
    </div>
  );
}

export default Blank;
