import { TABS } from "../../../constants/adminTabs";
import { Tab, Tabs } from "@mui/material";

interface TabHeaderProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const TableHeader = ({ activeTab, onTabClick }: TabHeaderProps) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => onTabClick(newValue)}
          variant="scrollable"
          scrollButtons={false}
          textColor="primary"
          indicatorColor="primary"
          className="min-h-[48px]"
          sx={{
            "& .MuiTabs-scroller": {
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.key}
              value={tab.key}
              label={tab.label}
              className="min-h-[48px] font-semibold transition-colors hover:bg-blue-50"
              sx={{
                minWidth: { xs: "120px", sm: "160px" },
              }}
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TableHeader;
