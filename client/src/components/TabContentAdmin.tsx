import { useEffect, useState } from "react";
import AddData from "./AddData";
import { FaPlus } from "react-icons/fa6";
import { TABS } from "../constants/adminTabs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { IDestinations } from "../interfaces/interface";
import { getDestinations } from "../api";
import { X, Edit } from "lucide-react";
import axiosApi from "../axios";
import EditData from "./EditData";

interface TabContentProps {
  activeTab: string;
  data: any[];
  removeItem: (id: string) => void;
  queryClient: QueryClient;

  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
}

const TabContentAdmin = ({
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

  const { data: destinations, isLoading: destinationsLoading } = useQuery<
    IDestinations[]
  >({
    queryKey: ["destinations"],
    queryFn: getDestinations,
    enabled: activeTab === "business",
    select: (data) => (activeTab === "business" ? data : []),
  });
  const handleDestination = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDestination(e.target.value);
  };

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
        <AddData
          setIsAdding={setIsAdding}
          type={activeTab}
          queryClient={queryClient}
          destination={destination}
        />
      )}
      {isEditing && (
        <EditData
          setIsEditing={setIsEditing}
          type={activeTab}
          queryClient={queryClient}
          destination={destination}
          itemId={itemId}
          item={item}
        />
      )}
      <div className="flex justify-between items-center border-b border-gray-200">
        <div className="bg-white p-4 font-bold text-lg whitespace-nowrap sm:text-lg ">
          {activeTab === "business" ? (
            <select
              defaultValue=""
              onChange={handleDestination}
              className="hover:opacity-60 border rounded-md p-2 sm:w-full sm:ml-0"
            >
              <option disabled value="">
                방문지 선택
              </option>
              {destinations
                ?.sort((a, b) => a.destination.localeCompare(b.destination))
                .map((item, index) => (
                  <option key={index} value={`${item._id},${item.destination}`}>
                    {item.destination}
                  </option>
                ))}
            </select>
          ) : (
            "목록"
          )}
        </div>

        <div className="mr-1">
          <button
            className="bg-[#00ab39] rounded-full text-white p-2 hover:opacity-60 font-bold"
            onClick={handleAddData}
          >
            <FaPlus className="w-5 h-5 sm:w-3 sm:h-3" />
          </button>
        </div>
      </div>
      {data.map((item, index) => (
        <div
          key={item._id}
          className={`flex justify-between items-center border-b border-gray-200 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
        >
          <div className="p-4 border-b border-gray-200 whitespace-nowrap sm:text-lg overflow-ellipsis overflow-hidden">
            {activeTab === "business" && <span>{item.business}</span>}
            {activeTab !== "business" && (
              <span>{item[activeTabConfig?.dataKey || ""]}</span>
            )}
          </div>

          <div className="flex items-center">
            <button
              onClick={() => editItem(item._id, item)}
              className="p-2 hover:opacity-60 "
            >
              <Edit className="w-7 h-7 sm:w-5 sm:h-5" />
            </button>
            <button
              className="p-2 hover:opacity-60 "
              onClick={() => removeItem(item._id)}
            >
              <X className="w-7 h-7 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabContentAdmin;
