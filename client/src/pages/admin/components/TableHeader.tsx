import { TABS } from "../../../constants/adminTabs";

interface TabHeaderProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

// 관리 페이지 테이블 헤더
function TableHeader({ activeTab, onTabClick }: TabHeaderProps) {
  return (
    <div className="w-[100%]">
      <div className="flex w-[100%] whitespace-nowrap text-left sm:text-sm">
        {TABS.map((tab) => (
          <div
            key={tab.key}
            className={`w-[16.666667%] cursor-pointer p-4 font-bold sm:flex sm:items-center sm:justify-center ${
              tab.key === TABS[0].key ? "rounded-tl-xl" : ""
            } ${
              tab.key === TABS[TABS.length - 1].key ? "rounded-tr-xl" : ""
            } hover:opacity-60 ${
              activeTab === tab.key ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => onTabClick(tab.key)}
          >
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableHeader;
