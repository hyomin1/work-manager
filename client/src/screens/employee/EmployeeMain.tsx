import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq, calDate, getEmployeeInform } from "../../api";
import AdminLogin from "../admin/AdminLogin";
import { SlRefresh } from "react-icons/sl";
import TabHeader from "../../components/TabHeader";
import Page from "../../components/Page";
import { employeeHeaders } from "../../constants/headers";
import Title from "../../components/Title";
import ArrowBack from "../../components/ArrowBack";
import { Edit, X, Settings, Pencil, Truck } from "lucide-react";
import Logout from "../auth/Logout";
import EditInform from "./EditInform";
import { IInform } from "../../interfaces/interface";

function Main() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: inform, refetch } = useQuery<IInform[]>({
    queryKey: ["employeeInform"],
    queryFn: () => getEmployeeInform(currentDate),
    refetchInterval: 300_000, // 5분마다 refetch
  });

  const [isShow, setIsShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [editingItemId, setEditingItemId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = inform ? Math.ceil(inform.length / itemsPerPage) : 0;

  const navigate = useNavigate();

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const onClickInputInform = () => {
    navigate("/employee-input");
  };

  const onClickAdmin = () => {
    setIsShow(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(new Date(e.target.value));
    setShowInput(false);
    setCurrentPage(1);
  };

  const editInform = async (id: string) => {
    setEditingItemId(id);
  };

  const deleteInform = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosReq.delete(
        `/api/employee-inform/removeInform/${id}`
      );
      if (res.status === 200) {
        alert(res.data.message);
        refetch();
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [currentDate, refetch]);

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen p-10 sm:p-2 bg-gray-50 ">
      {isShow && <AdminLogin setIsShow={setIsShow} />}
      <div className="sm:w-full w-[90%] flex flex-col items-center">
        <div className="flex items-center justify-between w-full mt-2 mb-4 sm:mt-4">
          <ArrowBack type="home" />

          <Title
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            setShowInput={setShowInput}
            calDate={calDate}
            category="employee"
          />
          <Logout />
        </div>

        {showInput && (
          <div className="w-[21%] sm:w-[40%] flex justify-center">
            <input
              type="date"
              value={currentDate.toISOString().split("T")[0] || ""}
              className="sm:w-full w-[60%] my-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              onChange={handleDateChange}
            />
          </div>
        )}

        <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl">
          <span className="ml-4 font-bold md:text-xl">목록</span>
          <div className="p-4 items-center flex w-[50%] justify-end">
            <button
              onClick={() => navigate("/driving-status")}
              className="sm:whitespace-nowrap bg-[#007BFF] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 hover:opacity-60 mr-4 sm:mr-2 button-effect flex justify-center items-center"
            >
              <Truck />
              <span className="ml-1">차량</span>
            </button>
            <button
              className="sm:whitespace-nowrap bg-[#00ab39] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 button-effect mr-4 sm:mr-2 flex justify-center items-center"
              onClick={onClickInputInform}
            >
              <Pencil />
              <span className="ml-1">입력</span>
            </button>
            <button
              className="sm:whitespace-nowrap bg-[#007BFF] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 hover:opacity-60  sm:ml-2 button-effect flex justify-center items-center"
              onClick={onClickAdmin}
            >
              <Settings />
              <span className="ml-1">관리</span>
            </button>
            <div className="mx-4 border border-gray-300 md:h-10 sm:h-8" />
            <button onClick={() => refetch()}>
              <SlRefresh className="md:w-7 md:h-7 sm:w-5 sm:h-5 hover:opacity-60" />
            </button>
          </div>
        </div>

        <table className="w-[100%] rounded-2xl shadow-lg text-left">
          <TabHeader headers={employeeHeaders} category="employee" />

          <tbody className="h-full overflow-y-auto rounded-b-xl ">
            {inform
              ?.sort((a, b) => {
                if (a.destination === b.destination) {
                  return a.username.localeCompare(b.username); // username으로 정렬
                }
                return a.destination.localeCompare(b.destination); //destination으로 정렬
              })
              .slice(indexOfFirstItem, indexOfLastItem)

              .map((item, index) => (
                <tr
                  key={index}
                  className={`sm:text-sm w-[100%] ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="border-b border-black md:p-4 sm:p-2 whitespace-nowrap">
                    {item.username}
                  </td>
                  <td className="border-b border-black md:p-4 sm:p-1 ">
                    {item.destination}
                  </td>
                  <td className="border-b border-black md:p-4 sm:p-1 ">
                    {item.business}
                  </td>
                  <td className="border-b border-black md:p-4 sm:p-1 ">
                    {item.work}
                  </td>
                  <td className="border-b border-black md:p-4 sm:p-1">
                    {item.car}
                  </td>
                  <td className="border-b border-black md:p-4 sm:p-1">
                    {item.isOwner && (
                      <div className="flex justify-evenly">
                        <Edit
                          onClick={() => editInform(item._id)}
                          className="w-6 h-6 sm:w-5 sm:h-5 hover:opacity-60"
                        />
                        <X
                          onClick={() => deleteInform(item._id)}
                          className="w-6 h-6 sm:w-5 sm:h-5 hover:opacity-60"
                        />
                        {editingItemId === item._id && (
                          <EditInform
                            item={item}
                            setEditingItemId={setEditingItemId}
                          />
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <Page
        totalPage={totalPages}
        page={currentPage}
        onPageChange={handleClick}
      />
    </div>
  );
}

export default Main;
