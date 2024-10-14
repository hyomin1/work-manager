import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TabInputHeader from "../../components/TabInputHeader";
import { drivingInputHeaders } from "../../constants/headers";
import { formDate, axiosReq } from "../../api";

import ArrowBack from "../../components/ArrowBack";
import { useCustomQueries } from "../../hooks/useCustomQuery";

function DriveInput() {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [car, setCar] = useState("");
  const [drivingDestination, setDrivingDestination] = useState("");

  const [startKM, setStartKM] = useState(0);
  const [endKM, setEndKM] = useState(0);

  const [fuelCost, setFuelCost] = useState(0);
  const [toll, setToll] = useState(0);

  const [driveDay, setDriveDay] = useState<Date>();

  const [etc, setEtc] = useState<{ name: string; cost: number }>({
    name: "", // 초기값 설정
    cost: 0,
  });

  const { names, namesLoading, cars, carsLoading, etcNames, etcNamesLoading } =
    useCustomQueries();

  const handleDriveDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriveDay(new Date(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
  };
  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCar(event.target.value);
  };
  const handleDrivingDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDrivingDestination(event.target.value);
  };

  const handleStartKMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartKM(parseInt(event.target.value));
  };
  const handleEndKMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndKM(parseInt(event.target.value));
  };
  const handleFuelCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFuelCost(parseInt(event.target.value));
  };
  const handleTollChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToll(parseInt(event.target.value));
  };
  const handleEtcNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEtc({ name: event.target.value, cost: etc.cost }); // ���기값 설정
  };

  const handleEtcCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEtc({ name: etc.name, cost: parseInt(event.target.value) }); // ���기값 설정
  };

  const onClickComplete = async () => {
    if (!driveDay) {
      alert("날짜를 선택해주세요");
      return;
    }
    if (!username) {
      alert("운전자를 선택해주세요");
      return;
    }
    if (!car) {
      alert("차량을 선택해주세요");
      return;
    }
    if (!drivingDestination) {
      alert("행선지를 입력해주세요");
      return;
    }

    if (!startKM || !endKM) {
      alert("주행거리를 입력해주세요.");
      return;
    }
    if (etc.name && !etc.cost) {
      alert("비용을 입력해주세요.");
      return;
    }
    if (etc.cost && !etc.name) {
      alert("항목을 선택해주세요.");
      return;
    }
    if (typeof fuelCost !== "number") {
      setFuelCost(0);
    }
    if (typeof toll !== "number") {
      setToll(0);
    }
    if (typeof etc.cost !== "number") {
      setEtc({ name: etc.name, cost: 0 });
    }

    try {
      const res = await axiosReq.post("/api/driving-inform/addInform", {
        driveDay,
        username,
        car,
        drivingDestination,
        startKM,
        endKM,
        fuelCost,
        toll,
        etc,
      });
      if (res.status === 200) {
        alert(res.data.message);
        navigate("/driving-status");
      }
    } catch (error) {
      alert("정보 입력 중 오류가 발생하였습니다.");
    }
  };
  if (namesLoading || carsLoading || etcNamesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center p-10 bg-gray-50 sm:p-4 sm:overflow-y-auto">
      <div className="w-[95%] flex flex-col items-center rounded-lg sm:w-full bg-gray-50 overflow-x-auto">
        <div className="mt-4 mb-20 flex items-center md:justify-center w-full sm:mb-10 sm:justify-between">
          <div className="w-full flex justify-between items-center">
            <ArrowBack type="not home" />
            <div className="flex items-center justify-center">
              <span className="font-bold text-3xl sm:text-lg">{formDate}</span>
            </div>
            <div className="w-[11%]" />
          </div>
        </div>

        <div className="w-full sm:overflow-x-auto">
          <table className="w-full text-left sm:table-fixed ">
            <TabInputHeader headers={drivingInputHeaders} />

            <tbody>
              <tr className="sm:flex sm:flex-col w-full">
                <td className="sm:mb-4 sm:w-full md:border-x border-gray-300 md:border-b w-[1%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">날짜</div>
                  <input
                    type="date"
                    className="w-full p-2 transition duration-200 ease-in-out border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleDriveDayChange}
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b w-[7%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">차량</div>
                  <select
                    defaultValue=""
                    onChange={handleCarChange}
                    className="hover:opacity-60 border rounded-md p-2 ml-3 sm:w-full sm:ml-0"
                  >
                    <option disabled value="">
                      차량 선택
                    </option>
                    {cars
                      ?.sort((a, b) => a.car.localeCompare(b.car))
                      .map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.car}
                        </option>
                      ))}
                  </select>
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[3%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">운전자</div>
                  <select
                    defaultValue=""
                    onChange={handleNameChange}
                    className="hover:opacity-60 border rounded-md p-2 ml-3 sm:w-full sm:ml-0"
                  >
                    <option disabled value="">
                      운전자 선택
                    </option>
                    {names
                      ?.sort((a, b) => a.username.localeCompare(b.username))
                      .map((item, index) => (
                        <option key={index} value={item.username}>
                          {item.username}
                        </option>
                      ))}
                  </select>
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b w-[15%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">행선지</div>
                  <input
                    type="text"
                    onChange={handleDrivingDestinationChange}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-150 ease-in-out"
                  />
                </td>

                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[5%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">출발(Km)</div>
                  <input
                    type="number"
                    onChange={handleStartKMChange}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-150 ease-in-out hover:opacity-60"
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[5%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">도착(Km)</div>
                  <input
                    type="number"
                    onChange={handleEndKMChange}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-150 ease-in-out hover:opacity-60"
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[5%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden"></div>
                  <input
                    type="number"
                    onChange={handleFuelCostChange}
                    value={fuelCost}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400  transition duration-150 ease-in-out hover:opacity-60"
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[5%] whitespace-nowrap">
                  <div className="sm:font-bold sm:mb-2 md:hidden">하이패스</div>
                  <input
                    type="number"
                    onChange={handleTollChange}
                    value={toll}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-150 ease-in-out  hover:opacity-60"
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[10%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">기타</div>
                  <div className="flex">
                    <select
                      defaultValue=""
                      onChange={handleEtcNameChange}
                      className="hover:opacity-60 border rounded-md p-2 ml-3 sm:w-full sm:ml-0 md:mr-2 w-full"
                    >
                      <option disabled value="">
                        항목 선택
                      </option>
                      {etcNames
                        ?.sort((a, b) => a.etcName.localeCompare(b.etcName))
                        .map((item, index) => (
                          <option key={index} value={item.etcName}>
                            {item.etcName}
                          </option>
                        ))}
                    </select>
                    <input
                      type="number"
                      value={etc.cost}
                      onChange={handleEtcCostChange}
                      className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400  transition duration-150 ease-in-out hover:opacity-60"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={onClickComplete}
            className="bg-[#00ab39] rounded-lg text-white py-2 px-4 hover:opacity-60 w-[15%] h-12 font-bold text-xl sm:w-full my-2"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriveInput;
