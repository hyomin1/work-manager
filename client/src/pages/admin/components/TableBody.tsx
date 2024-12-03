import { useEffect, useState } from "react";
import AdminAdd from "../AdminAdd";
import { TABS } from "../../../constants/adminTabs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { IDestinations } from "../../../interfaces/interface";
import { getDestinations } from "../../../api";
import { Edit, Trash2 } from "lucide-react";
import AdminEdit from "../AdminEdit";
import { Autocomplete, TextField } from "@mui/material";
import { ListPlus } from "lucide-react";

// 관리 페이지 테이블 본문
interface TabContentProps {
  activeTab: string;
  data: any[];
  removeItem: (id: string) => void;
  queryClient: QueryClient;

  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
}

const TableBody = ({
  activeTab,
  data,
  removeItem,
  queryClient,
  destination,
  setDestination,
}: TabContentProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const activeTabConfig = TABS.find((tab) => tab.key === activeTab);

  const [item, setItem] = useState<{ [key: string]: string } | null>(null); // 수정할 아이템
  const [itemId, setItemId] = useState(""); //수정할 아이템 _id

  const { data: destinations } = useQuery<IDestinations[]>({
    queryKey: ["destinations"],
    queryFn: getDestinations,
    enabled: activeTab === "business",
    select: (data) => (activeTab === "business" ? data : []),
  });

  const handleAddData = () => {
    if (activeTab === "business" && destination === "") {
      alert("방문지를 선택해주세요.");
      return;
    }
    setIsAdding(true);
  };

  const editItem = (id: string, item: any) => {
    setItemId(id);
    setItem({ [activeTab]: item[activeTab] });
    setIsEditing(true);
  };
  useEffect(() => {
    if (activeTab !== "business") {
      setDestination(""); // 다른 탭으로 변경 시 destination을 초기화
    }
  }, [activeTab, setDestination]);

  return (
    <div>
      {isAdding && (
        <AdminAdd
          setIsAdding={setIsAdding}
          type={activeTab}
          queryClient={queryClient}
          destination={destination}
        />
      )}
      {isEditing && (
        <AdminEdit
          setIsEditing={setIsEditing}
          type={activeTab}
          queryClient={queryClient}
          destination={destination}
          itemId={itemId}
          item={item}
        />
      )}
      <div className="flex w-full items-center justify-between border-b border-gray-200 bg-white">
        <div className="whitespace-nowrap bg-white p-4 font-bold sm:text-sm md:w-[35%] md:text-lg">
          {activeTab === "business" ? (
            <Autocomplete
              value={destination || ""} // null 체크 추가
              options={
                destinations
                  ?.sort((a, b) => a.destination.localeCompare(b.destination))
                  .map((item) => `${item._id},${item.destination}`) || []
              }
              getOptionLabel={(option) => option.split(",")[1] || ""} // 표시되는 텍스트는 destination 부분만
              onChange={(e, newValue) => {
                setDestination(newValue || "");
              }}
              renderInput={(params) => (
                <TextField {...params} label="방문지 선택" />
              )}
            />
          ) : (
            <span>목록</span>
          )}
        </div>

        <div className="mr-1">
          <button
            onClick={handleAddData}
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-6 py-3 text-blue-600 transition-all hover:bg-blue-100"
          >
            <ListPlus className="h-6 w-6" />
            <div className="bg-white">
              <span className="text-lg font-semibold">등록</span>
            </div>
          </button>
        </div>
      </div>
      {data.map((item, index) => (
        <div
          key={item._id}
          className={`flex items-center justify-between border-b border-gray-200 p-4 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
        >
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap sm:text-lg">
            {activeTab === "business" && <span>{item.business}</span>}
            {activeTab !== "business" && (
              <span>{item[activeTabConfig?.dataKey || ""]}</span>
            )}
          </div>
          <div className="flex items-center justify-evenly gap-2">
            <button
              className="flex items-center hover:opacity-60"
              onClick={() => editItem(item._id, item)}
            >
              <Edit strokeWidth={2.2} />
              <span className="ml-1 font-semibold">수정</span>
            </button>
            <button
              className="flex items-center hover:opacity-60"
              onClick={() => removeItem(item._id)}
            >
              <Trash2 strokeWidth={2.2} />
              <span className="ml-1 font-semibold">삭제</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableBody;
