import React, { useState } from "react";
import { calYearMonth, getCars } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { ICars } from "../../interfaces/interface";
import TabHeader from "../../components/TabHeader";
import Title from "../../components/Title";
import { drivingHeaders } from "../../constants/headers";
import TabHeaderAction from "../../components/TabHeaderAction";

const startDrive = 150;
const endDrive = 200;

const drivingRecords = [
  {
    date: "2024-09-01",
    driver: "이효민",
    destination: "서울",
    startDrive,
    endDrive,
    drivingDistance: endDrive - startDrive, // 주행거리 (킬로미터)
    fuelCost: 30000, // 주유비 (원)
    toll: 1000, // 하이패스 사용 여부
  },
  {
    date: "2024-09-15",
    driver: "김철수",
    destination: "부산",
    startDrive,
    endDrive,

    drivingDistance: endDrive - startDrive, // 주행거리 (킬로미터)
    fuelCost: 55000, // 주유비 (원)
    toll: 2000, // 하이패스 사용 여부
  },
  {
    date: "2024-09-20",
    driver: "박영희",
    destination: "대전",
    startDrive,
    endDrive,
    drivingDistance: endDrive - startDrive,
    fuelCost: 25000, // 주유비 (원)
    toll: 4000, // 하이패스 사용 여부
  },
];

function DriveMain() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [carNum, setCarNum] = useState("");

  const [showInput, setShowInput] = useState(false);

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ["car", 1],
    queryFn: getCars,
  });

  const onChangeCarNum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarNum(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(new Date(e.target.value));
    setShowInput(false);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-10 bg-gray-50">
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
            className="w-[20%] hover:opacity-60 font-bold h-12 border border-gray-300 rounded-lg p-2"
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

        {carNum.length > 0 && (
          <>
            <TabHeaderAction />
            <table className="w-[100%] rounded-2xl shadow-lg text-left table-auto">
              <TabHeader headers={drivingHeaders} />
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default DriveMain;
