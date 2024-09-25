import React, { useState } from "react";
import AddData from "./AddData";
import { FaPlus } from "react-icons/fa6";
import { TABS } from "../constants/adminTabs";
import { IoClose } from "react-icons/io5";
import { QueryClient } from "@tanstack/react-query";

interface TabContentProps {
  activeTab: string;
  data: any[];
  removeItem: (id: string) => void;
  queryClient: QueryClient;
}

const TabContent = ({
  activeTab,
  data,
  removeItem,
  queryClient,
}: TabContentProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const activeTabConfig = TABS.find((tab) => tab.key === activeTab);
  return (
    <tbody>
      {isAdding && (
        <AddData
          setIsAdding={setIsAdding}
          type={activeTab}
          queryClient={queryClient}
        />
      )}
      <tr>
        <td className="bg-white p-4 border-b border-gray-200 font-bold text-xl">
          목록
        </td>
        <td className="border-b border-gray-200" />
        <td className="border-b border-gray-200" />
        <td className="border-b border-gray-200" />
        <td className="border-b border-gray-200">
          <button
            className="bg-[#00ab39] rounded-full text-white p-2 hover:opacity-60 font-bold"
            onClick={() => setIsAdding(true)}
          >
            <FaPlus className="w-5 h-5" />
          </button>
        </td>
      </tr>
      {data.map((item, index) => (
        <tr
          key={item._id}
          className={` ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
        >
          <td className="p-4 border-b border-gray-200">
            {item[activeTabConfig?.dataKey || ""]}
          </td>
          <td className=" border-b border-gray-200" />
          <td className="border-b border-gray-200" />
          <td className="border-b border-gray-200" />
          <td className="border-b border-gray-200">
            <button
              className="bg-[#FF0000] rounded-full text-white p-2 hover:opacity-60 font-bold"
              onClick={() => removeItem(item._id)}
            >
              <IoClose className="w-5 h-5" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TabContent;
