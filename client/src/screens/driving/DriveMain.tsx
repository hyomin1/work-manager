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
import { ICars, IDrivingInform } from "../../interfaces/interface";
import TabHeader from "../../components/TabHeader";
import Title from "../../components/Title";
import { drivingHeaders } from "../../constants/headers";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../admin/AdminLogin";
import { SlRefresh } from "react-icons/sl";
import Page from "../../components/Page";
import { useMediaQuery } from "react-responsive";
import ArrowBack from "./../../components/ArrowBack";
import Logout from "../auth/Logout";
import { Edit, Pencil, Settings, Users, X } from "lucide-react";
import { axiosReq } from "../../api";
import EditDrivingInform from "./EditDrivingInform";

function DriveMain() {
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });

  const [currentDate, setCurrentDate] = useState(new Date());

  const [carNum, setCarNum] = useState("");
  const [car, setCar] = useState("");

  const [editingItemId, setEditingItemId] = useState("");

  const { data: drivingInform, refetch } = useQuery<IDrivingInform[]>({
    queryKey: ["drivingInform"],
    queryFn: () =>
      getDrivingInform(calYear(currentDate), calMonth(currentDate), carNum),
    refetchInterval: 300_000,
    enabled: carNum.length > 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 10 : 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = drivingInform
    ? Math.ceil(drivingInform.length / itemsPerPage)
    : 0;

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
    const carId = e.target.value.split(",")[0];
    const carName = e.target.value.split(",")[1];
    setCar(carName);
    setCarNum(carId);
    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(new Date(e.target.value));
    setShowInput(false);
    setCurrentPage(1);
  };

  const deleteInform = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosReq.delete(
        `/api/driving-inform/removeInform/${id}`
      );
      if (res.status === 200) {
        alert(res.data.message);
        refetch();
      }
    }
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

  const totalDrivingKM =
    drivingInform?.reduce((acc, item) => acc + item.totalKM, 0) || 0;
  const grandTotal = totalFuelCost + totalToll + totalEtcCost;

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen p-4 sm:p-2 bg-gray-50">
      {isShow && <AdminLogin setIsShow={setIsShow} />}
      <div className="sm:w-full w-[80%] flex flex-col items-center ">
        <div className="flex items-center justify-between print:justify-center w-full mt-4 mb-4 sm:mt-4">
          <ArrowBack type="home" />
          <Title
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            setShowInput={setShowInput}
            calYearMonth={calYearMonth}
            category="driving"
          />

          <Logout />
        </div>

        <div className="flex items-center justify-between w-full mb-2">
          {showInput && (
            <div className="w-full flex justify-center hover:opacity-60">
              <input
                type="month"
                onChange={handleDateChange}
                className="sm:w-[70%] w-[33%] my-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              />
            </div>
          )}
        </div>

        <>
          <div className="hidden w-full mb-4 font-bold print:flex">
            <span>{car}</span>
          </div>
          <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl md:h-16 print-hidden">
            <select
              className="md:w-[20%] sm:w-[40%] hover:opacity-60 font-bold h-10 border border-gray-300 rounded-lg p-2 text-sm mx-4"
              onChange={onChangeCarNum}
              defaultValue=""
            >
              <option value="" disabled>
                차량 선택
              </option>
              {cars &&
                cars
                  .sort((a, b) => a.car.localeCompare(b.car))
                  .map((car) => (
                    <option key={car._id} value={`${car._id},${car.car}`}>
                      {car.car}
                    </option>
                  ))}
            </select>
            <div className="p-4 items-center flex w-[50%] justify-end">
              <div className="flex sm:flex-col items-center justify-center">
                <button
                  onClick={() => navigate("/employee-status")}
                  className="whitespace-nowrap bg-[#00ab39] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 hover:opacity-60 md:mr-4 sm:mb-2 button-effect flex justify-center items-center"
                >
                  <Users className="sm:w-4 sm:h-4" />
                  <span className="ml-1 sm:text-xs">근무</span>
                </button>
                <button
                  className="whitespace-nowrap bg-[#007BFF] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 button-effect md:mr-4 sm:mb-2 flex justify-center items-center"
                  onClick={onClickInputInform}
                >
                  <Pencil className="sm:w-4 sm:h-4" />
                  <span className="ml-1 sm:text-xs">입력</span>
                </button>
                <button
                  className="whitespace-nowrap bg-[#00ab39] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 hover:opacity-60 button-effect flex justify-center items-center"
                  onClick={onClickAdmin}
                >
                  <Settings className="sm:w-4 sm:h-4" />
                  <span className="ml-1 sm:text-xs">관리</span>
                </button>
              </div>

              <div className="mx-4 border border-gray-300 md:h-10 sm:h-12" />
              <button className="" onClick={() => refetch()}>
                <SlRefresh className="md:w-7 md:h-7 sm:w-6 sm:h-6 hover:opacity-60" />
              </button>
            </div>
          </div>
          {isMobile ? (
            <div className="sm:w-full">
              {drivingInform
                ?.sort((a, b) => {
                  if (
                    new Date(a.driveDay).getTime() ===
                    new Date(b.driveDay).getTime()
                  ) {
                    return a.startKM - b.startKM;
                  }

                  return (
                    new Date(a.driveDay).getTime() -
                    new Date(b.driveDay).getTime()
                  );
                })
                ?.slice(indexOfFirstItem, indexOfLastItem)
                .map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 p-4 mb-1 space-x-0 text-sm bg-white border border-gray-300 rounded-lg shadow-md"
                  >
                    <div className="flex flex-col ">
                      <span className="mb-1 font-bold">날짜</span>
                      <span>{calCarDay(item.driveDay)}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="mb-1 font-bold">운전자</span>
                      <span>{item.username}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 font-bold whitespace-nowrap">
                        행선지
                      </span>
                      <p>{item.drivingDestination}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 font-bold">출발(km)</span>
                      <span>{item.startKM} km</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 font-bold">도착(km)</span>
                      <span>{item.endKM} km</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 font-bold">주행거리</span>
                      <p>{item.totalKM} km</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 font-bold">주유비</span>
                      <span>{item.fuelCost}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 font-bold">하이패스</span>
                      <span> {item.toll}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 font-bold">기타</span>
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
              <div className="grid w-full grid-cols-3 gap-2 p-4 mb-1 space-x-0 text-sm print:text-[9px] bg-white border border-gray-300 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <span className="font-bold">주행거리</span>
                  <span>{totalDrivingKM} km</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">주유비</span>
                  <span>{totalFuelCost}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">하이패스</span>
                  <span>{totalToll}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">기타</span>
                  <span>{totalEtcCost}</span>
                </div>
                <div />
                <div className="flex flex-col">
                  <span className="font-bold">총계</span>
                  <span>{grandTotal}</span>
                </div>
                <div />
              </div>
            </div>
          ) : (
            <table className="w-[100%] rounded-2xl text-left border border-black">
              <TabHeader headers={drivingHeaders} category="driving" />
              <tbody className="rounded-b-xl text-xs print:text-[9px] ">
                {drivingInform
                  ?.sort((a, b) => {
                    if (
                      new Date(a.driveDay).getTime() ===
                      new Date(b.driveDay).getTime()
                    ) {
                      return a.startKM - b.startKM;
                    }
                    return (
                      new Date(a.driveDay).getTime() -
                      new Date(b.driveDay).getTime()
                    );
                  })
                  ?.slice(indexOfFirstItem, indexOfLastItem)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 sm:text-sm ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50 w-full"
                      }`}
                    >
                      <td className="py-2 pl-1 border border-black whitespace-nowrap">
                        {calCarDay(item.driveDay)}
                      </td>
                      <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                        {item.username}
                      </td>
                      <td className="py-2 pl-1 border border-black whitespace-nowrap">
                        {item.drivingDestination}
                      </td>

                      <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                        {item.startKM}km
                      </td>
                      <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                        {item.endKM}km
                      </td>
                      <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                        {item.totalKM}km
                      </td>
                      <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                        {item.fuelCost ? item.fuelCost : ""}
                      </td>
                      <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                        {item.toll ? item.toll : ""}
                      </td>
                      <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                        {item.etc.cost > 0 &&
                          `${item.etc.cost}(${item.etc.name})`}
                      </td>
                      <td className="border border-black md:py-1 md:pl-1 sm:p-1 print-hidden">
                        {item.isOwner && (
                          <div className="flex justify-end">
                            <Edit
                              onClick={() => setEditingItemId(item._id)}
                              className="w-5 h-5  hover:opacity-60 mr-2"
                            />
                            <X
                              onClick={() => deleteInform(item._id)}
                              className="w-5 sm:h-5 hover:opacity-60 mr-2"
                            />
                            {editingItemId === item._id && (
                              <EditDrivingInform
                                item={item}
                                setEditingItemId={setEditingItemId}
                              />
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan={5} />
                  <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px]">
                    {totalDrivingKM}km
                  </td>

                  <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px]">
                    {totalFuelCost}
                  </td>
                  <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px]">
                    {totalToll}
                  </td>
                  <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px] ">
                    {totalEtcCost}
                  </td>
                  <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px] ">
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
