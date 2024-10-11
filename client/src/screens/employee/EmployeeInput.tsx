import React, { useState } from "react";
import { formDate, axiosReq } from "../../api";

import TabInputHeader from "../../components/TabInputHeader";
import { employeeInputHeaders } from "../../constants/headers";
import ArrowBack from "../../components/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useCustomQueries } from "../../hooks/useCustomQuery";

function EmployeeInput() {
  const [username, setName] = useState("");

  const [destinations, setDestinations] = useState(["", "", ""]);
  const [inputDestination, setInputDestination] = useState("");

  const [businesses, setBusinesses] = useState(["", "", ""]);
  const [inputBusiness, setInputBusiness] = useState("");

  const [works, setWorks] = useState(["", "", ""]);
  const [inputWork, setInputWork] = useState(""); // 업무 직접 입력은 아니지만 직접 입력한 방문지와 사업명의 매핑하기 위한 변수

  const [car, setCar] = useState("");

  const selectedDestinations = destinations.filter(Boolean);
  const selectedBusinesses = businesses.filter(Boolean);
  const selectedWorks = works.filter(Boolean);

  // 0 : 기본 1 : 일일 업무 2: 주간/월간/연간 업무
  const [isDaily, setIsDaily] = useState(0);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const navigate = useNavigate();
  const {
    names,
    namesLoading,
    destinationsData,
    destinationsLoading,
    businessesData,
    businessesLoading,
    workData,
    worksLoading,
    cars,
    carsLoading,
  } = useCustomQueries();

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
  };

  const handleDestinationChange =
    (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newDestinations = [...destinations];
      newDestinations[index] = event.target.value;
      setDestinations(newDestinations);

      const newBusinesses = [...businesses];
      newBusinesses[index] = "";
      setBusinesses(newBusinesses);
    };

  const handleInputDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputDestination(event.target.value);
  };

  const handleBusinessChange =
    (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newBusinesses = [...businesses];
      newBusinesses[index] = event.target.value;
      setBusinesses(newBusinesses);
    };

  const handleInputBusinessChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputBusiness(event.target.value);
  };

  const handleWorkChange =
    (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newWorks = [...works];
      newWorks[index] = event.target.value;
      setWorks(newWorks);
    };

  const handleInputWorkChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInputWork(event.target.value);
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
    const destArr = selectedDestinations
      .map((destination) => {
        const parts = destination.split(",");
        return parts[1] ? parts[1].trim() : null;
      })
      .filter((dest) => dest !== null && dest !== "")
      .concat(inputDestination.trim())
      .filter(Boolean);

    const businessArr = selectedBusinesses
      .map((business) => business.trim())
      .filter((business) => business !== null && business !== "")
      .concat(inputBusiness.trim())
      .filter(Boolean);

    const workArr = selectedWorks
      .map((work) => work.trim())
      .filter((work) => work !== null && work !== "")
      .concat(inputWork.trim())
      .filter(Boolean);

    if (!username) {
      alert("이름을 선택해주세요");
      return;
    }

    if (destArr.length === 0) {
      alert("방문지를 선택해주세요");
      return;
    }

    if (businessArr.length === 0) {
      alert("사업명을 선택해주세요");
      return;
    }
    if (destArr.length !== businessArr.length) {
      alert("방문지와 사업명의 수가 일치하지 않습니다");
      return;
    }

    if (workArr.length === 0) {
      alert("업무를 선택해주세요");
      return;
    }
    if (
      destArr.length === businessArr.length &&
      destArr.length > workArr.length
    ) {
      alert("업무를 선택해주세요");
      return;
    }
    if (
      destArr.length === businessArr.length &&
      destArr.length < workArr.length
    ) {
      alert("업무의 개수가 많습니다");
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

    const requests = destArr.map((destination, index) =>
      axiosReq.post("/api/employee-inform/addInform", {
        username,
        destination: destArr[index],
        business: businessArr[index],
        work: workArr[index],
        car,
        isDaily,
        ...(isDaily === 1 ? {} : { startDate, endDate }),
      })
    );

    const responses = await Promise.all(requests);

    if (responses.every((res) => res.status === 200)) {
      alert("정보 입력 완료");
      navigate("/employee-status");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen p-10 bg-gray-50 sm:p-4 sm:overflow-y-auto">
      <div className="w-[100%] flex flex-col items-center rounded-lg sm:w-full bg-gray-50 overflow-x-auto">
        <div className="flex items-center w-full mt-4 mb-20 md:justify-center sm:mb-10 sm:justify-between">
          <div className="flex items-center justify-between w-full">
            <ArrowBack type="not home" />
            <div className="sm:w-[80%] flex items-center justify-center">
              <span className="text-3xl font-bold sm:text-lg">{formDate}</span>
            </div>
            <div className="w-[15%] " />
          </div>

          <div className="md-hidden sm:w-[10%]" />
        </div>

        <div className="w-full sm:overflow-x-auto">
          <table className="w-full text-left sm:table-fixed ">
            <TabInputHeader headers={employeeInputHeaders} />

            <tbody>
              <tr className="table-auto sm:flex sm:flex-col">
                <td className="border-gray-300 sm:mb-4 sm:w-full md:border-r md:border-b">
                  <div className="sm:font-bold sm:mb-2 md:hidden">이름</div>
                  <select
                    defaultValue=""
                    onChange={handleNameChange}
                    className="p-2 ml-3 border rounded-md hover:opacity-60 sm:w-full sm:ml-0"
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

                <td className="flex flex-col px-2 border-gray-300 sm:mb-4 sm:w-full md:border-r md:border-b">
                  <div className="sm:font-bold sm:mb-2 md:hidden">방문지</div>
                  {[0, 1, 2].map((index) => (
                    <select
                      key={index}
                      value={destinations[index]}
                      onChange={handleDestinationChange(index)}
                      className="p-2 my-4 ml-2 border rounded-md hover:opacity-60 sm:w-full sm:ml-0 sm:my-2"
                    >
                      <option disabled value="">
                        방문지 선택
                      </option>

                      <option value=",선택 안함">선택 안함</option>
                      {destinationsData
                        ?.sort((a, b) =>
                          a.destination.localeCompare(b.destination)
                        )
                        .map((item, idx) => (
                          <option
                            key={idx}
                            value={`${item._id},${item.destination}`}
                          >
                            {item.destination}
                          </option>
                        ))}
                    </select>
                  ))}
                  <input
                    value={inputDestination}
                    onChange={handleInputDestinationChange}
                    className="p-2 my-4 ml-2 border rounded-md hover:opacity-60 sm:w-full sm:ml-0 sm:my-2"
                    placeholder="방문지 직접 입력"
                  />
                </td>

                <td className="sm:mb-4 sm:w-full w-[42%] md:border-r border-gray-300 md:border-b">
                  <div className="sm:font-bold sm:mb-2 md:hidden">사업명</div>
                  {[0, 1, 2].map((index) => (
                    <select
                      key={index}
                      value={businesses[index]}
                      onChange={handleBusinessChange(index)}
                      className="hover:opacity-60 border rounded-md p-2 my-4 ml-2 sm:w-full sm:ml-0 sm:my-2 w-[90%]"
                    >
                      <option disabled value="">
                        사업명 선택
                      </option>
                      {destinations.includes(",선택 안함") && (
                        <option value="선택 안함">선택 안함</option>
                      )}

                      {businessesData
                        ?.filter(
                          (business) =>
                            business.destinationId ===
                            destinations[index].split(",")[0]
                        )
                        ?.sort((a, b) => a.business.localeCompare(b.business))
                        .map((item, idx) => (
                          <option key={idx} value={item.business}>
                            {item.business}
                          </option>
                        ))}
                    </select>
                  ))}
                  <input
                    value={inputBusiness}
                    onChange={handleInputBusinessChange}
                    className="hover:opacity-60 border rounded-md p-2 my-4 ml-2 sm:w-full sm:ml-0 sm:my-2 md:w-[90%]"
                    placeholder="사업명 직접 입력"
                  />
                </td>

                <td className="flex flex-col border-gray-300 sm:mb-4 sm:w-full md:border-r md:border-b">
                  <div className="sm:font-bold sm:mb-2 md:hidden">업무</div>
                  {[0, 1, 2].map((index) => (
                    <select
                      key={index}
                      value={works[index]}
                      onChange={handleWorkChange(index)}
                      className="p-2 my-4 ml-2 border rounded-md hover:opacity-60 sm:w-full sm:ml-0 sm:my-2"
                    >
                      <option disabled value="">
                        업무 선택
                      </option>
                      {workData
                        ?.sort((a, b) => a.work.localeCompare(b.work))
                        .map((item, index) => (
                          <option key={index} value={item.work}>
                            {item.work}
                          </option>
                        ))}
                    </select>
                  ))}
                  <select
                    defaultValue=""
                    className="p-2 my-4 ml-2 border rounded-md hover:opacity-60 sm:w-full sm:ml-0 sm:my-2"
                    onChange={handleInputWorkChange}
                  >
                    <option disabled value="">
                      업무 선택
                    </option>
                    {workData
                      ?.sort((a, b) => a.work.localeCompare(b.work))
                      .map((item, index) => (
                        <option key={index} value={item.work}>
                          {item.work}
                        </option>
                      ))}
                  </select>
                </td>

                <td className="px-2 border-gray-300 sm:mb-4 sm:w-full md:border-r md:border-b">
                  <div className="sm:font-bold sm:mb-2 md:hidden">차량</div>
                  <select
                    defaultValue=""
                    onChange={handleCarChange}
                    className="p-2 border rounded-md hover:opacity-60 sm:w-full"
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

                <td className="px-2 border-gray-300 sm:mb-4 sm:w-full md:border-r md:border-b w-[10%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">기간</div>
                  <div className="flex flex-col">
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
                        <span className="mb-2 font-bold">시작일</span>
                        <input
                          type="date"
                          onChange={handleStartDateChange}
                          className="p-2 transition duration-200 ease-in-out border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col sm:mt-2">
                        <span className="mb-2 font-bold">종료일</span>
                        <input
                          type="date"
                          onChange={handleEndDateChange}
                          className="p-2 transition duration-200 ease-in-out border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center w-full mt-8">
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

export default EmployeeInput;
