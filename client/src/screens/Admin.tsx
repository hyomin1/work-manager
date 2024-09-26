import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { formDate } from "../api";
import Page from "../components/Page";
import TabHeader from "../components/TabHeader";
import TabContent from "../components/TabContent";
import { useAdminData } from "../hooks/useAdminData";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

function Admin() {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<string>("name");

  const [page, setPage] = useState(1);
  const { data, totalPages, removeItem } = useAdminData(
    activeTab,
    page,
    queryClient
  );

  const handleTabClick = (tab: string) => {
    setPage(1);
    setActiveTab(tab);
  };
  const handlePage = (page: number) => {
    setPage(page);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-10">
      <div className="sm:w-full w-[80%] flex flex-col items-center h-screen">
        <div className="mt-4 mb-20 flex items-center md:justify-center w-full sm:mb-10 sm:justify-between">
          <div
            className="md:hidden sm:hover:opacity-60 sm:w-[10%] flex items-center"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack className="w-10 h-8" />
          </div>
          <div className="sm:w-[80%] flex items-center justify-center">
            <span className=" font-bold text-3xl sm:text-xl">{formDate}</span>
          </div>

          <div className="md-hidden sm:w-[10%]" />
        </div>

        <div className="w-[100%] ">
          <TabHeader activeTab={activeTab} onTabClick={handleTabClick} />

          <TabContent
            activeTab={activeTab}
            data={data}
            removeItem={removeItem}
            queryClient={queryClient}
          />
        </div>
      </div>
      <Page totalPage={totalPages} page={page} onPageChange={handlePage} />
    </div>
  );
}

export default Admin;
