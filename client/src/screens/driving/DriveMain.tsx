import React, { useEffect, useState } from "react";
import {
  calCarDay,
  calMonth,
  calYear,
  calYearMonth,
  getCars,
  getDrivingInform,
} from "../../api";
import { useQuery } from "@tanstack/react-query";
import { ICars } from "../../interfaces/interface";
import TabHeader from "../../components/TabHeader";
import Title from "../../components/Title";
import { drivingHeaders } from "../../constants/headers";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../../components/AdminLogin";
import { SlRefresh } from "react-icons/sl";
import Page from "../../components/Page";
interface IDrivingInform {
  createdAt: Date;
  username: string;
  drivingDestination: string;
  startTime: string;
  endTime: string;
  startKM: string;
  endKM: string;
  totalKM: number;
  fuelCost: number;
  toll: number;
}

function DriveMain() {
  const navigate = useNavigate();

  const { data: drivingInform, refetch } = useQuery<IDrivingInform[]>({
    queryKey: ["drivingInform"],
    queryFn: () =>
      getDrivingInform(calYear(currentDate), calMonth(currentDate), carNum),
    refetchInterval: 300_000,
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = drivingInform
    ? Math.ceil(drivingInform.length / itemsPerPage)
    : 0;

  const [carNum, setCarNum] = useState("");
  useEffect(() => {
    refetch();
  }, [carNum, refetch, currentDate]);

  const [showInput, setShowInput] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ["car", 1],
    queryFn: getCars,
  });

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeCarNum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarNum(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(new Date(e.target.value));
    setShowInput(false);
    setCurrentPage(1);
  };
  const onClickInputInform = () => {
    navigate("/driving-input");
  };

  const onClickAdmin = () => {
    setIsShow(true);
  };
  const totalFuelCost =
    drivingInform?.reduce((acc, item) => acc + item.fuelCost, 0) || 0;
  const totalToll =
    drivingInform?.reduce((acc, item) => acc + item.toll, 0) || 0;
  const grandTotal = totalFuelCost + totalToll;
  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-10 bg-gray-50">
      {isShow && <AdminLogin setIsShow={setIsShow} />}
      <div className="sm:w-full w-[90%] flex flex-col items-center ">
        <Title
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setShowInput={setShowInput}
          calYearMonth={calYearMonth}
          category="driving"
        />

        <div className="w-full flex justify-between mb-2 items-center ">
          <select
            className="md:w-[20%] hover:opacity-60 font-bold h-12 border border-gray-300 rounded-lg p-2"
            onChange={onChangeCarNum}
            defaultValue=""
          >
            <option value="" disabled>
              차량 선택
            </option>
            {cars &&
              cars
                .sort((a, b) => a.car.localeCompare(b.car))
                .map((car) => <option key={car._id}>{car.car}</option>)}
          </select>
          {showInput && (
            <div className="w-[60%] flex justify-center hover:opacity-60">
              <input
                type="month"
                onChange={handleDateChange}
                className="sm:w-full w-[60%] my-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              />
            </div>
          )}
          <div className="w-[20%]" />
        </div>

        <>
          <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl">
            <span className="font-bold text-xl ml-4">목록</span>
            <div className="p-4 items-center flex w-[50%] justify-end">
              <button
                className="sm:whitespace-nowrap bg-[#00ab39] rounded-lg text-white py-2 px-4 button-effect mr-4 sm:mr-2"
                onClick={onClickInputInform}
              >
                입력
              </button>
              <button
                className="sm:whitespace-nowrap bg-[#007BFF] rounded-lg text-white py-2 px-4 hover:opacity-60 ml-4 sm:ml-2 button-effect"
                onClick={onClickAdmin}
              >
                관리
              </button>
              <div className="h-10 border border-gray-300 mx-4" />
              <button className="" onClick={() => refetch()}>
                <SlRefresh className="w-7 h-7 hover:opacity-60" />
              </button>
            </div>
          </div>
          <table className="w-[100%] rounded-2xl shadow-lg text-left table-auto">
            <TabHeader headers={drivingHeaders} />
            <tbody className="rounded-b-xl">
              {drivingInform
                ?.slice(indexOfFirstItem, indexOfLastItem)
                .map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 sm:text-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                      {calCarDay(item.createdAt)}
                    </td>
                    <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                      {item.username}
                    </td>
                    <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                      {item.drivingDestination}
                    </td>
                    <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                      {item.startTime} ~ {item.endTime}
                    </td>

                    <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                      {item.startKM} km
                    </td>
                    <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                      {item.endKM} km
                    </td>
                    <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                      {item.totalKM} km
                    </td>
                    <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                      {item.fuelCost}
                    </td>
                    <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                      {item.toll}
                    </td>
                  </tr>
                ))}
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td className="p-4 border-b border-gray-200 whitespace-nowrap font-bold text-lg">
                  {totalFuelCost}
                </td>
                <td className="p-4 border-b border-gray-200 whitespace-nowrap font-bold text-lg">
                  {totalToll}
                </td>
                <td className="p-4 border-b border-gray-200 whitespace-nowrap font-bold text-lg">
                  {grandTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </div>
      <Page
        totalPage={totalPages}
        page={currentPage}
        onPageChange={handleClick}
      />
    </div>
  );
}

export default DriveMain;
