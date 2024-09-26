import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  formDate,
  getBusinesses,
  getCars,
  getDestinations,
  getNames,
  getWorks,
} from "../api";
import {
  IBusinesses,
  ICars,
  IDestinations,
  INames,
  IWorks,
} from "../interfaces/interface";
import axiosApi from "../axios";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

function Input() {
  const [username, setName] = useState("");

  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");
  const [destination3, setDestination3] = useState("");

  const [business1, setBusiness1] = useState("");
  const [business2, setBusiness2] = useState("");
  const [business3, setBusiness3] = useState("");

  const [work, setWork] = useState("");

  const [car, setCar] = useState("");

  const selectedDestinations = [
    destination1,
    destination2,
    destination3,
  ].filter(Boolean);

  const selectedBusinesses = [business1, business2, business3].filter(Boolean);

  // 0 : 기본 1 : 일일 업무 2: 주간/월간/연간 업무
  const [isDaily, setIsDaily] = useState(0);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const navigate = useNavigate();

  const { data: names, isLoading: namesLoading } = useQuery<INames[]>({
    queryKey: ["names"],
    queryFn: getNames,
  });
  const { data: destinations, isLoading: destinationsLoading } = useQuery<
    IDestinations[]
  >({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  const { data: businesses, isLoading: businessesLoading } = useQuery<
    IBusinesses[]
  >({
    queryKey: ["businesses"],
    queryFn: getBusinesses,
  });

  const { data: works, isLoading: worksLoading } = useQuery<IWorks[]>({
    queryKey: ["works"],
    queryFn: getWorks,
  });

  const { data: cars, isLoading: carsLoading } = useQuery<ICars[]>({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
  };

  const handleDestinationChange1 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination1(event.target.value);
  };

  const handleDestinationChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination2(event.target.value);
  };

  const handleDestinationChange3 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination3(event.target.value);
  };

  const handleBusinessChange1 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBusiness1(event.target.value);
  };
  const handleBusinessChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBusiness2(event.target.value);
  };
  const handleBusinessChange3 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBusiness3(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWork(event.target.value);
  };

  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCar(event.target.value);
  };

  /* 일일 업무 아닌 경우 시작 날짜와 종료 날짜 설정 */

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(new Date(event.target.value));
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(event.target.value));
  };

  if (
    namesLoading ||
    destinationsLoading ||
    businessesLoading ||
    worksLoading ||
    carsLoading
  ) {
    return <div>Loading...</div>;
  }

  const onClickComplete = async () => {
    if (!username) {
      alert("이름을 선택해주세요");
      return;
    }

    if (selectedDestinations.length === 0) {
      alert("방문지를 선택해주세요");
      return;
    }

    if (selectedBusinesses.length === 0) {
      alert("사업명을 선택해주세요");
      return;
    }

    if (!work) {
      alert("업무를 선택해주세요");
      return;
    }

    if (!car) {
      alert("차량을 선택해주세요");
      return;
    }
    if (startDate && endDate && startDate > endDate) {
      alert("시작일이 종료일보다 느립니다.");
      return;
    }

    try {
      const requests = selectedDestinations.map((destination, index) =>
        axiosApi.post("/api/employee-inform/addInform", {
          username,
          destination,
          business: selectedBusinesses[index],
          work,
          car,
          isDaily,
          ...(isDaily === 1 ? {} : { startDate, endDate }),
        })
      );

      const responses = await Promise.all(requests);

      if (responses.every((res) => res.status === 200)) {
        alert("입력이 완료되었습니다.");
        navigate("/employee-status");
      }
    } catch (error) {
      alert("정보 입력 중 오류가 발생하였습니다.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center p-10 bg-gray-50 sm:p-4 sm:overflow-y-auto">
      <div className="w-[90%] flex flex-col items-center rounded-lg sm:w-full bg-gray-50 overflow-x-auto">
        <div className="mt-4 mb-20 flex items-center md:justify-center w-full sm:mb-10 sm:justify-between">
          <div
            className="md:hidden sm:hover:opacity-60 sm:w-[10%] flex items-center"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack className="w-10 h-8" />
          </div>
          <div className="sm:w-[80%] flex items-center justify-center">
            <span className=" font-bold text-3xl sm:text-xl">{formDate}</span>
          </div>

          <div className="md-hidden sm:w-[10%]" />
        </div>

        <div className="w-full sm:overflow-x-auto">
          <table className="w-full text-left sm:table-fixed ">
            <thead>
              <tr className="bg-gray-200 sm:hidden">
                <th className="p-4 border-b border-r border-gray-300">이름</th>
                <th className="p-4 border-b border-r border-gray-300">
                  방문지
                </th>
                <th className="p-4 border-b border-r border-gray-300">
                  사업명
                </th>
                <th className="p-4 border-b border-r border-gray-300">업무</th>
                <th className="p-4 border-b border-r border-gray-300">차량</th>
                <th className="p-4 border-b border-r border-gray-300">기간</th>
              </tr>
            </thead>

            <tbody>
              <tr className="sm:flex sm:flex-col table-auto">
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b">
                  <div className="sm:font-bold sm:mb-2 md:hidden">이름</div>
                  <select
                    defaultValue=""
                    onChange={handleNameChange}
                    className="hover:opacity-60 border rounded-md p-2 ml-3 sm:w-full sm:ml-0"
                  >
                    <option disabled value="">
                      이름 선택
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

                <td className="flex flex-col sm:mb-4 sm:w-full md:border-r border-gray-300 px-2 md:border-b">
                  <div className="sm:font-bold sm:mb-2 md:hidden">방문지</div>
                  {[
                    handleDestinationChange1,
                    handleDestinationChange2,
                    handleDestinationChange3,
                  ].map((handler, index) => (
                    <select
                      key={index}
                      defaultValue=""
                      onChange={handler}
                      className="hover:opacity-60 border rounded-md p-2 my-4 ml-2 sm:w-full sm:ml-0 sm:my-2"
                    >
                      <option disabled value="">
                        방문지 선택
                      </option>
                      {destinations
                        ?.sort((a, b) =>
                          a.destination.localeCompare(b.destination)
                        )
                        .map((item, idx) => (
                          <option key={idx} value={item.destination}>
                            {item.destination}
                          </option>
                        ))}
                    </select>
                  ))}
                </td>

                <td className="sm:mb-4 sm:w-full w-[42%] md:border-r border-gray-300 md:border-b">
                  <div className="sm:font-bold sm:mb-2 md:hidden">사업명</div>
                  {[
                    handleBusinessChange1,
                    handleBusinessChange2,
                    handleBusinessChange3,
                  ].map((handler, index) => (
                    <select
                      key={index}
                      defaultValue=""
                      onChange={handler}
                      className="hover:opacity-60 border rounded-md p-2 my-4 ml-2 sm:w-full sm:ml-0 sm:my-2 "
                    >
                      <option disabled value="">
                        사업명 선택
                      </option>
                      {businesses
                        ?.sort((a, b) => a.business.localeCompare(b.business))
                        .map((item, index) => (
                          <option key={index} value={item.business}>
                            {item.business}
                          </option>
                        ))}
                    </select>
                  ))}
                </td>

                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 px-2 md:border-b">
                  <div className="sm:font-bold sm:mb-2 md:hidden">업무</div>
                  <select
                    defaultValue=""
                    onChange={handleStateChange}
                    className="hover:opacity-60 border rounded-md p-2 sm:w-full"
                  >
                    <option disabled value="">
                      업무 선택
                    </option>
                    {works
                      ?.sort((a, b) => a.work.localeCompare(b.work))
                      .map((item, index) => (
                        <option key={index} value={item.work}>
                          {item.work}
                        </option>
                      ))}
                  </select>
                </td>

                <td className="sm:mb-4 sm:w-full md:border-r md:border-b border-gray-300 px-2">
                  <div className="sm:font-bold sm:mb-2 md:hidden">차량</div>
                  <select
                    defaultValue=""
                    onChange={handleCarChange}
                    className="hover:opacity-60 border rounded-md p-2 sm:w-full"
                  >
                    <option disabled value="">
                      차량 선택
                    </option>
                    <option>선택 안함</option>
                    {cars?.map((item, index) => (
                      <option key={index} value={item.car}>
                        {item.car}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="sm:mb-4 sm:w-full md:border-r md:border-b border-gray-300 px-2">
                  <div className="sm:font-bold sm:mb-2 md:hidden">기간</div>
                  <div className="sm:flex sm:flex-col">
                    <label className="sm:flex sm:items-center sm:mb-2 md:mr-4">
                      <input
                        type="radio"
                        value={isDaily}
                        checked={isDaily === 1}
                        onChange={() => setIsDaily(1)}
                        className="sm:mr-2"
                      />
                      <span className="md:text-lg">당일</span>
                    </label>
                    <label className="sm:flex sm:items-center">
                      <input
                        type="radio"
                        value={isDaily}
                        checked={isDaily === 2}
                        onChange={() => setIsDaily(2)}
                        className="sm:mr-2"
                      />
                      <span className="md:text-lg">기간 선택</span>
                    </label>
                  </div>
                  {isDaily === 2 && (
                    <div className="flex mt-4 sm:flex-col ">
                      <div className="flex flex-col md:mr-2">
                        <span className="font-bold  mb-2">시작일</span>
                        <input
                          type="date"
                          onChange={handleStartDateChange}
                          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                        />
                      </div>
                      <div className="flex flex-col sm:mt-2">
                        <span className="font-bold mb-2">종료일</span>
                        <input
                          type="date"
                          onChange={handleEndDateChange}
                          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                  )}
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

export default Input;
