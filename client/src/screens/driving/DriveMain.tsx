import React, { useState } from "react";
import { calYearMonth, getCars } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { ICars } from "../../interfaces/interface";
import TabHeader from "../../components/TabHeader";
import Title from "../../components/Title";
import { drivingHeaders } from "../../constants/headers";

function DriveMain() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [carNum, setCarNum] = useState("");

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ["car", 1],
    queryFn: getCars,
  });

  const onChangeCarNum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarNum(e.target.value);
    setCurrentPage(1);
  };

  const previous = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);

      return newDate;
    });
  };
  const next = () => {
    setCurrentDate((nextDate) => {
      const newDate = new Date(nextDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const selectMonth = () => {};

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-10 bg-gray-50">
      <div className="sm:w-full w-[90%] flex flex-col items-center ">
        <Title previous={previous} next={next} calYearMonth={calYearMonth} />
        <button onClick={next}>s</button>
        <div className="w-full flex justify-start">
          <select
            className="w-[10%] hover:opacity-60 font-bold"
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
        </div>

        <table className="w-[100%] rounded-2xl shadow-lg text-left table-auto">
          <TabHeader headers={drivingHeaders} />
        </table>
      </div>
    </div>
  );
}

export default DriveMain;
