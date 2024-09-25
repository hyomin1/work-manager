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
import SelectBox from "../components/SelectBox";

function Input() {
  const [username, setName] = useState("");
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");
  const [destination3, setDestination3] = useState("");
  const [business, setBusiness] = useState("");
  const [work, setWork] = useState("");
  const [car, setCar] = useState("");

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

  const handleBusinessChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBusiness(event.target.value);
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

    const selectedDestinations = [
      destination1,
      destination2,
      destination3,
    ].filter(Boolean);

    if (selectedDestinations.length === 0) {
      alert("방문지를 선택해주세요");
      return;
    }

    if (!business) {
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
      const requests = selectedDestinations.map((destination) =>
        axiosApi.post("/api/inform/addInform", {
          username,
          destination,
          business,
          work,
          car,
          isDaily,
          ...(isDaily === 1 ? {} : { startDate, endDate }),
        })
      );

      const responses = await Promise.all(requests);

      if (responses.every((res) => res.status === 200)) {
        alert("입력이 완료되었습니다.");
        navigate("/main");
      }
    } catch (error) {
      alert("정보 입력 중 오류가 발생하였습니다.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center sm:p-2 p-10 bg-gray-50 ">
      <div className="sm:w-full w-[80%] flex flex-col items-center   ">
        <div className="mt-4 mb-20 flex items-center justify-center w-full">
          <span className="sm:text-lg mb-4 font-bold text-3xl">{formDate}</span>
        </div>

        <div className="w-full  flex flex-col rounded-t-2xl ">
          <div className=" sm:text-lg whitespace-nowrap flex sm:flex-col">
            <div className="sm:p-1 sm:text-sm sm:flex sm:items-center sm:justify-between md:items-center p-4 border-b border-gray-300 md:w-[16%] flex md:flex-col items-center">
              <div className="bg-gray-200 w-[100%] h-8 flex items-center font-bold p-2 mb-2">
                <span>이름</span>
              </div>

              <SelectBox
                onChange={handleNameChange}
                options={
                  names?.map((name) => ({
                    label: name.username,
                    value: name.username,
                  })) || []
                }
                placeholder="이름 선택"
              />
            </div>

            <div className="sm:p-1 p-4 border-b border-gray-300 w-[18%] sm:text-sm flex items-center">
              <span>방문지</span>
              {[
                handleDestinationChange1,
                handleDestinationChange2,
                handleDestinationChange3,
              ].map((handler, index) => (
                <SelectBox
                  key={index}
                  onChange={handler}
                  options={
                    destinations?.map((dest) => ({
                      label: dest.destination,
                      value: dest.destination,
                    })) || []
                  }
                  placeholder="방문지 선택"
                  className="my-4 ml-2"
                />
              ))}
            </div>
            <div className="sm:p-1 p-4 border-b border-gray-300 w-[18%] sm:text-sm flex items-center">
              <span>사업명</span>
              <SelectBox
                onChange={handleBusinessChange}
                options={
                  businesses?.map((business) => ({
                    label: business.business,
                    value: business.business,
                  })) || []
                }
                placeholder="선택"
                className="ml-4"
              />
            </div>
            <div className="sm:p-1 p-4 border-b border-gray-300 w-[16%] sm:text-sm flex items-center">
              <span>업무</span>
              <SelectBox
                onChange={handleStateChange}
                options={
                  works?.map((work) => ({
                    label: work.work,
                    value: work.work,
                  })) || []
                }
                placeholder="선택"
              />
            </div>
            <div className="sm:p-1 p-4 border-b border-gray-300 w-[16%] sm:text-sm flex items-center">
              <span>차량</span>
              <SelectBox
                onChange={handleCarChange}
                options={[
                  { label: "선택 안함", value: "선택 안함" },
                  ...(cars?.map((car) => ({
                    label: car.car,
                    value: car.car,
                  })) || []),
                ]}
                placeholder="차량 선택"
              />
            </div>
            <div className="sm:p-1 p-4 border-b border-gray-300 w-[16%] sm:text-sm flex items-center">
              <span>기간</span>
              <input
                type="radio"
                value={isDaily}
                checked={isDaily === 1}
                onChange={() => setIsDaily(1)}
              />
              <span className="mr-2">일일</span>
              <input
                type="radio"
                value={isDaily}
                checked={isDaily === 2}
                onChange={() => setIsDaily(2)}
              />
              <span>장기</span>
              {isDaily === 2 && (
                <div className="flex mt-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-xl mb-2">시작일</span>
                    <input type="date" onChange={handleStartDateChange} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xl mb-2">종료일</span>
                    <input type="date" onChange={handleEndDateChange} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={onClickComplete}
            className="bg-[#00ab39] rounded-lg text-white py-2 px-4 hover:opacity-60 w-[15%] h-12 font-bold text-xl"
          >
            입력 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
