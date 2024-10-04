import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calDate, getEmployeeInform } from "../../api";
import AdminLogin from "../../components/AdminLogin";
import { SlRefresh } from "react-icons/sl";
import TabHeader from "../../components/TabHeader";
import Page from "../../components/Page";
import { employeeHeaders } from "../../constants/headers";
import Title from "../../components/Title";
import ArrowBack from "../../components/ArrowBack";
import { X } from "lucide-react";
import axiosApi from "../../axios";

interface IInform {
  _id: string;
  username: string;
  destination: string;
  business: string;
  work: string;
  car: string;
  createdAt: Date;
  isOwner: boolean;
}
function Main() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: inform, refetch } = useQuery<IInform[]>({
    queryKey: ["employeeInform"],
    queryFn: () => getEmployeeInform(currentDate),
    refetchInterval: 300_000, // 5분마다 refetch
  });

  const [isShow, setIsShow] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
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

  const deleteInform = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosApi.delete(
        `/api/employee-inform/removeInform/${id}`
      );
      if (res.status === 200) {
        alert("삭제완료되었습니다.");
        refetch();
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [currentDate, refetch]);

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-10 bg-gray-50">
      {isShow && <AdminLogin setIsShow={setIsShow} />}
      <div className="sm:w-full w-[80%] flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4 mt-2 sm:mt-4">
          <ArrowBack />
          <Title
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            setShowInput={setShowInput}
            calDate={calDate}
            category="employee"
          />
          <div className="w-[15%]" />
        </div>

        {showInput && (
          <div className="w-[17%] flex justify-center">
            <input
              type="date"
              value={currentDate.toISOString().split("T")[0] || ""}
              className="sm:w-full w-[60%] my-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              onChange={handleDateChange}
            />
          </div>
        )}

        <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl">
          <span className="font-bold md:text-xl ml-4">목록</span>
          <div className="p-4 items-center flex w-[50%] justify-end">
            <button
              className="sm:whitespace-nowrap bg-[#00ab39] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 button-effect mr-4 sm:mr-2"
              onClick={onClickInputInform}
            >
              입력
            </button>
            <button
              className="sm:whitespace-nowrap bg-[#007BFF] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 hover:opacity-60 ml-4 sm:ml-2 button-effect"
              onClick={onClickAdmin}
            >
              관리
            </button>
            <div className="md:h-10 sm:h-8 border border-gray-300 mx-4" />
            <button onClick={() => refetch()}>
              <SlRefresh className="md:w-7 md:h-7 sm:w-5 sm:h-5 hover:opacity-60" />
            </button>
          </div>
        </div>

        <table className="w-[100%] rounded-2xl shadow-lg text-left table-auto ">
          <TabHeader headers={employeeHeaders} category="employee" />
          <tbody className="rounded-b-xl overflow-y-auto h-full">
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
                  <td className="md:p-4 sm:p-2 border-b border-gray-200 whitespace-nowrap">
                    {item.username}
                  </td>
                  <td className="md:p-4 sm:p-1 border-b border-gray-200 ">
                    {item.destination}
                  </td>
                  <td className="md:p-4 sm:p-1 border-b border-gray-200 ">
                    {item.business}
                  </td>
                  <td className="md:p-4 sm:p-1 border-b border-gray-200 ">
                    {item.work}
                  </td>
                  <td className="md:p-4 sm:p-1 border-b border-gray-200">
                    {item.car}
                  </td>
                  <td className="md:p-4 sm:p-1 border-b border-gray-200">
                    {item.isOwner && (
                      <X
                        onClick={() => deleteInform(item._id)}
                        className="hover:opacity-60 w-6 h-6"
                      />
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
