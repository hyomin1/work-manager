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
import { useMediaQuery } from "react-responsive";

interface IDrivingInform {
  createdAt: Date;
  username: string;
  drivingDestination: string;
  startKM: string;
  endKM: string;
  totalKM: number;
  fuelCost: number;
  toll: number;
  etc: { name: string; cost: number };
}

function DriveMain() {
  const navigate = useNavigate();

  const { data: drivingInform, refetch } = useQuery<IDrivingInform[]>({
    queryKey: ["drivingInform"],
    queryFn: () =>
      getDrivingInform(calYear(currentDate), calMonth(currentDate), carNum),
    refetchInterval: 300_000,
  });

  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });

  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 10 : 25;
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

  const totalEtcCost =
    drivingInform?.reduce((acc, item) => acc + item.etc.cost, 0) || 0;

  const grandTotal = totalFuelCost + totalToll + totalEtcCost;

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-4 bg-gray-50">
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
            className="md:w-[22%] sm:w-[50%] hover:opacity-60 font-bold h-12 border border-gray-300 rounded-lg p-2"
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
          <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl md:h-16 print-hidden">
            <span className="font-bold md:text-xl ml-4">목록</span>
            <div className="p-4 items-center flex w-[50%] justify-end">
              <button
                className="sm:whitespace-nowrap bg-[#00ab39] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 button-effect mr-4 sm:mr-2"
                onClick={onClickInputInform}
              >
                <span>입력</span>
              </button>
              <button
                className="sm:whitespace-nowrap bg-[#007BFF] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 hover:opacity-60 ml-4 sm:ml-2 button-effect"
                onClick={onClickAdmin}
              >
                <span>관리</span>
              </button>
              <div className="md:h-10 sm:h-8 border border-gray-300 mx-4" />
              <button className="" onClick={() => refetch()}>
                <SlRefresh className="md:w-7 md:h-7 sm:w-5 sm:h-5 hover:opacity-60" />
              </button>
            </div>
          </div>
          {isMobile ? (
            <div className="sm:w-full">
              {drivingInform
                ?.sort((a, b) => {
                  if (
                    new Date(a.createdAt).getTime() ===
                    new Date(b.createdAt).getTime()
                  ) {
                    if (a.drivingDestination === b.drivingDestination) {
                      return a.username.localeCompare(b.username);
                    }
                    return a.drivingDestination.localeCompare(
                      b.drivingDestination
                    );
                  }
                  return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                  );
                })
                ?.slice(indexOfFirstItem, indexOfLastItem)
                .map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 p-4 rounded-lg bg-white shadow-md grid grid-cols-3 space-x-0 text-sm gap-2 mb-1"
                  >
                    <div className="flex flex-col ">
                      <span className="font-bold mb-1">날짜</span>
                      <span>{calCarDay(item.createdAt)}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-bold mb-1">운전자</span>
                      <span>{item.username}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold mb-1 whitespace-nowrap">
                        행선지
                      </span>
                      <p>{item.drivingDestination}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold mb-1">출발(km)</span>
                      <span>{item.startKM} km</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold mb-1">도착(km)</span>
                      <span>{item.endKM} km</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold mb-1">주행거리</span>
                      <p>{item.totalKM} km</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold mb-1">주유비</span>
                      <span>{item.fuelCost}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold mb-1">하이패스</span>
                      <span> {item.toll}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold mb-1">기타 비용</span>
                      <span>
                        {item.etc.cost > 0 && (
                          <p>
                            {item.etc.cost} ({item.etc.name})
                          </p>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <table className="w-[100%] rounded-2xl shadow-lg text-left table-auto">
              <TabHeader headers={drivingHeaders} category="driving" />
              <tbody className="rounded-b-xl md:text-xs">
                {drivingInform
                  ?.sort((a, b) => {
                    if (
                      new Date(a.createdAt).getTime() ===
                      new Date(b.createdAt).getTime()
                    ) {
                      if (a.drivingDestination === b.drivingDestination) {
                        return a.username.localeCompare(b.username);
                      }
                      return a.drivingDestination.localeCompare(
                        b.drivingDestination
                      );
                    }
                    return (
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime()
                    );
                  })
                  ?.slice(indexOfFirstItem, indexOfLastItem)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 sm:text-sm ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-2 border-b border-gray-200 whitespace-nowrap w-[3%]">
                        {calCarDay(item.createdAt)}
                      </td>
                      <td className="p-2 border-b border-gray-200 whitespace-nowrap w-[4%]">
                        {item.username}
                      </td>
                      <td className="p-2 border-b border-gray-200 whitespace-nowrap w-[25%]">
                        {item.drivingDestination}
                      </td>

                      <td className="p-2 border-b border-gray-200 whitespace-nowrap w-[5%]">
                        {item.startKM} km
                      </td>
                      <td className="p-2 border-b border-gray-200 whitespace-nowrap w-[5%]">
                        {item.endKM} km
                      </td>
                      <td className="p-2 border-b border-gray-200 whitespace-nowrap w-[5%]">
                        {item.totalKM} km
                      </td>
                      <td className="p-2 border-b border-gray-200 whitespace-nowrap w-[5%]">
                        {item.fuelCost}
                      </td>
                      <td className="p-2 border-b border-gray-200 whitespace-nowrap w-[5%]">
                        {item.toll}
                      </td>
                      <td className="p-2 border-b border-gray-200 whitespace-nowrap w-[5%]">
                        {item.etc.cost > 0 &&
                          `${item.etc.cost} (${item.etc.name})`}
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

                  <td className="p-2 border-b border-gray-200 whitespace-nowrap font-bold md:text-xs w-[5%]">
                    {totalFuelCost}
                  </td>
                  <td className="p-2 border-b border-gray-200 whitespace-nowrap font-bold md:text-xs w-[5%]">
                    {totalToll}
                  </td>
                  <td className="p-2 border-b border-gray-200 whitespace-nowrap font-bold md:text-xs w-[5%]">
                    {totalEtcCost}
                  </td>
                  <td className="p-2 border-b border-gray-200 whitespace-nowrap font-bold md:text-xs w-[2%]">
                    {grandTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
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
