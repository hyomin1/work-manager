import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { axiosReq, formDate } from "../../api";
import Page from "../../components/Page";
import TabHeaderAdmin from "./TabHeaderAdmin";
import TabContentAdmin from "./TabContentAdmin";
import { useAdminData } from "../../hooks/useAdminData";
import ArrowBack from "../../components/ArrowBack";
import { LogOut } from "lucide-react";
import Logout from "../auth/Logout";
import Blank from "../../components/Blank";

function Admin() {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<string>("username");

  const [page, setPage] = useState(1);
  const { data, removeItem } = useAdminData(activeTab, page, queryClient);
  const [destination, setDestination] = useState("");

  const checkAdminSession = async () => {
    await axiosReq.get("/auth/checkAdminSession");
  };
  useEffect(() => {
    checkAdminSession();
  }, []);

  const handleTabClick = (tab: string) => {
    setPage(1);
    setActiveTab(tab);
  };
  const handlePage = (page: number) => {
    setPage(page);
  };
  const filteredData = data.filter((item) => {
    if (activeTab === "business") {
      return item.destinationId === destination.split(",")[0].trim();
    }
    return true; // business 탭이 아니면 필터링 없이 모든 항목 반환
  });
  const itemsPerPage = 10;
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = paginatedData
    ? Math.ceil(filteredData.length / itemsPerPage)
    : 0;

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-10">
      <div className="sm:w-full w-[80%] flex flex-col items-center h-screen">
        <div className="mt-4 mb-20 flex items-center md:justify-center w-full sm:mb-10 ">
          <div className="w-full flex justify-between items-center">
            <ArrowBack type="not home" />
            <div className="flex items-center justify-center">
              <span className="font-bold md:text-3xl md:mx-8 sm:mx-2 whitespace-nowrap">
                {formDate}
              </span>
            </div>
            <div className="w-[11%]" />
          </div>
        </div>

        <div className="w-[100%] ">
          <TabHeaderAdmin activeTab={activeTab} onTabClick={handleTabClick} />

          <TabContentAdmin
            activeTab={activeTab}
            data={paginatedData}
            removeItem={removeItem}
            queryClient={queryClient}
            destination={destination}
            setDestination={setDestination}
          />
        </div>
      </div>
      <Page totalPage={totalPages} page={page} onPageChange={handlePage} />
    </div>
  );
}

export default Admin;
