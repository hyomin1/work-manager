import { TABS } from "../constants/adminTabs";

interface TabHeaderProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

function TabHeaderAdmin({ activeTab, onTabClick }: TabHeaderProps) {
  return (
    <div className="w-[100%]">
      <div className="text-left whitespace-nowrap sm:text-sm flex w-[100%]">
        {TABS.map((tab) => (
          <div
            key={tab.key}
            className={`p-4 font-bold w-[16.666667%] cursor-pointer sm:flex sm:justify-center sm:items-center ${
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

export default TabHeaderAdmin;
