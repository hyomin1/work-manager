import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { directAdminSession, formDate } from "../../api";
import Page from "../../components/common/Page";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { useAdminData } from "../../hooks/useAdminData";
import ArrowBack from "../../components/common/ArrowBack";
import Blank from "../../components/common/Blank";

// 관리 페이지 전체 화면
function AdminPage() {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<string>("username");

  const [page, setPage] = useState(1);
  const { data, removeItem } = useAdminData(activeTab, page, queryClient);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    directAdminSession();
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
    return true;
  });
  const itemsPerPage = 10;
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = paginatedData
    ? Math.ceil(filteredData.length / itemsPerPage)
    : 0;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between bg-gradient-to-br from-zinc-50 to-slate-100 p-10 sm:p-2">
      <div className="flex h-screen w-[90%] flex-col items-center sm:w-full">
        <div className="mb-20 mt-4 flex w-full items-center sm:mb-10 md:justify-center">
          <div className="flex w-full items-center justify-between">
            <ArrowBack type="not home" />
            <span className="whitespace-nowrap font-bold sm:mx-1 sm:block sm:w-[33%] sm:text-lg md:mx-8 md:text-3xl">
              {formDate}
            </span>
            <Blank />
          </div>
        </div>

        <div className="w-[100%] shadow-xl">
          <TableHeader activeTab={activeTab} onTabClick={handleTabClick} />

          <TableBody
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

export default AdminPage;
